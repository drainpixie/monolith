import { KumaHeartbeat, Status } from "./types";

interface StatusColour {
  text: string;
  bg: string;
}

const STATUS_COLOURS: Record<Status, StatusColour> = {
  [Status.UP]: {
    text: "text-green-700",
    bg: "bg-green-100",
  },
  [Status.DOWN]: {
    text: "text-red-700",
    bg: "bg-red-100",
  },
  [Status.MAINTENANCE]: {
    text: "text-orange-600",
    bg: "bg-orange-100",
  },
  [Status.PENDING]: {
    text: "text-gray-600",
    bg: "bg-gray-200",
  },
};

const DEFAULT_COLOURS: StatusColour = {
  text: "text-gray-600",
  bg: "bg-gray-200",
};

export function statusText(status?: number) {
  return typeof status === "number" && Status[status] !== undefined
    ? Status[status]
    : "UNKNOWN";
}

export function statusColorClasses(status?: Status): StatusColour {
  return status !== undefined && status in STATUS_COLOURS
    ? STATUS_COLOURS[status]
    : DEFAULT_COLOURS;
}

export function getLatestHeartbeat(
  list?: KumaHeartbeat[],
): KumaHeartbeat | undefined {
  if (!list || list.length === 0) return undefined;

  return list.reduce((latest, curr) =>
    new Date(curr.time).getTime() > new Date(latest.time).getTime()
      ? curr
      : latest,
  );
}

export function formatPercent(value?: number) {
  if (value == undefined || Number.isNaN(value)) return "—";
  return `${(value * 100).toFixed(2)}%`;
}
