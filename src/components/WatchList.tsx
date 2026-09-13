import { formatNtd, statusLabel, type FareWatch } from "@/lib/routes-data";

const barTone: Record<FareWatch["status"], string> = {
  "in-budget": "bg-sage",
  almost: "bg-accent",
  watching: "bg-brand",
};

const labelTone: Record<FareWatch["status"], string> = {
  "in-budget": "text-sage font-semibold",
  almost: "text-accent font-semibold",
  watching: "text-muted-foreground",
};

export function WatchList({
  watches,
  onAdd,
}: {
  watches: FareWatch[];
  onAdd?: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-soft)] outline-1 -outline-offset-1 outline-border">
      <div className="flex items-center justify-between border-b border-border bg-secondary/60 px-6 py-4">
        <div className="flex items-center gap-2 font-display text-sm font-semibold">
          <span className="size-2 rounded-full bg-sage" /> Your alerts
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-muted-foreground">{watches.length} active</span>
          {onAdd ? (
            <button
              type="button"
              onClick={onAdd}
              className="rounded-lg bg-brand px-3 py-1.5 text-xs font-semibold text-brand-foreground hover:opacity-90"
            >
              + Add route
            </button>
          ) : null}
        </div>
      </div>

      {watches.length === 0 ? (
        <div className="px-6 py-14 text-center">
          <p className="font-display text-base font-semibold">No routes watched yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Add a route out of Taipei and a target price — we email you when a fare drops to it.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {watches.map((watch) => (
            <div key={watch.id} className="flex flex-wrap items-center gap-4 px-6 py-5">
              <div className="w-36 font-mono text-sm font-semibold">{watch.code}</div>
              <div className="hidden w-32 font-mono text-xs text-muted-foreground sm:block">
                Target {formatNtd(watch.target)}
              </div>
              <div className="h-1.5 min-w-24 flex-1 overflow-hidden rounded-full bg-border">
                <div
                  className={`h-full ${barTone[watch.status]}`}
                  style={{ width: `${watch.progress}%` }}
                />
              </div>
              <div className="w-24 text-right font-display text-lg font-bold">
                {formatNtd(watch.current)}
              </div>
              <span className={`w-20 text-right font-mono text-xs ${labelTone[watch.status]}`}>
                {statusLabel[watch.status]}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
