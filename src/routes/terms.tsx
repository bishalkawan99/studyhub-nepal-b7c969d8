import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — StudyHub Nepal" },
      { name: "description", content: "Terms and conditions for using StudyHub Nepal study resources." },
      { property: "og:title", content: "Terms of Use — StudyHub Nepal" },
      { property: "og:description", content: "The rules for using our free study resources." },
    ],
  }),
  component: () => (
    <main className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
      <h1 className="font-display text-4xl font-extrabold">Terms of Use</h1>
      <div className="mt-6 space-y-4 text-sm text-muted-foreground">
        <p>
          StudyHub Nepal resources are provided free of charge for personal study. You may download and print
          them for your own learning.
        </p>
        <p>Re-selling our material, or republishing it as your own, is not permitted.</p>
        <p>
          We work hard to keep content accurate and syllabus-aligned, but always cross-check with your
          official textbook before exams.
        </p>
      </div>
    </main>
  ),
});
