# LocalClip

LocalClip 是基于开源项目 [TieZ](https://github.com/jimuzhe/tiez-clipboard) 修改的**本地优先剪贴板管理器**。这是个人维护的独立分支，**不是 TieZ 原作者的官方版本**。

[English](./README.md) · [在本 fork 下载软件](https://github.com/MinsGoing/tiez-clipboard/releases)

## 保留的功能

- 自动记录文字、富文本、图片和文件路径
- 剪贴板历史搜索、置顶、多色标签、清理规则与顺序粘贴
- 全局快捷键、外观主题、明暗模式和敏感内容预览遮罩
- 本地数据存储、备份与导入
- 可在设置中**主动开启**的局域网文件传输

## 与原版的区别

这个分支已移除 **AI 助手**、**MQTT／验证码同步**、**WebDAV／云同步**的相关设置入口，并在后端禁用相应联网请求；同时停用原作者服务器的公告请求、匿名统计和自动更新功能。

**并非完全离线软件。** 主动启用局域网互传、打开网页、使用在线主题或预览远程内容时仍可能联网。此前已开启局域网服务的设置可能继续生效。

## 下载与安装

请从 **[MinsGoing/tiez-clipboard 的 Releases](https://github.com/MinsGoing/tiez-clipboard/releases)** 下载 Windows x64 安装包，不要从 TieZ 原作者官网获取本分支安装文件。

首个版本以 *Preview（预览版）* 发布，只有在 Windows 构建及自动化检查成功后才会提供安装包。此版本没有商业代码签名证书，安装时 Windows 可能出现未知发布者或 SmartScreen 提示；请先核对 Release 同时提供的 SHA-256 校验值。

程序标识为 `com.minsgoing.localclip`，与原版 TieZ 不同。

## 从源码构建（Windows）

需安装 Node.js 22、Rust stable、Microsoft C++ Build Tools、WebView2 及 Tauri 2 的 Windows 依赖。

```powershell
npm ci
npm run build
npm test
npx tauri build --config src-tauri/tauri.windows.conf.json
```

安装包输出目录：`src-tauri/target/release/bundle/nsis/`。

本版本源码位于 [`local-only-remove-sync-ai` 分支](https://github.com/MinsGoing/tiez-clipboard/tree/local-only-remove-sync-ai)。

## 隐私与数据

剪贴板历史保存在本机；升级后旧的云同步、AI 密钥等配置信息可能仍留在本地数据库，但已停用的服务不会再使用这些配置。建议按需检查防火墙设置。局域网传输服务在启用时会监听本地网络。

## 开源许可与原项目

基于 [jimuzhe 的 TieZ](https://github.com/jimuzhe/tiez-clipboard) 修改，保留原项目 **GPL-3.0** 许可证及版权声明。此 fork 与原作者无隶属关系。
