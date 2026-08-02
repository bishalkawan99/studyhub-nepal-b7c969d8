import { i as getSubject } from "./study-data-BfOlECnh.mjs";
import { P as notFound, f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/subject._classId._slug-IbbqKntf.js
var $$splitComponentImporter = () => import("./subject._classId._slug-CHjxlVv-.mjs");
var Route = createFileRoute("/subject/$classId/$slug")({
	loader: ({ params }) => {
		const subject = getSubject(params.slug);
		if (!subject) throw notFound();
		return {
			subject,
			classId: params.classId
		};
	},
	head: ({ params }) => {
		const name = getSubject(params.slug)?.name ?? "Subject";
		const title = `Class ${params.classId} ${name} Notes & Solutions — StudyHub Nepal`;
		const description = `Chapter notes, exercise answers, MCQs, model questions and past papers for Class ${params.classId} ${name}.`;
		return { meta: [
			{ title },
			{
				name: "description",
				content: description
			},
			{
				property: "og:title",
				content: title
			},
			{
				property: "og:description",
				content: description
			}
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
