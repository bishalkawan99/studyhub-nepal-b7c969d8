import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as blogPosts } from "./study-data-BfOlECnh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog-ChSk-XG_.js
var import_jsx_runtime = require_jsx_runtime();
function Blog() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "hero-surface",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-4 pt-14 lg:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl font-extrabold sm:text-5xl",
				children: "Blog"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-muted-foreground",
				children: "Study tips, exam preparation, career guidance, admissions, scholarships and technology — written for students in Nepal."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto grid max-w-7xl gap-5 px-4 py-12 sm:grid-cols-2 lg:grid-cols-3 lg:px-8",
			children: blogPosts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "lift rounded-2xl border border-border bg-card p-6 animate-fade-up",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-secondary/15 px-3 py-1 text-[11px] font-semibold text-secondary",
							children: p.category
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
							className: "text-[11px] text-muted-foreground",
							children: p.date
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 text-lg font-bold",
						children: p.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: p.excerpt
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-xs font-semibold text-primary",
						children: "Read article →"
					})
				]
			}, p.slug))
		})]
	});
}
//#endregion
export { Blog as component };
