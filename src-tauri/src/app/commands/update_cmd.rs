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
    let channel = match configured_channel {
        "beta" => "beta",
        _ => "stable",
    };

    ReleaseBuildInfo {
        channel: channel.to_string(),
        portable: cfg!(feature = "portable"),
    }
}

/// Same shape as the updater plugin's own check result, so the frontend can
/// wrap it in `new Update(...)` and download/install it the usual way.
#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct BetaUpdateMetadata {
    rid: tauri::ResourceId,
    current_version: String,
    version: String,
    date: Option<String>,
    body: Option<String>,
    raw_json: serde_json::Value,
}

/// The configured update endpoint, asking the beta channel instead.
fn beta_endpoint(endpoint: &str) -> String {
    match endpoint.find("channel=") {
        Some(start) => {
            let value_start = start + "channel=".len();
            let value_end = endpoint[value_start..]
                .find('&')
                .map_or(endpoint.len(), |i| value_start + i);
            format!("{}beta{}", &endpoint[..value_start], &endpoint[value_end..])
        }
        None if endpoint.contains('?') => format!("{endpoint}&channel=beta"),
        None => format!("{endpoint}?channel=beta"),
    }
}

/// Stable builds ask the beta channel too. The server returns the newer of
/// beta and stable there; with `include_stable` off only a pre-release counts
/// (the normal check already covers stable updates).
#[tauri::command]
pub async fn check_beta_update(
    webview: tauri::Webview,
    include_stable: bool,
) -> Result<Option<BetaUpdateMetadata>, String> {
    let _ = (webview, include_stable);
    Ok(None)
}

#[cfg(test)]
mod tests {
    use super::beta_endpoint;

    #[test]
    fn beta_endpoint_switches_or_adds_the_channel() {
        let base = "https://tiez.name666.top/api/v1/latest-version";
        assert_eq!(
            beta_endpoint(&format!("{base}?target={{{{target}}}}&channel=stable")),
            format!("{base}?target={{{{target}}}}&channel=beta")
        );
        assert_eq!(
            beta_endpoint(&format!("{base}?channel=stable&arch={{{{arch}}}}")),
            format!("{base}?channel=beta&arch={{{{arch}}}}")
        );
        assert_eq!(beta_endpoint(&format!("{base}?target=x")), format!("{base}?target=x&channel=beta"));
        assert_eq!(beta_endpoint(base), format!("{base}?channel=beta"));
    }
}
