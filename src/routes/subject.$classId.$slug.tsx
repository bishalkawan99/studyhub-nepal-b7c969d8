import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/subject/$classId/$slug")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/$classSlug/$subjectSlug",
      params: { classSlug: `class-${params.classId}`, subjectSlug: params.slug },
      replace: true,
    });
  },
});
