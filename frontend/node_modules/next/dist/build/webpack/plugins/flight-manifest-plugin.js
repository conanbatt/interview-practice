/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ClientReferenceManifestPlugin", {
    enumerable: true,
    get: function() {
        return ClientReferenceManifestPlugin;
    }
});
const _path = /*#__PURE__*/ _interop_require_wildcard(require("path"));
const _webpack = require("next/dist/compiled/webpack/webpack");
const _constants = require("../../../shared/lib/constants");
const _buildcontext = require("../../build-context");
const _nonnullable = require("../../../lib/non-nullable");
const _constants1 = require("../../../lib/constants");
const _normalizepagepath = require("../../../shared/lib/page-path/normalize-page-path");
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
const pluginState = (0, _buildcontext.getProxiedPluginState)({
    serverModuleIds: {},
    edgeServerModuleIds: {},
    ASYNC_CLIENT_MODULES: []
});
function getAppPathRequiredChunks(chunkGroup) {
    return chunkGroup.chunks.map((requiredChunk)=>{
        if (_constants.SYSTEM_ENTRYPOINTS.has(requiredChunk.name || "")) {
            return null;
        }
        // Get the actual chunk file names from the chunk file list.
        // It's possible that the chunk is generated via `import()`, in
        // that case the chunk file name will be '[name].[contenthash]'
        // instead of '[name]-[chunkhash]'.
        return [
            ...requiredChunk.files
        ].map((file)=>{
            // It's possible that a chunk also emits CSS files, that will
            // be handled separatedly.
            if (!file.endsWith(".js")) return null;
            if (file.endsWith(".hot-update.js")) return null;
            return requiredChunk.id + ":" + file;
        });
    }).flat().filter(_nonnullable.nonNullable);
}
// Normalize the entry names to their "group names" so a page can easily track
// all the manifest items it needs from parent groups by looking up the group
// segments:
// - app/foo/loading -> app/foo
// - app/foo/page -> app/foo
// - app/(group)/@named/foo/page -> app/foo
// - app/(.)foo/(..)bar/loading -> app/bar
function entryNameToGroupName(entryName) {
    let groupName = entryName.slice(0, entryName.lastIndexOf("/")).replace(/\/@[^/]+/g, "")// Remove the group with lookahead to make sure it's not interception route
    .replace(/\/\([^/]+\)(?=(\/|$))/g, "");
    // Interception routes
    groupName = groupName.replace(/^.+\/\(\.\.\.\)/g, "app/").replace(/\/\(\.\)/g, "/");
    // Interception routes (recursive)
    while(/\/[^/]+\/\(\.\.\)/.test(groupName)){
        groupName = groupName.replace(/\/[^/]+\/\(\.\.\)/g, "/");
    }
    return groupName;
}
function mergeManifest(manifest, manifestToMerge) {
    Object.assign(manifest.clientModules, manifestToMerge.clientModules);
    Object.assign(manifest.ssrModuleMapping, manifestToMerge.ssrModuleMapping);
    Object.assign(manifest.edgeSSRModuleMapping, manifestToMerge.edgeSSRModuleMapping);
    Object.assign(manifest.entryCSSFiles, manifestToMerge.entryCSSFiles);
}
const PLUGIN_NAME = "ClientReferenceManifestPlugin";
class ClientReferenceManifestPlugin {
    constructor(options){
        this.dev = false;
        this.dev = options.dev;
        this.appDir = options.appDir;
        this.appDirBase = _path.default.dirname(this.appDir) + _path.default.sep;
        this.ASYNC_CLIENT_MODULES = new Set(pluginState.ASYNC_CLIENT_MODULES);
    }
    apply(compiler) {
        compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation, { normalModuleFactory  })=>{
            compilation.dependencyFactories.set(_webpack.webpack.dependencies.ModuleDependency, normalModuleFactory);
            compilation.dependencyTemplates.set(_webpack.webpack.dependencies.ModuleDependency, new _webpack.webpack.dependencies.NullDependency.Template());
            compilation.hooks.processAssets.tap({
                name: PLUGIN_NAME,
                // Have to be in the optimize stage to run after updating the CSS
                // asset hash via extract mini css plugin.
                stage: _webpack.webpack.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_HASH
            }, (assets)=>this.createAsset(assets, compilation, compiler.context));
        });
    }
    createAsset(assets, compilation, context) {
        const manifestsPerGroup = new Map();
        const manifestEntryFiles = [];
        compilation.chunkGroups.forEach((chunkGroup)=>{
            // By default it's the shared chunkGroup (main-app) for every page.
            let entryName = "";
            const manifest = {
                ssrModuleMapping: {},
                edgeSSRModuleMapping: {},
                clientModules: {},
                entryCSSFiles: {}
            };
            if (chunkGroup.name && /^app[\\/]/.test(chunkGroup.name)) {
                // Absolute path without the extension
                const chunkEntryName = (this.appDirBase + chunkGroup.name).replace(/[\\/]/g, _path.default.sep);
                manifest.entryCSSFiles[chunkEntryName] = chunkGroup.getFiles().filter((f)=>!f.startsWith("static/css/pages/") && f.endsWith(".css"));
                entryName = chunkGroup.name;
            }
            const requiredChunks = getAppPathRequiredChunks(chunkGroup);
            const recordModule = (id, mod)=>{
                var _mod_resourceResolveData;
                // Skip all modules from the pages folder.
                if (mod.layer !== _constants1.WEBPACK_LAYERS.appPagesBrowser) {
                    return;
                }
                const resource = mod.type === "css/mini-extract" ? mod._identifier.slice(mod._identifier.lastIndexOf("!") + 1) : mod.resource;
                if (!resource) {
                    return;
                }
                const moduleReferences = manifest.clientModules;
                const moduleIdMapping = manifest.ssrModuleMapping;
                const edgeModuleIdMapping = manifest.edgeSSRModuleMapping;
                // Note that this isn't that reliable as webpack is still possible to assign
                // additional queries to make sure there's no conflict even using the `named`
                // module ID strategy.
                let ssrNamedModuleId = (0, _path.relative)(context, ((_mod_resourceResolveData = mod.resourceResolveData) == null ? void 0 : _mod_resourceResolveData.path) || resource);
                if (!ssrNamedModuleId.startsWith(".")) ssrNamedModuleId = `./${ssrNamedModuleId.replace(/\\/g, "/")}`;
                const isAsyncModule = this.ASYNC_CLIENT_MODULES.has(mod.resource);
                // The client compiler will always use the CJS Next.js build, so here we
                // also add the mapping for the ESM build (Edge runtime) to consume.
                const esmResource = /[\\/]next[\\/]dist[\\/]/.test(resource) ? resource.replace(/[\\/]next[\\/]dist[\\/]/, "/next/dist/esm/".replace(/\//g, _path.default.sep)) : null;
                function addClientReference() {
                    const exportName = resource;
                    manifest.clientModules[exportName] = {
                        id,
                        name: "*",
                        chunks: requiredChunks,
                        async: isAsyncModule
                    };
                    if (esmResource) {
                        const edgeExportName = esmResource;
                        manifest.clientModules[edgeExportName] = manifest.clientModules[exportName];
                    }
                }
                function addSSRIdMapping() {
                    const exportName = resource;
                    if (typeof pluginState.serverModuleIds[ssrNamedModuleId] !== "undefined") {
                        moduleIdMapping[id] = moduleIdMapping[id] || {};
                        moduleIdMapping[id]["*"] = {
                            ...manifest.clientModules[exportName],
                            // During SSR, we don't have external chunks to load on the server
                            // side with our architecture of Webpack / Turbopack. We can keep
                            // this field empty to save some bytes.
                            chunks: [],
                            id: pluginState.serverModuleIds[ssrNamedModuleId]
                        };
                    }
                    if (typeof pluginState.edgeServerModuleIds[ssrNamedModuleId] !== "undefined") {
                        edgeModuleIdMapping[id] = edgeModuleIdMapping[id] || {};
                        edgeModuleIdMapping[id]["*"] = {
                            ...manifest.clientModules[exportName],
                            // During SSR, we don't have external chunks to load on the server
                            // side with our architecture of Webpack / Turbopack. We can keep
                            // this field empty to save some bytes.
                            chunks: [],
                            id: pluginState.edgeServerModuleIds[ssrNamedModuleId]
                        };
                    }
                }
                addClientReference();
                addSSRIdMapping();
                manifest.clientModules = moduleReferences;
                manifest.ssrModuleMapping = moduleIdMapping;
                manifest.edgeSSRModuleMapping = edgeModuleIdMapping;
            };
            // Only apply following logic to client module requests from client entry,
            // or if the module is marked as client module. That's because other
            // client modules don't need to be in the manifest at all as they're
            // never be referenced by the server/client boundary.
            // This saves a lot of bytes in the manifest.
            chunkGroup.chunks.forEach((chunk)=>{
                const entryMods = compilation.chunkGraph.getChunkEntryModulesIterable(chunk);
                for (const mod of entryMods){
                    if (mod.layer !== _constants1.WEBPACK_LAYERS.appPagesBrowser) continue;
                    const request = mod.request;
                    if (!request || !request.includes("next-flight-client-entry-loader.js?")) {
                        continue;
                    }
                    const connections = compilation.moduleGraph.getOutgoingConnections(mod);
                    for (const connection of connections){
                        const dependency = connection.dependency;
                        if (!dependency) continue;
                        const clientEntryMod = compilation.moduleGraph.getResolvedModule(dependency);
                        const modId = compilation.chunkGraph.getModuleId(clientEntryMod);
                        if (modId !== null) {
                            recordModule(modId, clientEntryMod);
                        } else {
                            var _connection_module;
                            // If this is a concatenation, register each child to the parent ID.
                            if (((_connection_module = connection.module) == null ? void 0 : _connection_module.constructor.name) === "ConcatenatedModule") {
                                const concatenatedMod = connection.module;
                                const concatenatedModId = compilation.chunkGraph.getModuleId(concatenatedMod);
                                recordModule(concatenatedModId, clientEntryMod);
                            }
                        }
                    }
                }
            });
            // A page's entry name can have extensions. For example, these are both valid:
            // - app/foo/page
            // - app/foo/page.page
            if (/\/page(\.[^/]+)?$/.test(entryName)) {
                manifestEntryFiles.push(entryName.replace(/\/page(\.[^/]+)?$/, "/page"));
            }
            // Special case for the root not-found page.
            if (/^app\/not-found(\.[^.]+)?$/.test(entryName)) {
                manifestEntryFiles.push("app/not-found");
            }
            const groupName = entryNameToGroupName(entryName);
            if (!manifestsPerGroup.has(groupName)) {
                manifestsPerGroup.set(groupName, []);
            }
            manifestsPerGroup.get(groupName).push(manifest);
        });
        // Generate per-page manifests.
        for (const pageName of manifestEntryFiles){
            const mergedManifest = {
                ssrModuleMapping: {},
                edgeSSRModuleMapping: {},
                clientModules: {},
                entryCSSFiles: {}
            };
            const segments = [
                ...entryNameToGroupName(pageName).split("/"),
                "page"
            ];
            let group = "";
            for (const segment of segments){
                for (const manifest of manifestsPerGroup.get(group) || []){
                    mergeManifest(mergedManifest, manifest);
                }
                group += (group ? "/" : "") + segment;
            }
            const json = JSON.stringify(mergedManifest);
            const pagePath = pageName.replace(/%5F/g, "_");
            const pageBundlePath = (0, _normalizepagepath.normalizePagePath)(pagePath.slice("app".length));
            assets["server/app" + pageBundlePath + "_" + _constants.CLIENT_REFERENCE_MANIFEST + ".js"] = new _webpack.sources.RawSource(`globalThis.__RSC_MANIFEST=(globalThis.__RSC_MANIFEST||{});globalThis.__RSC_MANIFEST[${JSON.stringify(pagePath.slice("app".length))}]=${JSON.stringify(json)}`);
            if (pagePath === "app/not-found") {
                // Create a separate special manifest for the root not-found page.
                assets["server/app/_not-found_" + _constants.CLIENT_REFERENCE_MANIFEST + ".js"] = new _webpack.sources.RawSource(`globalThis.__RSC_MANIFEST=(globalThis.__RSC_MANIFEST||{});globalThis.__RSC_MANIFEST[${JSON.stringify("/_not-found")}]=${JSON.stringify(json)}`);
            }
        }
        pluginState.ASYNC_CLIENT_MODULES = [];
    }
}

//# sourceMappingURL=flight-manifest-plugin.js.map