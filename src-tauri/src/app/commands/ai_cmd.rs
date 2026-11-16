//! Compatibility stubs for old AI IPC commands.
//! LocalClip never creates a provider client or sends clipboard content to AI endpoints.
use crate::error::{AppError, AppResult};
use tauri::AppHandle;

fn ai_unavailable() -> AppError {
    AppError::Validation("AI is unavailable in this local-only edition".to_string())
}

#[tauri::command]
pub async fn check_ai_connectivity(
    base_url: String,
    api_key: String,
    model: String,
    provider: Option<String>,
) -> AppResult<String> {
    let _ = (base_url, api_key, model, provider);
    Err(ai_unavailable())
}

#[tauri::command]
pub async fn call_ai(
    app_handle: AppHandle,
    id: i64,
    content: String,
    action_type: String,
    use_provided_content: Option<bool>,
) -> AppResult<serde_json::Value> {
    let _ = (app_handle, id, content, action_type, use_provided_content);
    Err(ai_unavailable())
}

#[tauri::command(async)]
pub fn apply_ai_result(app_handle: AppHandle, id: i64, content: String) -> AppResult<()> {
    let _ = (app_handle, id, content);
    Err(ai_unavailable())
}

#[cfg(test)]
mod tests {
    #[test]
    fn ai_network_calls_have_no_implementation() {
        let source = include_str!("ai_cmd.rs");
        assert!(!source.contains("reqwest::"));
        assert!(!source.contains("https://"));
    }
}
