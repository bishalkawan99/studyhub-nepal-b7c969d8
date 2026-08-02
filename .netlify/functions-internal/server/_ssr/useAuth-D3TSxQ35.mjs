import { r as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as supabase } from "./client-D3rX22rO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useAuth-D3TSxQ35.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var ADMIN_EMAILS = /* @__PURE__ */ new Set(["bishalkawan99@gmail.com"]);
function isAdminEmail(email) {
	if (!email) return false;
	return ADMIN_EMAILS.has(email.trim().toLowerCase());
}
function useAuth() {
	const [session, setSession] = (0, import_react.useState)(null);
	const [isAdmin, setIsAdmin] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		let active = true;
		const loadRole = async (userId, email) => {
			if (!userId) {
				if (active) setIsAdmin(isAdminEmail(email));
				return;
			}
			const { data } = await supabase.from("user_roles").select("role").eq("user_id", userId).eq("role", "admin").maybeSingle();
			if (active) setIsAdmin(Boolean(data) || isAdminEmail(email));
		};
		const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
			setSession(next);
			setLoading(false);
			loadRole(next?.user?.id, next?.user?.email);
		});
		supabase.auth.getSession().then(({ data }) => {
			if (!active) return;
			setSession(data.session);
			setLoading(false);
			loadRole(data.session?.user?.id, data.session?.user?.email);
		});
		return () => {
			active = false;
			sub.subscription.unsubscribe();
		};
	}, []);
	return {
		session,
		user: session?.user ?? null,
		isAdmin,
		loading
	};
}
//#endregion
export { useAuth as t };
