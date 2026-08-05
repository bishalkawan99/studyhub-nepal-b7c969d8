import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { subjects } from "@/lib/study-data";
import { parseClassSlug, parseChapterSlug } from "@/lib/mcq";
import { McqQuiz } from "@/components/McqQuiz";

export const Route = createFileRoute("/$classSlug/$subjectSlug/mcqs/$chapter")({
  loader: ({ params }) => {
    const classId = parseClassSlug(params.classSlug);
    const subject = subjects.find((s) => s.slug === params.subjectSlug);
    if (!classId || !subject) throw notFound();
    if (params.chapter === "random") {
      return { classId, name: subject.name, chapterName: null as string | null, number: 0 };
    }
    const index = parseChapterSlug(params.chapter, subject.chapters.length);
    if (index === null) throw notFound();
    return {
      classId,
      name: subject.name,
      chapterName: subject.chapters[index] as string | null,
      number: index + 1,
    };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Quiz not found — StudyHub Nepal" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const scope = loaderData.chapterName
      ? `Chapter ${loaderData.number}: ${loaderData.chapterName}`
      : "Random Mixed Quiz";
    const title = `Class ${loaderData.classId} ${loaderData.name} MCQs — ${scope} | StudyHub Nepal`;
    const description = `Practise Class ${loaderData.classId} ${loaderData.name} ${scope} MCQs with a timer, instant score and answer explanations for NEB exams.`;
    const url = `/${params.classSlug}/${params.subjectSlug}/mcqs/${params.chapter}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:site_name", content: "StudyHub Nepal" },
        { name: "twitter:card", content: "summary" },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: ChapterQuiz,
  errorComponent: () => (
    <main className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-2xl font-extrabold">Something went wrong</h1>
      <p className="mt-2 text-sm text-muted-foreground">Please reload the page and try again.</p>
    </main>
  ),
  notFoundComponent: () => (
    <main className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-2xl font-extrabold">Quiz not found</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        <Link to="/mcqs" className="text-primary hover:underline">
          Browse all MCQ subjects
        </Link>
      </p>
    </main>
  ),
});

function ChapterQuiz() {
  const { classSlug: cs, subjectSlug, chapter } = Route.useParams();
  const { classId, chapterName, number, name } = Route.useLoaderData();

  return (
    <main className="hero-surface">
      <section className="mx-auto max-w-4xl px-4 pt-12 lg:px-8">
        <nav className="text-xs text-muted-foreground" aria-label="Breadcrumb">
          <Link to="/mcqs" className="hover:text-primary">
            MCQs
          </Link>{" "}
          /{" "}
          <Link
            to="/$classSlug/$subjectSlug/mcqs"
            params={{ classSlug: cs, subjectSlug }}
            className="hover:text-primary"
          >
            Class {classId} {name}
          </Link>{" "}
          / {chapterName ? `Chapter ${number}` : "Random"}
        </nav>
        <h1 className="mt-4 font-display text-2xl font-extrabold sm:text-3xl">
          {chapterName ? `Chapter ${number}: ${chapterName}` : `${name} random mixed quiz`}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Class {classId} {name} · beat the timer, then review every answer with an explanation.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-8 lg:px-8">
        <McqQuiz
          key={chapter}
          classId={classId}
          subjectSlug={subjectSlug}
          chapter={chapterName}
          heading={chapterName ?? "Mixed quiz"}
        />
      </section>
    </main>
  );
}
