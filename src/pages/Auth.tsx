import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

export default function AuthPage({ mode }: { mode: "signin" | "signup" }) {
  useDocumentMeta(
    "Sign in — Fairfare flight price alerts",
    "Sign in or create a Fairfare account to manage your Taipei flight price alerts.",
  );
  const navigate = useNavigate();
  const isSignUp = mode === "signup";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/app", { replace: true });
    });
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setMessage(null);

    if (isSignUp) {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/app` },
      });
      setBusy(false);
      if (signUpError) return setError(signUpError.message);
      if (!data.session) {
        return setMessage("Check your inbox to confirm your email, then sign in.");
      }
      navigate("/app");
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (signInError) return setError(signInError.message);
    navigate("/app");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/50 px-6 py-16">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2">
          <span className="grid size-9 place-items-center rounded-xl bg-brand font-display text-lg font-bold text-brand-foreground">
            F
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">Fairfare</span>
        </Link>

        <div className="mt-6 rounded-3xl bg-card p-7 shadow-[var(--shadow-soft)] outline-1 -outline-offset-1 outline-border">
          <h1 className="font-display text-2xl font-bold">
            {isSignUp ? "Create your account" : "Welcome back"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {isSignUp
              ? "Free for 3 routes. We only email you when a fare drops."
              : "Sign in to manage your fare alerts."}
          </p>

          <form className="mt-6 space-y-3" onSubmit={handleSubmit}>
            <label className="block">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Email
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand"
              />
            </label>
            <label className="block">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Password
              </span>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand"
              />
            </label>

            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            {message ? <p className="text-sm text-sage">{message}</p> : null}

            <button
              disabled={busy}
              className="w-full rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60"
            >
              {busy ? "Please wait…" : isSignUp ? "Create account" : "Sign in"}
            </button>
          </form>

          <button
            type="button"
            onClick={() => {
              setError(null);
              setMessage(null);
              navigate(isSignUp ? "/sign-in" : "/sign-up", { replace: true });
            }}
            className="mt-5 w-full text-sm text-muted-foreground hover:text-foreground"
          >
            {isSignUp ? "Already have an account? Sign in" : "New here? Create an account"}
          </button>
        </div>
      </div>
    </div>
  );
}
