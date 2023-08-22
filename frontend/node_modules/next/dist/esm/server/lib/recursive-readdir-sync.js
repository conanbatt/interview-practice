import fs from "fs";
import { sep } from "path";
/**
 * Recursively read directory
 * Returns array holding all relative paths
 */ export function recursiveReadDirSync(/** The directory to read */ dir, /** This doesn't have to be provided, it's used for the recursion */ arr = [], /** Used to remove the initial path suffix and leave only the relative, faster than path.relative. */ rootDirLength = dir.length) {
    // Use opendirSync for better memory usage
    const result = fs.opendirSync(dir);
    let part;
    while(part = result.readSync()){
        const absolutePath = dir + sep + part.name;
        if (part.isDirectory()) {
            recursiveReadDirSync(absolutePath, arr, rootDirLength);
        } else {
            arr.push(absolutePath.slice(rootDirLength));
        }
    }
    result.closeSync();
    return arr;
}

//# sourceMappingURL=recursive-readdir-sync.js.map