# LocalClip — 本地化 TieZ fork

本项目是对 TieZ 原有源代码的直接修改，遵守 GPL-3.0 许可证；不是原作者的官方发行版。

## 修改范围

- 保留剪贴板历史、搜索、置顶、标签、快捷键、主题、数据管理等本地功能。
- 移除设置里的验证码/MQTT 同步、云端同步及 AI 助手入口。
- Rust 启动时不再启动 MQTT、云同步及网络恢复客户端。
- 后端拦截旧版的 MQTT/云同步/AI 相关设置和执行请求，防止原本的持久化设置重新开启这些服务。
- 移除向原作者服务器发送设备信息的匿名统计、公告轮询和自动更新检查；停用更新插件。
- 局域网文件传输仍可主动开启；该服务默认关闭，但旧版主动启用的配置仍可能使其随软件启动。
- 新的 Windows 应用标识：`com.minsgoing.localclip`，不会覆盖默认的 TieZ 程序。

## 本地构建

安装 Node.js、Rust 及 Tauri 2 的系统依赖（Windows 还需 WebView2、Windows Build Tools）后：

```bash
npm ci
npm run build
npm test
npm run lint
npm run tauri:dev
```

使用 `npm run tauri:build` 生成 Windows 安装包；输出位于 `src-tauri/target/release/bundle`。

## 安全性前提和局限

“默认不调用远程同步服务”并不等于离线沙箱或安全审计通过。用户开启局域网文件服务、访问外部链接、安装在线主题或预览外部内容时仍可能发生联网。旧版留下的云同步和 AI 凭据仍可能保存在本地数据库中（本分支不会用它们连接外部服务器），目的是避免自动破坏既有数据。部署前建议运行依赖审计和网络抓包，必要时通过防火墙限制联网。

## 后续维护

- Windows 应用选择器改用注册表 App Paths，不再执行 Get-StartApps；仅 UWP/MSIX 应用可能不会被枚举。
- 统一安装包、任务栏、系统托盘的高对比度 LocalClip 图标；构建时自动生成 PNG/ICO。
- 删除闲置 AI 联网实现及旧版同步/更新 UI，保留必要的兼容 IPC 拒绝接口。
- Windows 自启动计划任务、注册表及单实例消息改用独立 LocalClip 标识，不触及上游软件。
- 禁用原版在线主题商店下载；本地主题导入仍可用。
- 程序 exe 改名 `localclip.exe`。历史迁移数据标识因兼容性需要可能仍包含旧前缀。
