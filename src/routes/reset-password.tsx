import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { KeyRound, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Reset password — StudyHub Nepal" },
      { name: "description", content: "Set a new administrator password for StudyHub Nepal." },
      { property: "og:title", content: "Reset password — StudyHub Nepal" },
      { property: "og:description", content: "Set a new administrator password." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  ssr: false,
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const [ready, setReady] = useState(false);
  const [hasSession, setHasSession] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let active = true;
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      setHasSession(!!session);
      setReady(true);
    });
    void supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setHasSession(!!data.session);
      setReady(true);
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 8) {
      toast.error("Use at least 8 characters");
      return;
    }
    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setDone(true);
    toast.success("Password updated");
  }

  return (
    <main className="hero-surface grid min-h-[80vh] place-items-center px-4 py-16">
      <div className="glass w-full max-w-sm rounded-3xl p-8 shadow-soft">
        <KeyRound className="h-7 w-7 text-primary" />
        <h1 className="mt-4 font-display text-xl font-extrabold">Set a new password</h1>

        {!ready ? (
          <Loader2 className="mt-6 h-5 w-5 animate-spin text-primary" />
        ) : done ? (
          <>
            <p className="mt-2 text-sm text-muted-foreground">
              Your password has been updated. You can now sign in.
            </p>
            <Link
              to="/admin"
              className="mt-6 inline-flex rounded-full brand-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Go to sign in
            </Link>
          </>
        ) : !hasSession ? (
          <>
            <p className="mt-2 text-sm text-muted-foreground">
              This reset link is invalid or has expired. Request a new one from the sign in
              page.
            </p>
            <Link
              to="/admin"
              className="mt-6 inline-flex rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold"
            >
              Back to sign in
            </Link>
          </>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="new-password" className="text-xs font-semibold">
                New password
              </label>
              <input
                id="new-password"
                type="password"
                required
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="text-xs font-semibold">
                Confirm password
              </label>
              <input
                id="confirm-password"
                type="password"
                required
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
            <button
              disabled={busy}
              className="flex w-full items-center justify-center gap-2 rounded-full brand-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft disabled:opacity-60"
            >
              {busy && <Loader2 className="h-4 w-4 animate-spin" />} Update password
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
