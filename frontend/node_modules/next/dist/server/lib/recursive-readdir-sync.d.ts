/**
 * Recursively read directory
 * Returns array holding all relative paths
 */
export declare function recursiveReadDirSync(
/** The directory to read */
dir: string, 
/** This doesn't have to be provided, it's used for the recursion */
arr?: string[], 
/** Used to remove the initial path suffix and leave only the relative, faster than path.relative. */
rootDirLength?: number): string[];
