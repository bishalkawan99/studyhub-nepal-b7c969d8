import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { N as Heart, a as Users, l as Target } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-DS8sgBi8.js
var import_jsx_runtime = require_jsx_runtime();
function About() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "hero-surface",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-3xl px-4 py-16 lg:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl font-extrabold sm:text-5xl",
					children: "About StudyHub Nepal"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 text-muted-foreground",
					children: "StudyHub Nepal started with a simple frustration: good study material for NEB Class 11 and 12 was scattered across Facebook groups, photocopy shops and broken download links. We put everything — notes, exercise answers, question banks, MCQs, model questions and past papers — in one clean, fast, free place."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-muted-foreground",
					children: "Every resource is organised by class, subject and chapter, reviewed against the current NEB syllabus, and available to read online or download for offline revision."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid gap-5 sm:grid-cols-3",
					children: [
						{
							icon: Target,
							title: "Our mission",
							text: "Make quality study material free for every student in Nepal."
						},
						{
							icon: Users,
							title: "Who we serve",
							text: "Class 11 and Class 12 students across all streams."
						},
						{
							icon: Heart,
							title: "Our promise",
							text: "No paywalls, no clutter, no misleading downloads."
						}
					].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border bg-card p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(c.icon, { className: "h-5 w-5 text-primary" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 text-base font-bold",
								children: c.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: c.text
							})
						]
					}, c.title))
				})
			]
		})
	});
}
//#endregion
export { About as component };
