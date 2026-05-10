import { Badge } from "../ui/badge";

export function StatusBadge({ status }: { status?: string | null }) {
  const value = status || "UNKNOWN";
  const variant = value.includes("PUBLISHED") || value.includes("APPROVED") || value.includes("REPLIED") ? "cyan" : value.includes("DRAFT") || value.includes("PENDING") || value.includes("NEW") ? "secondary" : "outline";
  return <Badge variant={variant as "cyan" | "secondary" | "outline"}>{value}</Badge>;
}
