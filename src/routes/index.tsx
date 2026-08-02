import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BookOpen,
  ClipboardList,
  Download,
  FileQuestion,
  FileText,
  GraduationCap,
  ListChecks,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import heroImg from "@/assets/hero-students.png";
import { SearchBar } from "@/components/SearchBar";
import { SubjectIcon } from "@/components/SubjectIcon";
import { classes, subjects, blogPosts } from "@/lib/study-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "StudyHub Nepal — Class 11 & 12 Notes, MCQs & Past Papers" },
      {
        name: "description",
        content:
          "Study smarter, score higher. NEB Class 11 & 12 notes, exercise solutions, MCQ practice, model questions and past papers in one place.",
      },
      { property: "og:title", content: "StudyHub Nepal — Study Smarter, Score Higher" },
      {
        property: "og:description",
        content:
          "Everything Class 11 & 12 students in Nepal need: notes, solutions, MCQs and past papers.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:site_name", content: "StudyHub Nepal" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const features = [
  {
    icon: FileText,
    title: "Chapter Notes",
    text: "Concise, syllabus-aligned notes with downloadable PDFs.",
  },
  {
    icon: ClipboardList,
    title: "Exercise Answers",
    text: "Step-by-step solutions with clear explanations.",
  },
  {
    icon: ListChecks,
    title: "MCQ Practice",
    text: "Timed quizzes with instant results and a leaderboard.",
  },
  {
    icon: FileQuestion,
    title: "Model Questions",
    text: "NEB-pattern model sets to rehearse the real exam.",
  },
  { icon: BookOpen, title: "Past Papers", text: "Year-wise board questions organised by subject." },
  {
    icon: Download,
    title: "Offline Ready",
    text: "Download once, revise anywhere — even without data.",
  },
];

const stats = [
  { value: "20+", label: "Subjects covered" },
  { value: "800+", label: "Chapter resources" },
  { value: "5,000+", label: "Practice questions" },
  { value: "100%", label: "Free for students" },
];

const floating = [
  { icon: GraduationCap, className: "left-[2%] top-[12%]" },
  { icon: BookOpen, className: "left-[3%] bottom-[14%]" },
  { icon: Trophy, className: "right-[2%] top-[16%]" },
  { icon: Sparkles, className: "right-[3%] bottom-[12%]" },
];

function Home() {
  return (
    <main>
      <section className="hero-surface relative overflow-hidden">
        {floating.map((f, i) => (
          <span
            key={i}
            aria-hidden
            className={`pointer-events-none absolute hidden rounded-2xl border border-border bg-card/70 p-3 text-primary shadow-soft animate-float lg:block ${f.className}`}
            style={{ animationDelay: `${i * 0.8}s` }}
          >
            <f.icon className="h-5 w-5" />
          </span>
        ))}

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Built for NEB Class 11 & 12
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight sm:text-6xl">
              Study Smarter, <span className="brand-gradient-text">Score Higher.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              Access Class 11 &amp; Class 12 Notes, Exercise Solutions, MCQs, Model Questions, and
              Past Papers—all in one place.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/notes"
                className="inline-flex items-center gap-2 rounded-full brand-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-105"
              >
                Start Learning
              </Link>
              <Link
                to="/notes"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold transition-colors hover:bg-muted"
              >
                Browse Notes
              </Link>
            </div>
            <div className="mt-10">
              <SearchBar />
            </div>
          </div>

          <div className="relative animate-fade-in">
            <div className="glass rounded-[2rem] p-4 shadow-soft">
              <img
                src={heroImg}
                alt="Nepali Class 11 and 12 students studying together"
                width={1024}
                height={896}
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-4 rounded-3xl border border-border bg-card p-6 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-3xl font-extrabold brand-gradient-text">{s.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
          Everything in one study hub
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Organised by class, subject and chapter — so you always know what to revise next.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <article key={f.title} className="lift rounded-2xl border border-border bg-card p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
            </article>
          ))}
        </div>
      </section>

      {classes.map((c) => (
        <section key={c} className="mx-auto max-w-7xl px-4 pb-16 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-3xl font-extrabold">Class {c}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                All {subjects.length} subjects with notes, solutions and question banks.
              </p>
            </div>
            <Link to="/notes" className="text-sm font-semibold text-primary hover:underline">
              View all resources →
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {subjects.map((s) => (
              <Link
                key={s.slug}
                to="/subject/$classId/$slug"
                params={{ classId: c, slug: s.slug }}
                className="lift group rounded-2xl border border-border bg-card p-5"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <SubjectIcon slug={s.slug} />
                </span>
                <h3 className="mt-3 text-base font-bold group-hover:text-primary">{s.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{s.blurb}</p>
                <p className="mt-4 text-xs font-semibold text-primary">
                  {s.chapters.length} chapters
                </p>
              </Link>
            ))}
          </div>
        </section>
      ))}

      <section className="mx-auto max-w-7xl px-4 pb-20 lg:px-8">
        <div className="glass grid items-center gap-8 rounded-3xl p-8 lg:grid-cols-[1.2fr_1fr] lg:p-12">
          <div>
            <h2 className="font-display text-3xl font-extrabold">
              Practice MCQs with a live timer
            </h2>
            <p className="mt-3 text-muted-foreground">
              Attempt subject-wise multiple choice questions, see your score instantly, review the
              correct answers with explanations and climb the weekly leaderboard.
            </p>
            <Link
              to="/mcqs"
              className="mt-6 inline-flex items-center gap-2 rounded-full brand-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-105"
            >
              <ListChecks className="h-4 w-4" /> Start a quiz
            </Link>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 text-sm font-bold">
              <Users className="h-4 w-4 text-accent" /> Weekly leaderboard
            </div>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                ["Aayush Shrestha", "98%"],
                ["Sneha Karki", "95%"],
                ["Bibek Tamang", "93%"],
              ].map(([n, s], i) => (
                <li key={n} className="flex items-center justify-between">
                  <span className="flex items-center gap-3">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-bold">
                      {i + 1}
                    </span>
                    {n}
                  </span>
                  <span className="font-semibold text-primary">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-display text-3xl font-extrabold">From the blog</h2>
          <Link to="/blog" className="text-sm font-semibold text-primary hover:underline">
            All articles →
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.slice(0, 3).map((p) => (
            <article key={p.slug} className="lift rounded-2xl border border-border bg-card p-6">
              <span className="rounded-full bg-secondary/15 px-3 py-1 text-[11px] font-semibold text-secondary">
                {p.category}
              </span>
              <h3 className="mt-4 text-lg font-bold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
