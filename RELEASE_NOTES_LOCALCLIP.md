# LocalClip 1.0.0 Preview 1 — Windows x64

这是从 TieZ 修改的独立本地版预览构建，非原作者官方发行版。此 Release 的安装包由本 fork 的 GitHub Actions 在 Windows 环境构建并附加 SHA-256 校验文件。

**主要功能**
- 本地剪贴板历史、搜索、置顶、标签、快捷键及多种主题
- 可选局域网文件互传和本地数据管理

**此版移除**
- AI 助手及其外部服务请求
- MQTT 验证码同步与 WebDAV 云同步
- 原作者服务器公告与匿名统计、自动更新检查

**安装提示**
- Windows x64 安装包，无商业代码签名证书；可能触发 SmartScreen/未知发布者提示
- 不保证完全离线，局域网传输及用户主动访问的外部资源仍可联网
- 旧版同步配置可能留在本地数据库，但不再自动连接远程服务

**项目与许可：** [源代码](https://github.com/MinsGoing/tiez-clipboard/tree/local-only-remove-sync-ai) · 基于 [TieZ](https://github.com/jimuzhe/tiez-clipboard)，GPL-3.0。
