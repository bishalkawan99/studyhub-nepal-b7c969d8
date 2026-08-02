import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, i as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Search } from "../_libs/lucide-react.mjs";
import { s as searchIndex } from "./study-data-BfOlECnh.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SearchBar-B90v3azH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SearchBar({ placeholder = "Search subject, chapter, notes, MCQs…" }) {
	const [q, setQ] = (0, import_react.useState)("");
	const results = (0, import_react.useMemo)(() => {
		const term = q.trim().toLowerCase();
		if (term.length < 2) return [];
		return searchIndex.filter((r) => r.label.toLowerCase().includes(term)).slice(0, 8);
	}, [q]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative w-full max-w-2xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass flex items-center gap-3 rounded-2xl px-4 py-3 shadow-soft",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-5 w-5 shrink-0 text-muted-foreground" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder,
					"aria-label": "Search study material",
					className: "min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
					className: "hidden shrink-0 rounded-md border border-border px-2 py-1 text-[10px] text-muted-foreground sm:block",
					children: "Instant"
				})
			]
		}), results.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "absolute z-40 mt-2 w-full overflow-hidden rounded-2xl border border-border bg-popover shadow-soft animate-fade-in",
			children: results.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: r.to,
				onClick: () => setQ(""),
				className: "flex items-center justify-between gap-3 px-4 py-3 text-sm transition-colors hover:bg-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate",
					children: r.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "shrink-0 rounded-full bg-muted px-2 py-0.5 text-[10px] uppercase text-muted-foreground",
					children: r.type
				})]
			}) }, i))
		})]
	});
}
//#endregion
export { SearchBar as t };
