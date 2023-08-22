import { readFileSync } from "fs";
const cache = new Map();
export function loadManifest(path, shouldCache = true) {
    const cached = shouldCache && cache.get(path);
    if (cached) {
        return cached;
    }
    const manifest = JSON.parse(readFileSync(path, "utf8"));
    if (shouldCache) {
        cache.set(path, manifest);
    }
    return manifest;
}
export function clearManifestCache(path) {
    return cache.delete(path);
}

//# sourceMappingURL=load-manifest.js.map