#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "nextDev", {
    enumerable: true,
    get: function() {
        return nextDev;
    }
});
const _utils = require("../server/lib/utils");
const _log = /*#__PURE__*/ _interop_require_wildcard(require("../build/output/log"));
const _getprojectdir = require("../lib/get-project-dir");
const _constants = require("../shared/lib/constants");
const _path = /*#__PURE__*/ _interop_require_default(require("path"));
const _configshared = require("../server/config-shared");
const _shared = require("../trace/shared");
const _storage = require("../telemetry/storage");
const _config = /*#__PURE__*/ _interop_require_default(require("../server/config"));
const _findpagesdir = require("../lib/find-pages-dir");
const _findroot = require("../lib/find-root");
const _fileexists = require("../lib/file-exists");
const _getnpxcommand = require("../lib/helpers/get-npx-command");
const _watchpack = /*#__PURE__*/ _interop_require_default(require("watchpack"));
const _env = require("@next/env");
const _getvalidatedargs = require("../lib/get-validated-args");
const _jestworker = require("next/dist/compiled/jest-worker");
const _isnodedebugging = require("../server/lib/is-node-debugging");
const _uploadtrace = /*#__PURE__*/ _interop_require_default(require("../trace/upload-trace"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
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
let dir;
let config;
let isTurboSession = false;
let traceUploadUrl;
let sessionStopHandled = false;
let sessionStarted = Date.now();
const handleSessionStop = async ()=>{
    if (sessionStopHandled) return;
    sessionStopHandled = true;
    try {
        const { eventCliSessionStopped  } = require("../telemetry/events/session-stopped");
        config = config || await (0, _config.default)(_constants.PHASE_DEVELOPMENT_SERVER, dir, undefined, undefined, true);
        let telemetry = _shared.traceGlobals.get("telemetry") || new _storage.Telemetry({
            distDir: _path.default.join(dir, config.distDir)
        });
        let pagesDir = !!_shared.traceGlobals.get("pagesDir");
        let appDir = !!_shared.traceGlobals.get("appDir");
        if (typeof _shared.traceGlobals.get("pagesDir") === "undefined" || typeof _shared.traceGlobals.get("appDir") === "undefined") {
            const pagesResult = (0, _findpagesdir.findPagesDir)(dir, true);
            appDir = !!pagesResult.appDir;
            pagesDir = !!pagesResult.pagesDir;
        }
        telemetry.record(eventCliSessionStopped({
            cliCommand: "dev",
            turboFlag: isTurboSession,
            durationMilliseconds: Date.now() - sessionStarted,
            pagesDir,
            appDir
        }), true);
        telemetry.flushDetached("dev", dir);
    } catch (_) {
    // errors here aren't actionable so don't add
    // noise to the output
    }
    if (traceUploadUrl) {
        (0, _uploadtrace.default)({
            traceUploadUrl,
            mode: "dev",
            isTurboSession,
            projectDir: dir,
            distDir: config.distDir
        });
    }
    // ensure we re-enable the terminal cursor before exiting
    // the program, or the cursor could remain hidden
    process.stdout.write("\x1b[?25h");
    process.stdout.write("\n");
    process.exit(0);
};
process.on("SIGINT", handleSessionStop);
process.on("SIGTERM", handleSessionStop);
function watchConfigFiles(dirToWatch, onChange) {
    const wp = new _watchpack.default();
    wp.watch({
        files: _constants.CONFIG_FILES.map((file)=>_path.default.join(dirToWatch, file))
    });
    wp.on("change", onChange);
}
async function createRouterWorker() {
    var _worker__workerPool;
    const isNodeDebugging = (0, _isnodedebugging.checkIsNodeDebugging)();
    const worker = new _jestworker.Worker(require.resolve("../server/lib/start-server"), {
        numWorkers: 1,
        // TODO: do we want to allow more than 8 OOM restarts?
        maxRetries: 8,
        forkOptions: {
            execArgv: await (0, _utils.genRouterWorkerExecArgv)(isNodeDebugging === undefined ? false : isNodeDebugging),
            env: {
                FORCE_COLOR: "1",
                ..._env.initialEnv,
                NODE_OPTIONS: (0, _utils.getNodeOptionsWithoutInspect)(),
                ...process.env.NEXT_CPU_PROF ? {
                    __NEXT_PRIVATE_CPU_PROFILE: `CPU.router`
                } : {},
                WATCHPACK_WATCHER_LIMIT: "20",
                EXPERIMENTAL_TURBOPACK: process.env.EXPERIMENTAL_TURBOPACK
            }
        },
        exposedMethods: [
            "startServer"
        ]
    });
    const cleanup = ()=>{
        var _worker__workerPool;
        for (const curWorker of ((_worker__workerPool = worker._workerPool) == null ? void 0 : _worker__workerPool._workers) || []){
            var _curWorker__child;
            (_curWorker__child = curWorker._child) == null ? void 0 : _curWorker__child.kill("SIGINT");
        }
        process.exit(0);
    };
    // If the child routing worker exits we need to exit the entire process
    for (const curWorker of ((_worker__workerPool = worker._workerPool) == null ? void 0 : _worker__workerPool._workers) || []){
        var _curWorker__child;
        (_curWorker__child = curWorker._child) == null ? void 0 : _curWorker__child.on("exit", cleanup);
    }
    process.on("exit", cleanup);
    process.on("SIGINT", cleanup);
    process.on("SIGTERM", cleanup);
    process.on("uncaughtException", cleanup);
    process.on("unhandledRejection", cleanup);
    const workerStdout = worker.getStdout();
    const workerStderr = worker.getStderr();
    workerStdout.on("data", (data)=>{
        process.stdout.write(data);
    });
    workerStderr.on("data", (data)=>{
        process.stderr.write(data);
    });
    return {
        worker,
        cleanup: async ()=>{
            process.off("exit", cleanup);
            process.off("SIGINT", cleanup);
            process.off("SIGTERM", cleanup);
            process.off("uncaughtException", cleanup);
            process.off("unhandledRejection", cleanup);
            await worker.end();
        }
    };
}
const nextDev = async (argv)=>{
    const validArgs = {
        // Types
        "--help": Boolean,
        "--port": Number,
        "--hostname": String,
        "--turbo": Boolean,
        "--experimental-turbo": Boolean,
        "--experimental-test-proxy": Boolean,
        "--experimental-upload-trace": String,
        // To align current messages with native binary.
        // Will need to adjust subcommand later.
        "--show-all": Boolean,
        "--root": String,
        // Aliases
        "-h": "--help",
        "-p": "--port",
        "-H": "--hostname"
    };
    const args = (0, _getvalidatedargs.getValidatedArgs)(validArgs, argv);
    if (args["--help"]) {
        console.log(`
      Description
        Starts the application in development mode (hot-code reloading, error
        reporting, etc.)

      Usage
        $ next dev <dir> -p <port number>

      <dir> represents the directory of the Next.js application.
      If no directory is provided, the current directory will be used.

      Options
        --port, -p      A port number on which to start the application
        --hostname, -H  Hostname on which to start the application (default: 0.0.0.0)
        --experimental-upload-trace=<trace-url>  [EXPERIMENTAL] Report a subset of the debugging trace to a remote http url. Includes sensitive data. Disabled by default and url must be provided.
        --help, -h      Displays this message
    `);
        process.exit(0);
    }
    dir = (0, _getprojectdir.getProjectDir)(process.env.NEXT_PRIVATE_DEV_DIR || args._[0]);
    // Check if pages dir exists and warn if not
    if (!await (0, _fileexists.fileExists)(dir, _fileexists.FileType.Directory)) {
        (0, _utils.printAndExit)(`> No such directory exists as the project root: ${dir}`);
    }
    async function preflight(skipOnReboot) {
        const { getPackageVersion , getDependencies  } = await Promise.resolve(require("../lib/get-package-version"));
        const [sassVersion, nodeSassVersion] = await Promise.all([
            getPackageVersion({
                cwd: dir,
                name: "sass"
            }),
            getPackageVersion({
                cwd: dir,
                name: "node-sass"
            })
        ]);
        if (sassVersion && nodeSassVersion) {
            _log.warn("Your project has both `sass` and `node-sass` installed as dependencies, but should only use one or the other. " + "Please remove the `node-sass` dependency from your project. " + " Read more: https://nextjs.org/docs/messages/duplicate-sass");
        }
        if (!skipOnReboot) {
            const { dependencies , devDependencies  } = await getDependencies({
                cwd: dir
            });
            // Warn if @next/font is installed as a dependency. Ignore `workspace:*` to not warn in the Next.js monorepo.
            if (dependencies["@next/font"] || devDependencies["@next/font"] && devDependencies["@next/font"] !== "workspace:*") {
                const command = (0, _getnpxcommand.getNpxCommand)(dir);
                _log.warn("Your project has `@next/font` installed as a dependency, please use the built-in `next/font` instead. " + "The `@next/font` package will be removed in Next.js 14. " + `You can migrate by running \`${command} @next/codemod@latest built-in-next-font .\`. Read more: https://nextjs.org/docs/messages/built-in-next-font`);
            }
        }
    }
    const port = (0, _utils.getPort)(args);
    // If neither --port nor PORT were specified, it's okay to retry new ports.
    const allowRetry = args["--port"] === undefined && process.env.PORT === undefined;
    // We do not set a default host value here to prevent breaking
    // some set-ups that rely on listening on other interfaces
    const host = args["--hostname"];
    config = await (0, _config.default)(_constants.PHASE_DEVELOPMENT_SERVER, dir);
    const isExperimentalTestProxy = args["--experimental-test-proxy"];
    if (args["--experimental-upload-trace"]) {
        traceUploadUrl = args["--experimental-upload-trace"];
    }
    const devServerOptions = {
        dir,
        port,
        allowRetry,
        isDev: true,
        hostname: host,
        isExperimentalTestProxy
    };
    if (args["--turbo"]) {
        process.env.TURBOPACK = "1";
    }
    if (args["--experimental-turbo"]) {
        process.env.EXPERIMENTAL_TURBOPACK = "1";
    }
    if (process.env.TURBOPACK) {
        var _rawNextConfig_experimental, _defaultConfig_experimental, _rawNextConfig_experimental1;
        isTurboSession = true;
        const { validateTurboNextConfig  } = require("../lib/turbopack-warning");
        const { loadBindings , __isCustomTurbopackBinary , teardownHeapProfiler  } = require("../build/swc");
        const { eventCliSession  } = require("../telemetry/events/version");
        const { setGlobal  } = require("../trace");
        require("../telemetry/storage");
        const findUp = require("next/dist/compiled/find-up");
        const isCustomTurbopack = await __isCustomTurbopackBinary();
        const rawNextConfig = await validateTurboNextConfig({
            isCustomTurbopack,
            ...devServerOptions,
            isDev: true
        });
        const distDir = _path.default.join(dir, rawNextConfig.distDir || ".next");
        const { pagesDir , appDir  } = (0, _findpagesdir.findPagesDir)(dir, typeof (rawNextConfig == null ? void 0 : (_rawNextConfig_experimental = rawNextConfig.experimental) == null ? void 0 : _rawNextConfig_experimental.appDir) === "undefined" ? !!((_defaultConfig_experimental = _configshared.defaultConfig.experimental) == null ? void 0 : _defaultConfig_experimental.appDir) : !!((_rawNextConfig_experimental1 = rawNextConfig.experimental) == null ? void 0 : _rawNextConfig_experimental1.appDir));
        const telemetry = new _storage.Telemetry({
            distDir
        });
        setGlobal("appDir", appDir);
        setGlobal("pagesDir", pagesDir);
        setGlobal("telemetry", telemetry);
        if (!isCustomTurbopack) {
            telemetry.record(eventCliSession(distDir, rawNextConfig, {
                webpackVersion: 5,
                cliCommand: "dev",
                isSrcDir: _path.default.relative(dir, pagesDir || appDir || "").startsWith("src"),
                hasNowJson: !!await findUp("now.json", {
                    cwd: dir
                }),
                isCustomServer: false,
                turboFlag: true,
                pagesDir: !!pagesDir,
                appDir: !!appDir
            }));
        }
        // Turbopack need to be in control over reading the .env files and watching them.
        // So we need to start with a initial env to know which env vars are coming from the user.
        (0, _env.resetEnv)();
        let bindings = await loadBindings();
        let server = bindings.turbo.startDev({
            ...devServerOptions,
            showAll: args["--show-all"] ?? false,
            root: args["--root"] ?? (0, _findroot.findRootDir)(dir)
        });
        // Start preflight after server is listening and ignore errors:
        preflight(false).catch(()=>{});
        if (!isCustomTurbopack) {
            await telemetry.flush();
        }
        [
            "SIGTERM",
            "SIGINT",
            "beforeExit",
            "exit"
        ].forEach((event)=>process.on(event, ()=>teardownHeapProfiler()));
        return server;
    } else {
        const runDevServer = async (reboot)=>{
            try {
                const workerInit = await createRouterWorker();
                await workerInit.worker.startServer(devServerOptions);
                await preflight(reboot);
                return {
                    cleanup: workerInit.cleanup
                };
            } catch (err) {
                console.error(err);
                process.exit(1);
            }
        };
        let runningServer;
        watchConfigFiles(devServerOptions.dir, async (filename)=>{
            if (process.env.__NEXT_DISABLE_MEMORY_WATCHER) {
                _log.info(`Detected change, manual restart required due to '__NEXT_DISABLE_MEMORY_WATCHER' usage`);
                return;
            }
            _log.warn(`\n> Found a change in ${_path.default.basename(filename)}. Restarting the server to apply the changes...`);
            try {
                if (runningServer) {
                    await runningServer.cleanup();
                }
                runningServer = await runDevServer(true);
            } catch (err) {
                console.error(err);
                process.exit(1);
            }
        });
        runningServer = await runDevServer(false);
    }
};

//# sourceMappingURL=next-dev.js.map