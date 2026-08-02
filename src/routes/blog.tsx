import { createFileRoute } from "@tanstack/react-router";
import { blogPosts } from "@/lib/study-data";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Study Blog — Tips, Exams & Careers | StudyHub Nepal" },
      {
        name: "description",
        content:
          "Study tips, exam preparation plans, career guidance, scholarships and admission news for Nepali students.",
      },
      { property: "og:title", content: "Study Blog — StudyHub Nepal" },
      {
        property: "og:description",
        content: "Articles on study tips, exams, careers and scholarships in Nepal.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/blog" },
      { property: "og:site_name", content: "StudyHub Nepal" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: Blog,
});

function Blog() {
  return (
    <main className="hero-surface">
      <section className="mx-auto max-w-7xl px-4 pt-14 lg:px-8">
        <h1 className="font-display text-4xl font-extrabold sm:text-5xl">Blog</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Study tips, exam preparation, career guidance, admissions, scholarships and technology —
          written for students in Nepal.
        </p>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-12 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {blogPosts.map((p) => (
          <article
            key={p.slug}
            className="lift rounded-2xl border border-border bg-card p-6 animate-fade-up"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="rounded-full bg-secondary/15 px-3 py-1 text-[11px] font-semibold text-secondary">
                {p.category}
              </span>
              <time className="text-[11px] text-muted-foreground">{p.date}</time>
            </div>
            <h2 className="mt-4 text-lg font-bold">{p.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
            <p className="mt-5 text-xs font-semibold text-primary">Read article →</p>
          </article>
        ))}
      </section>
    </main>
  );
}
