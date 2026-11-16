// Upstream distribution endpoints are disabled in this fork.
// Retain inert stubs for compatibility with older callers.
pub fn announcement_ping_url() -> String {
    String::new()
}
pub fn theme_store_base_url() -> String {
    String::new()
}
pub fn default_theme_id() -> &'static str {
    #[cfg(target_os = "macos")]
    {
        "macos"
    }
    #[cfg(not(target_os = "macos"))]
    {
        "mica"
    }
}
