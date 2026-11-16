// Generate the Windows installer, taskbar and tray assets from one editable SVG.
// Tauri's own icon tool creates PNG, ICO and ICNS files cross-platform.
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const source = resolve("src-tauri/icons/localclip.svg");
const output = resolve("src-tauri/icons");
const cli = resolve("node_modules", ".bin", process.platform === "win32" ? "tauri.cmd" : "tauri");

if (!existsSync(source) || !existsSync(cli)) {
  console.error("[icons] LocalClip source SVG or Tauri CLI is missing. Run npm ci.");
  process.exit(1);
}
const result = spawnSync(cli, ["icon", source, "--output", output], {
  stdio: "inherit",
  shell: process.platform === "win32"
});
if (result.error || result.status !== 0) {
  console.error("[icons] Failed to generate LocalClip icons:", result.error?.message || result.status);
  process.exit(1);
}
console.log("[icons] LocalClip icon, Windows ICO and 32px tray asset generated");
