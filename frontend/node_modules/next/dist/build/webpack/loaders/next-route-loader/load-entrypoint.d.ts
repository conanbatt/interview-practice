/**
 * Load the entrypoint file from the ESM directory and performs string
 * replacements of the template variables specified in the `replacements`
 * argument.
 *
 * For non-string replacements, the template should use the
 * `declare const ${key}: ${type}` syntax. to ensure that the type is correct
 * and the typescript can compile. You may have to use `@ts-expect-error` to
 * handle replacement values that are related to imports.
 *
 * @param entrypoint the entrypoint to load
 * @param replacements the replacements to perform
 * @returns the loaded file with the replacements
 */
export declare function loadEntrypoint(entrypoint: 'pages' | 'pages-api' | 'app-page' | 'app-route', replacements: Record<`VAR_${string}`, string>, injections?: Record<string, string>): Promise<string>;
