use figment::Figment;
use figment::providers::Env;
use infisical::{AuthMethod, Client};
use infisical::secrets::ListSecretsRequest;
use loco_rs::config::Config;
use loco_rs::prelude::*;
use std::env;

//
// --- Infisical "Secret Zero" Loader ---
//
pub async fn load_config_from_infisical() -> Result<Config> {
    // 1. Read "Secret Zero" (Machine Identity) from environment
    // These names are our "ZOUARI" standard. We manually read them
    // and pass them to the SDK.
    let site_url = env::var("INFISICAL_SITE_URL")
        .map_err(|e| Error::Message(format!("Missing INFISICAL_SITE_URL: {e}")))?;
    let client_id = env::var("INFISICAL_CLIENT_ID")
        .map_err(|e| Error::Message(format!("Missing INFISICAL_CLIENT_ID: {e}")))?;
    let client_secret = env::var("INFISICAL_CLIENT_SECRET")
        .map_err(|e| Error::Message(format!("Missing INFISICAL_CLIENT_SECRET: {e}")))?;
    let project_id = env::var("INFISICAL_PROJECT_ID")
        .map_err(|e| Error::Message(format!("Missing INFISICAL_PROJECT_ID: {e}")))?;
    let environment = env::var("INFISICAL_ENVIRONMENT")
        .map_err(|e| Error::Message(format!("Missing INFISICAL_ENVIRONMENT: {e}")))?;

    // 2. Initialize Infisical Client
    let mut client = Client::builder()
        .base_url(&site_url)
        .build()
        .await
        .map_err(|e| Error::Message(format!("Failed to build Infisical client: {e}")))?;

    // 3. Log in
    let auth_method = AuthMethod::new_universal_auth(&client_id, &client_secret);
    client
        .login(auth_method)
        .await
        .map_err(|e| Error::Message(format!("Infisical auth failed: {e}")))?;

    println!("Infisical SDK authenticated successfully.");

    // 4. Fetch *all* secrets (Using the NEW ListSecretsRequest builder)
    let request = ListSecretsRequest::builder(&project_id, &environment)
        .recursive(true)
        .build();
    let secrets = client
        .secrets()
        .list(request)
        .await
        .map_err(|e| Error::Message(format!("Failed to fetch secrets: {e}")))?;

    // 5. Build a `figment::Figment` config object
    let mut config_figment = Figment::new();
    for secret in secrets {
        let key = secret.secret_key.replace('_', ".").to_lowercase();
        config_figment = config_figment.merge((key, secret.secret_value));
    }

    // 6. Extract the Figment into the *official* `loco_rs::config::Config` struct
    config_figment
        .merge(Env::prefixed("APP_").split("_"))
        .extract()
        .map_err(|e| Error::Message(format!("Figment extraction failed: {e}")))
}
