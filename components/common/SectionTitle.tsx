import { cn } from "@/lib/utils";

export function SectionTitle({
  eyebrow,
  title,
  description,
  className
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-8 max-w-3xl", className)}>
      {eyebrow ? <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-primary">{eyebrow}</p> : null}
      <h2 className="text-3xl font-black tracking-normal text-slate-950 dark:text-white md:text-5xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-muted-foreground md:text-lg">{description}</p> : null}
    </div>
  );
}
