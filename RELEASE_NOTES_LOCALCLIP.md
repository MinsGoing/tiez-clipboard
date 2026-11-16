# LocalClip v1.0.0 Preview 2（Windows x64）

本版本为独立维护的本地优先剪贴板管理器，非原作者官方发布。

- 新增深蓝背景、青绿色剪贴板的高对比度图标，并统一托盘、任务栏和安装包图标。
- 已安装程序列表改用 Windows 注册表 App Paths，移除 Get-StartApps PowerShell 枚举。
- 自启动注册表、管理员计划任务、单实例消息与可执行文件名均独立为 LocalClip，避免与原版冲突。
- 删除闲置的 AI 网络执行器、同步设置页面、旧版更新界面以及旧版发布工作流。
- 在线主题商店网络下载已关闭，保留本地主题文件安装。
- 清理软件界面及 README 中的原版品牌文案。

仍保留本地剪贴板历史、搜索、置顶、标签、快捷键、局域网互传等功能。软件并非离线沙箱；用户主动打开外部网址和局域网传输时仍可能联网。部分 UWP/MSIX 应用可能不出现在新应用列表中。

安装包无商业代码签名，请核对同一 Release 的 SHA-256 文件。

原项目和 GPL-3.0 许可说明见 [README](https://github.com/MinsGoing/tiez-clipboard/tree/local-only-remove-sync-ai)。
