import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const apply = spawnSync(process.execPath, [resolve("scripts/apply-app-version.mjs")], {
  stdio: "inherit",
  env: process.env
});
if (apply.error || apply.status !== 0) process.exit(apply.status ?? 1);

const config = JSON.parse(readFileSync(resolve("src-tauri/tauri.conf.json"), "utf8"));
if (config.identifier !== "com.minsgoing.localclip" ||
    config.plugins?.updater ||
    config.bundle?.createUpdaterArtifacts !== false) {
  console.error("[configure-release] Invalid LocalClip identity or updater config");
  process.exit(1);
}
console.log("[configure-release] LocalClip local-only configuration validated");
