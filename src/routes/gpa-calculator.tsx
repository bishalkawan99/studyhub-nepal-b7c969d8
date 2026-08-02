import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Calculator, Download, Loader2, Printer, RotateCcw, Share2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  evaluateSubjectByGrade,
  evaluateSubjectByMarks,
  summarise,
  type GpaSubject,
  type GradeBoundary,
  type SubjectEntry,
} from "@/lib/gpa";
import { breadcrumbSchema, canonical, faqSchema, seoMeta } from "@/lib/seo";

const TITLE = "NEB GPA Calculator for Class 11 & Class 12 | Science & Management | StudyHub Nepal";
const DESCRIPTION =
  "Calculate your Class 11 and Class 12 NEB GPA instantly using Nepal's grading system. Supports Science and Management faculties with theory and practical marks.";

const faqs = [
  {
    question: "How is NEB GPA calculated for Class 11 and Class 12?",
    answer:
      "Each subject's theory and practical/internal marks are added, converted to a percentage, matched to an NEB letter grade and grade point. The GPA is the average of all subject grade points.",
  },
  {
    question: "What are the passing theory marks in NEB?",
    answer:
      "A student must score at least 35% of the full theory marks. For 75 theory marks that is 26.25 and for 50 theory marks it is 17.5. The calculator computes this automatically.",
  },
  {
    question: "What happens if theory marks are below the requirement?",
    answer:
      "The subject is graded NG (Not Graded) and shown in red, even if the practical marks are high.",
  },
  {
    question: "Does the calculator support Science and Management?",
    answer:
      "Yes. Choose Class 11 or Class 12 and then Science or Management — the correct subjects and mark distribution load automatically.",
  },
];

export const Route = createFileRoute("/gpa-calculator")({
  head: () => ({
    meta: [
      ...seoMeta({ path: "/gpa-calculator", title: TITLE, description: DESCRIPTION }),
      {
        name: "keywords",
        content:
          "NEB GPA Calculator, Class 11 GPA Calculator Nepal, Class 12 GPA Calculator Nepal, Science GPA Calculator Nepal, Management GPA Calculator Nepal, Nepal GPA Calculator, StudyHub Nepal GPA Calculator",
      },
    ],
    links: canonical("/gpa-calculator"),
    scripts: [
      faqSchema(faqs),
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Tools", path: "/gpa-calculator" },
        { name: "NEB GPA Calculator", path: "/gpa-calculator" },
      ]),
    ],
  }),
  component: GpaCalculatorPage,
});

const fieldClass =
  "w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring";

function GpaCalculatorPage() {
  const [classSlug, setClassSlug] = useState("class-12");
  const [facultySlug, setFacultySlug] = useState("science");
  const [method, setMethod] = useState<"marks" | "grades">("marks");
  const [entries, setEntries] = useState<Record<string, SubjectEntry>>({});

  const config = useQuery({
    queryKey: ["gpa-config"],
    queryFn: async () => {
      const [classes, faculties, subjects, grades, settings] = await Promise.all([
        supabase
          .from("gpa_classes")
          .select("id,slug,name,sort_order")
          .eq("is_active", true)
          .order("sort_order"),
        supabase
          .from("gpa_faculties")
          .select("id,class_id,slug,name,sort_order")
          .eq("is_active", true)
          .order("sort_order"),
        supabase
          .from("gpa_subjects")
          .select(
            "id,faculty_id,name,theory_full_marks,practical_full_marks,practical_label,is_optional,sort_order",
          )
          .eq("is_active", true)
          .order("sort_order"),
        supabase
          .from("gpa_grade_boundaries")
          .select("grade,min_gpa,max_gpa,grade_point,min_percentage,sort_order")
          .order("sort_order"),
        supabase.from("gpa_settings").select("key,value"),
      ]);
      const err =
        classes.error ?? faculties.error ?? subjects.error ?? grades.error ?? settings.error;
      if (err) throw err;
      return {
        classes: classes.data ?? [],
        faculties: faculties.data ?? [],
        subjects: subjects.data ?? [],
        boundaries: (grades.data ?? []) as GradeBoundary[],
        settings: Object.fromEntries((settings.data ?? []).map((s) => [s.key, Number(s.value)])),
      };
    },
    staleTime: 5 * 60 * 1000,
  });

  const activeClass = config.data?.classes.find((c) => c.slug === classSlug);
  const facultiesForClass = useMemo(
    () => (config.data?.faculties ?? []).filter((f) => f.class_id === activeClass?.id),
    [config.data, activeClass?.id],
  );
  const activeFaculty =
    facultiesForClass.find((f) => f.slug === facultySlug) ?? facultiesForClass[0];

  const subjectList = useMemo<GpaSubject[]>(
    () =>
      (
        (config.data?.subjects ?? []).filter(
          (s) => s.faculty_id === activeFaculty?.id,
        ) as GpaSubject[]
      ).map((s) => ({
        ...s,
        theory_full_marks: Number(s.theory_full_marks),
        practical_full_marks: Number(s.practical_full_marks),
      })),
    [config.data, activeFaculty?.id],
  );

  // Seed entry state whenever the subject set changes.
  useEffect(() => {
    setEntries((prev) => {
      const next: Record<string, SubjectEntry> = {};
      for (const s of subjectList) {
        next[s.id] = prev[s.id] ?? {
          theory: "",
          practical: "",
          grade: "A",
          included: !s.is_optional,
        };
      }
      return next;
    });
  }, [subjectList]);

  const boundaries = config.data?.boundaries ?? [];
  const theoryPct = config.data?.settings["theory_passing_percentage"] ?? 35;
  const practicalPct = config.data?.settings["practical_passing_percentage"] ?? 40;

  const included = subjectList.filter((s) => entries[s.id]?.included);
  const results = included.map((s) => {
    const entry = entries[s.id]!;
    return method === "marks"
      ? evaluateSubjectByMarks(s, entry, boundaries, theoryPct, practicalPct)
      : evaluateSubjectByGrade(s, entry, boundaries);
  });
  const complete = results.length > 0 && results.every((r) => r.errors.length === 0);
  const summary = summarise(
    results.filter((r) => r.errors.length === 0),
    boundaries,
  );

  function update(id: string, patch: Partial<SubjectEntry>) {
    setEntries((prev) => ({ ...prev, [id]: { ...prev[id]!, ...patch } }));
  }

  function reset() {
    setEntries((prev) =>
      Object.fromEntries(
        Object.entries(prev).map(([id, e]) => [
          id,
          { ...e, theory: "", practical: "", grade: "A" },
        ]),
      ),
    );
    toast.success("Calculator reset");
  }

  async function share() {
    const text = `My NEB ${activeClass?.name ?? ""} ${activeFaculty?.name ?? ""} GPA is ${summary.gpa.toFixed(2)} (${summary.overallGrade}) — calculated on StudyHub Nepal.`;
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title: "My NEB GPA", text, url: window.location.href });
        return;
      }
      await navigator.clipboard.writeText(`${text} ${window.location.href}`);
      toast.success("Result copied to clipboard");
    } catch {
      toast.error("Could not share the result");
    }
  }

  if (config.isLoading) {
    return (
      <main className="mx-auto flex max-w-7xl items-center justify-center px-4 py-24">
        <Loader2 className="h-6 w-6 animate-spin text-primary" aria-hidden="true" />
        <span className="ml-3 text-sm text-muted-foreground">Loading NEB grading rules…</span>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <a href="/" className="hover:text-primary">
              Home
            </a>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-foreground">
            GPA Calculator
          </li>
        </ol>
      </nav>

      <header className="mt-4">
        <h1 className="font-display text-3xl font-extrabold sm:text-4xl">
          NEB <span className="brand-gradient-text">GPA Calculator</span>
        </h1>
        <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
          Calculate your Class 11 or Class 12 GPA instantly with the latest NEB grading system.
          Choose your faculty, enter theory and practical marks, and the calculator applies the{" "}
          {theoryPct}% theory passing rule automatically.
        </p>
      </header>

      <section aria-labelledby="setup" className="mt-8 glass rounded-3xl border border-border p-6">
        <h2 id="setup" className="font-display text-lg font-bold">
          1. Choose your class and faculty
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="gpa-class" className="text-xs font-semibold">
              Class
            </label>
            <select
              id="gpa-class"
              value={classSlug}
              onChange={(e) => setClassSlug(e.target.value)}
              className={`mt-1 ${fieldClass}`}
            >
              {(config.data?.classes ?? []).map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="gpa-faculty" className="text-xs font-semibold">
              Faculty
            </label>
            <select
              id="gpa-faculty"
              value={activeFaculty?.slug ?? ""}
              onChange={(e) => setFacultySlug(e.target.value)}
              className={`mt-1 ${fieldClass}`}
            >
              {facultiesForClass.map((f) => (
                <option key={f.id} value={f.slug}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <span className="text-xs font-semibold">Calculation method</span>
            <div className="mt-1 flex gap-2" role="group" aria-label="Calculation method">
              {(["marks", "grades"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMethod(m)}
                  aria-pressed={method === m}
                  className={`flex-1 rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                    method === m
                      ? "brand-gradient border-transparent text-primary-foreground"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {m === "marks" ? "Using marks" : "Using grades"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="inputs"
        className="mt-6 rounded-3xl border border-border bg-card p-6"
      >
        <h2 id="inputs" className="font-display text-lg font-bold">
          2. Enter your results
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Optional subjects can be switched off. Marks update your GPA live.
        </p>

        <div className="mt-5 grid gap-3">
          {subjectList.map((s) => {
            const entry = entries[s.id];
            if (!entry) return null;
            const result = results.find((r) => r.subject.id === s.id);
            return (
              <div
                key={s.id}
                className="grid gap-3 rounded-2xl border border-border p-4 transition-colors sm:grid-cols-[minmax(0,1.4fr)_repeat(2,minmax(0,1fr))_auto] sm:items-end"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <input
                      id={`include-${s.id}`}
                      type="checkbox"
                      checked={entry.included}
                      disabled={!s.is_optional}
                      onChange={(e) => update(s.id, { included: e.target.checked })}
                      className="h-4 w-4 rounded border-border accent-primary"
                    />
                    <label htmlFor={`include-${s.id}`} className="text-sm font-semibold">
                      {s.name}
                      {s.is_optional ? (
                        <span className="ml-1 text-xs text-muted-foreground">(optional)</span>
                      ) : null}
                    </label>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Theory {s.theory_full_marks} · {s.practical_label} {s.practical_full_marks} ·
                    pass theory ≥ {(s.theory_full_marks * (theoryPct / 100)).toFixed(2)}
                  </p>
                </div>

                {method === "marks" ? (
                  <>
                    <div>
                      <label htmlFor={`theory-${s.id}`} className="text-xs font-semibold">
                        Theory (max {s.theory_full_marks})
                      </label>
                      <input
                        id={`theory-${s.id}`}
                        type="number"
                        inputMode="decimal"
                        min={0}
                        max={s.theory_full_marks}
                        step="0.25"
                        disabled={!entry.included}
                        value={entry.theory}
                        onChange={(e) => update(s.id, { theory: e.target.value })}
                        className={`mt-1 ${fieldClass}`}
                      />
                    </div>
                    <div>
                      <label htmlFor={`practical-${s.id}`} className="text-xs font-semibold">
                        {s.practical_label} (max {s.practical_full_marks})
                      </label>
                      <input
                        id={`practical-${s.id}`}
                        type="number"
                        inputMode="decimal"
                        min={0}
                        max={s.practical_full_marks}
                        step="0.25"
                        disabled={!entry.included}
                        value={entry.practical}
                        onChange={(e) => update(s.id, { practical: e.target.value })}
                        className={`mt-1 ${fieldClass}`}
                      />
                    </div>
                  </>
                ) : (
                  <div className="sm:col-span-2">
                    <label htmlFor={`grade-${s.id}`} className="text-xs font-semibold">
                      Grade
                    </label>
                    <select
                      id={`grade-${s.id}`}
                      value={entry.grade}
                      disabled={!entry.included}
                      onChange={(e) => update(s.id, { grade: e.target.value })}
                      className={`mt-1 ${fieldClass}`}
                    >
                      {boundaries.map((b) => (
                        <option key={b.grade} value={b.grade}>
                          {b.grade} ({Number(b.grade_point).toFixed(2)})
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="text-right">
                  {entry.included && result ? (
                    result.errors.length ? (
                      <p className="text-xs text-muted-foreground">{result.errors[0]}</p>
                    ) : (
                      <span
                        className={`inline-flex min-w-14 justify-center rounded-full px-3 py-1 text-xs font-bold ${
                          result.passed
                            ? "bg-primary/10 text-primary"
                            : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {result.grade}
                      </span>
                    )
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section
        aria-labelledby="results"
        className="mt-6 rounded-3xl border border-border bg-card p-6"
        id="gpa-result"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="results" className="font-display text-lg font-bold">
            3. Your result
          </h2>
          <div className="flex flex-wrap gap-2 print:hidden">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-4 text-sm font-semibold hover:text-primary"
            >
              <Printer className="h-4 w-4" aria-hidden="true" /> Print
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-4 text-sm font-semibold hover:text-primary"
            >
              <Download className="h-4 w-4" aria-hidden="true" /> Download PDF
            </button>
            <button
              type="button"
              onClick={() => void share()}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-4 text-sm font-semibold hover:text-primary"
            >
              <Share2 className="h-4 w-4" aria-hidden="true" /> Share
            </button>
            <button
              type="button"
              onClick={reset}
              className="inline-flex min-h-11 items-center gap-2 rounded-full brand-gradient px-4 text-sm font-semibold text-primary-foreground"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" /> Reset
            </button>
          </div>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-sm">
            <caption className="sr-only">Subject-wise NEB result and grade points</caption>
            <thead>
              <tr className="text-left text-xs uppercase text-muted-foreground">
                <th scope="col" className="px-3 py-2">
                  Subject
                </th>
                <th scope="col" className="px-3 py-2">
                  Theory FM
                </th>
                <th scope="col" className="px-3 py-2">
                  Theory obt.
                </th>
                <th scope="col" className="px-3 py-2">
                  Prac./Int. FM
                </th>
                <th scope="col" className="px-3 py-2">
                  Prac./Int. obt.
                </th>
                <th scope="col" className="px-3 py-2">
                  Total
                </th>
                <th scope="col" className="px-3 py-2">
                  %
                </th>
                <th scope="col" className="px-3 py-2">
                  Theory pass
                </th>
                <th scope="col" className="px-3 py-2">
                  Theory status
                </th>
                <th scope="col" className="px-3 py-2">
                  Grade
                </th>
                <th scope="col" className="px-3 py-2">
                  GP
                </th>
                <th scope="col" className="px-3 py-2">
                  Result
                </th>
              </tr>
            </thead>
            <tbody>
              {results.length === 0 ? (
                <tr>
                  <td colSpan={12} className="px-3 py-6 text-center text-muted-foreground">
                    Enter your marks above to see the result table.
                  </td>
                </tr>
              ) : (
                results.map((r) => (
                  <tr
                    key={r.subject.id}
                    className={`border-t border-border ${!r.passed && r.errors.length === 0 ? "bg-destructive/5" : ""}`}
                  >
                    <td className="px-3 py-2 font-semibold">{r.subject.name}</td>
                    <td className="px-3 py-2">{r.subject.theory_full_marks}</td>
                    <td className="px-3 py-2">{method === "marks" ? r.theoryObtained : "—"}</td>
                    <td className="px-3 py-2">{r.subject.practical_full_marks}</td>
                    <td className="px-3 py-2">{method === "marks" ? r.practicalObtained : "—"}</td>
                    <td className="px-3 py-2">{method === "marks" ? r.totalObtained : "—"}</td>
                    <td className="px-3 py-2">{r.percentage.toFixed(2)}%</td>
                    <td className="px-3 py-2">{r.theoryPassMarks.toFixed(2)}</td>
                    <td className="px-3 py-2">
                      {method === "marks" ? (
                        r.theoryPassed ? (
                          <span className="text-primary">Met</span>
                        ) : (
                          <span className="font-semibold text-destructive">Below {theoryPct}%</span>
                        )
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-3 py-2">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-bold ${
                          r.passed
                            ? "bg-primary/10 text-primary"
                            : "bg-destructive text-destructive-foreground"
                        }`}
                      >
                        {r.grade}
                      </span>
                    </td>
                    <td className="px-3 py-2">{r.gradePoint.toFixed(2)}</td>
                    <td className="px-3 py-2">
                      {r.errors.length ? (
                        <span className="text-muted-foreground">Incomplete</span>
                      ) : r.passed ? (
                        <span className="text-primary">Passed</span>
                      ) : (
                        <span className="font-semibold text-destructive">
                          NG — theory requirement not met
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div aria-live="polite" className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Final GPA", value: complete ? summary.gpa.toFixed(2) : "—" },
            { label: "Overall grade", value: complete ? summary.overallGrade : "—" },
            {
              label: "Overall percentage",
              value: complete ? `${summary.overallPercentage.toFixed(2)}%` : "—",
            },
            { label: "Final result", value: complete ? summary.finalResult : "—" },
            { label: "Total subjects", value: String(summary.totalSubjects) },
            { label: "Passed subjects", value: String(summary.passedSubjects) },
            { label: "NG subjects", value: String(summary.ngSubjects) },
            {
              label: "Class & faculty",
              value: `${activeClass?.name ?? ""} · ${activeFaculty?.name ?? ""}`,
            },
          ].map((c) => (
            <div key={c.label} className="glass rounded-2xl border border-border p-4">
              <p className="text-xs text-muted-foreground">{c.label}</p>
              <p className="mt-1 font-display text-xl font-extrabold">{c.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="grading"
        className="mt-6 rounded-3xl border border-border bg-card p-6"
      >
        <h2 id="grading" className="font-display text-lg font-bold">
          Latest NEB grading system
        </h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          {boundaries.map((b) => (
            <div
              key={b.grade}
              className="flex items-center justify-between rounded-xl border border-border px-4 py-2 text-sm"
            >
              <span className="font-semibold">{b.grade}</span>
              <span className="text-muted-foreground">
                {Number(b.min_gpa).toFixed(2)} – {Number(b.max_gpa).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="faq" className="mt-6 rounded-3xl border border-border bg-card p-6">
        <h2 id="faq" className="font-display text-lg font-bold">
          <Calculator className="mr-2 inline h-4 w-4 text-primary" aria-hidden="true" />
          GPA calculator FAQ
        </h2>
        <dl className="mt-4 grid gap-4">
          {faqs.map((f) => (
            <div key={f.question}>
              <dt className="text-sm font-semibold">{f.question}</dt>
              <dd className="mt-1 text-sm text-muted-foreground">{f.answer}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
