import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, test } from "vitest";
import { APP_EDITION, CLOUD_SYNC_ENABLED } from "../shared/config/edition";

const root = join(__dirname, "..", "..");
const file = (path: string) => readFileSync(join(root, path), "utf8");

describe("local-only invariant checks", () => {
    test("local edition cannot be changed with build flags", () => {
        expect(APP_EDITION).toBe("local");
        expect(CLOUD_SYNC_ENABLED).toBe(false);
    });
    test("startup no longer launches remote sync or telemetry", () => {
        const setup = file("src-tauri/src/app/setup.rs");
        expect(setup).not.toContain("mqtt_sub::start_mqtt_client(");
        expect(setup).not.toContain("cloud_sync::start_cloud_sync_client(");
        expect(setup).not.toContain("fn init_analytics(");
    });
    test("AI profile initialization does not persist credentials", () => {
        const source = file("src/shared/hooks/useSettingsPostInit.ts");
        expect(source).not.toContain('key: "ai_profiles"');
        expect(source).toContain("setAiEnabled(false)");
    });
    test("announcements have no automatic ping", () => {
        const announcements = file("src/shared/hooks/useAnnouncements.ts");
        expect(announcements).not.toContain("get_ping_id");
        expect(announcements).not.toContain("await fetch(");
    });
    test("only local icon assets are loaded and no updater UI is mounted", () => {
        const setup = file("src-tauri/src/app/setup.rs");
        const app = file("src/App.tsx");
        const source = file("src-tauri/icons/localclip.svg");
        expect(setup).toContain('include_bytes!("../../icons/32x32.png")');
        expect(source).toContain("#072677");
        expect(app).not.toContain("useAutoUpdate");
        expect(app).not.toContain("<UpdateDialog");
    });
    test("Windows application enumeration no longer executes Get-StartApps", () => {
        const apps = file("src-tauri/src/infrastructure/windows_api/apps.rs");
        expect(apps).not.toContain("Get-StartApps");
        expect(apps).toContain("App Paths");
        expect(apps).toContain("HKEY_CURRENT_USER");
    });
    test("Windows autostart settings are isolated from the upstream app", () => {
        const autostart = file("src-tauri/src/infrastructure/windows_api/elevated_autostart.rs");
        expect(autostart).toContain('LocalClip\\\\ElevatedAutostart');
        expect(autostart).not.toContain('delete_value("TieZ")');
        expect(autostart).not.toContain('set_value("TieZ"');
        expect(file("src-tauri/src/infrastructure/windows_api/single_instance.rs")).toContain("LocalClip.ShowWindow");
    });
    test("AI execution and online theme store are disabled", () => {
        const ai = file("src-tauri/src/app/commands/ai_cmd.rs");
        expect(ai).not.toContain("reqwest::");
        expect(file("src-tauri/src/app/commands/theme_cmd.rs")).toContain("在线主题商店在 LocalClip 中不可用");
    });
    test("upstream updater is absent", () => {
        const config = JSON.parse(file("src-tauri/tauri.conf.json"));
        expect(config.plugins.updater).toBeUndefined();
        expect(config.bundle.createUpdaterArtifacts).toBe(false);
        expect(config.app.security.capabilities[0].permissions).not.toContain("updater:default");
    });
});
