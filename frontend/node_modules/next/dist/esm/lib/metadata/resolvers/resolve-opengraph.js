import { resolveAsArrayOrUndefined } from "../generate/utils";
import { getSocialImageFallbackMetadataBase, isStringOrURL, resolveUrl, resolveAbsoluteUrlWithPathname } from "./resolve-url";
import { resolveTitle } from "./resolve-title";
const OgTypeFields = {
    article: [
        "authors",
        "tags"
    ],
    song: [
        "albums",
        "musicians"
    ],
    playlist: [
        "albums",
        "musicians"
    ],
    radio: [
        "creators"
    ],
    video: [
        "actors",
        "directors",
        "writers",
        "tags"
    ],
    basic: [
        "emails",
        "phoneNumbers",
        "faxNumbers",
        "alternateLocale",
        "audio",
        "videos"
    ]
};
export function resolveImages(images, metadataBase) {
    const resolvedImages = resolveAsArrayOrUndefined(images);
    if (!resolvedImages) return resolvedImages;
    const nonNullableImages = [];
    for (const item of resolvedImages){
        if (!item) continue;
        const isItemUrl = isStringOrURL(item);
        const inputUrl = isItemUrl ? item : item.url;
        if (!inputUrl) continue;
        nonNullableImages.push(isItemUrl ? {
            url: resolveUrl(item, metadataBase)
        } : {
            ...item,
            // Update image descriptor url
            url: resolveUrl(item.url, metadataBase)
        });
    }
    return nonNullableImages;
}
function getFieldsByOgType(ogType) {
    switch(ogType){
        case "article":
        case "book":
            return OgTypeFields.article;
        case "music.song":
        case "music.album":
            return OgTypeFields.song;
        case "music.playlist":
            return OgTypeFields.playlist;
        case "music.radio_station":
            return OgTypeFields.radio;
        case "video.movie":
        case "video.episode":
            return OgTypeFields.video;
        default:
            return OgTypeFields.basic;
    }
}
export const resolveOpenGraph = (openGraph, metadataBase, { pathname  }, titleTemplate)=>{
    if (!openGraph) return null;
    function resolveProps(target, og) {
        const ogType = og && "type" in og ? og.type : undefined;
        const keys = getFieldsByOgType(ogType);
        for (const k of keys){
            const key = k;
            if (key in og && key !== "url") {
                const value = og[key];
                if (value) {
                    const arrayValue = resolveAsArrayOrUndefined(value);
                    target[key] = arrayValue;
                }
            }
        }
        const imageMetadataBase = getSocialImageFallbackMetadataBase(metadataBase);
        target.images = resolveImages(og.images, imageMetadataBase);
    }
    const resolved = {
        ...openGraph,
        title: resolveTitle(openGraph.title, titleTemplate)
    };
    resolveProps(resolved, openGraph);
    resolved.url = openGraph.url ? resolveAbsoluteUrlWithPathname(openGraph.url, metadataBase, pathname) : null;
    return resolved;
};
const TwitterBasicInfoKeys = [
    "site",
    "siteId",
    "creator",
    "creatorId",
    "description"
];
export const resolveTwitter = (twitter, metadataBase, titleTemplate)=>{
    var _resolved_images;
    if (!twitter) return null;
    let card = "card" in twitter ? twitter.card : undefined;
    const resolved = {
        ...twitter,
        title: resolveTitle(twitter.title, titleTemplate)
    };
    for (const infoKey of TwitterBasicInfoKeys){
        resolved[infoKey] = twitter[infoKey] || null;
    }
    const imageMetadataBase = getSocialImageFallbackMetadataBase(metadataBase);
    resolved.images = resolveImages(twitter.images, imageMetadataBase);
    card = card || (((_resolved_images = resolved.images) == null ? void 0 : _resolved_images.length) ? "summary_large_image" : "summary");
    resolved.card = card;
    if ("card" in resolved) {
        switch(resolved.card){
            case "player":
                {
                    resolved.players = resolveAsArrayOrUndefined(resolved.players) || [];
                    break;
                }
            case "app":
                {
                    resolved.app = resolved.app || {};
                    break;
                }
            default:
                break;
        }
    }
    return resolved;
};

//# sourceMappingURL=resolve-opengraph.js.map