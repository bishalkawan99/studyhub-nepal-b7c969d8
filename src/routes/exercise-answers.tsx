import { createFileRoute } from "@tanstack/react-router";
import { ResourceLibrary } from "@/components/ResourceLibrary";

export const Route = createFileRoute("/exercise-answers")({
  head: () => ({
    meta: [
      { title: "Exercise Answers & Solutions — StudyHub Nepal" },
      {
        name: "description",
        content: "Step-by-step textbook exercise answers with explanations for Class 11 and 12 subjects.",
      },
      { property: "og:title", content: "Exercise Answers & Solutions — StudyHub Nepal" },
      { property: "og:description", content: "Every textbook exercise solved with clear explanations." },
    ],
  }),
  component: () => (
    <ResourceLibrary
      title="Exercise answers, solved step by step"
      subtitle="Question, answer, explanation and a downloadable PDF for every chapter exercise."
      kind="Exercise Answers"
    />
  ),
});
