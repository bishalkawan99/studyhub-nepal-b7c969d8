import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Bookmark, LogOut, ShieldCheck, Sparkles, Trophy, UserRound } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "My dashboard — StudyHub Nepal" },
      {
        name: "description",
        content: "Your saved chapters, MCQ scores and study profile on StudyHub Nepal.",
      },
      { property: "og:title", content: "My dashboard — StudyHub Nepal" },
      { property: "og:description", content: "Bookmarks, quiz history and profile settings." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const bookmarks = useQuery({
    queryKey: ["bookmarks", user?.id],
    enabled: Boolean(user),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookmarks")
        .select("id,label,href,created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const attempts = useQuery({
    queryKey: ["quiz_attempts", user?.id],
    enabled: Boolean(user),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("quiz_attempts")
        .select("id,score,total,class_level,subject_slug,created_at")
        .order("created_at", { ascending: false })
        .limit(10);
      if (error) throw error;
      return data;
    },
  });

  const best = (attempts.data ?? []).reduce(
    (acc, a) => Math.max(acc, Math.round((a.score / Math.max(a.total, 1)) * 100)),
    0,
  );

  const signOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate({ to: "/auth", replace: true });
  };

  return (
    <main className="hero-surface min-h-screen">
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-14 lg:px-8">
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:flex-wrap sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
              <UserRound className="h-6 w-6" />
            </span>
            <div className="min-w-0">
              <h1 className="truncate font-display text-2xl font-extrabold sm:text-3xl">
                {user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Student"}
              </h1>
              <p className="truncate text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {isAdmin && (
              <Link
                to="/admin"
                className="inline-flex items-center gap-2 rounded-full brand-gradient px-4 py-2 text-xs font-semibold text-primary-foreground"
              >
                <ShieldCheck className="h-4 w-4" /> Admin
              </Link>
            )}
            <button
              onClick={signOut}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </header>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Saved chapters", value: bookmarks.data?.length ?? 0, icon: Bookmark },
            { label: "Quizzes taken", value: attempts.data?.length ?? 0, icon: Sparkles },
            { label: "Best score", value: `${best}%`, icon: Trophy },
          ].map((s) => (
            <article key={s.label} className="lift rounded-2xl border border-border bg-card p-6">
              <s.icon className="h-5 w-5 text-primary" />
              <p className="mt-3 font-display text-3xl font-extrabold">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-display text-lg font-bold">Bookmarked chapters</h2>
            {bookmarks.data?.length ? (
              <ul className="mt-4 space-y-2">
                {bookmarks.data.map((b) => (
                  <li
                    key={b.id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-3"
                  >
                    <a
                      href={b.href}
                      className="min-w-0 truncate text-sm font-medium hover:text-primary"
                    >
                      {b.label}
                    </a>
                    <button
                      onClick={async () => {
                        await supabase.from("bookmarks").delete().eq("id", b.id);
                        void bookmarks.refetch();
                      }}
                      className="shrink-0 text-xs text-muted-foreground hover:text-destructive"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">
                Nothing saved yet — open any subject and tap the bookmark icon.
              </p>
            )}
          </section>

          <section className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-display text-lg font-bold">Recent MCQ attempts</h2>
            {attempts.data?.length ? (
              <ul className="mt-4 space-y-2">
                {attempts.data.map((a) => (
                  <li
                    key={a.id}
                    className="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm"
                  >
                    <span className="min-w-0 truncate">
                      {a.subject_slug
                        ? `${a.subject_slug} · Class ${a.class_level}`
                        : "Mixed practice"}
                    </span>
                    <span className="shrink-0 font-semibold text-primary">
                      {a.score}/{a.total}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">
                No attempts yet.{" "}
                <Link to="/mcqs" className="text-primary hover:underline">
                  Start a practice quiz
                </Link>
                .
              </p>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}
