use figment::Figment;
use figment::providers::Env;
use infisical::secrets::ListSecretsRequest;
use infisical::{AuthMethod, Client};
use loco_rs::config::Config;
use loco_rs::prelude::*;
use std::env;

//
// --- Infisical "Secret Zero" Loader ---
//
pub async fn load_config_from_infisical() -> Result<Config> {
    // 1. Read "Secret Zero" (Machine Identity) from environment
    let site_url = env::var("INFISICAL_BASE_URL")
        .map_err(|e| Error::Message(format!("Missing INFISICAL_BASE_URL: {e}")))?;
    let client_id = env::var("INFISICAL_CLIENT_ID")
        .map_err(|e| Error::Message(format!("Missing INFISICAL_CLIENT_ID: {e}")))?;
    let client_secret = env::var("INFISICAL_CLIENT_SECRET")
        .map_err(|e| Error::Message(format!("Missing INFISICAL_CLIENT_SECRET: {e}")))?;
    let project_id = env::var("INFISICAL_SECRETS_PROJECT_ID")
        .map_err(|e| Error::Message(format!("Missing INFISICAL_SECRETS_PROJECT_ID: {e}")))?;
    let environment_name = env::var("INFISICAL_ENVIRONMENT")
        .map_err(|e| Error::Message(format!("Missing INFISICAL_ENVIRONMENT: {e}")))?;

    // 2. Build the client.
    let mut client = Client::builder()
        .base_url(&site_url)
        .build()
        .await
        .map_err(|e| Error::Message(format!("Failed to build Infisical client: {e}")))?;

    // 3. Set up authentication method and log in.
    let auth_method = AuthMethod::new_universal_auth(&client_id, &client_secret);

    client
        .login(auth_method)
        .await
        .map_err(|e| Error::Message(format!("Infisical auth failed: {e}")))?;

    println!("Infisical SDK authenticated successfully.");

    // 4. Build a request to get all secrets AND ATTACH TO ENVIRONMENT.
    let request = ListSecretsRequest::builder(&project_id, &environment_name)
        .path("/")
        .recursive(true)
        .attach_to_process_env(true)
        .build();

    // Make the API call. This populates the environment.
    client
        .secrets()
        .list(request)
        .await
        .map_err(|e| Error::Message(format!("Failed to fetch secrets: {e}")))?;

    println!("Infisical SDK has attached all secrets to the environment.");

    // 5. Build config from environment
    // CRITICAL FIX: We need to split only the first underscore
    // APP_DATABASE_ENABLE_LOGGING should become: database.enable_logging (NOT database.enable.logging)
    // APP_LOGGER_LEVEL should become: logger.level

    let config: Config = Figment::new()
        .merge(Env::prefixed("APP_").map(|key| {
            // Split only on the FIRST underscore to get the section
            // Then lowercase the remaining part for the field name
            let key_str = key.as_str();
            if let Some(first_underscore) = key_str.find('_') {
                let (section, field) = key_str.split_at(first_underscore);
                let field = &field[1..]; // Remove the leading underscore
                format!("{}.{}", section.to_lowercase(), field.to_lowercase()).into()
            } else {
                key_str.to_lowercase().into()
            }
        }))
        .extract()
        .map_err(|e| {
            // Enhanced error reporting
            eprintln!("\n=== Figment Extraction Error ===");
            eprintln!("Error: {:#?}", e);
            eprintln!("\nThis usually means a required config field is missing.");
            eprintln!("Check your Infisical secrets for the '{}' environment.", environment_name);
            eprintln!("================================\n");
            Error::Message(format!("Figment extraction failed: {e}"))
        })?;

    Ok(config)
}
