import { Link, useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthUser } from "@/components/RequireAuth";
import { WatchList } from "@/components/WatchList";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { popularRoutes, type FareWatch } from "@/lib/routes-data";

export default function Dashboard() {
  useDocumentMeta(
    "Your fare alerts — Fairfare",
    "Manage the Taipei routes you watch and the target price for each fare alert.",
  );
  const user = useAuthUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [watches, setWatches] = useState<FareWatch[]>(popularRoutes);
  const [adding, setAdding] = useState(false);
  const [destination, setDestination] = useState("");
  const [target, setTarget] = useState("");

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate("/sign-in", { replace: true });
  }

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const code = destination.trim().toUpperCase();
    const price = Number(target.replace(/[^0-9]/g, ""));
    if (!code || !price) return;
    setWatches((prev) => [
      ...prev,
      {
        id: `${code}-${prev.length}`,
        code: `TPE → ${code}`,
        city: code,
        target: price,
        current: Math.round(price * 1.08),
        progress: 55,
        status: "watching",
      },
    ]);
    setDestination("");
    setTarget("");
    setAdding(false);
  }

  return (
    <div className="min-h-screen bg-secondary/40">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-xl bg-brand font-display text-lg font-bold text-brand-foreground">
              F
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">Fairfare</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden font-mono text-xs text-muted-foreground sm:inline">
              {user.email}
            </span>
            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium hover:bg-secondary"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="font-display text-3xl font-bold">Your fare alerts</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Taipei departures only. We email you the moment a cheapest fare hits your target.
        </p>

        <div className="mt-8">
          <WatchList watches={watches} onAdd={() => setAdding((v) => !v)} />
        </div>

        {adding ? (
          <form
            onSubmit={handleAdd}
            className="mt-5 flex flex-col gap-3 rounded-3xl bg-card p-6 outline-1 -outline-offset-1 outline-border sm:flex-row sm:items-end"
          >
            <label className="flex-1">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Destination airport
              </span>
              <input
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="HND"
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 font-mono text-sm outline-none focus:border-brand"
              />
            </label>
            <label className="sm:w-40">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Target NT$
              </span>
              <input
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="8,000"
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 font-mono text-sm outline-none focus:border-brand"
              />
            </label>
            <button className="rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90">
              Add route
            </button>
          </form>
        ) : null}
      </main>
    </div>
  );
}
