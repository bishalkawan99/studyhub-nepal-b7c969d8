import { createFileRoute } from "@tanstack/react-router";
import { ResourceLibrary } from "@/components/ResourceLibrary";

export const Route = createFileRoute("/model-questions")({
  head: () => ({
    meta: [
      { title: "Model Questions — StudyHub Nepal" },
      {
        name: "description",
        content: "NEB-pattern model question sets for Class 11 and Class 12 with answer keys.",
      },
      { property: "og:title", content: "Model Questions — StudyHub Nepal" },
      { property: "og:description", content: "Practise with model sets that match the real NEB paper." },
    ],
  }),
  component: () => (
    <ResourceLibrary
      title="Model question sets"
      subtitle="Full-length papers in the exact NEB format so exam day feels familiar."
      kind="Model Questions"
    />
  ),
});
