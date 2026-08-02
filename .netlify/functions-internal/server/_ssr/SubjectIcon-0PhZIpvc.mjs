import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { $ as BookOpen, A as Laptop, F as FlaskConical, H as Dna, J as ChartLine, X as Calculator, Z as Briefcase, _ as Receipt, et as Atom, y as PenLine } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SubjectIcon-0PhZIpvc.js
var import_jsx_runtime = require_jsx_runtime();
var map = {
	nepali: BookOpen,
	english: PenLine,
	mathematics: Calculator,
	physics: Atom,
	chemistry: FlaskConical,
	biology: Dna,
	computer: Laptop,
	accountancy: Receipt,
	economics: ChartLine,
	business: Briefcase
};
function SubjectIcon({ slug, className = "h-5 w-5" }) {
	const Icon = map[slug] ?? BookOpen;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className });
}
//#endregion
export { SubjectIcon as t };
