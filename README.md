# LocalClip

LocalClip is a **local-first clipboard manager** for Windows, based on the open-source [TieZ project](https://github.com/jimuzhe/tiez-clipboard). This fork is independent and **is not an official TieZ release**.

[简体中文](./README.zh-CN.md) · [Downloads (this fork)](https://github.com/MinsGoing/tiez-clipboard/releases)

## Features

- Clipboard history for text, rich text, images and file paths
- Search, pinning, tags, history cleanup and sequential paste
- Global shortcuts, customizable appearance, light/dark themes and privacy masking
- Local data storage and backup / import tools
- Optional LAN file transfer, enabled from Settings

## Changes from upstream

This edition removes the **AI assistant**, **MQTT/verification-code synchronization** and **WebDAV/cloud synchronization** interfaces, and disables their backend requests. It also disables the upstream announcement ping, analytics reporting and automatic updater. These features are **not available** in this edition.

LAN file transfer remains available as an opt-in feature. Other actions such as opening external links, fetching online themes or previewing remote content can still access the network. This is not an offline sandbox.

## Download and installation

Download the Windows x64 installer from **[Releases in this fork](https://github.com/MinsGoing/tiez-clipboard/releases)**. Initial builds are designated *preview* and are published only after the Windows build and automated checks pass. No installer is provided by the upstream project's website for this fork.

The installer is not code-signed; Windows may display a publisher/SmartScreen warning. Verify the downloadable SHA-256 checksum before installing. The application ID is `com.minsgoing.localclip`, distinct from upstream TieZ.

## Build from source

Requirements: Node.js 22, Rust stable, Microsoft C++ Build Tools, WebView2 and Tauri 2's Windows prerequisites.

```powershell
npm ci
npm run build
npm test
npx tauri build --config src-tauri/tauri.windows.conf.json
```

Installer output: `src-tauri/target/release/bundle/nsis/`.

Source for this version is on the [`local-only-remove-sync-ai` branch](https://github.com/MinsGoing/tiez-clipboard/tree/local-only-remove-sync-ai).

## Privacy and data

Clipboard history is stored locally. Legacy sync or AI credentials may remain in an existing local database after an upgrade, but the disabled services do not use them. If you enable LAN transfer, a local network service is started; a previously enabled setting may persist. Review your firewall and network permissions as appropriate.

## License and attribution

Derived from [TieZ by jimuzhe](https://github.com/jimuzhe/tiez-clipboard), retaining its **GPL-3.0** license and copyright notices. This independent fork has no affiliation with the original developer.
