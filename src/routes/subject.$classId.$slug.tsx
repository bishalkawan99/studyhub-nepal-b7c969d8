import { useEffect, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  Bookmark,
  Download,
  Maximize2,
  Printer,
  Share2,
  ZoomIn,
  ZoomOut,
  FileText,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

import { getSubject, subjects } from "@/lib/study-data";
import { SubjectIcon } from "@/components/SubjectIcon";

export const Route = createFileRoute("/subject/$classId/$slug")({
  loader: ({ params }) => {
    const subject = getSubject(params.slug);
    if (!subject) throw notFound();
    return { subject, classId: params.classId };
  },
  head: ({ params }) => {
    const subject = getSubject(params.slug);
    const name = subject?.name ?? "Subject";
    const title = `Class ${params.classId} ${name} Notes & Solutions — StudyHub Nepal`;
    const description = `Chapter notes, exercise answers, MCQs, model questions and past papers for Class ${params.classId} ${name}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: SubjectPage,
});

const tabs = ["Notes", "Exercise Answers", "Important Questions", "MCQs", "Past Questions", "Model Questions"];

function SubjectPage() {
  const { subject, classId } = Route.useLoaderData();
  const { user } = useAuth();
  const [tab, setTab] = useState(tabs[0]);
  const [chapter, setChapter] = useState(0);
  const [zoom, setZoom] = useState(100);
  const [bookmarked, setBookmarked] = useState(false);
  const [progress, setProgress] = useState(0);

  const href = `/subject/${classId}/${subject.slug}`;
  const label = `Class ${classId} ${subject.name}`;

  useEffect(() => {
    function onScroll() {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? Math.round((h.scrollTop / max) * 100) : 0);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!user) {
      setBookmarked(false);
      return;
    }
    let active = true;
    void supabase
      .from("bookmarks")
      .select("id")
      .eq("href", href)
      .maybeSingle()
      .then(({ data }) => {
        if (active) setBookmarked(Boolean(data));
      });
    return () => {
      active = false;
    };
  }, [user, href]);

  async function toggleBookmark() {
    if (!user) {
      toast.info("Sign in to save this chapter to your dashboard.");
      return;
    }
    if (bookmarked) {
      const { error } = await supabase.from("bookmarks").delete().eq("href", href);
      if (error) {
        toast.error("Could not remove bookmark");
        return;
      }
      setBookmarked(false);
      toast.success("Bookmark removed");
      return;
    }
    const { error } = await supabase.from("bookmarks").insert({ user_id: user.id, href, label });
    if (error) {
      toast.error("Could not save bookmark");
      return;
    }
    setBookmarked(true);
    toast.success("Bookmarked for later");
  }

  return (
    <main className="hero-surface">
      <section className="mx-auto max-w-7xl px-4 pt-12 lg:px-8">
        <nav className="text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>{" "}
          / <Link to="/notes" className="hover:text-primary">Notes</Link> / Class {classId} / {subject.name}
        </nav>

        <header className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:flex-wrap sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
              <SubjectIcon slug={subject.slug} className="h-6 w-6" />
            </span>
            <div className="min-w-0">
              <h1 className="truncate font-display text-2xl font-extrabold sm:text-3xl">
                Class {classId} {subject.name}
              </h1>
              <p className="text-sm text-muted-foreground">{subject.chapters.length} chapters · NEB syllabus</p>
            </div>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              onClick={() => void toggleBookmark()}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border ${
                bookmarked ? "bg-accent/15 text-accent" : "bg-card text-muted-foreground"
              }`}
              aria-label="Bookmark"
            >
              <Bookmark className="h-4 w-4" />
            </button>

            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                toast.success("Link copied to clipboard");
              }}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground"
              aria-label="Share"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </header>

        <div className="mt-6">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Reading progress</span>
            <span>{progress}%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full brand-gradient transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-8">
        <aside className="h-max rounded-2xl border border-border bg-card p-4 lg:sticky lg:top-24">
          <h2 className="px-2 text-sm font-bold">Chapters</h2>
          <ul className="mt-3 space-y-1">
            {subject.chapters.map((c: string, i: number) => (
              <li key={c}>
                <button
                  onClick={() => setChapter(i)}
                  className={`w-full rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                    chapter === i ? "bg-primary/10 font-semibold text-primary" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {i + 1}. {c}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div>
          <div className="flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                  tab === t
                    ? "brand-gradient text-primary-foreground"
                    : "border border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <article className="mt-6 rounded-3xl border border-border bg-card p-6">
            <h2 className="font-display text-xl font-extrabold">
              Chapter {chapter + 1}: {subject.chapters[chapter]}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {tab} for Class {classId} {subject.name}. Read online or download the PDF for offline revision.
            </p>

            {tab === "Exercise Answers" ? (
              <div className="mt-6 space-y-4">
                {[1, 2, 3].map((n) => (
                  <details key={n} open={n === 1} className="rounded-2xl border border-border p-4">
                    <summary className="cursor-pointer text-sm font-semibold">
                      Q{n}. Sample exercise question from {subject.chapters[chapter]}
                    </summary>
                    <div className="mt-3 space-y-3 text-sm">
                      <p>
                        <span className="font-semibold text-primary">Answer:</span> A complete, exam-ready answer
                        written in the NEB marking style.
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-semibold text-accent">Explanation:</span> Each step is broken down so
                        you understand the reasoning, not just the result.
                      </p>
                      <button className="inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-primary">
                        <Download className="h-4 w-4" /> Download PDF
                      </button>
                    </div>
                  </details>
                ))}
              </div>
            ) : (
              <div className="mt-6">
                <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-border bg-muted/40 p-2">
                  <button className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-primary">
                    <Download className="h-4 w-4" /> Download
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-primary"
                  >
                    <Printer className="h-4 w-4" /> Print
                  </button>
                  <button className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-primary">
                    <Maximize2 className="h-4 w-4" /> Fullscreen
                  </button>
                  <div className="ml-auto flex items-center gap-1">
                    <button
                      onClick={() => setZoom((z) => Math.max(60, z - 10))}
                      className="rounded-lg p-2 text-muted-foreground hover:text-primary"
                      aria-label="Zoom out"
                    >
                      <ZoomOut className="h-4 w-4" />
                    </button>
                    <span className="text-xs text-muted-foreground">{zoom}%</span>
                    <button
                      onClick={() => setZoom((z) => Math.min(200, z + 10))}
                      className="rounded-lg p-2 text-muted-foreground hover:text-primary"
                      aria-label="Zoom in"
                    >
                      <ZoomIn className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-4 grid min-h-[420px] place-items-center rounded-2xl border border-dashed border-border bg-background p-8 text-center">
                  <div style={{ transform: `scale(${zoom / 100})` }} className="transition-transform">
                    <FileText className="mx-auto h-10 w-10 text-primary" />
                    <p className="mt-3 text-sm font-semibold">
                      {subject.name} — {tab} (Chapter {chapter + 1})
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      The PDF appears here once an admin uploads it.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </article>

          <div className="mt-8 rounded-3xl border border-border bg-card p-6">
            <h3 className="text-sm font-bold">Other subjects in Class {classId}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {subjects
                .filter((s) => s.slug !== subject.slug)
                .map((s) => (
                  <Link
                    key={s.slug}
                    to="/subject/$classId/$slug"
                    params={{ classId, slug: s.slug }}
                    className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-primary"
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <SubjectIcon slug={s.slug} className="h-3.5 w-3.5" /> {s.name}
                    </span>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
