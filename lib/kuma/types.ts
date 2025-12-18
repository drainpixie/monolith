// WARN: API definitions are approximate

export enum Status {
  DOWN = 0,
  UP = 1,
  PENDING = 2,
  MAINTENANCE = 3,
}

export interface KumaMonitor {
  id: number;
  url?: string;
  name: string;
  type?: string;
}

interface KumaStatusPagePublicGroupListData {
  id: number;
  name: string;
  weight: number;
  monitorList: KumaMonitor[];
}

export interface KumaStatusPageData {
  publicGroupList?: KumaStatusPagePublicGroupListData[];
}

export interface KumaHeartbeat {
  status: Status;
  time: string;
  msg?: string;
  ping?: number | null;
}

export interface KumaHeartbeatsResponse {
  heartbeatList: Record<string, KumaHeartbeat[]>;
  uptimeList: Record<string, number>;
}

export interface MonitorWithMetrics extends KumaMonitor {
  latestHeartbeat?: KumaHeartbeat;
  uptime24h?: number;
  currentStatus?: Status;
}
