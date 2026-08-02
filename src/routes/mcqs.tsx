import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Clock, RotateCcw, Trophy, XCircle } from "lucide-react";
import { toast } from "sonner";
import { mcqBank, leaderboard } from "@/lib/study-data";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/mcqs")({
  head: () => ({
    meta: [
      { title: "MCQ Practice with Timer — StudyHub Nepal" },
      {
        name: "description",
        content:
          "Timed MCQ practice for NEB Class 11 and 12 with instant results, explanations and leaderboard.",
      },
      { property: "og:title", content: "MCQ Practice with Timer — StudyHub Nepal" },
      {
        property: "og:description",
        content: "Attempt quizzes, see your score instantly and review answers.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/mcqs" },
      { property: "og:site_name", content: "StudyHub Nepal" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/mcqs" }],
  }),
  component: McqPage,
});

const DURATION = 180;

function McqPage() {
  const { user } = useAuth();
  const [started, setStarted] = useState(false);

  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(mcqBank.map(() => null));
  const [time, setTime] = useState(DURATION);

  useEffect(() => {
    if (!started || finished) return;
    const id = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          setFinished(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [started, finished]);

  const score = answers.filter((a, i) => a === mcqBank[i].answer).length;
  const answered = answers.filter((a) => a !== null).length;

  useEffect(() => {
    if (!finished || !user) return;
    void supabase
      .from("quiz_attempts")
      .insert({
        user_id: user.id,
        score,
        total: mcqBank.length,
        class_level: "11",
        subject_slug: null,
      })
      .then(({ error }) => {
        if (!error) toast.success("Attempt saved to your dashboard");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished, user?.id]);

  function reset() {
    setAnswers(mcqBank.map(() => null));
    setTime(DURATION);
    setFinished(false);
    setStarted(true);
  }

  return (
    <main className="hero-surface">
      <section className="mx-auto max-w-7xl px-4 pt-14 lg:px-8">
        <h1 className="font-display text-4xl font-extrabold sm:text-5xl">MCQ Practice</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          A mixed set of NEB-style multiple choice questions. Beat the timer, get your score
          instantly and review every answer with an explanation.
        </p>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
        <div className="rounded-3xl border border-border bg-card p-6">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
            <div className="min-w-0">
              <p className="text-sm font-bold">Mixed Quiz · {mcqBank.length} questions</p>
              <p className="text-xs text-muted-foreground">
                Answered {answered} of {mcqBank.length}
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary">
              <Clock className="h-4 w-4" />
              {String(Math.floor(time / 60)).padStart(2, "0")}:{String(time % 60).padStart(2, "0")}
            </span>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full brand-gradient transition-all"
              style={{ width: `${(answered / mcqBank.length) * 100}%` }}
            />
          </div>

          {!started ? (
            <button
              onClick={() => setStarted(true)}
              className="mt-8 inline-flex rounded-full brand-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-105"
            >
              Start quiz
            </button>
          ) : (
            <>
              <ol className="mt-8 space-y-6">
                {mcqBank.map((item, qi) => (
                  <li key={qi} className="rounded-2xl border border-border p-5 animate-fade-up">
                    <p className="text-sm font-semibold">
                      {qi + 1}. {item.q}
                    </p>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {item.options.map((opt, oi) => {
                        const selected = answers[qi] === oi;
                        const correct = finished && oi === item.answer;
                        const wrong = finished && selected && oi !== item.answer;
                        return (
                          <button
                            key={oi}
                            disabled={finished}
                            onClick={() => setAnswers((a) => a.map((v, i) => (i === qi ? oi : v)))}
                            className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-left text-sm transition-colors ${
                              correct
                                ? "border-accent bg-accent/10 text-accent"
                                : wrong
                                  ? "border-destructive bg-destructive/10 text-destructive"
                                  : selected
                                    ? "border-primary bg-primary/10 text-primary"
                                    : "border-border text-muted-foreground hover:bg-muted"
                            }`}
                          >
                            {finished && correct && <CheckCircle2 className="h-4 w-4 shrink-0" />}
                            {wrong && <XCircle className="h-4 w-4 shrink-0" />}
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                    {finished && (
                      <p className="mt-3 text-xs text-muted-foreground">
                        <span className="font-semibold text-accent">Why:</span> {item.why}
                      </p>
                    )}
                  </li>
                ))}
              </ol>

              <div className="mt-8 flex flex-wrap gap-3">
                {!finished ? (
                  <button
                    onClick={() => setFinished(true)}
                    className="rounded-full brand-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft"
                  >
                    Submit answers
                  </button>
                ) : (
                  <div className="flex flex-wrap items-center gap-4">
                    <p className="rounded-full bg-accent/15 px-4 py-2 text-sm font-bold text-accent">
                      Score: {score}/{mcqBank.length} ({Math.round((score / mcqBank.length) * 100)}
                      %)
                    </p>
                    <button
                      onClick={reset}
                      className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-sm font-semibold hover:bg-muted"
                    >
                      <RotateCcw className="h-4 w-4" /> Try again
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <aside className="h-max rounded-3xl border border-border bg-card p-6 lg:sticky lg:top-24">
          <h2 className="flex items-center gap-2 text-sm font-bold">
            <Trophy className="h-4 w-4 text-accent" /> Leaderboard
          </h2>
          <ul className="mt-4 space-y-3">
            {leaderboard.map((l, i) => (
              <li key={l.name} className="flex items-center justify-between gap-3 text-sm">
                <span className="flex min-w-0 items-center gap-3">
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold">
                    {i + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-medium">{l.name}</span>
                    <span className="block text-[11px] text-muted-foreground">{l.place}</span>
                  </span>
                </span>
                <span className="shrink-0 font-semibold text-primary">{l.score}%</span>
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </main>
  );
}
