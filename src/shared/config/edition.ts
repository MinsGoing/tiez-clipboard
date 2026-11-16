/** A local-only fork: environment variables cannot re-enable cloud syncing. */
export type AppEdition = "local" | "cloud";
export const APP_EDITION: AppEdition = "local";
export const CLOUD_SYNC_ENABLED = false;
