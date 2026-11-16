//! Release metadata remains available locally; network updater commands are disabled.
use serde::Serialize;

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ReleaseBuildInfo {
    pub channel: String,
    pub portable: bool,
}

#[tauri::command]
pub fn get_release_build_info() -> ReleaseBuildInfo {
    let configured_channel = option_env!("TIEZ_RELEASE_CHANNEL").unwrap_or("stable");
    let channel = if configured_channel == "beta" { "beta" } else { "stable" };
    ReleaseBuildInfo {
        channel: channel.to_string(),
        portable: cfg!(feature = "portable"),
    }
}

#[tauri::command]
pub async fn check_beta_update(
    webview: tauri::Webview,
    include_stable: bool,
) -> Result<Option<serde_json::Value>, String> {
    let _ = (webview, include_stable);
    Ok(None)
}
