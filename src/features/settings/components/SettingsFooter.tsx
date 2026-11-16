import { Github, RotateCcw } from "lucide-react";
import { openUrl } from "@tauri-apps/plugin-opener";
import type { ReleaseChannel } from "../../../shared/lib/releaseBuild";

interface SettingsFooterProps {
    expanded?: boolean;
    t: (key: string) => string;
    appVersion: string;
    releaseChannel: ReleaseChannel;
    portable: boolean;
    updateStatus: string;
    setUpdateStatus: (val: string) => void;
    onResetSettings: () => void;
    emailCopied: boolean;
    setEmailCopied: (val: boolean) => void;
}

const SettingsFooter = ({ t, appVersion, onResetSettings }: SettingsFooterProps) => (
    <section className="settings-about" aria-label={t("settings_about")}>
        <header className="settings-about-header">
            <div className="settings-about-identity"><h2>LocalClip</h2></div>
            <p className="settings-about-description">
                本地剪贴板管理器。不会自动连接原作者的公告、统计、更新、MQTT、云同步或 AI 服务。
            </p>
        </header>
        <div className="settings-about-version">
            <span>LocalClip {appVersion ? `v${appVersion}` : ""}</span>
        </div>
        <div className="settings-about-resources">
            <p>基于 GPL-3.0 许可的开源项目修改；此版本独立维护，非原作者官方发行。</p>
            <button type="button" className="settings-about-link"
                onClick={() => void openUrl("https://github.com/MinsGoing/tiez-clipboard")}>
                <Github size={18} aria-hidden="true" />
                <span>查看本 fork 的源代码</span>
            </button>
        </div>
        <div className="settings-about-reset">
            <button type="button" className="settings-action-button" onClick={onResetSettings}>
                <RotateCcw size={14} aria-hidden="true" />
                <span>{t("reset_defaults")}</span>
            </button>
        </div>
    </section>
);
export default SettingsFooter;
