"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/user/route";
exports.ids = ["app/api/user/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "node:async_hooks":
/*!***********************************!*\
  !*** external "node:async_hooks" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("node:async_hooks");

/***/ }),

/***/ "node:crypto":
/*!******************************!*\
  !*** external "node:crypto" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("node:crypto");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fuser%2Froute&page=%2Fapi%2Fuser%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Froute.ts&appDir=C%3A%5CUsers%5CPtahb%5COneDrive%5CDocuments%5Cfind-that-transaction%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CPtahb%5COneDrive%5CDocuments%5Cfind-that-transaction&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fuser%2Froute&page=%2Fapi%2Fuser%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Froute.ts&appDir=C%3A%5CUsers%5CPtahb%5COneDrive%5CDocuments%5Cfind-that-transaction%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CPtahb%5COneDrive%5CDocuments%5Cfind-that-transaction&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Ptahb_OneDrive_Documents_find_that_transaction_src_app_api_user_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/user/route.ts */ \"(rsc)/./src/app/api/user/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/user/route\",\n        pathname: \"/api/user\",\n        filename: \"route\",\n        bundlePath: \"app/api/user/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Ptahb\\\\OneDrive\\\\Documents\\\\find-that-transaction\\\\src\\\\app\\\\api\\\\user\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_Ptahb_OneDrive_Documents_find_that_transaction_src_app_api_user_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/user/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZ1c2VyJTJGcm91dGUmcGFnZT0lMkZhcGklMkZ1c2VyJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGdXNlciUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNQdGFoYiU1Q09uZURyaXZlJTVDRG9jdW1lbnRzJTVDZmluZC10aGF0LXRyYW5zYWN0aW9uJTVDc3JjJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNQdGFoYiU1Q09uZURyaXZlJTVDRG9jdW1lbnRzJTVDZmluZC10aGF0LXRyYW5zYWN0aW9uJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUMyQztBQUN4SDtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlFQUFpRTtBQUN6RTtBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ3VIOztBQUV2SCIsInNvdXJjZXMiOlsid2VicGFjazovL2ZpbmQtdGhhdC10cmFuc2FjdGlvbi8/MzJiYiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxVc2Vyc1xcXFxQdGFoYlxcXFxPbmVEcml2ZVxcXFxEb2N1bWVudHNcXFxcZmluZC10aGF0LXRyYW5zYWN0aW9uXFxcXHNyY1xcXFxhcHBcXFxcYXBpXFxcXHVzZXJcXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL3VzZXIvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS91c2VyXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS91c2VyL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcUHRhaGJcXFxcT25lRHJpdmVcXFxcRG9jdW1lbnRzXFxcXGZpbmQtdGhhdC10cmFuc2FjdGlvblxcXFxzcmNcXFxcYXBwXFxcXGFwaVxcXFx1c2VyXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS91c2VyL3JvdXRlXCI7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHNlcnZlckhvb2tzLFxuICAgICAgICBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fuser%2Froute&page=%2Fapi%2Fuser%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Froute.ts&appDir=C%3A%5CUsers%5CPtahb%5COneDrive%5CDocuments%5Cfind-that-transaction%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CPtahb%5COneDrive%5CDocuments%5Cfind-that-transaction&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/user/route.ts":
/*!***********************************!*\
  !*** ./src/app/api/user/route.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _clerk_nextjs_server__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @clerk/nextjs/server */ \"(rsc)/./node_modules/@clerk/nextjs/dist/esm/app-router/server/auth.js\");\n/* harmony import */ var _clerk_nextjs_server__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @clerk/nextjs/server */ \"(rsc)/./node_modules/@clerk/nextjs/dist/esm/app-router/server/currentUser.js\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./src/lib/db.ts\");\n\n\n\nasync function GET() {\n    try {\n        const { userId } = (0,_clerk_nextjs_server__WEBPACK_IMPORTED_MODULE_2__.auth)();\n        if (!userId) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Unauthorized\"\n            }, {\n                status: 401\n            });\n        }\n        let dbUser = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.user.findUnique({\n            where: {\n                clerkId: userId\n            },\n            include: {\n                _count: {\n                    select: {\n                        statements: true,\n                        transactions: true\n                    }\n                }\n            }\n        });\n        if (!dbUser) {\n            const clerkUser = await (0,_clerk_nextjs_server__WEBPACK_IMPORTED_MODULE_3__.currentUser)();\n            dbUser = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.user.create({\n                data: {\n                    clerkId: userId,\n                    email: clerkUser?.emailAddresses[0]?.emailAddress || \"\",\n                    firstName: clerkUser?.firstName,\n                    lastName: clerkUser?.lastName,\n                    imageUrl: clerkUser?.imageUrl\n                },\n                include: {\n                    _count: {\n                        select: {\n                            statements: true,\n                            transactions: true\n                        }\n                    }\n                }\n            });\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            user: {\n                id: dbUser.id,\n                email: dbUser.email,\n                firstName: dbUser.firstName,\n                lastName: dbUser.lastName,\n                plan: dbUser.plan,\n                statementsUsed: dbUser.statementsUsed,\n                statementsLimit: dbUser.statementsLimit,\n                planExpiresAt: dbUser.planExpiresAt,\n                totalStatements: dbUser._count.statements,\n                totalTransactions: dbUser._count.transactions\n            }\n        });\n    } catch (error) {\n        console.error(\"User error:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: error.message\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS91c2VyL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQTBDO0FBQ2M7QUFDM0I7QUFFdEIsZUFBZUk7SUFDcEIsSUFBSTtRQUNGLE1BQU0sRUFBRUMsTUFBTSxFQUFFLEdBQUdKLDBEQUFJQTtRQUN2QixJQUFJLENBQUNJLFFBQVE7WUFDWCxPQUFPTCxxREFBWUEsQ0FBQ00sSUFBSSxDQUFDO2dCQUFFQyxPQUFPO1lBQWUsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQ3BFO1FBRUEsSUFBSUMsU0FBUyxNQUFNTix1Q0FBRUEsQ0FBQ08sSUFBSSxDQUFDQyxVQUFVLENBQUM7WUFDcENDLE9BQU87Z0JBQUVDLFNBQVNSO1lBQU87WUFDekJTLFNBQVM7Z0JBQ1BDLFFBQVE7b0JBQ05DLFFBQVE7d0JBQUVDLFlBQVk7d0JBQU1DLGNBQWM7b0JBQUs7Z0JBQ2pEO1lBQ0Y7UUFDRjtRQUVBLElBQUksQ0FBQ1QsUUFBUTtZQUNYLE1BQU1VLFlBQVksTUFBTWpCLGlFQUFXQTtZQUNuQ08sU0FBUyxNQUFNTix1Q0FBRUEsQ0FBQ08sSUFBSSxDQUFDVSxNQUFNLENBQUM7Z0JBQzVCQyxNQUFNO29CQUNKUixTQUFTUjtvQkFDVGlCLE9BQU9ILFdBQVdJLGNBQWMsQ0FBQyxFQUFFLEVBQUVDLGdCQUFnQjtvQkFDckRDLFdBQVdOLFdBQVdNO29CQUN0QkMsVUFBVVAsV0FBV087b0JBQ3JCQyxVQUFVUixXQUFXUTtnQkFDdkI7Z0JBQ0FiLFNBQVM7b0JBQ1BDLFFBQVE7d0JBQ05DLFFBQVE7NEJBQUVDLFlBQVk7NEJBQU1DLGNBQWM7d0JBQUs7b0JBQ2pEO2dCQUNGO1lBQ0Y7UUFDRjtRQUVBLE9BQU9sQixxREFBWUEsQ0FBQ00sSUFBSSxDQUFDO1lBQ3ZCSSxNQUFNO2dCQUNKa0IsSUFBSW5CLE9BQU9tQixFQUFFO2dCQUNiTixPQUFPYixPQUFPYSxLQUFLO2dCQUNuQkcsV0FBV2hCLE9BQU9nQixTQUFTO2dCQUMzQkMsVUFBVWpCLE9BQU9pQixRQUFRO2dCQUN6QkcsTUFBTXBCLE9BQU9vQixJQUFJO2dCQUNqQkMsZ0JBQWdCckIsT0FBT3FCLGNBQWM7Z0JBQ3JDQyxpQkFBaUJ0QixPQUFPc0IsZUFBZTtnQkFDdkNDLGVBQWV2QixPQUFPdUIsYUFBYTtnQkFDbkNDLGlCQUFpQnhCLE9BQU9NLE1BQU0sQ0FBQ0UsVUFBVTtnQkFDekNpQixtQkFBbUJ6QixPQUFPTSxNQUFNLENBQUNHLFlBQVk7WUFDL0M7UUFDRjtJQUNGLEVBQUUsT0FBT1gsT0FBWTtRQUNuQjRCLFFBQVE1QixLQUFLLENBQUMsZUFBZUE7UUFDN0IsT0FBT1AscURBQVlBLENBQUNNLElBQUksQ0FBQztZQUFFQyxPQUFPQSxNQUFNNkIsT0FBTztRQUFDLEdBQUc7WUFBRTVCLFFBQVE7UUFBSTtJQUNuRTtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmluZC10aGF0LXRyYW5zYWN0aW9uLy4vc3JjL2FwcC9hcGkvdXNlci9yb3V0ZS50cz84MmU2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJ1xuaW1wb3J0IHsgYXV0aCwgY3VycmVudFVzZXIgfSBmcm9tICdAY2xlcmsvbmV4dGpzL3NlcnZlcidcbmltcG9ydCB7IGRiIH0gZnJvbSAnQC9saWIvZGInXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQoKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyB1c2VySWQgfSA9IGF1dGgoKVxuICAgIGlmICghdXNlcklkKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ1VuYXV0aG9yaXplZCcgfSwgeyBzdGF0dXM6IDQwMSB9KVxuICAgIH1cblxuICAgIGxldCBkYlVzZXIgPSBhd2FpdCBkYi51c2VyLmZpbmRVbmlxdWUoe1xuICAgICAgd2hlcmU6IHsgY2xlcmtJZDogdXNlcklkIH0sXG4gICAgICBpbmNsdWRlOiB7XG4gICAgICAgIF9jb3VudDoge1xuICAgICAgICAgIHNlbGVjdDogeyBzdGF0ZW1lbnRzOiB0cnVlLCB0cmFuc2FjdGlvbnM6IHRydWUgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSlcblxuICAgIGlmICghZGJVc2VyKSB7XG4gICAgICBjb25zdCBjbGVya1VzZXIgPSBhd2FpdCBjdXJyZW50VXNlcigpXG4gICAgICBkYlVzZXIgPSBhd2FpdCBkYi51c2VyLmNyZWF0ZSh7XG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBjbGVya0lkOiB1c2VySWQsXG4gICAgICAgICAgZW1haWw6IGNsZXJrVXNlcj8uZW1haWxBZGRyZXNzZXNbMF0/LmVtYWlsQWRkcmVzcyB8fCAnJyxcbiAgICAgICAgICBmaXJzdE5hbWU6IGNsZXJrVXNlcj8uZmlyc3ROYW1lLFxuICAgICAgICAgIGxhc3ROYW1lOiBjbGVya1VzZXI/Lmxhc3ROYW1lLFxuICAgICAgICAgIGltYWdlVXJsOiBjbGVya1VzZXI/LmltYWdlVXJsLFxuICAgICAgICB9LFxuICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgX2NvdW50OiB7XG4gICAgICAgICAgICBzZWxlY3Q6IHsgc3RhdGVtZW50czogdHJ1ZSwgdHJhbnNhY3Rpb25zOiB0cnVlIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHtcbiAgICAgIHVzZXI6IHtcbiAgICAgICAgaWQ6IGRiVXNlci5pZCxcbiAgICAgICAgZW1haWw6IGRiVXNlci5lbWFpbCxcbiAgICAgICAgZmlyc3ROYW1lOiBkYlVzZXIuZmlyc3ROYW1lLFxuICAgICAgICBsYXN0TmFtZTogZGJVc2VyLmxhc3ROYW1lLFxuICAgICAgICBwbGFuOiBkYlVzZXIucGxhbixcbiAgICAgICAgc3RhdGVtZW50c1VzZWQ6IGRiVXNlci5zdGF0ZW1lbnRzVXNlZCxcbiAgICAgICAgc3RhdGVtZW50c0xpbWl0OiBkYlVzZXIuc3RhdGVtZW50c0xpbWl0LFxuICAgICAgICBwbGFuRXhwaXJlc0F0OiBkYlVzZXIucGxhbkV4cGlyZXNBdCxcbiAgICAgICAgdG90YWxTdGF0ZW1lbnRzOiBkYlVzZXIuX2NvdW50LnN0YXRlbWVudHMsXG4gICAgICAgIHRvdGFsVHJhbnNhY3Rpb25zOiBkYlVzZXIuX2NvdW50LnRyYW5zYWN0aW9ucyxcbiAgICAgIH0sXG4gICAgfSlcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1VzZXIgZXJyb3I6JywgZXJyb3IpXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfSwgeyBzdGF0dXM6IDUwMCB9KVxuICB9XG59XG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiYXV0aCIsImN1cnJlbnRVc2VyIiwiZGIiLCJHRVQiLCJ1c2VySWQiLCJqc29uIiwiZXJyb3IiLCJzdGF0dXMiLCJkYlVzZXIiLCJ1c2VyIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwiY2xlcmtJZCIsImluY2x1ZGUiLCJfY291bnQiLCJzZWxlY3QiLCJzdGF0ZW1lbnRzIiwidHJhbnNhY3Rpb25zIiwiY2xlcmtVc2VyIiwiY3JlYXRlIiwiZGF0YSIsImVtYWlsIiwiZW1haWxBZGRyZXNzZXMiLCJlbWFpbEFkZHJlc3MiLCJmaXJzdE5hbWUiLCJsYXN0TmFtZSIsImltYWdlVXJsIiwiaWQiLCJwbGFuIiwic3RhdGVtZW50c1VzZWQiLCJzdGF0ZW1lbnRzTGltaXQiLCJwbGFuRXhwaXJlc0F0IiwidG90YWxTdGF0ZW1lbnRzIiwidG90YWxUcmFuc2FjdGlvbnMiLCJjb25zb2xlIiwibWVzc2FnZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/user/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/db.ts":
/*!***********************!*\
  !*** ./src/lib/db.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   db: () => (/* binding */ db)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = globalThis;\nconst db = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nif (true) globalForPrisma.prisma = db;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL2RiLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE2QztBQUU3QyxNQUFNQyxrQkFBa0JDO0FBSWpCLE1BQU1DLEtBQUtGLGdCQUFnQkcsTUFBTSxJQUFJLElBQUlKLHdEQUFZQSxHQUFFO0FBRTlELElBQUlLLElBQXlCLEVBQWNKLGdCQUFnQkcsTUFBTSxHQUFHRCIsInNvdXJjZXMiOlsid2VicGFjazovL2ZpbmQtdGhhdC10cmFuc2FjdGlvbi8uL3NyYy9saWIvZGIudHM/OWU0ZiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tICdAcHJpc21hL2NsaWVudCdcblxuY29uc3QgZ2xvYmFsRm9yUHJpc21hID0gZ2xvYmFsVGhpcyBhcyB1bmtub3duIGFzIHtcbiAgcHJpc21hOiBQcmlzbWFDbGllbnQgfCB1bmRlZmluZWRcbn1cblxuZXhwb3J0IGNvbnN0IGRiID0gZ2xvYmFsRm9yUHJpc21hLnByaXNtYSA/PyBuZXcgUHJpc21hQ2xpZW50KClcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPSBkYlxuIl0sIm5hbWVzIjpbIlByaXNtYUNsaWVudCIsImdsb2JhbEZvclByaXNtYSIsImdsb2JhbFRoaXMiLCJkYiIsInByaXNtYSIsInByb2Nlc3MiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/db.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@clerk","vendor-chunks/crypto-js","vendor-chunks/tslib","vendor-chunks/cookie","vendor-chunks/map-obj","vendor-chunks/no-case","vendor-chunks/lower-case","vendor-chunks/snakecase-keys","vendor-chunks/snake-case","vendor-chunks/dot-case"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fuser%2Froute&page=%2Fapi%2Fuser%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Froute.ts&appDir=C%3A%5CUsers%5CPtahb%5COneDrive%5CDocuments%5Cfind-that-transaction%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CPtahb%5COneDrive%5CDocuments%5Cfind-that-transaction&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();