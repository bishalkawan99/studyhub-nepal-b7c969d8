import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ListChecks, Shuffle } from "lucide-react";
import { subjects } from "@/lib/study-data";
import { parseClassSlug, chapterSlug, facultyOf } from "@/lib/mcq";
import { SubjectIcon } from "@/components/SubjectIcon";

export const Route = createFileRoute("/$classSlug/$subjectSlug/mcqs/")({
  loader: ({ params }) => {
    const classId = parseClassSlug(params.classSlug);
    const subject = subjects.find((s) => s.slug === params.subjectSlug);
    if (!classId || !subject) throw notFound();
    return { classId, name: subject.name };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "MCQs not found — StudyHub Nepal" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const title = `Class ${loaderData.classId} ${loaderData.name} MCQs — Chapter-wise Practice | StudyHub Nepal`;
    const description = `Free chapter-wise Class ${loaderData.classId} ${loaderData.name} MCQ practice for NEB exams, with timer, instant results and answer explanations.`;
    const url = `/${params.classSlug}/${params.subjectSlug}/mcqs`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:site_name", content: "StudyHub Nepal" },
        { name: "twitter:card", content: "summary" },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: SubjectMcqHub,
  errorComponent: () => (
    <main className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-2xl font-extrabold">Something went wrong</h1>
      <p className="mt-2 text-sm text-muted-foreground">Please reload the page and try again.</p>
    </main>
  ),
  notFoundComponent: () => (
    <main className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-2xl font-extrabold">MCQ set not found</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        <Link to="/mcqs" className="text-primary hover:underline">
          Browse all MCQ subjects
        </Link>
      </p>
    </main>
  ),
});

function SubjectMcqHub() {
  const { classSlug: cs, subjectSlug } = Route.useParams();
  const classId = parseClassSlug(cs)!;
  const subject = subjects.find((s) => s.slug === subjectSlug)!;

  return (
    <main className="hero-surface">
      <section className="mx-auto max-w-7xl px-4 pt-12 lg:px-8">
        <nav className="text-xs text-muted-foreground" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>{" "}
          /{" "}
          <Link to="/mcqs" className="hover:text-primary">
            MCQs
          </Link>{" "}
          / Class {classId} / {subject.name}
        </nav>

        <header className="mt-4 flex items-center gap-3">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
            <SubjectIcon slug={subject.slug} className="h-6 w-6" />
          </span>
          <div className="min-w-0">
            <h1 className="font-display text-2xl font-extrabold sm:text-3xl">
              Class {classId} {subject.name} MCQs
            </h1>
            <p className="text-sm text-muted-foreground">
              {facultyOf(subject.slug)} faculty · {subject.chapters.length} chapters
            </p>
          </div>
        </header>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <Link
          to="/$classSlug/$subjectSlug/mcqs/$chapter"
          params={{ classSlug: cs, subjectSlug, chapter: "random" }}
          className="inline-flex items-center gap-2 rounded-full brand-gradient px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-105"
        >
          <Shuffle className="h-4 w-4" /> Random mixed quiz
        </Link>

        <h2 className="mt-10 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          Chapter-wise practice
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {subject.chapters.map((c, i) => (
            <li key={c}>
              <Link
                to="/$classSlug/$subjectSlug/mcqs/$chapter"
                params={{ classSlug: cs, subjectSlug, chapter: chapterSlug(i) }}
                className="flex h-full items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/50"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-xs font-bold text-primary">
                  {i + 1}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold">{c}</span>
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <ListChecks className="h-3.5 w-3.5" /> Practice MCQs
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
