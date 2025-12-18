import { MonitorWithMetrics } from "@/lib/kuma/types";
import { fetchMonitorsWithMetrics } from "@/lib/kuma/api";
import { default as MonitorItem } from "@/components/monitor-item";

export default async function MonitorsPage() {
  let monitors: MonitorWithMetrics[] = [];
  let error: string | null = null;

  try {
    monitors = await fetchMonitorsWithMetrics();
  } catch (e: unknown) {
    if (e instanceof Error) error = e.message;
    else error = "Unknown error";
  }

  return (
    <div className="flex flex-col gap-4">
      <p>A status overview of services I self-host.</p>

      {error ? (
        <div className="p-2 border border-red-300 bg-red-100 text-red-800 rounded-md">
          <p>Failed to load monitors: {error}</p>
        </div>
      ) : monitors.length === 0 ? (
        <p>No monitors found.</p>
      ) : (
        <ul>
          {monitors.map((monitor, idx) => (
            <MonitorItem
              key={`${monitor.id ?? "idx"}-${idx}`}
              monitor={monitor}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
