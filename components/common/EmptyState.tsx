import { Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function EmptyState({ title = "Nothing here yet", message }: { title?: string; message?: string }) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-14 text-center">
        <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary">
          <Sparkles className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          {message || "New stories and updates will appear here soon."}
        </p>
      </CardContent>
    </Card>
  );
}
