import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { HeroFareCard } from "@/components/HeroFareCard";
import { WatchList } from "@/components/WatchList";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { popularRoutes } from "@/lib/routes-data";

export default function Landing() {
  useDocumentMeta(
    "Fairfare — Flight price alerts from Taipei (機票降價通知)",
    "Set a target price for routes out of Taipei. Fairfare watches the cheapest fares and emails you the moment one drops into your budget.",
  );
  const navigate = useNavigate();
  const [route, setRoute] = useState("");
  const [target, setTarget] = useState("6,500");

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
            <span className="size-1.5 rounded-full bg-brand" /> Watching 1,284 routes from TPE
          </div>
          <h1 className="mt-5 font-display text-[44px] font-bold leading-[1.02] sm:text-[54px]">
            Fly the fares you can actually afford.
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
            Set a target price for your favorite routes out of Taipei. We watch the calendar for you
            and email the moment the cheapest drop hits your budget.
          </p>
          <form
            className="mt-7 flex max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              navigate("/sign-up");
            }}
          >
            <input
              value={route}
              onChange={(e) => setRoute(e.target.value)}
              placeholder="TPE → BKK"
              aria-label="Route"
              className="flex-1 rounded-xl border border-border bg-card px-4 py-3 font-mono text-sm outline-none placeholder:text-muted-foreground focus:border-brand"
            />
            <input
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              aria-label="Target price in NT$"
              className="w-28 rounded-xl border border-border bg-card px-4 py-3 font-mono text-sm outline-none focus:border-brand"
            />
            <button className="whitespace-nowrap rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90">
              Get alerts
            </button>
          </form>
          <p className="mt-4 font-mono text-xs text-muted-foreground" id="pricing">
            Free for 3 routes · No card needed
          </p>
        </div>

        <div className="lg:col-span-7">
          <HeroFareCard />
        </div>
      </section>

      <section id="how" className="mx-auto max-w-6xl px-6 pb-14">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ["01", "Pick a route", "Anywhere out of Taipei — dates stay flexible."],
            ["02", "Set your budget", "Name the NT$ price you're happy to pay."],
            ["03", "Get the email", "We email the moment the cheapest fare hits it."],
          ].map(([n, title, body]) => (
            <div key={n} className="rounded-2xl bg-secondary/60 p-6 outline-1 -outline-offset-1 outline-border">
              <span className="font-mono text-xs font-semibold text-brand">{n}</span>
              <h2 className="mt-2 font-display text-lg font-semibold">{title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="routes" className="mx-auto max-w-6xl px-6 pb-24">
        <WatchList watches={popularRoutes} />
        <div className="mt-6 flex justify-center">
          <Link
            to="/sign-up"
            className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Start watching free
          </Link>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 sm:flex-row">
          <span className="font-display text-sm font-semibold">Fairfare · 機票降價通知</span>
          <span className="font-mono text-xs text-muted-foreground">
            Fares updated hourly · email alerts only
          </span>
        </div>
      </footer>
    </div>
  );
}
