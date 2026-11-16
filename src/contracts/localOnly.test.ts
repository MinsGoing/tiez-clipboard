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
    test("announcements have no automatic ping", () => {
        const announcements = file("src/shared/hooks/useAnnouncements.ts");
        expect(announcements).not.toContain("get_ping_id");
        expect(announcements).not.toContain("await fetch(");
    });
    test("upstream updater is absent", () => {
        const config = JSON.parse(file("src-tauri/tauri.conf.json"));
        expect(config.plugins.updater).toBeUndefined();
        expect(config.bundle.createUpdaterArtifacts).toBe(false);
        expect(config.app.security.capabilities[0].permissions).not.toContain("updater:default");
    });
});
