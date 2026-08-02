globalThis.__nitro_main__ = import.meta.url;
import { a as toEventHandler, i as defineLazyEventHandler, n as HTTPError, r as defineHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { i as withoutTrailingSlash, n as joinURL, r as withLeadingSlash, t as decodePath } from "./_libs/ufo.mjs";
import { r as NodeResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.png": {
		"type": "image/png",
		"etag": "\"165e-i0Unu0n9S6KshWlwMC/9K6EyARY\"",
		"mtime": "2026-08-02T02:31:18.934Z",
		"size": 5726,
		"path": "../../../dist/favicon.png"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"ae-hLVBrSrDdpIw3Xl0dJPRkupPepQ\"",
		"mtime": "2026-08-02T02:31:18.934Z",
		"size": 174,
		"path": "../../../dist/robots.txt"
	},
	"/assets/about-CwbvrRbW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7f9-sCHawwSE8q6rSPKG5HqLj5WN7Xo\"",
		"mtime": "2026-08-02T10:04:20.047Z",
		"size": 2041,
		"path": "../../../dist/assets/about-CwbvrRbW.js"
	},
	"/assets/admin-DccTep5d.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6c19-7avbUXiRQ148qjU7HAgi9KczqgE\"",
		"mtime": "2026-08-02T10:04:20.047Z",
		"size": 27673,
		"path": "../../../dist/assets/admin-DccTep5d.js"
	},
	"/assets/auth-CG_bB3D5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1612-8tOB4vbyq+VAZOqvdqalshykNuU\"",
		"mtime": "2026-08-02T10:04:20.047Z",
		"size": 5650,
		"path": "../../../dist/assets/auth-CG_bB3D5.js"
	},
	"/assets/blog-ByWKjA50.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"55c-+JJGa3ZvlRU1GKFQg46mdbJwmy0\"",
		"mtime": "2026-08-02T10:04:20.047Z",
		"size": 1372,
		"path": "../../../dist/assets/blog-ByWKjA50.js"
	},
	"/assets/bookmark-m6Gl8Iv4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"db-9Pk1JZ2mYoUoZ6+PpmCPOI1dpv8\"",
		"mtime": "2026-08-02T10:04:20.047Z",
		"size": 219,
		"path": "../../../dist/assets/bookmark-m6Gl8Iv4.js"
	},
	"/assets/calculator-BVk2YOcw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"207-CdPIv/XBE0OKCeHqirxMPXEN6GM\"",
		"mtime": "2026-08-02T10:04:20.047Z",
		"size": 519,
		"path": "../../../dist/assets/calculator-BVk2YOcw.js"
	},
	"/assets/circle-x-CX-4EobJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"141-sniUCfEXBQpLTVqYXCMjRt35eBQ\"",
		"mtime": "2026-08-02T10:04:20.047Z",
		"size": 321,
		"path": "../../../dist/assets/circle-x-CX-4EobJ.js"
	},
	"/assets/contact-CqAXT-3y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"145a-aq/Q6e2isyUeoV6wnVtrblZDpTI\"",
		"mtime": "2026-08-02T10:04:20.054Z",
		"size": 5210,
		"path": "../../../dist/assets/contact-CqAXT-3y.js"
	},
	"/assets/dashboard-BxPl9BnC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1400-Km7fdBSp1ZSoVldLSEVdQX0rwgA\"",
		"mtime": "2026-08-02T10:04:20.054Z",
		"size": 5120,
		"path": "../../../dist/assets/dashboard-BxPl9BnC.js"
	},
	"/assets/download-DOYwoHfq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dd-tLxDkINneERdX30CLrMaiV/GoK0\"",
		"mtime": "2026-08-02T10:04:20.054Z",
		"size": 221,
		"path": "../../../dist/assets/download-DOYwoHfq.js"
	},
	"/assets/exercise-answers-Dgo_nk7H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"133-L+xTk2jmqRAQU3t5nkgrzAwhB/o\"",
		"mtime": "2026-08-02T10:04:20.057Z",
		"size": 307,
		"path": "../../../dist/assets/exercise-answers-Dgo_nk7H.js"
	},
	"/assets/file-text-DGHvO-xt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"176-p3JqmdOf2vQyzmkkEIfw6+66cBE\"",
		"mtime": "2026-08-02T10:04:20.058Z",
		"size": 374,
		"path": "../../../dist/assets/file-text-DGHvO-xt.js"
	},
	"/assets/gpa-calculator-4KsE-njO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"462a-TaHF1mj2sPdB2WJ+5k3gv0fHlhU\"",
		"mtime": "2026-08-02T10:04:20.058Z",
		"size": 17962,
		"path": "../../../dist/assets/gpa-calculator-4KsE-njO.js"
	},
	"/assets/jsx-runtime-BkSabwWG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3c1-VkW1xFbt56H2FC99QIi6PTzaFIo\"",
		"mtime": "2026-08-02T10:04:20.060Z",
		"size": 961,
		"path": "../../../dist/assets/jsx-runtime-BkSabwWG.js"
	},
	"/assets/loader-circle-D1UznTL2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"85-rKD/ly20s7qpyKQ4RfLI8F0R2mU\"",
		"mtime": "2026-08-02T10:04:20.062Z",
		"size": 133,
		"path": "../../../dist/assets/loader-circle-D1UznTL2.js"
	},
	"/assets/list-checks-Bwu6WnQO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10c-6wKuJzAkXXlKs2LnYVJ9Fawo9us\"",
		"mtime": "2026-08-02T10:04:20.060Z",
		"size": 268,
		"path": "../../../dist/assets/list-checks-Bwu6WnQO.js"
	},
	"/assets/mcqs-BkjoBbTV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15a9-bRWRA7W4vqjbIACeaEHHHk5/W9s\"",
		"mtime": "2026-08-02T10:04:20.062Z",
		"size": 5545,
		"path": "../../../dist/assets/mcqs-BkjoBbTV.js"
	},
	"/assets/model-questions-BdD-iaQe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"116-cdy4bVR4tBu1g9pAMz33tDcWlOU\"",
		"mtime": "2026-08-02T10:04:20.064Z",
		"size": 278,
		"path": "../../../dist/assets/model-questions-BdD-iaQe.js"
	},
	"/assets/notes-CK6dJIg3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"125-mFLpQa7RZIKMJblrkp1feKAD3g4\"",
		"mtime": "2026-08-02T10:04:20.064Z",
		"size": 293,
		"path": "../../../dist/assets/notes-CK6dJIg3.js"
	},
	"/assets/past-papers-BSXAlcUY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11b-ZrxiY6DeyfOz9mk6sHWidE0J1WQ\"",
		"mtime": "2026-08-02T10:04:20.066Z",
		"size": 283,
		"path": "../../../dist/assets/past-papers-BSXAlcUY.js"
	},
	"/assets/logo-CP0c17H4.png": {
		"type": "image/png",
		"etag": "\"76a34-ribGDTn33wqf1ml9dEyuttwiw50\"",
		"mtime": "2026-08-02T10:04:20.083Z",
		"size": 485940,
		"path": "../../../dist/assets/logo-CP0c17H4.png"
	},
	"/assets/index-Q_OIPNNk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9edbb-pJvqO1grtpICp0fOJMD3pA6H4gQ\"",
		"mtime": "2026-08-02T10:04:20.042Z",
		"size": 650683,
		"path": "../../../dist/assets/index-Q_OIPNNk.js"
	},
	"/assets/hero-students-DVNIYgJi.png": {
		"type": "image/png",
		"etag": "\"11147b-sed6X4gUAMv06E9vhYKxCVHwYUI\"",
		"mtime": "2026-08-02T10:04:20.083Z",
		"size": 1119355,
		"path": "../../../dist/assets/hero-students-DVNIYgJi.png"
	},
	"/assets/privacy-qKnIHd-P.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"31f-sh0wzom3NlfNJFIBWdzEhNeooaU\"",
		"mtime": "2026-08-02T10:04:20.066Z",
		"size": 799,
		"path": "../../../dist/assets/privacy-qKnIHd-P.js"
	},
	"/assets/react-DHmoMYoq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d67-nufvvndhXtiz6VWh8XcPEWVqP1g\"",
		"mtime": "2026-08-02T10:04:20.068Z",
		"size": 7527,
		"path": "../../../dist/assets/react-DHmoMYoq.js"
	},
	"/assets/question-bank-C1Q-6Yh0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"119-NoshBJYmnsHk+q+JaY2D+1Q+uMM\"",
		"mtime": "2026-08-02T10:04:20.068Z",
		"size": 281,
		"path": "../../../dist/assets/question-bank-C1Q-6Yh0.js"
	},
	"/assets/ResourceLibrary-CHe_K_xH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13ea-SBcpoLLGwB8kWYgnWU+wf6Wu8Fg\"",
		"mtime": "2026-08-02T10:04:20.042Z",
		"size": 5098,
		"path": "../../../dist/assets/ResourceLibrary-CHe_K_xH.js"
	},
	"/assets/react-dom-BxDpUDHg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"df6-ejuodxxWRAd8b1iLDQQO5cAmU/Y\"",
		"mtime": "2026-08-02T10:04:20.070Z",
		"size": 3574,
		"path": "../../../dist/assets/react-dom-BxDpUDHg.js"
	},
	"/assets/rotate-ccw-CKY77VzB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bd-TwVLQzYi+HWe0vt+aiHKxp1h+70\"",
		"mtime": "2026-08-02T10:04:20.070Z",
		"size": 189,
		"path": "../../../dist/assets/rotate-ccw-CKY77VzB.js"
	},
	"/assets/route-DDQra15a.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8d-RLBObHr2C21l4GvkAlhWlg6IHJQ\"",
		"mtime": "2026-08-02T10:04:20.072Z",
		"size": 141,
		"path": "../../../dist/assets/route-DDQra15a.js"
	},
	"/assets/routes-bVkswq8p.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24fe-LmARz01Q2EcyrnVXhqKhKYE90+I\"",
		"mtime": "2026-08-02T10:04:20.073Z",
		"size": 9470,
		"path": "../../../dist/assets/routes-bVkswq8p.js"
	},
	"/assets/SearchBar-CT_eQdlf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"693-W+Fe0xDiTNWov/4JQ6vnpxhj1Rw\"",
		"mtime": "2026-08-02T10:04:20.045Z",
		"size": 1683,
		"path": "../../../dist/assets/SearchBar-CT_eQdlf.js"
	},
	"/assets/share-2-CZUzxvgN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"264-BeCDYexXAHyPs9TRRvEEolPoxaA\"",
		"mtime": "2026-08-02T10:04:20.073Z",
		"size": 612,
		"path": "../../../dist/assets/share-2-CZUzxvgN.js"
	},
	"/assets/sparkles-CHmuyB--.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e3-tODmio13nAJMRZK1khipis9OauE\"",
		"mtime": "2026-08-02T10:04:20.075Z",
		"size": 483,
		"path": "../../../dist/assets/sparkles-CHmuyB--.js"
	},
	"/assets/styles-CzmmJhGR.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"14536-Ff7/ibnhUTfrFEdVLkoc1ClActo\"",
		"mtime": "2026-08-02T10:04:20.084Z",
		"size": 83254,
		"path": "../../../dist/assets/styles-CzmmJhGR.css"
	},
	"/assets/subject._classId._slug-BPdHMzf0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2459-kTbl8FuIUYCgOSXErcJObIENMR8\"",
		"mtime": "2026-08-02T10:04:20.075Z",
		"size": 9305,
		"path": "../../../dist/assets/subject._classId._slug-BPdHMzf0.js"
	},
	"/assets/SubjectIcon-Pf_n3PEY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a8a-bhLJ0m7m7+Dtc5oYbe4pA0iGGk0\"",
		"mtime": "2026-08-02T10:04:20.045Z",
		"size": 2698,
		"path": "../../../dist/assets/SubjectIcon-Pf_n3PEY.js"
	},
	"/assets/terms-C-JbwfQK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2f5-DMIklZdI6JIRus/CdC4t1EzQwww\"",
		"mtime": "2026-08-02T10:04:20.077Z",
		"size": 757,
		"path": "../../../dist/assets/terms-C-JbwfQK.js"
	},
	"/assets/trophy-BpsuAGNZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d1-OK3s6DEQHtTUCYpDJm5VPAErVQc\"",
		"mtime": "2026-08-02T10:04:20.078Z",
		"size": 465,
		"path": "../../../dist/assets/trophy-BpsuAGNZ.js"
	},
	"/assets/useQuery-qm3SW9hb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2270-rHQxxulpLNViQb55ryRxtMtHNJM\"",
		"mtime": "2026-08-02T10:04:20.078Z",
		"size": 8816,
		"path": "../../../dist/assets/useQuery-qm3SW9hb.js"
	},
	"/assets/users-B25Lqlhu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"127-4tlbEAcywo0V5V89DGRHMc1ssUA\"",
		"mtime": "2026-08-02T10:04:20.081Z",
		"size": 295,
		"path": "../../../dist/assets/users-B25Lqlhu.js"
	},
	"/assets/useStore-CG-np4nj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4b11-sVE792V2CIDFfQMRdJNcEMoWGo4\"",
		"mtime": "2026-08-02T10:04:20.080Z",
		"size": 19217,
		"path": "../../../dist/assets/useStore-CG-np4nj.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets-node
function readAsset(id) {
	const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
	return promises.readFile(resolve(serverDir, public_assets_data_default[id].path));
}
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
function getAsset(id) {
	return public_assets_data_default[id];
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/static.mjs
var METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
var EncodingMap = {
	gzip: ".gz",
	br: ".br",
	zstd: ".zst"
};
var static_default = defineHandler((event) => {
	if (event.req.method && !METHODS.has(event.req.method)) return;
	let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
	let asset;
	const encodings = [...(event.req.headers.get("accept-encoding") || "").split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
	for (const encoding of encodings) for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
		const _asset = getAsset(_id);
		if (_asset) {
			asset = _asset;
			id = _id;
			break;
		}
	}
	if (!asset) {
		if (isPublicAssetURL(id)) {
			event.res.headers.delete("Cache-Control");
			throw new HTTPError({ status: 404 });
		}
		return;
	}
	if (encodings.length > 1) event.res.headers.append("Vary", "Accept-Encoding");
	if (event.req.headers.get("if-none-match") === asset.etag) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	const ifModifiedSinceH = event.req.headers.get("if-modified-since");
	const mtimeDate = new Date(asset.mtime);
	if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	if (asset.type) event.res.headers.set("Content-Type", asset.type);
	if (asset.etag && !event.res.headers.has("ETag")) event.res.headers.set("ETag", asset.etag);
	if (asset.mtime && !event.res.headers.has("Last-Modified")) event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
	if (asset.encoding && !event.res.headers.has("Content-Encoding")) event.res.headers.set("Content-Encoding", asset.encoding);
	if (asset.size > 0 && !event.res.headers.has("Content-Length")) event.res.headers.set("Content-Length", asset.size.toString());
	return readAsset(id);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_XMsLdW = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_XMsLdW
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
var globalMiddleware = [toEventHandler(static_default)].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~middleware"].push(...globalMiddleware);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		middleware.push(...h3App["~middleware"]);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/netlify/runtime/netlify.mjs
var nitroApp = useNitroApp();
var ONE_YEAR_IN_SECONDS = 31536e3;
var handler = async (req) => {
	req.runtime ??= { name: "netlify" };
	req.ip ??= req.headers.get("x-nf-client-connection-ip") || void 0;
	const response = await nitroApp.fetch(req);
	const isr = (req.context?.routeRules || {})?.isr?.options;
	if (isr) {
		const maxAge = typeof isr === "number" ? isr : ONE_YEAR_IN_SECONDS;
		const revalidateDirective = typeof isr === "number" ? `stale-while-revalidate=${ONE_YEAR_IN_SECONDS}` : "must-revalidate";
		if (!response.headers.has("Cache-Control")) response.headers.set("Cache-Control", "public, max-age=0, must-revalidate");
		response.headers.set("Netlify-CDN-Cache-Control", `public, max-age=${maxAge}, ${revalidateDirective}, durable`);
	}
	return response;
};
//#endregion
export { handler as default };
