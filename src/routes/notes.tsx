import { createFileRoute } from "@tanstack/react-router";
import { ResourceLibrary } from "@/components/ResourceLibrary";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "Class 11 & 12 Notes — StudyHub Nepal" },
      {
        name: "description",
        content:
          "Download NEB Class 11 and Class 12 chapter notes for every subject, free of cost.",
      },
      { property: "og:title", content: "Class 11 & 12 Notes — StudyHub Nepal" },
      {
        property: "og:description",
        content: "Syllabus-aligned chapter notes for all NEB subjects.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/notes" },
      { property: "og:site_name", content: "StudyHub Nepal" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/notes" }],
  }),
  component: () => (
    <ResourceLibrary
      title="Notes for every chapter"
      subtitle="Clean, syllabus-aligned notes for Class 11 and Class 12 — read online or download as PDF."
      kind="Notes"
    />
  ),
});
