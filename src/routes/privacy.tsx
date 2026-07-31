import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — StudyHub Nepal" },
      { name: "description", content: "How StudyHub Nepal collects, uses and protects student data." },
      { property: "og:title", content: "Privacy Policy — StudyHub Nepal" },
      { property: "og:description", content: "Our approach to student data and privacy." },
    ],
  }),
  component: () => (
    <main className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
      <h1 className="font-display text-4xl font-extrabold">Privacy Policy</h1>
      <div className="mt-6 space-y-4 text-sm text-muted-foreground">
        <p>
          We collect the minimum information needed to run StudyHub Nepal: your email address if you create an
          account, and anonymous usage statistics such as which notes are downloaded most.
        </p>
        <p>We never sell student data, and we do not share personal information with advertisers.</p>
        <p>
          You can request deletion of your account and associated data at any time through our contact page.
        </p>
      </div>
    </main>
  ),
});
