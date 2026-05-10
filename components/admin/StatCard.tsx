import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export function StatCard({ title, value, icon: Icon }: { title: string; value: number | string; icon: LucideIcon; tone?: string }) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-5">
        <div className="rounded-lg bg-primary/10 p-3 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-black">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
