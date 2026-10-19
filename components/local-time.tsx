"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 15_000);
  return () => clearInterval(id);
}

/** Live clock in the given time zone. Renders a placeholder on the server so hydration never mismatches. */
export function LocalTime({ timeZone }: { timeZone: string }) {
  const time = useSyncExternalStore(
    subscribe,
    () => new Intl.DateTimeFormat("en-US", { timeZone, hour: "numeric", minute: "2-digit" }).format(new Date()),
    () => null,
  );
  const offset = useSyncExternalStore(
    subscribe,
    () => describeOffset(timeZone),
    () => null,
  );

  return (
    <>
      <p className="font-display text-4xl font-semibold tabular-nums tracking-tight" suppressHydrationWarning>
        {time ?? "--:--"}
      </p>
      <p className="mt-1 text-sm text-muted">{offset ?? " "}</p>
    </>
  );
}

function zoneOffsetMinutes(timeZone: string, date: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).formatToParts(date);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  const asUtc = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"));
  return Math.round((asUtc - date.getTime()) / 60_000);
}

function describeOffset(timeZone: string) {
  const now = new Date();
  const diff = (zoneOffsetMinutes(timeZone, now) + now.getTimezoneOffset()) / 60;
  if (Math.abs(diff) < 0.25) return "Same time zone as you";
  const hours = Math.abs(diff) % 1 === 0 ? Math.abs(diff) : Math.abs(diff).toFixed(1);
  return `${hours}h ${diff > 0 ? "ahead of" : "behind"} you`;
}
