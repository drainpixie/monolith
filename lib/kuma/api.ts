import "server-only";

import {
  KumaMonitor,
  KumaStatusPageData,
  KumaHeartbeatsResponse,
  MonitorWithMetrics,
} from "./types";

import { getLatestHeartbeat } from "./utils";

export async function fetchStatusPageMonitors(baseURL: string, slug: string) {
  const res = await fetch(`${baseURL}/api/status-page/${slug}`, {
    cache: "no-store",
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Failed to fetch status page: ${res.status} ${res.statusText} ${text}`,
    );
  }

  const data: KumaStatusPageData = await res.json();

  const monitors: KumaMonitor[] = [];
  const groups = data.publicGroupList ?? [];

  for (const group of groups)
    for (const monitor of group.monitorList ?? [])
      if (typeof monitor.id === "number") monitors.push(monitor);

  return monitors;
}

export async function fetchHeartbeats(
  baseURL: string,
  slug: string,
): Promise<KumaHeartbeatsResponse> {
  const res = await fetch(`${baseURL}/api/status-page/heartbeat/${slug}`, {
    cache: "no-store",
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Failed to fetch heartbeats: ${res.status} ${res.statusText} ${text}`,
    );
  }

  return res.json();
}

export async function fetchMonitorsWithMetrics(): Promise<
  MonitorWithMetrics[]
> {
  const baseURL = process.env.KUMA_URL;
  const slug = process.env.KUMA_SLUG;

  if (!baseURL) throw new Error("KUMA_URL environment variable is not set");
  if (!slug) throw new Error("KUMA_SLUG environment variable is not set");

  const [monitors, heartbeats] = await Promise.all([
    fetchStatusPageMonitors(baseURL, slug),
    fetchHeartbeats(baseURL, slug),
  ]);

  return monitors.map((m) => {
    const idStr = String(m.id);
    const hbList = heartbeats.heartbeatList?.[idStr] || [];
    const latest = getLatestHeartbeat(hbList);
    const uptime24h = heartbeats.uptimeList?.[`${m.id}_24`];
    const currentStatus = latest?.status;

    return {
      ...m,
      latestHeartbeat: latest,
      uptime24h,
      currentStatus,
    };
  });
}
