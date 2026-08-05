import { createFileRoute, notFound } from "@tanstack/react-router";
import { subjects } from "@/lib/study-data";
import { parseClassSlug } from "@/lib/mcq";
import { SubjectPageView } from "@/components/SubjectPageView";

export const Route = createFileRoute("/$classSlug/$subjectSlug/")({
  loader: ({ params }) => {
    const classId = parseClassSlug(params.classSlug);
    const subject = subjects.find((s) => s.slug === params.subjectSlug);
    if (!classId || !subject) throw notFound();
    return { classId, name: subject.name };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Subject not found — StudyHub Nepal" }, { name: "robots", content: "noindex" }] };
    }
    const title = `Class ${loaderData.classId} ${loaderData.name} Notes, MCQs & Past Papers | StudyHub Nepal`;
    const description = `Free Class ${loaderData.classId} ${loaderData.name} notes, exercise answers, important questions, chapter-wise MCQs, model questions and NEB past papers.`;
    const url = `/${params.classSlug}/${params.subjectSlug}`;
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
  component: SubjectRoute,
  errorComponent: () => (
    <main className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-2xl font-extrabold">Something went wrong</h1>
      <p className="mt-2 text-sm text-muted-foreground">Please reload the page and try again.</p>
    </main>
  ),
  notFoundComponent: () => (
    <main className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-2xl font-extrabold">Subject not found</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Check the class and subject in the address, or browse from the home page.
      </p>
    </main>
  ),
});

function SubjectRoute() {
  const { classSlug: cs, subjectSlug } = Route.useParams();
  const classId = parseClassSlug(cs)!;
  const subject = subjects.find((s) => s.slug === subjectSlug)!;
  return <SubjectPageView subject={subject} classId={classId} />;
}
