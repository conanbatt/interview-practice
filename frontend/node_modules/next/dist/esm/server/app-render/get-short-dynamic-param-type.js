export const dynamicParamTypes = {
    catchall: "c",
    "optional-catchall": "oc",
    dynamic: "d"
};
/**
 * Shorten the dynamic param in order to make it smaller when transmitted to the browser.
 */ export function getShortDynamicParamType(type) {
    const short = dynamicParamTypes[type];
    if (!short) {
        throw new Error("Unknown dynamic param type");
    }
    return short;
}

//# sourceMappingURL=get-short-dynamic-param-type.js.map