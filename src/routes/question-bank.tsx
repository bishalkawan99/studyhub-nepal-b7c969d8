import { createFileRoute } from "@tanstack/react-router";
import { ResourceLibrary } from "@/components/ResourceLibrary";

export const Route = createFileRoute("/question-bank")({
  head: () => ({
    meta: [
      { title: "Question Bank — StudyHub Nepal" },
      {
        name: "description",
        content: "Important questions collected chapter-wise for NEB Class 11 and Class 12 exams.",
      },
      { property: "og:title", content: "Question Bank — StudyHub Nepal" },
      { property: "og:description", content: "Chapter-wise important questions for board exam revision." },
    ],
  }),
  component: () => (
    <ResourceLibrary
      title="Question bank"
      subtitle="The questions that repeat in board exams, grouped by chapter and marks weightage."
      kind="Question Bank"
    />
  ),
});
