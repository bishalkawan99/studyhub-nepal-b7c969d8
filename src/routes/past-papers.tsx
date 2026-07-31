import { createFileRoute } from "@tanstack/react-router";
import { ResourceLibrary } from "@/components/ResourceLibrary";

export const Route = createFileRoute("/past-papers")({
  head: () => ({
    meta: [
      { title: "Past Papers by Year — StudyHub Nepal" },
      {
        name: "description",
        content: "Year-wise NEB board past question papers for Class 11 and Class 12, free to download.",
      },
      { property: "og:title", content: "Past Papers by Year — StudyHub Nepal" },
      { property: "og:description", content: "Board question papers organised by class, subject and year." },
    ],
  }),
  component: () => (
    <ResourceLibrary
      title="Past board papers"
      subtitle="Organised by class, subject and year — 2019 through 2025 board question papers."
      kind="Past Papers"
    />
  ),
});
