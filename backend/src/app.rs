use async_trait::async_trait;
use loco_openapi::prelude::*;
use loco_rs::{
    Result,
    app::{AppContext, Hooks, Initializer},
    bgworker::{BackgroundWorker, Queue},
    boot::{BootResult, StartMode, create_app},
    config::Config,
    controller::AppRoutes,
    db::{self, truncate_table},
    environment::Environment,
    task::Tasks,
};
use migration::Migrator;
use std::path::Path;

#[allow(unused_imports)]
use crate::{controllers, models::_entities::users, tasks, workers::downloader::DownloadWorker};

pub struct App;
#[async_trait]
impl Hooks for App {
    fn app_name() -> &'static str {
        env!("CARGO_CRATE_NAME")
    }

    fn app_version() -> String {
        format!(
            "{} ({})",
            env!("CARGO_PKG_VERSION"),
            option_env!("BUILD_SHA").or(option_env!("GITHUB_SHA")).unwrap_or("dev")
        )
    }

    async fn boot(
        mode: StartMode,
        environment: &Environment,
        config: Config,
    ) -> Result<BootResult> {
        create_app::<Self, Migrator>(mode, environment, config).await
    }

    async fn initializers(ctx: &AppContext) -> Result<Vec<Box<dyn Initializer>>> {
        let mut initializers: Vec<Box<dyn Initializer>> = vec![];

        // Add OpenAPI initializer (but disable it during tests)
        if ctx.environment != Environment::Test {
            initializers.push(
                Box::new(
                    loco_openapi::OpenapiInitializerWithSetup::new(
                        |ctx| {
                            #[allow(clippy::needless_for_each)]
                            #[derive(OpenApi)]
                            #[openapi(
                                // This is what adds the "Authorize" button for JWT
                                modifiers(&SecurityAddon),
                                info(
                                    title = "ZOUARI Platform API",
                                    description = r"
The ZOUARI Platform API defines the official backend contract for all services within the ZOUARI ecosystem.  
It is built on a Secure-by-Design architecture using Rust and follows strict Zero-Trust, validation, and consistency principles.

This specification provides stable, well-typed, and predictable interfaces for all internal applications and automation systems.  
It serves as the single source of truth for request/response models, authentication flow, and service behavior across the platform.
",
                                    version = "1.1.0",
                                    contact(
                                        name = "Support Team / ZOUARI",
                                        email = "support@zouari.org",
                                        url = "https://zouari.org"
                                    ),
                                    license(
                                        name = "BSL"
                                    )
                                )
                            )]
                            struct ApiDoc;

                            // Set JWT location for authentication documentation
                            set_jwt_location(ctx.into());

                            ApiDoc::openapi()
                        },
                        // Use automatic schema collection
                        None,
                    ),
                ) as Box<dyn Initializer>
            );
        }

        Ok(initializers)
    }

    fn routes(_ctx: &AppContext) -> AppRoutes {
        AppRoutes::with_default_routes() // controller routes below
            .add_route(controllers::auth::routes())
    }
    async fn connect_workers(ctx: &AppContext, queue: &Queue) -> Result<()> {
        queue.register(DownloadWorker::build(ctx)).await?;
        Ok(())
    }

    #[allow(unused_variables)]
    fn register_tasks(tasks: &mut Tasks) {
        // tasks-inject (do not remove)
    }
    async fn truncate(ctx: &AppContext) -> Result<()> {
        truncate_table(&ctx.db, users::Entity).await?;
        Ok(())
    }
    async fn seed(ctx: &AppContext, base: &Path) -> Result<()> {
        db::seed::<users::ActiveModel>(&ctx.db, &base.join("users.yaml").display().to_string())
            .await?;
        Ok(())
    }
}
