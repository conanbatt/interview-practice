import { join } from "path";
import fs from "fs/promises";
export async function flatReaddir(dir, includes) {
    const dirents = await fs.opendir(dir);
    const result = [];
    for await (const part of dirents){
        let shouldOmit = part.isDirectory() || !includes.some((include)=>include.test(part.name));
        if (part.isSymbolicLink()) {
            const stats = await fs.stat(join(dir, part.name));
            shouldOmit = stats.isDirectory();
        }
        if (!shouldOmit) {
            result.push(join(dir, part.name));
        }
    }
    return result;
}

//# sourceMappingURL=flat-readdir.js.map