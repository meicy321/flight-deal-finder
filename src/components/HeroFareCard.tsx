export function HeroFareCard() {
  const bars = [24, 36, 28, 44, 48, 32, 40, 48];

  return (
    <div className="relative h-[460px]">
      <div className="absolute left-0 top-10 h-56 w-[340px] -rotate-3 rounded-2xl bg-card/70 opacity-70 outline-1 -outline-offset-1 outline-border" />
      <div className="absolute left-14 top-20 h-56 w-[340px] -rotate-1 rounded-2xl bg-card opacity-90 shadow-[var(--shadow-card)] outline-1 -outline-offset-1 outline-border" />
      <div className="absolute left-6 top-16 w-[360px] rotate-1 rounded-2xl bg-card p-6 shadow-[var(--shadow-card)] outline-1 -outline-offset-1 outline-border sm:left-28">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-muted-foreground">TPE → BKK</span>
          <span className="rounded-md bg-accent/15 px-2 py-0.5 font-mono text-[11px] font-semibold text-accent">
            ALERT
          </span>
        </div>
        <div className="mt-4 flex items-end gap-3">
          <span className="font-display text-4xl font-bold">NT$6,420</span>
          <span className="mb-1.5 font-mono text-xs text-muted-foreground line-through">6,890</span>
          <span className="mb-1.5 font-mono text-xs font-semibold text-sage">−6.8%</span>
        </div>
        <div className="mt-5 flex h-12 items-end gap-1.5">
          {bars.map((h, i) => (
            <div
              key={i}
              className={`w-5 rounded-t ${i === 4 ? "bg-accent" : "bg-brand/35"}`}
              style={{ height: `${h}px` }}
            />
          ))}
        </div>
        <div className="mt-5 flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <span className="size-2 rounded-full bg-sage" /> Dropped to your target — Tue, 14:32
        </div>
      </div>
    </div>
  );
}
