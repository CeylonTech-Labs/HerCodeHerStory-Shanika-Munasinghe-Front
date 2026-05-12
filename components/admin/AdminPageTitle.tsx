import { Button } from "../ui/button";
import Link from "next/link";

export function AdminPageTitle({ title, description, actionHref, actionLabel }: { title: string; description?: string; actionHref?: string; actionLabel?: string }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-3xl font-black">{title}</h1>
        {description ? <p className="mt-2 text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {actionHref && actionLabel ? <Button asChild><Link href={actionHref}>{actionLabel}</Link></Button> : null}
    </div>
  );
}
