import { MonitorWithMetrics } from "@/lib/kuma/types";
import {
  statusText,
  statusColorClasses,
  formatPercent,
} from "@/lib/kuma/utils";

interface MonitorItemProps {
  monitor: MonitorWithMetrics;
}

export default function MonitorItem({ monitor }: MonitorItemProps) {
  const { text, bg } = statusColorClasses(monitor.currentStatus);
  const latest = monitor.latestHeartbeat;

  const parts: string[] = [];

  if (latest?.msg) parts.push(latest.msg);
  if (typeof latest?.ping === "number") parts.push(`${latest.ping} ms`);

  const details = parts.length ? parts.join(" · ") : "—";

  return (
    <li className="[&>*]:mr-2 text-nowrap">
      <span className="font-body italic">
        {monitor.url ? (
          <a
            href={monitor.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {monitor.name}
          </a>
        ) : (
          monitor.name
        )}
      </span>

      {monitor.type && (
        <span className="text-accent text-xs flex-shrink-0">
          {monitor.type}
        </span>
      )}

      <span
        title={`Service is currently ${statusText(monitor.currentStatus).toLowerCase()}`}
        className={`badge ${text} ${bg}`}
      >
        {statusText(monitor.currentStatus)}
      </span>

      <span
        title="Latest heartbeat"
        className="text-accent text-xs overflow-hidden text-ellipsis flex-1"
      >
        {details}
      </span>

      <span
        title="Uptime for the last 24 hours"
        className="text-foreground text-xs flex-shrink-0"
      >
        {formatPercent(monitor.uptime24h)}
      </span>
    </li>
  );
}
