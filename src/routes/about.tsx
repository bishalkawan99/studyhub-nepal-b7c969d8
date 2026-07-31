import { createFileRoute } from "@tanstack/react-router";
import { Heart, Target, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About StudyHub Nepal — Free NEB Study Resources" },
      {
        name: "description",
        content: "StudyHub Nepal gives Class 11 and 12 students across Nepal free, well-organised study material.",
      },
      { property: "og:title", content: "About StudyHub Nepal" },
      { property: "og:description", content: "Our mission: quality study resources for every Nepali student." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <main className="hero-surface">
      <section className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
        <h1 className="font-display text-4xl font-extrabold sm:text-5xl">About StudyHub Nepal</h1>
        <p className="mt-5 text-muted-foreground">
          StudyHub Nepal started with a simple frustration: good study material for NEB Class 11 and 12 was
          scattered across Facebook groups, photocopy shops and broken download links. We put everything —
          notes, exercise answers, question banks, MCQs, model questions and past papers — in one clean,
          fast, free place.
        </p>
        <p className="mt-4 text-muted-foreground">
          Every resource is organised by class, subject and chapter, reviewed against the current NEB
          syllabus, and available to read online or download for offline revision.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {[
            { icon: Target, title: "Our mission", text: "Make quality study material free for every student in Nepal." },
            { icon: Users, title: "Who we serve", text: "Class 11 and Class 12 students across all streams." },
            { icon: Heart, title: "Our promise", text: "No paywalls, no clutter, no misleading downloads." },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl border border-border bg-card p-6">
              <c.icon className="h-5 w-5 text-primary" />
              <h2 className="mt-3 text-base font-bold">{c.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
