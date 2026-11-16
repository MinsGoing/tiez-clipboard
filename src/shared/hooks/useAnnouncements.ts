import type { Announcement } from "../types/announcement";

/** Historical test utility; the local-only application never calls this helper. */
export function buildPingUrl(pingUrl: string, version: string, pingId: string | null): string {
  const url = new URL(pingUrl);
  if (pingId) url.searchParams.set("id", pingId);
  url.searchParams.set("v", version);
  return url.toString();
}

/** No remote announcements, background HTTP requests, or device tracking. */
export function useAnnouncements() {
  const announcements: Announcement[] = [];
  return {
    announcements,
    loading: false,
    dismissAnnouncement: async (_id: string): Promise<void> => {},
    refetch: async (): Promise<void> => {}
  };
}
