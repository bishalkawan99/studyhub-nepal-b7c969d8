import { createFileRoute, Link } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { subjects } from "@/lib/study-data";
import { faculties, facultyOf, classSlug } from "@/lib/mcq";
import { SubjectIcon } from "@/components/SubjectIcon";

export const Route = createFileRoute("/mcqs")({
  head: () => ({
    meta: [
      { title: "NEB MCQ Practice — Class 11 & 12 Chapter-wise Quizzes | StudyHub Nepal" },
      {
        name: "description",
        content:
          "Free chapter-wise MCQ practice for NEB Class 11 and Class 12 — Science, Management and Common subjects, with timer, instant score and explanations.",
      },
      {
        property: "og:title",
        content: "NEB MCQ Practice — Class 11 & 12 Chapter-wise Quizzes | StudyHub Nepal",
      },
      {
        property: "og:description",
        content: "Pick a class, subject and chapter, then practise with a timer and explanations.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/mcqs" },
      { property: "og:site_name", content: "StudyHub Nepal" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/mcqs" }],
  }),
  component: McqHub,
});

const classIds = ["11", "12"] as const;

function McqHub() {
  return (
    <main className="hero-surface">
      <section className="mx-auto max-w-7xl px-4 pt-14 lg:px-8">
        <h1 className="font-display text-4xl font-extrabold sm:text-5xl">MCQ Practice</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Chapter-wise NEB-style multiple choice questions with a timer, instant scoring and
          explanations. Choose your class and subject to begin.
        </p>
      </section>

      <section className="mx-auto max-w-7xl space-y-12 px-4 py-10 lg:px-8">
        {classIds.map((classId) => (
          <div key={classId}>
            <h2 className="font-display text-2xl font-extrabold">Class {classId}</h2>
            <div className="mt-6 space-y-8">
              {faculties.map((faculty) => {
                const list = subjects.filter((s) => facultyOf(s.slug) === faculty);
                if (!list.length) return null;
                return (
                  <div key={faculty}>
                    <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                      {faculty}
                    </h3>
                    <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {list.map((s) => (
                        <li key={s.slug}>
                          <Link
                            to="/$classSlug/$subjectSlug/mcqs"
                            params={{ classSlug: classSlug(classId), subjectSlug: s.slug }}
                            className="flex h-full items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/50"
                          >
                            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                              <SubjectIcon slug={s.slug} className="h-5 w-5" />
                            </span>
                            <span className="min-w-0">
                              <span className="block truncate text-sm font-semibold">{s.name}</span>
                              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                                <ListChecks className="h-3.5 w-3.5" /> {s.chapters.length} chapters
                              </span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
