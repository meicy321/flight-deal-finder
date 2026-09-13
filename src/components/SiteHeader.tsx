import { Link } from "@tanstack/react-router";
import { useSession } from "@/hooks/useSession";

export function SiteHeader() {
  const { session } = useSession();

  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-6 pt-7">
      <Link to="/" className="flex items-center gap-2">
        <span className="grid size-9 place-items-center rounded-xl bg-brand font-display text-lg font-bold text-brand-foreground">
          F
        </span>
        <span className="font-display text-lg font-semibold tracking-tight">Fairfare</span>
      </Link>
      <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
        <a href="#how" className="hover:text-foreground">
          How it works
        </a>
        <a href="#routes" className="hover:text-foreground">
          Routes
        </a>
        <a href="#pricing" className="hover:text-foreground">
          Pricing
        </a>
      </nav>
      <div className="flex items-center gap-3">
        {session ? (
          <>
            <Link to="/dashboard" className="text-sm font-medium hover:opacity-70">
              Your alerts
            </Link>
            <span className="hidden font-mono text-xs text-muted-foreground sm:inline">
              {session.user.email}
            </span>
          </>
        ) : (
          <>
            <Link to="/auth" className="text-sm font-medium hover:opacity-70">
              Sign in
            </Link>
            <Link
              to="/auth"
              search={{ mode: "signup" }}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Start free
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
