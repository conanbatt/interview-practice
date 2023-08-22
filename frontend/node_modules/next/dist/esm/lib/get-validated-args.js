import arg from "next/dist/compiled/arg/index.js";
import { printAndExit } from "../server/lib/utils";
import isError from "./is-error";
export function getValidatedArgs(validArgs, argv) {
    let args;
    try {
        args = arg(validArgs, {
            argv
        });
    } catch (error) {
        if (isError(error) && error.code === "ARG_UNKNOWN_OPTION") {
            printAndExit(error.message, 1);
        }
        throw error;
    }
    return args;
}

//# sourceMappingURL=get-validated-args.js.map