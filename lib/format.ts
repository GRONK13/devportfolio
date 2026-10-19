const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2025-10" → "Oct 2025", "2021" → "2021", "present" → "Present". */
export function formatYearMonth(value: string): string {
  if (value === "present") return "Present";
  const [year, month] = value.split("-");
  return month ? `${MONTHS[Number(month) - 1]} ${year}` : (year ?? value);
}

/** "2024-10-22" → "Oct 22, 2024". Parsed by hand so the server's time zone can't shift the day. */
export function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-");
  return `${MONTHS[Number(month) - 1]} ${Number(day)}, ${year}`;
}

/** Two-digit index for mono labels: 1 → "01". */
export const pad = (n: number) => String(n).padStart(2, "0");
