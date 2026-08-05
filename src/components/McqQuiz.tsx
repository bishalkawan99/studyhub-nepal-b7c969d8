import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Loader2,
  RotateCcw,
  Shuffle,
  XCircle,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  difficulties,
  difficultyLabel,
  normalizeOptions,
  shuffle,
  type Difficulty,
  type McqRow,
} from "@/lib/mcq";

type Props = {
  classId: string;
  subjectSlug: string;
  /** Exact chapter name to filter on, or null for the whole subject (random mode). */
  chapter: string | null;
  heading: string;
};

const SECONDS_PER_QUESTION = 60;

export function McqQuiz({ classId, subjectSlug, chapter, heading }: Props) {
  const [difficulty, setDifficulty] = useState<Difficulty | "all">("all");
  const [shuffled, setShuffled] = useState(true);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [time, setTime] = useState(0);
  const [seed, setSeed] = useState(0);

  const query = useQuery({
    queryKey: ["mcqs", classId, subjectSlug, chapter, difficulty],
    queryFn: async (): Promise<McqRow[]> => {
      let builder = supabase
        .from("mcq_questions")
        .select("id,question,options,correct_index,explanation,chapter,difficulty")
        .eq("class_level", classId)
        .eq("subject_slug", subjectSlug)
        .eq("is_published", true)
        .limit(100);
      if (chapter) builder = builder.eq("chapter", chapter);
      if (difficulty !== "all") builder = builder.eq("difficulty", difficulty);
      const { data, error } = await builder;
      if (error) throw error;
      return (data ?? []).map((row) => ({
        id: row.id,
        question: row.question,
        options: normalizeOptions(row.options),
        correct_index: row.correct_index,
        explanation: row.explanation,
        chapter: row.chapter,
        difficulty: row.difficulty,
      }));
    },
  });

  const questions = useMemo(() => {
    const rows = query.data ?? [];
    // seed forces a fresh order on restart
    void seed;
    return shuffled ? shuffle(rows) : rows;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.data, shuffled, seed]);

  const total = questions.length;

  const restart = useCallback(() => {
    setAnswers({});
    setCurrent(0);
    setFinished(false);
    setSeed((s) => s + 1);
    setTime(total * SECONDS_PER_QUESTION);
    setStarted(true);
  }, [total]);

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

  const answered = Object.keys(answers).length;
  const score = questions.filter((q) => answers[q.id] === q.correct_index).length;

  if (query.isLoading) {
    return (
      <div className="flex items-center gap-3 rounded-3xl border border-border bg-card p-8 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading questions…
      </div>
    );
  }

  if (!total) {
    return (
      <div className="rounded-3xl border border-border bg-card p-8">
        <h2 className="font-display text-lg font-bold">No questions yet</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {difficulty === "all"
            ? "Questions for this chapter are being prepared. Try another chapter or check back soon."
            : `No ${difficultyLabel[difficulty]} questions here yet — try another difficulty.`}
        </p>
        {difficulty !== "all" && (
          <button
            onClick={() => setDifficulty("all")}
            className="mt-4 rounded-full border border-border px-4 py-2 text-sm font-semibold hover:bg-muted"
          >
            Show all difficulties
          </button>
        )}
      </div>
    );
  }

  const q = questions[Math.min(current, total - 1)];

  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-bold">
            {heading} · {total} questions
          </p>
          <p className="text-xs text-muted-foreground">
            Answered {answered} of {total}
          </p>
        </div>
        {started && (
          <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary">
            <Clock className="h-4 w-4" aria-hidden="true" />
            {String(Math.floor(time / 60)).padStart(2, "0")}:{String(time % 60).padStart(2, "0")}
          </span>
        )}
      </div>

      <div
        className="mt-4 h-2 overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuenow={answered}
        aria-valuemin={0}
        aria-valuemax={total}
      >
        <div
          className="h-full brand-gradient transition-all"
          style={{ width: `${(answered / total) * 100}%` }}
        />
      </div>

      {!started ? (
        <div className="mt-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground">Difficulty</span>
            {(["all", ...difficulties] as const).map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                  difficulty === d
                    ? "brand-gradient text-primary-foreground"
                    : "border border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {d === "all" ? "All" : difficultyLabel[d]}
              </button>
            ))}
          </div>
          <label className="mt-4 flex items-center gap-2 text-xs font-semibold text-muted-foreground">
            <input
              type="checkbox"
              checked={shuffled}
              onChange={(e) => setShuffled(e.target.checked)}
              className="h-4 w-4 rounded border-border"
            />
            <Shuffle className="h-3.5 w-3.5" aria-hidden="true" /> Shuffle questions
          </label>
          <button
            onClick={restart}
            className="mt-6 inline-flex rounded-full brand-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-105"
          >
            Start quiz
          </button>
        </div>
      ) : !finished ? (
        <div className="mt-6 animate-fade-up">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Question {current + 1} of {total} · {difficultyLabel[q.difficulty] ?? q.difficulty}
          </p>
          <p className="mt-2 text-base font-semibold">{q.question}</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {q.options.map((opt, oi) => {
              const selected = answers[q.id] === oi;
              return (
                <button
                  key={oi}
                  onClick={() => setAnswers((a) => ({ ...a, [q.id]: oi }))}
                  className={`rounded-xl border px-3 py-2 text-left text-sm transition-colors ${
                    selected
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setCurrent((c) => Math.max(0, c - 1))}
              disabled={current === 0}
              className="inline-flex items-center gap-1 rounded-full border border-border px-4 py-2 text-sm font-semibold disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </button>
            {current < total - 1 ? (
              <button
                onClick={() => setCurrent((c) => Math.min(total - 1, c + 1))}
                className="inline-flex items-center gap-1 rounded-full brand-gradient px-5 py-2 text-sm font-semibold text-primary-foreground"
              >
                Next <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={() => setFinished(true)}
                className="rounded-full brand-gradient px-5 py-2 text-sm font-semibold text-primary-foreground"
              >
                Submit answers
              </button>
            )}
            <button
              onClick={() => setFinished(true)}
              className="text-xs font-semibold text-muted-foreground underline-offset-4 hover:underline"
            >
              Finish early
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <div className="flex flex-wrap items-center gap-4">
            <p className="rounded-full bg-accent/15 px-4 py-2 text-sm font-bold text-accent">
              Score: {score}/{total} ({Math.round((score / total) * 100)}%)
            </p>
            <button
              onClick={restart}
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-sm font-semibold hover:bg-muted"
            >
              <RotateCcw className="h-4 w-4" /> Restart quiz
            </button>
          </div>

          <ol className="mt-6 space-y-4">
            {questions.map((item, qi) => (
              <li key={item.id} className="rounded-2xl border border-border p-5">
                <p className="text-sm font-semibold">
                  {qi + 1}. {item.question}
                </p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {item.options.map((opt, oi) => {
                    const selected = answers[item.id] === oi;
                    const correct = oi === item.correct_index;
                    const wrong = selected && !correct;
                    return (
                      <div
                        key={oi}
                        className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm ${
                          correct
                            ? "border-accent bg-accent/10 text-accent"
                            : wrong
                              ? "border-destructive bg-destructive/10 text-destructive"
                              : "border-border text-muted-foreground"
                        }`}
                      >
                        {correct && <CheckCircle2 className="h-4 w-4 shrink-0" />}
                        {wrong && <XCircle className="h-4 w-4 shrink-0" />}
                        <span>{opt}</span>
                      </div>
                    );
                  })}
                </div>
                {item.explanation && (
                  <p className="mt-3 text-xs text-muted-foreground">
                    <span className="font-semibold text-accent">Why:</span> {item.explanation}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
