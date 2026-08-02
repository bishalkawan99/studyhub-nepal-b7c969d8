import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

// TODO: replace with your project URL once a project name or custom domain is set.
const BASE_URL = "";

const paths = [
  "/",
  "/notes",
  "/exercise-answers",
  "/question-bank",
  "/mcqs",
  "/model-questions",
  "/past-papers",
  "/gpa-calculator",
  "/blog",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
];

const subjectSlugs = [
  "nepali",
  "english",
  "mathematics",
  "physics",
  "chemistry",
  "biology",
  "computer-science",
  "accountancy",
  "economics",
  "business-studies",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const entries = [
          ...paths.map((path) => ({ path, priority: path === "/" ? "1.0" : "0.8" })),
          ...["11", "12"].flatMap((classId) =>
            subjectSlugs.map((slug) => ({ path: `/subject/${classId}/${slug}`, priority: "0.6" })),
          ),
        ];

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...entries.map((e) =>
            [
              `  <url>`,
              `    <loc>${BASE_URL}${e.path}</loc>`,
              `    <changefreq>weekly</changefreq>`,
              `    <priority>${e.priority}</priority>`,
              `  </url>`,
            ].join("\n"),
          ),
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
