var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented, "notImplemented");
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass, "notImplementedClass");

// node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  static {
    __name(this, "PerformanceEntry");
  }
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
var PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
  static {
    __name(this, "PerformanceMark");
  }
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
var PerformanceMeasure = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceMeasure");
  }
  entryType = "measure";
};
var PerformanceResourceTiming = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceResourceTiming");
  }
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
var PerformanceObserverEntryList = class {
  static {
    __name(this, "PerformanceObserverEntryList");
  }
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
var Performance = class {
  static {
    __name(this, "Performance");
  }
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
var PerformanceObserver = class {
  static {
    __name(this, "PerformanceObserver");
  }
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();

// node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
if (!("__unenv__" in performance)) {
  const proto = Performance.prototype;
  for (const key of Object.getOwnPropertyNames(proto)) {
    if (key !== "constructor" && !(key in performance)) {
      const desc = Object.getOwnPropertyDescriptor(proto, key);
      if (desc) {
        Object.defineProperty(performance, key, desc);
      }
    }
  }
}
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";

// node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default = Object.assign(() => {
}, { __unenv__: true });

// node_modules/unenv/dist/runtime/node/console.mjs
var _console = globalThis.console;
var _ignoreErrors = true;
var _stderr = new Writable();
var _stdout = new Writable();
var log = _console?.log ?? noop_default;
var info = _console?.info ?? log;
var trace = _console?.trace ?? info;
var debug = _console?.debug ?? log;
var table = _console?.table ?? log;
var error = _console?.error ?? log;
var warn = _console?.warn ?? error;
var createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
var clear = _console?.clear ?? noop_default;
var count = _console?.count ?? noop_default;
var countReset = _console?.countReset ?? noop_default;
var dir = _console?.dir ?? noop_default;
var dirxml = _console?.dirxml ?? noop_default;
var group = _console?.group ?? noop_default;
var groupEnd = _console?.groupEnd ?? noop_default;
var groupCollapsed = _console?.groupCollapsed ?? noop_default;
var profile = _console?.profile ?? noop_default;
var profileEnd = _console?.profileEnd ?? noop_default;
var time = _console?.time ?? noop_default;
var timeEnd = _console?.timeEnd ?? noop_default;
var timeLog = _console?.timeLog ?? noop_default;
var timeStamp = _console?.timeStamp ?? noop_default;
var Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
var _times = /* @__PURE__ */ new Map();
var _stdoutErrorHandler = noop_default;
var _stderrErrorHandler = noop_default;

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole = globalThis["console"];
var {
  assert,
  clear: clear2,
  // @ts-expect-error undocumented public API
  context,
  count: count2,
  countReset: countReset2,
  // @ts-expect-error undocumented public API
  createTask: createTask2,
  debug: debug2,
  dir: dir2,
  dirxml: dirxml2,
  error: error2,
  group: group2,
  groupCollapsed: groupCollapsed2,
  groupEnd: groupEnd2,
  info: info2,
  log: log2,
  profile: profile2,
  profileEnd: profileEnd2,
  table: table2,
  time: time2,
  timeEnd: timeEnd2,
  timeLog: timeLog2,
  timeStamp: timeStamp2,
  trace: trace2,
  warn: warn2
} = workerdConsole;
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler,
  _stdout,
  _stdoutErrorHandler,
  _times
});
var console_default = workerdConsole;

// node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
globalThis.console = console_default;

// node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
  return BigInt(Date.now() * 1e6);
}, "bigint") });

// node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";

// node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream = class {
  static {
    __name(this, "ReadStream");
  }
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};

// node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream = class {
  static {
    __name(this, "WriteStream");
  }
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir3, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count3, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};

// node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION = "22.14.0";

// node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class _Process extends EventEmitter {
  static {
    __name(this, "Process");
  }
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION}`;
  }
  get versions() {
    return { node: NODE_VERSION };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw createNotImplementedError("process.kill");
  }
  abort() {
    throw createNotImplementedError("process.abort");
  }
  dlopen() {
    throw createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw createNotImplementedError("process.openStdin");
  }
  assert() {
    throw createNotImplementedError("process.assert");
  }
  binding() {
    throw createNotImplementedError("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var workerdProcess = getBuiltinModule("node:process");
var unenvProcess = new Process({
  env: globalProcess.env,
  hrtime,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess.nextTick
});
var { exit, features, platform } = workerdProcess;
var {
  _channel,
  _debugEnd,
  _debugProcess,
  _disconnect,
  _events,
  _eventsCount,
  _exiting,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _handleQueue,
  _kill,
  _linkedBinding,
  _maxListeners,
  _pendingMessage,
  _preload_modules,
  _rawDebug,
  _send,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  arch,
  argv,
  argv0,
  assert: assert2,
  availableMemory,
  binding,
  channel,
  chdir,
  config,
  connected,
  constrainedMemory,
  cpuUsage,
  cwd,
  debugPort,
  disconnect,
  dlopen,
  domain,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exitCode,
  finalization,
  getActiveResourcesInfo,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getMaxListeners,
  getuid,
  hasUncaughtExceptionCaptureCallback,
  hrtime: hrtime3,
  initgroups,
  kill,
  listenerCount,
  listeners,
  loadEnvFile,
  mainModule,
  memoryUsage,
  moduleLoadList,
  nextTick,
  off,
  on,
  once,
  openStdin,
  permission,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  reallyExit,
  ref,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  send,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setMaxListeners,
  setSourceMapsEnabled,
  setuid,
  setUncaughtExceptionCaptureCallback,
  sourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  throwDeprecation,
  title,
  traceDeprecation,
  umask,
  unref,
  uptime,
  version,
  versions
} = unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
var process_default = _process;

// node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// node_modules/hono/dist/compose.js
var compose = /* @__PURE__ */ __name((middleware, onError, onNotFound) => {
  return (context2, next) => {
    let index = -1;
    return dispatch(0);
    async function dispatch(i) {
      if (i <= index) {
        throw new Error("next() called multiple times");
      }
      index = i;
      let res;
      let isError = false;
      let handler;
      if (middleware[i]) {
        handler = middleware[i][0][0];
        context2.req.routeIndex = i;
      } else {
        handler = i === middleware.length && next || void 0;
      }
      if (handler) {
        try {
          res = await handler(context2, () => dispatch(i + 1));
        } catch (err) {
          if (err instanceof Error && onError) {
            context2.error = err;
            res = await onError(err, context2);
            isError = true;
          } else {
            throw err;
          }
        }
      } else {
        if (context2.finalized === false && onNotFound) {
          res = await onNotFound(context2);
        }
      }
      if (res && (context2.finalized === false || isError)) {
        context2.res = res;
      }
      return context2;
    }
    __name(dispatch, "dispatch");
  };
}, "compose");

// node_modules/hono/dist/request/constants.js
var GET_MATCH_RESULT = /* @__PURE__ */ Symbol();

// node_modules/hono/dist/utils/buffer.js
var bufferToFormData = /* @__PURE__ */ __name((arrayBuffer, contentType) => {
  const response = new Response(arrayBuffer, {
    headers: {
      // Normalize the media type (case-insensitive) while keeping parameters like the boundary
      "Content-Type": contentType.replace(/^[^;]+/, (mediaType) => mediaType.toLowerCase())
    }
  });
  return response.formData();
}, "bufferToFormData");

// node_modules/hono/dist/utils/body.js
var isRawRequest = /* @__PURE__ */ __name((request) => "headers" in request, "isRawRequest");
var parseBody = /* @__PURE__ */ __name(async (request, options = /* @__PURE__ */ Object.create(null)) => {
  const { all = false, dot = false } = options;
  const headers = isRawRequest(request) ? request.headers : request.raw.headers;
  const contentType = headers.get("Content-Type");
  const mediaType = contentType?.split(";")[0].trim().toLowerCase();
  if (mediaType === "multipart/form-data" || mediaType === "application/x-www-form-urlencoded") {
    return parseFormData(request, { all, dot });
  }
  return {};
}, "parseBody");
async function parseFormData(request, options) {
  const headers = isRawRequest(request) ? request.headers : request.raw.headers;
  const arrayBuffer = await request.arrayBuffer();
  const formDataPromise = bufferToFormData(arrayBuffer, headers.get("Content-Type") || "");
  if (!isRawRequest(request)) {
    request.bodyCache.formData = formDataPromise;
  }
  const formData = await formDataPromise;
  if (formData) {
    return convertFormDataToBodyData(formData, options);
  }
  return {};
}
__name(parseFormData, "parseFormData");
function convertFormDataToBodyData(formData, options) {
  const form2 = /* @__PURE__ */ Object.create(null);
  formData.forEach((value, key) => {
    const shouldParseAllValues = options.all || key.endsWith("[]");
    if (!shouldParseAllValues) {
      form2[key] = value;
    } else {
      handleParsingAllValues(form2, key, value);
    }
  });
  if (options.dot) {
    Object.entries(form2).forEach(([key, value]) => {
      const shouldParseDotValues = key.includes(".");
      if (shouldParseDotValues) {
        handleParsingNestedValues(form2, key, value);
        delete form2[key];
      }
    });
  }
  return form2;
}
__name(convertFormDataToBodyData, "convertFormDataToBodyData");
var handleParsingAllValues = /* @__PURE__ */ __name((form2, key, value) => {
  if (form2[key] !== void 0) {
    if (Array.isArray(form2[key])) {
      ;
      form2[key].push(value);
    } else {
      form2[key] = [form2[key], value];
    }
  } else {
    if (!key.endsWith("[]")) {
      form2[key] = value;
    } else {
      form2[key] = [value];
    }
  }
}, "handleParsingAllValues");
var handleParsingNestedValues = /* @__PURE__ */ __name((form2, key, value) => {
  if (/(?:^|\.)__proto__\./.test(key)) {
    return;
  }
  let nestedForm = form2;
  const keys = key.split(".");
  keys.forEach((key2, index) => {
    if (index === keys.length - 1) {
      nestedForm[key2] = value;
    } else {
      if (!nestedForm[key2] || typeof nestedForm[key2] !== "object" || Array.isArray(nestedForm[key2]) || nestedForm[key2] instanceof File) {
        nestedForm[key2] = /* @__PURE__ */ Object.create(null);
      }
      nestedForm = nestedForm[key2];
    }
  });
}, "handleParsingNestedValues");

// node_modules/hono/dist/utils/url.js
var splitPath = /* @__PURE__ */ __name((path) => {
  const paths = path.split("/");
  if (paths[0] === "") {
    paths.shift();
  }
  return paths;
}, "splitPath");
var splitRoutingPath = /* @__PURE__ */ __name((routePath) => {
  const { groups, path } = extractGroupsFromPath(routePath);
  const paths = splitPath(path);
  return replaceGroupMarks(paths, groups);
}, "splitRoutingPath");
var extractGroupsFromPath = /* @__PURE__ */ __name((path) => {
  const groups = [];
  path = path.replace(/\{[^}]+\}/g, (match2, index) => {
    const mark = `@${index}`;
    groups.push([mark, match2]);
    return mark;
  });
  return { groups, path };
}, "extractGroupsFromPath");
var replaceGroupMarks = /* @__PURE__ */ __name((paths, groups) => {
  for (let i = groups.length - 1; i >= 0; i--) {
    const [mark] = groups[i];
    for (let j = paths.length - 1; j >= 0; j--) {
      if (paths[j].includes(mark)) {
        paths[j] = paths[j].replace(mark, groups[i][1]);
        break;
      }
    }
  }
  return paths;
}, "replaceGroupMarks");
var patternCache = {};
var getPattern = /* @__PURE__ */ __name((label, next) => {
  if (label === "*") {
    return "*";
  }
  const match2 = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (match2) {
    const cacheKey = `${label}#${next}`;
    if (!patternCache[cacheKey]) {
      if (match2[2]) {
        patternCache[cacheKey] = next && next[0] !== ":" && next[0] !== "*" ? [cacheKey, match2[1], new RegExp(`^${match2[2]}(?=/${next})`)] : [label, match2[1], new RegExp(`^${match2[2]}$`)];
      } else {
        patternCache[cacheKey] = [label, match2[1], true];
      }
    }
    return patternCache[cacheKey];
  }
  return null;
}, "getPattern");
var tryDecode = /* @__PURE__ */ __name((str, decoder) => {
  try {
    return decoder(str);
  } catch {
    return str.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match2) => {
      try {
        return decoder(match2);
      } catch {
        return match2;
      }
    });
  }
}, "tryDecode");
var tryDecodeURI = /* @__PURE__ */ __name((str) => tryDecode(str, decodeURI), "tryDecodeURI");
var getPath = /* @__PURE__ */ __name((request) => {
  const url = request.url;
  const start = url.indexOf("/", url.indexOf(":") + 4);
  let i = start;
  for (; i < url.length; i++) {
    const charCode = url.charCodeAt(i);
    if (charCode === 37) {
      const queryIndex = url.indexOf("?", i);
      const hashIndex = url.indexOf("#", i);
      const end = queryIndex === -1 ? hashIndex === -1 ? void 0 : hashIndex : hashIndex === -1 ? queryIndex : Math.min(queryIndex, hashIndex);
      const path = url.slice(start, end);
      return tryDecodeURI(path.includes("%25") ? path.replace(/%25/g, "%2525") : path);
    } else if (charCode === 63 || charCode === 35) {
      break;
    }
  }
  return url.slice(start, i);
}, "getPath");
var getPathNoStrict = /* @__PURE__ */ __name((request) => {
  const result = getPath(request);
  return result.length > 1 && result.at(-1) === "/" ? result.slice(0, -1) : result;
}, "getPathNoStrict");
var mergePath = /* @__PURE__ */ __name((base, sub, ...rest) => {
  if (rest.length) {
    sub = mergePath(sub, ...rest);
  }
  return `${base?.[0] === "/" ? "" : "/"}${base}${sub === "/" ? "" : `${base?.at(-1) === "/" ? "" : "/"}${sub?.[0] === "/" ? sub.slice(1) : sub}`}`;
}, "mergePath");
var checkOptionalParameter = /* @__PURE__ */ __name((path) => {
  if (path.charCodeAt(path.length - 1) !== 63 || !path.includes(":")) {
    return null;
  }
  const segments = path.split("/");
  const results = [];
  let basePath = "";
  segments.forEach((segment) => {
    if (segment !== "" && !/\:/.test(segment)) {
      basePath += "/" + segment;
    } else if (/\:/.test(segment)) {
      if (/\?/.test(segment)) {
        if (results.length === 0 && basePath === "") {
          results.push("/");
        } else {
          results.push(basePath);
        }
        const optionalSegment = segment.replace("?", "");
        basePath += "/" + optionalSegment;
        results.push(basePath);
      } else {
        basePath += "/" + segment;
      }
    }
  });
  return results.filter((v, i, a) => a.indexOf(v) === i);
}, "checkOptionalParameter");
var _decodeURI = /* @__PURE__ */ __name((value) => {
  if (!/[%+]/.test(value)) {
    return value;
  }
  if (value.indexOf("+") !== -1) {
    value = value.replace(/\+/g, " ");
  }
  return value.indexOf("%") !== -1 ? tryDecode(value, decodeURIComponent_) : value;
}, "_decodeURI");
var _getQueryParam = /* @__PURE__ */ __name((url, key, multiple) => {
  let encoded;
  if (!multiple && key && !/[%+]/.test(key)) {
    let keyIndex2 = url.indexOf("?", 8);
    if (keyIndex2 === -1) {
      return void 0;
    }
    if (!url.startsWith(key, keyIndex2 + 1)) {
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    while (keyIndex2 !== -1) {
      const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
      if (trailingKeyCode === 61) {
        const valueIndex = keyIndex2 + key.length + 2;
        const endIndex = url.indexOf("&", valueIndex);
        return _decodeURI(url.slice(valueIndex, endIndex === -1 ? void 0 : endIndex));
      } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
        return "";
      }
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    encoded = /[%+]/.test(url);
    if (!encoded) {
      return void 0;
    }
  }
  const results = {};
  encoded ??= /[%+]/.test(url);
  let keyIndex = url.indexOf("?", 8);
  while (keyIndex !== -1) {
    const nextKeyIndex = url.indexOf("&", keyIndex + 1);
    let valueIndex = url.indexOf("=", keyIndex);
    if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
      valueIndex = -1;
    }
    let name = url.slice(
      keyIndex + 1,
      valueIndex === -1 ? nextKeyIndex === -1 ? void 0 : nextKeyIndex : valueIndex
    );
    if (encoded) {
      name = _decodeURI(name);
    }
    keyIndex = nextKeyIndex;
    if (name === "") {
      continue;
    }
    let value;
    if (valueIndex === -1) {
      value = "";
    } else {
      value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? void 0 : nextKeyIndex);
      if (encoded) {
        value = _decodeURI(value);
      }
    }
    if (multiple) {
      if (!(results[name] && Array.isArray(results[name]))) {
        results[name] = [];
      }
      ;
      results[name].push(value);
    } else {
      results[name] ??= value;
    }
  }
  return key ? results[key] : results;
}, "_getQueryParam");
var getQueryParam = _getQueryParam;
var getQueryParams = /* @__PURE__ */ __name((url, key) => {
  return _getQueryParam(url, key, true);
}, "getQueryParams");
var decodeURIComponent_ = decodeURIComponent;

// node_modules/hono/dist/request.js
var tryDecodeURIComponent = /* @__PURE__ */ __name((str) => tryDecode(str, decodeURIComponent_), "tryDecodeURIComponent");
var HonoRequest = class {
  static {
    __name(this, "HonoRequest");
  }
  /**
   * `.raw` can get the raw Request object.
   *
   * @see {@link https://hono.dev/docs/api/request#raw}
   *
   * @example
   * ```ts
   * // For Cloudflare Workers
   * app.post('/', async (c) => {
   *   const metadata = c.req.raw.cf?.hostMetadata?
   *   ...
   * })
   * ```
   */
  raw;
  #validatedData;
  // Short name of validatedData
  #matchResult;
  routeIndex = 0;
  /**
   * `.path` can get the pathname of the request.
   *
   * @see {@link https://hono.dev/docs/api/request#path}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const pathname = c.req.path // `/about/me`
   * })
   * ```
   */
  path;
  bodyCache = {};
  constructor(request, path = "/", matchResult = [[]]) {
    this.raw = request;
    this.path = path;
    this.#matchResult = matchResult;
    this.#validatedData = {};
  }
  param(key) {
    return key ? this.#getDecodedParam(key) : this.#getAllDecodedParams();
  }
  #getDecodedParam(key) {
    const paramKey = this.#matchResult[0][this.routeIndex][1][key];
    const param = this.#getParamValue(paramKey);
    return param && /\%/.test(param) ? tryDecodeURIComponent(param) : param;
  }
  #getAllDecodedParams() {
    const decoded = {};
    const keys = Object.keys(this.#matchResult[0][this.routeIndex][1]);
    for (const key of keys) {
      const value = this.#getParamValue(this.#matchResult[0][this.routeIndex][1][key]);
      if (value !== void 0) {
        decoded[key] = /\%/.test(value) ? tryDecodeURIComponent(value) : value;
      }
    }
    return decoded;
  }
  #getParamValue(paramKey) {
    return this.#matchResult[1] ? this.#matchResult[1][paramKey] : paramKey;
  }
  query(key) {
    return getQueryParam(this.url, key);
  }
  queries(key) {
    return getQueryParams(this.url, key);
  }
  header(name) {
    if (name) {
      return this.raw.headers.get(name) ?? void 0;
    }
    const headerData = {};
    this.raw.headers.forEach((value, key) => {
      headerData[key] = value;
    });
    return headerData;
  }
  async parseBody(options) {
    return parseBody(this, options);
  }
  #cachedBody = /* @__PURE__ */ __name((key) => {
    const { bodyCache, raw: raw2 } = this;
    const cachedBody = bodyCache[key];
    if (cachedBody) {
      return cachedBody;
    }
    const anyCachedKey = Object.keys(bodyCache)[0];
    if (anyCachedKey) {
      return bodyCache[anyCachedKey].then((body) => {
        if (anyCachedKey === "json") {
          body = JSON.stringify(body);
        }
        return new Response(body)[key]();
      });
    }
    return bodyCache[key] = raw2[key]();
  }, "#cachedBody");
  /**
   * `.json()` can parse Request body of type `application/json`
   *
   * @see {@link https://hono.dev/docs/api/request#json}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.json()
   * })
   * ```
   */
  json() {
    return this.#cachedBody("text").then((text) => JSON.parse(text));
  }
  /**
   * `.text()` can parse Request body of type `text/plain`
   *
   * @see {@link https://hono.dev/docs/api/request#text}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.text()
   * })
   * ```
   */
  text() {
    return this.#cachedBody("text");
  }
  /**
   * `.arrayBuffer()` parse Request body as an `ArrayBuffer`
   *
   * @see {@link https://hono.dev/docs/api/request#arraybuffer}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.arrayBuffer()
   * })
   * ```
   */
  arrayBuffer() {
    return this.#cachedBody("arrayBuffer");
  }
  /**
   * `.bytes()` parses the request body as a `Uint8Array`.
   *
   * @see {@link https://hono.dev/docs/api/request#bytes}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.bytes()
   * })
   * ```
   */
  bytes() {
    return this.#cachedBody("arrayBuffer").then((buffer) => new Uint8Array(buffer));
  }
  /**
   * Parses the request body as a `Blob`.
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.blob();
   * });
   * ```
   * @see https://hono.dev/docs/api/request#blob
   */
  blob() {
    return this.#cachedBody("blob");
  }
  /**
   * Parses the request body as `FormData`.
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.formData();
   * });
   * ```
   * @see https://hono.dev/docs/api/request#formdata
   */
  formData() {
    return this.#cachedBody("formData");
  }
  /**
   * Adds validated data to the request.
   *
   * @param target - The target of the validation.
   * @param data - The validated data to add.
   */
  addValidatedData(target, data) {
    this.#validatedData[target] = data;
  }
  valid(target) {
    return this.#validatedData[target];
  }
  /**
   * `.url()` can get the request url strings.
   *
   * @see {@link https://hono.dev/docs/api/request#url}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const url = c.req.url // `http://localhost:8787/about/me`
   *   ...
   * })
   * ```
   */
  get url() {
    return this.raw.url;
  }
  /**
   * `.method()` can get the method name of the request.
   *
   * @see {@link https://hono.dev/docs/api/request#method}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const method = c.req.method // `GET`
   * })
   * ```
   */
  get method() {
    return this.raw.method;
  }
  get [GET_MATCH_RESULT]() {
    return this.#matchResult;
  }
  /**
   * `.matchedRoutes()` can return a matched route in the handler
   *
   * @deprecated
   *
   * Use matchedRoutes helper defined in "hono/route" instead.
   *
   * @see {@link https://hono.dev/docs/api/request#matchedroutes}
   *
   * @example
   * ```ts
   * app.use('*', async function logger(c, next) {
   *   await next()
   *   c.req.matchedRoutes.forEach(({ handler, method, path }, i) => {
   *     const name = handler.name || (handler.length < 2 ? '[handler]' : '[middleware]')
   *     console.log(
   *       method,
   *       ' ',
   *       path,
   *       ' '.repeat(Math.max(10 - path.length, 0)),
   *       name,
   *       i === c.req.routeIndex ? '<- respond from here' : ''
   *     )
   *   })
   * })
   * ```
   */
  get matchedRoutes() {
    return this.#matchResult[0].map(([[, route]]) => route);
  }
  /**
   * `routePath()` can retrieve the path registered within the handler
   *
   * @deprecated
   *
   * Use routePath helper defined in "hono/route" instead.
   *
   * @see {@link https://hono.dev/docs/api/request#routepath}
   *
   * @example
   * ```ts
   * app.get('/posts/:id', (c) => {
   *   return c.json({ path: c.req.routePath })
   * })
   * ```
   */
  get routePath() {
    return this.#matchResult[0].map(([[, route]]) => route)[this.routeIndex].path;
  }
};

// node_modules/hono/dist/utils/html.js
var HtmlEscapedCallbackPhase = {
  Stringify: 1,
  BeforeStream: 2,
  Stream: 3
};
var raw = /* @__PURE__ */ __name((value, callbacks) => {
  const escapedString = new String(value);
  escapedString.isEscaped = true;
  escapedString.callbacks = callbacks;
  return escapedString;
}, "raw");
var escapeRe = /[&<>'"]/;
var stringBufferToString = /* @__PURE__ */ __name(async (buffer, callbacks) => {
  let str = "";
  callbacks ||= [];
  const resolvedBuffer = await Promise.all(buffer);
  for (let i = resolvedBuffer.length - 1; ; i--) {
    str += resolvedBuffer[i];
    i--;
    if (i < 0) {
      break;
    }
    let r = resolvedBuffer[i];
    if (typeof r === "object") {
      callbacks.push(...r.callbacks || []);
    }
    const isEscaped = r.isEscaped;
    r = await (typeof r === "object" ? r.toString() : r);
    if (typeof r === "object") {
      callbacks.push(...r.callbacks || []);
    }
    if (r.isEscaped ?? isEscaped) {
      str += r;
    } else {
      const buf = [str];
      escapeToBuffer(r, buf);
      str = buf[0];
    }
  }
  return raw(str, callbacks);
}, "stringBufferToString");
var escapeToBuffer = /* @__PURE__ */ __name((str, buffer) => {
  const match2 = str.search(escapeRe);
  if (match2 === -1) {
    buffer[0] += str;
    return;
  }
  let escape;
  let index;
  let lastIndex = 0;
  for (index = match2; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34:
        escape = "&quot;";
        break;
      case 39:
        escape = "&#39;";
        break;
      case 38:
        escape = "&amp;";
        break;
      case 60:
        escape = "&lt;";
        break;
      case 62:
        escape = "&gt;";
        break;
      default:
        continue;
    }
    buffer[0] += str.substring(lastIndex, index) + escape;
    lastIndex = index + 1;
  }
  buffer[0] += str.substring(lastIndex, index);
}, "escapeToBuffer");
var resolveCallbackSync = /* @__PURE__ */ __name((str) => {
  const callbacks = str.callbacks;
  if (!callbacks?.length) {
    return str;
  }
  const buffer = [str];
  const context2 = {};
  callbacks.forEach((c) => c({ phase: HtmlEscapedCallbackPhase.Stringify, buffer, context: context2 }));
  return buffer[0];
}, "resolveCallbackSync");
var resolveCallback = /* @__PURE__ */ __name(async (str, phase, preserveCallbacks, context2, buffer) => {
  if (typeof str === "object" && !(str instanceof String)) {
    if (!(str instanceof Promise)) {
      str = str.toString();
    }
    if (str instanceof Promise) {
      str = await str;
    }
  }
  const callbacks = str.callbacks;
  if (!callbacks?.length) {
    return Promise.resolve(str);
  }
  if (buffer) {
    buffer[0] += str;
  } else {
    buffer = [str];
  }
  const resStr = Promise.all(callbacks.map((c) => c({ phase, buffer, context: context2 }))).then(
    (res) => Promise.all(
      res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context2, buffer))
    ).then(() => buffer[0])
  );
  if (preserveCallbacks) {
    return raw(await resStr, callbacks);
  } else {
    return resStr;
  }
}, "resolveCallback");

// node_modules/hono/dist/context.js
var TEXT_PLAIN = "text/plain; charset=UTF-8";
var setDefaultContentType = /* @__PURE__ */ __name((contentType, headers) => {
  return {
    "Content-Type": contentType,
    ...headers
  };
}, "setDefaultContentType");
var createResponseInstance = /* @__PURE__ */ __name((body, init) => new Response(body, init), "createResponseInstance");
var Context = class {
  static {
    __name(this, "Context");
  }
  #rawRequest;
  #req;
  /**
   * `.env` can get bindings (environment variables, secrets, KV namespaces, D1 database, R2 bucket etc.) in Cloudflare Workers.
   *
   * @see {@link https://hono.dev/docs/api/context#env}
   *
   * @example
   * ```ts
   * // Environment object for Cloudflare Workers
   * app.get('*', async c => {
   *   const counter = c.env.COUNTER
   * })
   * ```
   */
  env = {};
  #var;
  finalized = false;
  /**
   * `.error` can get the error object from the middleware if the Handler throws an error.
   *
   * @see {@link https://hono.dev/docs/api/context#error}
   *
   * @example
   * ```ts
   * app.use('*', async (c, next) => {
   *   await next()
   *   if (c.error) {
   *     // do something...
   *   }
   * })
   * ```
   */
  error;
  #status;
  #executionCtx;
  #res;
  #layout;
  #renderer;
  #notFoundHandler;
  #preparedHeaders;
  #matchResult;
  #path;
  /**
   * Creates an instance of the Context class.
   *
   * @param req - The Request object.
   * @param options - Optional configuration options for the context.
   */
  constructor(req, options) {
    this.#rawRequest = req;
    if (options) {
      this.#executionCtx = options.executionCtx;
      this.env = options.env;
      this.#notFoundHandler = options.notFoundHandler;
      this.#path = options.path;
      this.#matchResult = options.matchResult;
    }
  }
  /**
   * `.req` is the instance of {@link HonoRequest}.
   */
  get req() {
    this.#req ??= new HonoRequest(this.#rawRequest, this.#path, this.#matchResult);
    return this.#req;
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#event}
   * The FetchEvent associated with the current request.
   *
   * @throws Will throw an error if the context does not have a FetchEvent.
   */
  get event() {
    if (this.#executionCtx && "respondWith" in this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no FetchEvent");
    }
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#executionctx}
   * The ExecutionContext associated with the current request.
   *
   * @throws Will throw an error if the context does not have an ExecutionContext.
   */
  get executionCtx() {
    if (this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no ExecutionContext");
    }
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#res}
   * The Response object for the current request.
   */
  get res() {
    return this.#res ||= createResponseInstance(null, {
      headers: this.#preparedHeaders ??= new Headers()
    });
  }
  /**
   * Sets the Response object for the current request.
   *
   * @param _res - The Response object to set.
   */
  set res(_res) {
    if (this.#res && _res) {
      _res = createResponseInstance(_res.body, _res);
      for (const [k, v] of this.#res.headers.entries()) {
        if (k === "content-type") {
          continue;
        }
        if (k === "set-cookie") {
          const cookies = this.#res.headers.getSetCookie();
          _res.headers.delete("set-cookie");
          for (const cookie of cookies) {
            _res.headers.append("set-cookie", cookie);
          }
        } else {
          _res.headers.set(k, v);
        }
      }
    }
    this.#res = _res;
    this.finalized = true;
  }
  /**
   * `.render()` can create a response within a layout.
   *
   * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
   *
   * @example
   * ```ts
   * app.get('/', (c) => {
   *   return c.render('Hello!')
   * })
   * ```
   */
  render = /* @__PURE__ */ __name((...args) => {
    this.#renderer ??= (content) => this.html(content);
    return this.#renderer(...args);
  }, "render");
  /**
   * Sets the layout for the response.
   *
   * @param layout - The layout to set.
   * @returns The layout function.
   */
  setLayout = /* @__PURE__ */ __name((layout) => this.#layout = layout, "setLayout");
  /**
   * Gets the current layout for the response.
   *
   * @returns The current layout function.
   */
  getLayout = /* @__PURE__ */ __name(() => this.#layout, "getLayout");
  /**
   * `.setRenderer()` can set the layout in the custom middleware.
   *
   * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
   *
   * @example
   * ```tsx
   * app.use('*', async (c, next) => {
   *   c.setRenderer((content) => {
   *     return c.html(
   *       <html>
   *         <body>
   *           <p>{content}</p>
   *         </body>
   *       </html>
   *     )
   *   })
   *   await next()
   * })
   * ```
   */
  setRenderer = /* @__PURE__ */ __name((renderer) => {
    this.#renderer = renderer;
  }, "setRenderer");
  /**
   * `.header()` can set headers.
   *
   * @see {@link https://hono.dev/docs/api/context#header}
   *
   * @example
   * ```ts
   * app.get('/welcome', (c) => {
   *   // Set headers
   *   c.header('X-Message', 'Hello!')
   *   c.header('Content-Type', 'text/plain')
   *
   *   return c.body('Thank you for coming')
   * })
   * ```
   */
  header = /* @__PURE__ */ __name((name, value, options) => {
    if (this.finalized) {
      this.#res = createResponseInstance(this.#res.body, this.#res);
    }
    const headers = this.#res ? this.#res.headers : this.#preparedHeaders ??= new Headers();
    if (value === void 0) {
      headers.delete(name);
    } else if (options?.append) {
      headers.append(name, value);
    } else {
      headers.set(name, value);
    }
  }, "header");
  status = /* @__PURE__ */ __name((status) => {
    this.#status = status;
  }, "status");
  /**
   * `.set()` can set the value specified by the key.
   *
   * @see {@link https://hono.dev/docs/api/context#set-get}
   *
   * @example
   * ```ts
   * app.use('*', async (c, next) => {
   *   c.set('message', 'Hono is hot!!')
   *   await next()
   * })
   * ```
   */
  set = /* @__PURE__ */ __name((key, value) => {
    this.#var ??= /* @__PURE__ */ new Map();
    this.#var.set(key, value);
  }, "set");
  /**
   * `.get()` can use the value specified by the key.
   *
   * @see {@link https://hono.dev/docs/api/context#set-get}
   *
   * @example
   * ```ts
   * app.get('/', (c) => {
   *   const message = c.get('message')
   *   return c.text(`The message is "${message}"`)
   * })
   * ```
   */
  get = /* @__PURE__ */ __name((key) => {
    return this.#var ? this.#var.get(key) : void 0;
  }, "get");
  /**
   * `.var` can access the value of a variable.
   *
   * @see {@link https://hono.dev/docs/api/context#var}
   *
   * @example
   * ```ts
   * const result = c.var.client.oneMethod()
   * ```
   */
  // c.var.propName is a read-only
  get var() {
    if (!this.#var) {
      return {};
    }
    return Object.fromEntries(this.#var);
  }
  #newResponse(data, arg, headers) {
    const responseHeaders = this.#res ? new Headers(this.#res.headers) : this.#preparedHeaders ?? new Headers();
    if (typeof arg === "object" && "headers" in arg) {
      const argHeaders = arg.headers instanceof Headers ? arg.headers : new Headers(arg.headers);
      for (const [key, value] of argHeaders) {
        if (key.toLowerCase() === "set-cookie") {
          responseHeaders.append(key, value);
        } else {
          responseHeaders.set(key, value);
        }
      }
    }
    if (headers) {
      for (const [k, v] of Object.entries(headers)) {
        if (typeof v === "string") {
          responseHeaders.set(k, v);
        } else {
          responseHeaders.delete(k);
          for (const v2 of v) {
            responseHeaders.append(k, v2);
          }
        }
      }
    }
    const status = typeof arg === "number" ? arg : arg?.status ?? this.#status;
    return createResponseInstance(data, { status, headers: responseHeaders });
  }
  newResponse = /* @__PURE__ */ __name((...args) => this.#newResponse(...args), "newResponse");
  /**
   * `.body()` can return the HTTP response.
   * You can set headers with `.header()` and set HTTP status code with `.status`.
   * This can also be set in `.text()`, `.json()` and so on.
   *
   * @see {@link https://hono.dev/docs/api/context#body}
   *
   * @example
   * ```ts
   * app.get('/welcome', (c) => {
   *   // Set headers
   *   c.header('X-Message', 'Hello!')
   *   c.header('Content-Type', 'text/plain')
   *   // Set HTTP status code
   *   c.status(201)
   *
   *   // Return the response body
   *   return c.body('Thank you for coming')
   * })
   * ```
   */
  body = /* @__PURE__ */ __name((data, arg, headers) => this.#newResponse(data, arg, headers), "body");
  /**
   * `.text()` can render text as `Content-Type:text/plain`.
   *
   * @see {@link https://hono.dev/docs/api/context#text}
   *
   * @example
   * ```ts
   * app.get('/say', (c) => {
   *   return c.text('Hello!')
   * })
   * ```
   */
  text = /* @__PURE__ */ __name((text, arg, headers) => {
    return !this.#preparedHeaders && !this.#status && !arg && !headers && !this.finalized ? new Response(text) : this.#newResponse(
      text,
      arg,
      setDefaultContentType(TEXT_PLAIN, headers)
    );
  }, "text");
  /**
   * `.json()` can render JSON as `Content-Type:application/json`.
   *
   * @see {@link https://hono.dev/docs/api/context#json}
   *
   * @example
   * ```ts
   * app.get('/api', (c) => {
   *   return c.json({ message: 'Hello!' })
   * })
   * ```
   */
  json = /* @__PURE__ */ __name((object, arg, headers) => {
    return this.#newResponse(
      JSON.stringify(object),
      arg,
      setDefaultContentType("application/json", headers)
    );
  }, "json");
  html = /* @__PURE__ */ __name((html2, arg, headers) => {
    const res = /* @__PURE__ */ __name((html22) => this.#newResponse(html22, arg, setDefaultContentType("text/html; charset=UTF-8", headers)), "res");
    return typeof html2 === "object" ? resolveCallback(html2, HtmlEscapedCallbackPhase.Stringify, false, {}).then(res) : res(html2);
  }, "html");
  /**
   * `.redirect()` can Redirect, default status code is 302.
   *
   * @see {@link https://hono.dev/docs/api/context#redirect}
   *
   * @example
   * ```ts
   * app.get('/redirect', (c) => {
   *   return c.redirect('/')
   * })
   * app.get('/redirect-permanently', (c) => {
   *   return c.redirect('/', 301)
   * })
   * ```
   */
  redirect = /* @__PURE__ */ __name((location, status) => {
    const locationString = String(location);
    this.header(
      "Location",
      // Multibyes should be encoded
      // eslint-disable-next-line no-control-regex
      !/[^\x00-\xFF]/.test(locationString) ? locationString : encodeURI(locationString)
    );
    return this.newResponse(null, status ?? 302);
  }, "redirect");
  /**
   * `.notFound()` can return the Not Found Response.
   *
   * @see {@link https://hono.dev/docs/api/context#notfound}
   *
   * @example
   * ```ts
   * app.get('/notfound', (c) => {
   *   return c.notFound()
   * })
   * ```
   */
  notFound = /* @__PURE__ */ __name(() => {
    this.#notFoundHandler ??= () => createResponseInstance();
    return this.#notFoundHandler(this);
  }, "notFound");
};

// node_modules/hono/dist/router.js
var METHOD_NAME_ALL = "ALL";
var METHOD_NAME_ALL_LOWERCASE = "all";
var METHODS = ["get", "post", "put", "delete", "options", "patch"];
var MESSAGE_MATCHER_IS_ALREADY_BUILT = "Can not add a route since the matcher is already built.";
var UnsupportedPathError = class extends Error {
  static {
    __name(this, "UnsupportedPathError");
  }
};

// node_modules/hono/dist/utils/constants.js
var COMPOSED_HANDLER = "__COMPOSED_HANDLER";

// node_modules/hono/dist/hono-base.js
var notFoundHandler = /* @__PURE__ */ __name((c) => {
  return c.text("404 Not Found", 404);
}, "notFoundHandler");
var errorHandler = /* @__PURE__ */ __name((err, c) => {
  if ("getResponse" in err) {
    const res = err.getResponse();
    return c.newResponse(res.body, res);
  }
  console.error(err);
  return c.text("Internal Server Error", 500);
}, "errorHandler");
var Hono = class _Hono {
  static {
    __name(this, "_Hono");
  }
  get;
  post;
  put;
  delete;
  options;
  patch;
  all;
  on;
  use;
  /*
    This class is like an abstract class and does not have a router.
    To use it, inherit the class and implement router in the constructor.
  */
  router;
  getPath;
  // Cannot use `#` because it requires visibility at JavaScript runtime.
  _basePath = "/";
  #path = "/";
  routes = [];
  constructor(options = {}) {
    const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
    allMethods.forEach((method) => {
      this[method] = (args1, ...args) => {
        if (typeof args1 === "string") {
          this.#path = args1;
        } else {
          this.#addRoute(method, this.#path, args1);
        }
        args.forEach((handler) => {
          this.#addRoute(method, this.#path, handler);
        });
        return this;
      };
    });
    this.on = (method, path, ...handlers) => {
      for (const p of [path].flat()) {
        this.#path = p;
        for (const m of [method].flat()) {
          handlers.map((handler) => {
            this.#addRoute(m.toUpperCase(), this.#path, handler);
          });
        }
      }
      return this;
    };
    this.use = (arg1, ...handlers) => {
      if (typeof arg1 === "string") {
        this.#path = arg1;
      } else {
        this.#path = "*";
        handlers.unshift(arg1);
      }
      handlers.forEach((handler) => {
        this.#addRoute(METHOD_NAME_ALL, this.#path, handler);
      });
      return this;
    };
    const { strict, ...optionsWithoutStrict } = options;
    Object.assign(this, optionsWithoutStrict);
    this.getPath = strict ?? true ? options.getPath ?? getPath : getPathNoStrict;
  }
  #clone() {
    const clone = new _Hono({
      router: this.router,
      getPath: this.getPath
    });
    clone.errorHandler = this.errorHandler;
    clone.#notFoundHandler = this.#notFoundHandler;
    clone.routes = this.routes;
    return clone;
  }
  #notFoundHandler = notFoundHandler;
  // Cannot use `#` because it requires visibility at JavaScript runtime.
  errorHandler = errorHandler;
  /**
   * `.route()` allows grouping other Hono instance in routes.
   *
   * @see {@link https://hono.dev/docs/api/routing#grouping}
   *
   * @param {string} path - base Path
   * @param {Hono} app - other Hono instance
   * @returns {Hono} routed Hono instance
   *
   * @example
   * ```ts
   * const app = new Hono()
   * const app2 = new Hono()
   *
   * app2.get("/user", (c) => c.text("user"))
   * app.route("/api", app2) // GET /api/user
   * ```
   */
  route(path, app2) {
    const subApp = this.basePath(path);
    app2.routes.map((r) => {
      let handler;
      if (app2.errorHandler === errorHandler) {
        handler = r.handler;
      } else {
        handler = /* @__PURE__ */ __name(async (c, next) => (await compose([], app2.errorHandler)(c, () => r.handler(c, next))).res, "handler");
        handler[COMPOSED_HANDLER] = r.handler;
      }
      subApp.#addRoute(r.method, r.path, handler, r.basePath);
    });
    return this;
  }
  /**
   * `.basePath()` allows base paths to be specified.
   *
   * @see {@link https://hono.dev/docs/api/routing#base-path}
   *
   * @param {string} path - base Path
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * const api = new Hono().basePath('/api')
   * ```
   */
  basePath(path) {
    const subApp = this.#clone();
    subApp._basePath = mergePath(this._basePath, path);
    return subApp;
  }
  /**
   * `.onError()` handles an error and returns a customized Response.
   *
   * @see {@link https://hono.dev/docs/api/hono#error-handling}
   *
   * @param {ErrorHandler} handler - request Handler for error
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * app.onError((err, c) => {
   *   console.error(`${err}`)
   *   return c.text('Custom Error Message', 500)
   * })
   * ```
   */
  onError = /* @__PURE__ */ __name((handler) => {
    this.errorHandler = handler;
    return this;
  }, "onError");
  /**
   * `.notFound()` allows you to customize a Not Found Response.
   *
   * @see {@link https://hono.dev/docs/api/hono#not-found}
   *
   * @param {NotFoundHandler} handler - request handler for not-found
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * app.notFound((c) => {
   *   return c.text('Custom 404 Message', 404)
   * })
   * ```
   */
  notFound = /* @__PURE__ */ __name((handler) => {
    this.#notFoundHandler = handler;
    return this;
  }, "notFound");
  /**
   * `.mount()` allows you to mount applications built with other frameworks into your Hono application.
   *
   * @see {@link https://hono.dev/docs/api/hono#mount}
   *
   * @param {string} path - base Path
   * @param {Function} applicationHandler - other Request Handler
   * @param {MountOptions} [options] - options of `.mount()`
   * @returns {Hono} mounted Hono instance
   *
   * @example
   * ```ts
   * import { Router as IttyRouter } from 'itty-router'
   * import { Hono } from 'hono'
   * // Create itty-router application
   * const ittyRouter = IttyRouter()
   * // GET /itty-router/hello
   * ittyRouter.get('/hello', () => new Response('Hello from itty-router'))
   *
   * const app = new Hono()
   * app.mount('/itty-router', ittyRouter.handle)
   * ```
   *
   * @example
   * ```ts
   * const app = new Hono()
   * // Send the request to another application without modification.
   * app.mount('/app', anotherApp, {
   *   replaceRequest: (req) => req,
   * })
   * ```
   */
  mount(path, applicationHandler, options) {
    let replaceRequest;
    let optionHandler;
    if (options) {
      if (typeof options === "function") {
        optionHandler = options;
      } else {
        optionHandler = options.optionHandler;
        if (options.replaceRequest === false) {
          replaceRequest = /* @__PURE__ */ __name((request) => request, "replaceRequest");
        } else {
          replaceRequest = options.replaceRequest;
        }
      }
    }
    const getOptions = optionHandler ? (c) => {
      const options2 = optionHandler(c);
      return Array.isArray(options2) ? options2 : [options2];
    } : (c) => {
      let executionContext = void 0;
      try {
        executionContext = c.executionCtx;
      } catch {
      }
      return [c.env, executionContext];
    };
    replaceRequest ||= (() => {
      const mergedPath = mergePath(this._basePath, path);
      const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
      return (request) => {
        const url = new URL(request.url);
        url.pathname = this.getPath(request).slice(pathPrefixLength) || "/";
        return new Request(url, request);
      };
    })();
    const handler = /* @__PURE__ */ __name(async (c, next) => {
      const res = await applicationHandler(replaceRequest(c.req.raw), ...getOptions(c));
      if (res) {
        return res;
      }
      await next();
    }, "handler");
    this.#addRoute(METHOD_NAME_ALL, mergePath(path, "*"), handler);
    return this;
  }
  #addRoute(method, path, handler, baseRoutePath) {
    method = method.toUpperCase();
    path = mergePath(this._basePath, path);
    const r = {
      basePath: baseRoutePath !== void 0 ? mergePath(this._basePath, baseRoutePath) : this._basePath,
      path,
      method,
      handler
    };
    this.router.add(method, path, [handler, r]);
    this.routes.push(r);
  }
  #handleError(err, c) {
    if (err instanceof Error) {
      return this.errorHandler(err, c);
    }
    throw err;
  }
  #dispatch(request, executionCtx, env2, method) {
    if (method === "HEAD") {
      return (async () => new Response(null, await this.#dispatch(request, executionCtx, env2, "GET")))();
    }
    const path = this.getPath(request, { env: env2 });
    const matchResult = this.router.match(method, path);
    const c = new Context(request, {
      path,
      matchResult,
      env: env2,
      executionCtx,
      notFoundHandler: this.#notFoundHandler
    });
    if (matchResult[0].length === 1) {
      let res;
      try {
        res = matchResult[0][0][0][0](c, async () => {
          c.res = await this.#notFoundHandler(c);
        });
      } catch (err) {
        return this.#handleError(err, c);
      }
      return res instanceof Promise ? res.then(
        (resolved) => resolved || (c.finalized ? c.res : this.#notFoundHandler(c))
      ).catch((err) => this.#handleError(err, c)) : res ?? this.#notFoundHandler(c);
    }
    const composed = compose(matchResult[0], this.errorHandler, this.#notFoundHandler);
    return (async () => {
      try {
        const context2 = await composed(c);
        if (!context2.finalized) {
          throw new Error(
            "Context is not finalized. Did you forget to return a Response object or `await next()`?"
          );
        }
        return context2.res;
      } catch (err) {
        return this.#handleError(err, c);
      }
    })();
  }
  /**
   * `.fetch()` will be entry point of your app.
   *
   * @see {@link https://hono.dev/docs/api/hono#fetch}
   *
   * @param {Request} request - request Object of request
   * @param {Env} Env - env Object
   * @param {ExecutionContext} - context of execution
   * @returns {Response | Promise<Response>} response of request
   *
   */
  fetch = /* @__PURE__ */ __name((request, ...rest) => {
    return this.#dispatch(request, rest[1], rest[0], request.method);
  }, "fetch");
  /**
   * `.request()` is a useful method for testing.
   * You can pass a URL or pathname to send a GET request.
   * app will return a Response object.
   * ```ts
   * test('GET /hello is ok', async () => {
   *   const res = await app.request('/hello')
   *   expect(res.status).toBe(200)
   * })
   * ```
   * @see https://hono.dev/docs/api/hono#request
   */
  request = /* @__PURE__ */ __name((input2, requestInit, Env, executionCtx) => {
    if (input2 instanceof Request) {
      return this.fetch(requestInit ? new Request(input2, requestInit) : input2, Env, executionCtx);
    }
    input2 = input2.toString();
    return this.fetch(
      new Request(
        /^https?:\/\//.test(input2) ? input2 : `http://localhost${mergePath("/", input2)}`,
        requestInit
      ),
      Env,
      executionCtx
    );
  }, "request");
  /**
   * `.fire()` automatically adds a global fetch event listener.
   * This can be useful for environments that adhere to the Service Worker API, such as non-ES module Cloudflare Workers.
   * @deprecated
   * Use `fire` from `hono/service-worker` instead.
   * ```ts
   * import { Hono } from 'hono'
   * import { fire } from 'hono/service-worker'
   *
   * const app = new Hono()
   * // ...
   * fire(app)
   * ```
   * @see https://hono.dev/docs/api/hono#fire
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
   * @see https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/
   */
  fire = /* @__PURE__ */ __name(() => {
    addEventListener("fetch", (event) => {
      event.respondWith(this.#dispatch(event.request, event, void 0, event.request.method));
    });
  }, "fire");
};

// node_modules/hono/dist/router/reg-exp-router/matcher.js
var emptyParam = [];
function match(method, path) {
  const matchers = this.buildAllMatchers();
  const match2 = /* @__PURE__ */ __name(((method2, path2) => {
    const matcher = matchers[method2] || matchers[METHOD_NAME_ALL];
    const staticMatch = matcher[2][path2];
    if (staticMatch) {
      return staticMatch;
    }
    const match3 = path2.match(matcher[0]);
    if (!match3) {
      return [[], emptyParam];
    }
    const index = match3.indexOf("", 1);
    return [matcher[1][index], match3];
  }), "match2");
  this.match = match2;
  return match2(method, path);
}
__name(match, "match");

// node_modules/hono/dist/router/reg-exp-router/node.js
var LABEL_REG_EXP_STR = "[^/]+";
var ONLY_WILDCARD_REG_EXP_STR = ".*";
var TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
var PATH_ERROR = /* @__PURE__ */ Symbol();
var regExpMetaChars = new Set(".\\+*[^]$()");
function compareKey(a, b) {
  if (a.length === 1) {
    return b.length === 1 ? a < b ? -1 : 1 : -1;
  }
  if (b.length === 1) {
    return 1;
  }
  if (a === ONLY_WILDCARD_REG_EXP_STR || a === TAIL_WILDCARD_REG_EXP_STR) {
    return 1;
  } else if (b === ONLY_WILDCARD_REG_EXP_STR || b === TAIL_WILDCARD_REG_EXP_STR) {
    return -1;
  }
  if (a === LABEL_REG_EXP_STR) {
    return 1;
  } else if (b === LABEL_REG_EXP_STR) {
    return -1;
  }
  return a.length === b.length ? a < b ? -1 : 1 : b.length - a.length;
}
__name(compareKey, "compareKey");
var Node = class _Node {
  static {
    __name(this, "_Node");
  }
  #index;
  #varIndex;
  #children = /* @__PURE__ */ Object.create(null);
  insert(tokens, index, paramMap, context2, pathErrorCheckOnly) {
    if (tokens.length === 0) {
      if (this.#index !== void 0) {
        throw PATH_ERROR;
      }
      if (pathErrorCheckOnly) {
        return;
      }
      this.#index = index;
      return;
    }
    const [token, ...restTokens] = tokens;
    const pattern = token === "*" ? restTokens.length === 0 ? ["", "", ONLY_WILDCARD_REG_EXP_STR] : ["", "", LABEL_REG_EXP_STR] : token === "/*" ? ["", "", TAIL_WILDCARD_REG_EXP_STR] : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let node;
    if (pattern) {
      const name = pattern[1];
      let regexpStr = pattern[2] || LABEL_REG_EXP_STR;
      if (name && pattern[2]) {
        if (regexpStr === ".*") {
          throw PATH_ERROR;
        }
        regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:");
        if (/\((?!\?:)/.test(regexpStr)) {
          throw PATH_ERROR;
        }
      }
      node = this.#children[regexpStr];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k) => k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[regexpStr] = new _Node();
        if (name !== "") {
          node.#varIndex = context2.varIndex++;
        }
      }
      if (!pathErrorCheckOnly && name !== "") {
        paramMap.push([name, node.#varIndex]);
      }
    } else {
      node = this.#children[token];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k) => k.length > 1 && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[token] = new _Node();
      }
    }
    node.insert(restTokens, index, paramMap, context2, pathErrorCheckOnly);
  }
  buildRegExpStr() {
    const childKeys = Object.keys(this.#children).sort(compareKey);
    const strList = childKeys.map((k) => {
      const c = this.#children[k];
      return (typeof c.#varIndex === "number" ? `(${k})@${c.#varIndex}` : regExpMetaChars.has(k) ? `\\${k}` : k) + c.buildRegExpStr();
    });
    if (typeof this.#index === "number") {
      strList.unshift(`#${this.#index}`);
    }
    if (strList.length === 0) {
      return "";
    }
    if (strList.length === 1) {
      return strList[0];
    }
    return "(?:" + strList.join("|") + ")";
  }
};

// node_modules/hono/dist/router/reg-exp-router/trie.js
var Trie = class {
  static {
    __name(this, "Trie");
  }
  #context = { varIndex: 0 };
  #root = new Node();
  insert(path, index, pathErrorCheckOnly) {
    const paramAssoc = [];
    const groups = [];
    for (let i = 0; ; ) {
      let replaced = false;
      path = path.replace(/\{[^}]+\}/g, (m) => {
        const mark = `@\\${i}`;
        groups[i] = [mark, m];
        i++;
        replaced = true;
        return mark;
      });
      if (!replaced) {
        break;
      }
    }
    const tokens = path.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i = groups.length - 1; i >= 0; i--) {
      const [mark] = groups[i];
      for (let j = tokens.length - 1; j >= 0; j--) {
        if (tokens[j].indexOf(mark) !== -1) {
          tokens[j] = tokens[j].replace(mark, groups[i][1]);
          break;
        }
      }
    }
    this.#root.insert(tokens, index, paramAssoc, this.#context, pathErrorCheckOnly);
    return paramAssoc;
  }
  buildRegExp() {
    let regexp = this.#root.buildRegExpStr();
    if (regexp === "") {
      return [/^$/, [], []];
    }
    let captureIndex = 0;
    const indexReplacementMap = [];
    const paramReplacementMap = [];
    regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_, handlerIndex, paramIndex) => {
      if (handlerIndex !== void 0) {
        indexReplacementMap[++captureIndex] = Number(handlerIndex);
        return "$()";
      }
      if (paramIndex !== void 0) {
        paramReplacementMap[Number(paramIndex)] = ++captureIndex;
        return "";
      }
      return "";
    });
    return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
  }
};

// node_modules/hono/dist/router/reg-exp-router/router.js
var nullMatcher = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
function buildWildcardRegExp(path) {
  return wildcardRegExpCache[path] ??= new RegExp(
    path === "*" ? "" : `^${path.replace(
      /\/\*$|([.\\+*[^\]$()])/g,
      (_, metaChar) => metaChar ? `\\${metaChar}` : "(?:|/.*)"
    )}$`
  );
}
__name(buildWildcardRegExp, "buildWildcardRegExp");
function clearWildcardRegExpCache() {
  wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
}
__name(clearWildcardRegExpCache, "clearWildcardRegExpCache");
function buildMatcherFromPreprocessedRoutes(routes) {
  const trie = new Trie();
  const handlerData = [];
  if (routes.length === 0) {
    return nullMatcher;
  }
  const routesWithStaticPathFlag = routes.map(
    (route) => [!/\*|\/:/.test(route[0]), ...route]
  ).sort(
    ([isStaticA, pathA], [isStaticB, pathB]) => isStaticA ? 1 : isStaticB ? -1 : pathA.length - pathB.length
  );
  const staticMap = /* @__PURE__ */ Object.create(null);
  for (let i = 0, j = -1, len = routesWithStaticPathFlag.length; i < len; i++) {
    const [pathErrorCheckOnly, path, handlers] = routesWithStaticPathFlag[i];
    if (pathErrorCheckOnly) {
      staticMap[path] = [handlers.map(([h]) => [h, /* @__PURE__ */ Object.create(null)]), emptyParam];
    } else {
      j++;
    }
    let paramAssoc;
    try {
      paramAssoc = trie.insert(path, j, pathErrorCheckOnly);
    } catch (e) {
      throw e === PATH_ERROR ? new UnsupportedPathError(path) : e;
    }
    if (pathErrorCheckOnly) {
      continue;
    }
    handlerData[j] = handlers.map(([h, paramCount]) => {
      const paramIndexMap = /* @__PURE__ */ Object.create(null);
      paramCount -= 1;
      for (; paramCount >= 0; paramCount--) {
        const [key, value] = paramAssoc[paramCount];
        paramIndexMap[key] = value;
      }
      return [h, paramIndexMap];
    });
  }
  const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
  for (let i = 0, len = handlerData.length; i < len; i++) {
    for (let j = 0, len2 = handlerData[i].length; j < len2; j++) {
      const map = handlerData[i][j]?.[1];
      if (!map) {
        continue;
      }
      const keys = Object.keys(map);
      for (let k = 0, len3 = keys.length; k < len3; k++) {
        map[keys[k]] = paramReplacementMap[map[keys[k]]];
      }
    }
  }
  const handlerMap = [];
  for (const i in indexReplacementMap) {
    handlerMap[i] = handlerData[indexReplacementMap[i]];
  }
  return [regexp, handlerMap, staticMap];
}
__name(buildMatcherFromPreprocessedRoutes, "buildMatcherFromPreprocessedRoutes");
function findMiddleware(middleware, path) {
  if (!middleware) {
    return void 0;
  }
  for (const k of Object.keys(middleware).sort((a, b) => b.length - a.length)) {
    if (buildWildcardRegExp(k).test(path)) {
      return [...middleware[k]];
    }
  }
  return void 0;
}
__name(findMiddleware, "findMiddleware");
var RegExpRouter = class {
  static {
    __name(this, "RegExpRouter");
  }
  name = "RegExpRouter";
  #middleware;
  #routes;
  constructor() {
    this.#middleware = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
    this.#routes = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
  }
  add(method, path, handler) {
    const middleware = this.#middleware;
    const routes = this.#routes;
    if (!middleware || !routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    if (!middleware[method]) {
      ;
      [middleware, routes].forEach((handlerMap) => {
        handlerMap[method] = /* @__PURE__ */ Object.create(null);
        Object.keys(handlerMap[METHOD_NAME_ALL]).forEach((p) => {
          handlerMap[method][p] = [...handlerMap[METHOD_NAME_ALL][p]];
        });
      });
    }
    if (path === "/*") {
      path = "*";
    }
    const paramCount = (path.match(/\/:/g) || []).length;
    if (/\*$/.test(path)) {
      const re = buildWildcardRegExp(path);
      if (method === METHOD_NAME_ALL) {
        Object.keys(middleware).forEach((m) => {
          middleware[m][path] ||= findMiddleware(middleware[m], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
        });
      } else {
        middleware[method][path] ||= findMiddleware(middleware[method], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
      }
      Object.keys(middleware).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(middleware[m]).forEach((p) => {
            re.test(p) && middleware[m][p].push([handler, paramCount]);
          });
        }
      });
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(routes[m]).forEach(
            (p) => re.test(p) && routes[m][p].push([handler, paramCount])
          );
        }
      });
      return;
    }
    const paths = checkOptionalParameter(path) || [path];
    for (let i = 0, len = paths.length; i < len; i++) {
      const path2 = paths[i];
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          routes[m][path2] ||= [
            ...findMiddleware(middleware[m], path2) || findMiddleware(middleware[METHOD_NAME_ALL], path2) || []
          ];
          routes[m][path2].push([handler, paramCount - len + i + 1]);
        }
      });
    }
  }
  match = match;
  buildAllMatchers() {
    const matchers = /* @__PURE__ */ Object.create(null);
    Object.keys(this.#routes).concat(Object.keys(this.#middleware)).forEach((method) => {
      matchers[method] ||= this.#buildMatcher(method);
    });
    this.#middleware = this.#routes = void 0;
    clearWildcardRegExpCache();
    return matchers;
  }
  #buildMatcher(method) {
    const routes = [];
    let hasOwnRoute = method === METHOD_NAME_ALL;
    [this.#middleware, this.#routes].forEach((r) => {
      const ownRoute = r[method] ? Object.keys(r[method]).map((path) => [path, r[method][path]]) : [];
      if (ownRoute.length !== 0) {
        hasOwnRoute ||= true;
        routes.push(...ownRoute);
      } else if (method !== METHOD_NAME_ALL) {
        routes.push(
          ...Object.keys(r[METHOD_NAME_ALL]).map((path) => [path, r[METHOD_NAME_ALL][path]])
        );
      }
    });
    if (!hasOwnRoute) {
      return null;
    } else {
      return buildMatcherFromPreprocessedRoutes(routes);
    }
  }
};

// node_modules/hono/dist/router/smart-router/router.js
var SmartRouter = class {
  static {
    __name(this, "SmartRouter");
  }
  name = "SmartRouter";
  #routers = [];
  #routes = [];
  constructor(init) {
    this.#routers = init.routers;
  }
  add(method, path, handler) {
    if (!this.#routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    this.#routes.push([method, path, handler]);
  }
  match(method, path) {
    if (!this.#routes) {
      throw new Error("Fatal error");
    }
    const routers = this.#routers;
    const routes = this.#routes;
    const len = routers.length;
    let i = 0;
    let res;
    for (; i < len; i++) {
      const router = routers[i];
      try {
        for (let i2 = 0, len2 = routes.length; i2 < len2; i2++) {
          router.add(...routes[i2]);
        }
        res = router.match(method, path);
      } catch (e) {
        if (e instanceof UnsupportedPathError) {
          continue;
        }
        throw e;
      }
      this.match = router.match.bind(router);
      this.#routers = [router];
      this.#routes = void 0;
      break;
    }
    if (i === len) {
      throw new Error("Fatal error");
    }
    this.name = `SmartRouter + ${this.activeRouter.name}`;
    return res;
  }
  get activeRouter() {
    if (this.#routes || this.#routers.length !== 1) {
      throw new Error("No active router has been determined yet.");
    }
    return this.#routers[0];
  }
};

// node_modules/hono/dist/router/trie-router/node.js
var emptyParams = /* @__PURE__ */ Object.create(null);
var hasChildren = /* @__PURE__ */ __name((children) => {
  for (const _ in children) {
    return true;
  }
  return false;
}, "hasChildren");
var Node2 = class _Node2 {
  static {
    __name(this, "_Node");
  }
  #methods;
  #children;
  #patterns;
  #order = 0;
  #params = emptyParams;
  constructor(method, handler, children) {
    this.#children = children || /* @__PURE__ */ Object.create(null);
    this.#methods = [];
    if (method && handler) {
      const m = /* @__PURE__ */ Object.create(null);
      m[method] = { handler, possibleKeys: [], score: 0 };
      this.#methods = [m];
    }
    this.#patterns = [];
  }
  insert(method, path, handler) {
    this.#order = ++this.#order;
    let curNode = this;
    const parts = splitRoutingPath(path);
    const possibleKeys = [];
    for (let i = 0, len = parts.length; i < len; i++) {
      const p = parts[i];
      const nextP = parts[i + 1];
      const pattern = getPattern(p, nextP);
      const key = Array.isArray(pattern) ? pattern[0] : p;
      if (key in curNode.#children) {
        curNode = curNode.#children[key];
        if (pattern) {
          possibleKeys.push(pattern[1]);
        }
        continue;
      }
      curNode.#children[key] = new _Node2();
      if (pattern) {
        curNode.#patterns.push(pattern);
        possibleKeys.push(pattern[1]);
      }
      curNode = curNode.#children[key];
    }
    curNode.#methods.push({
      [method]: {
        handler,
        possibleKeys: possibleKeys.filter((v, i, a) => a.indexOf(v) === i),
        score: this.#order
      }
    });
    return curNode;
  }
  #pushHandlerSets(handlerSets, node, method, nodeParams, params) {
    for (let i = 0, len = node.#methods.length; i < len; i++) {
      const m = node.#methods[i];
      const handlerSet = m[method] || m[METHOD_NAME_ALL];
      const processedSet = {};
      if (handlerSet !== void 0) {
        handlerSet.params = /* @__PURE__ */ Object.create(null);
        handlerSets.push(handlerSet);
        if (nodeParams !== emptyParams || params && params !== emptyParams) {
          for (let i2 = 0, len2 = handlerSet.possibleKeys.length; i2 < len2; i2++) {
            const key = handlerSet.possibleKeys[i2];
            const processed = processedSet[handlerSet.score];
            handlerSet.params[key] = params?.[key] && !processed ? params[key] : nodeParams[key] ?? params?.[key];
            processedSet[handlerSet.score] = true;
          }
        }
      }
    }
  }
  search(method, path) {
    const handlerSets = [];
    this.#params = emptyParams;
    const curNode = this;
    let curNodes = [curNode];
    const parts = splitPath(path);
    const curNodesQueue = [];
    const len = parts.length;
    let partOffsets = null;
    for (let i = 0; i < len; i++) {
      const part = parts[i];
      const isLast = i === len - 1;
      const tempNodes = [];
      for (let j = 0, len2 = curNodes.length; j < len2; j++) {
        const node = curNodes[j];
        const nextNode = node.#children[part];
        if (nextNode) {
          nextNode.#params = node.#params;
          if (isLast) {
            if (nextNode.#children["*"]) {
              this.#pushHandlerSets(handlerSets, nextNode.#children["*"], method, node.#params);
            }
            this.#pushHandlerSets(handlerSets, nextNode, method, node.#params);
          } else {
            tempNodes.push(nextNode);
          }
        }
        for (let k = 0, len3 = node.#patterns.length; k < len3; k++) {
          const pattern = node.#patterns[k];
          const params = node.#params === emptyParams ? {} : { ...node.#params };
          if (pattern === "*") {
            const astNode = node.#children["*"];
            if (astNode) {
              this.#pushHandlerSets(handlerSets, astNode, method, node.#params);
              astNode.#params = params;
              tempNodes.push(astNode);
            }
            continue;
          }
          const [key, name, matcher] = pattern;
          if (!part && !(matcher instanceof RegExp)) {
            continue;
          }
          const child = node.#children[key];
          if (matcher instanceof RegExp) {
            if (partOffsets === null) {
              partOffsets = new Array(len);
              let offset = path[0] === "/" ? 1 : 0;
              for (let p = 0; p < len; p++) {
                partOffsets[p] = offset;
                offset += parts[p].length + 1;
              }
            }
            const restPathString = path.substring(partOffsets[i]);
            const m = matcher.exec(restPathString);
            if (m) {
              params[name] = m[0];
              this.#pushHandlerSets(handlerSets, child, method, node.#params, params);
              if (hasChildren(child.#children)) {
                child.#params = params;
                const componentCount = m[0].match(/\//)?.length ?? 0;
                const targetCurNodes = curNodesQueue[componentCount] ||= [];
                targetCurNodes.push(child);
              }
              continue;
            }
          }
          if (matcher === true || matcher.test(part)) {
            params[name] = part;
            if (isLast) {
              this.#pushHandlerSets(handlerSets, child, method, params, node.#params);
              if (child.#children["*"]) {
                this.#pushHandlerSets(
                  handlerSets,
                  child.#children["*"],
                  method,
                  params,
                  node.#params
                );
              }
            } else {
              child.#params = params;
              tempNodes.push(child);
            }
          }
        }
      }
      const shifted = curNodesQueue.shift();
      curNodes = shifted ? tempNodes.concat(shifted) : tempNodes;
    }
    if (handlerSets.length > 1) {
      handlerSets.sort((a, b) => {
        return a.score - b.score;
      });
    }
    return [handlerSets.map(({ handler, params }) => [handler, params])];
  }
};

// node_modules/hono/dist/router/trie-router/router.js
var TrieRouter = class {
  static {
    __name(this, "TrieRouter");
  }
  name = "TrieRouter";
  #node;
  constructor() {
    this.#node = new Node2();
  }
  add(method, path, handler) {
    const results = checkOptionalParameter(path);
    if (results) {
      for (let i = 0, len = results.length; i < len; i++) {
        this.#node.insert(method, results[i], handler);
      }
      return;
    }
    this.#node.insert(method, path, handler);
  }
  match(method, path) {
    return this.#node.search(method, path);
  }
};

// node_modules/hono/dist/hono.js
var Hono2 = class extends Hono {
  static {
    __name(this, "Hono");
  }
  /**
   * Creates an instance of the Hono class.
   *
   * @param options - Optional configuration options for the Hono instance.
   */
  constructor(options = {}) {
    super(options);
    this.router = options.router ?? new SmartRouter({
      routers: [new RegExpRouter(), new TrieRouter()]
    });
  }
};

// node_modules/hono/dist/utils/cookie.js
var algorithm = { name: "HMAC", hash: "SHA-256" };
var getCryptoKey = /* @__PURE__ */ __name(async (secret) => {
  const secretBuf = typeof secret === "string" ? new TextEncoder().encode(secret) : secret;
  return await crypto.subtle.importKey("raw", secretBuf, algorithm, false, ["sign", "verify"]);
}, "getCryptoKey");
var makeSignature = /* @__PURE__ */ __name(async (value, secret) => {
  const key = await getCryptoKey(secret);
  const signature = await crypto.subtle.sign(algorithm.name, key, new TextEncoder().encode(value));
  return btoa(String.fromCharCode(...new Uint8Array(signature)));
}, "makeSignature");
var verifySignature = /* @__PURE__ */ __name(async (base64Signature, value, secret) => {
  try {
    const signatureBinStr = atob(base64Signature);
    const signature = new Uint8Array(signatureBinStr.length);
    for (let i = 0, len = signatureBinStr.length; i < len; i++) {
      signature[i] = signatureBinStr.charCodeAt(i);
    }
    return await crypto.subtle.verify(algorithm, secret, signature, new TextEncoder().encode(value));
  } catch {
    return false;
  }
}, "verifySignature");
var validCookieNameRegEx = /^[\w!#$%&'*.^`|~+-]+$/;
var validCookieValueRegEx = /^[ !#-:<-[\]-~]*$/;
var trimCookieWhitespace = /* @__PURE__ */ __name((value) => {
  let start = 0;
  let end = value.length;
  while (start < end) {
    const charCode = value.charCodeAt(start);
    if (charCode !== 32 && charCode !== 9) {
      break;
    }
    start++;
  }
  while (end > start) {
    const charCode = value.charCodeAt(end - 1);
    if (charCode !== 32 && charCode !== 9) {
      break;
    }
    end--;
  }
  return start === 0 && end === value.length ? value : value.slice(start, end);
}, "trimCookieWhitespace");
var parse = /* @__PURE__ */ __name((cookie, name) => {
  if (name && cookie.indexOf(name) === -1) {
    return {};
  }
  const pairs = cookie.split(";");
  const parsedCookie = /* @__PURE__ */ Object.create(null);
  for (const pairStr of pairs) {
    const valueStartPos = pairStr.indexOf("=");
    if (valueStartPos === -1) {
      continue;
    }
    const cookieName = trimCookieWhitespace(pairStr.substring(0, valueStartPos));
    if (name && name !== cookieName || !validCookieNameRegEx.test(cookieName) || cookieName in parsedCookie) {
      continue;
    }
    let cookieValue = trimCookieWhitespace(pairStr.substring(valueStartPos + 1));
    if (cookieValue.startsWith('"') && cookieValue.endsWith('"')) {
      cookieValue = cookieValue.slice(1, -1);
    }
    if (validCookieValueRegEx.test(cookieValue)) {
      parsedCookie[cookieName] = cookieValue.indexOf("%") !== -1 ? tryDecode(cookieValue, decodeURIComponent_) : cookieValue;
      if (name) {
        break;
      }
    }
  }
  return parsedCookie;
}, "parse");
var parseSigned = /* @__PURE__ */ __name(async (cookie, secret, name) => {
  const parsedCookie = /* @__PURE__ */ Object.create(null);
  const secretKey = await getCryptoKey(secret);
  for (const [key, value] of Object.entries(parse(cookie, name))) {
    const signatureStartPos = value.lastIndexOf(".");
    if (signatureStartPos < 1) {
      continue;
    }
    const signedValue = value.substring(0, signatureStartPos);
    const signature = value.substring(signatureStartPos + 1);
    if (signature.length !== 44 || !signature.endsWith("=")) {
      continue;
    }
    const isVerified = await verifySignature(signature, signedValue, secretKey);
    parsedCookie[key] = isVerified ? signedValue : false;
  }
  return parsedCookie;
}, "parseSigned");
var _serialize = /* @__PURE__ */ __name((name, value, opt = {}) => {
  if (!validCookieNameRegEx.test(name)) {
    throw new Error("Invalid cookie name");
  }
  let cookie = `${name}=${value}`;
  if (name.startsWith("__Secure-") && !opt.secure) {
    throw new Error("__Secure- Cookie must have Secure attributes");
  }
  if (name.startsWith("__Host-")) {
    if (!opt.secure) {
      throw new Error("__Host- Cookie must have Secure attributes");
    }
    if (opt.path !== "/") {
      throw new Error('__Host- Cookie must have Path attributes with "/"');
    }
    if (opt.domain) {
      throw new Error("__Host- Cookie must not have Domain attributes");
    }
  }
  for (const key of ["domain", "path", "sameSite", "priority"]) {
    if (opt[key] && /[;\r\n]/.test(opt[key])) {
      throw new Error(`${key} must not contain ";", "\\r", or "\\n"`);
    }
  }
  if (opt && typeof opt.maxAge === "number" && opt.maxAge >= 0) {
    if (opt.maxAge > 3456e4) {
      throw new Error(
        "Cookies Max-Age SHOULD NOT be greater than 400 days (34560000 seconds) in duration."
      );
    }
    cookie += `; Max-Age=${opt.maxAge | 0}`;
  }
  if (opt.domain && opt.prefix !== "host") {
    cookie += `; Domain=${opt.domain}`;
  }
  if (opt.path) {
    cookie += `; Path=${opt.path}`;
  }
  if (opt.expires) {
    if (opt.expires.getTime() - Date.now() > 3456e7) {
      throw new Error(
        "Cookies Expires SHOULD NOT be greater than 400 days (34560000 seconds) in the future."
      );
    }
    cookie += `; Expires=${opt.expires.toUTCString()}`;
  }
  if (opt.httpOnly) {
    cookie += "; HttpOnly";
  }
  if (opt.secure) {
    cookie += "; Secure";
  }
  if (opt.sameSite) {
    cookie += `; SameSite=${opt.sameSite.charAt(0).toUpperCase() + opt.sameSite.slice(1)}`;
  }
  if (opt.priority) {
    cookie += `; Priority=${opt.priority.charAt(0).toUpperCase() + opt.priority.slice(1)}`;
  }
  if (opt.partitioned) {
    if (!opt.secure) {
      throw new Error("Partitioned Cookie must have Secure attributes");
    }
    cookie += "; Partitioned";
  }
  return cookie;
}, "_serialize");
var serialize = /* @__PURE__ */ __name((name, value, opt) => {
  value = encodeURIComponent(value);
  return _serialize(name, value, opt);
}, "serialize");
var serializeSigned = /* @__PURE__ */ __name(async (name, value, secret, opt = {}) => {
  const signature = await makeSignature(value, secret);
  value = `${value}.${signature}`;
  value = encodeURIComponent(value);
  return _serialize(name, value, opt);
}, "serializeSigned");

// node_modules/hono/dist/helper/cookie/index.js
var getCookie = /* @__PURE__ */ __name((c, key, prefix) => {
  const cookie = c.req.raw.headers.get("Cookie");
  if (typeof key === "string") {
    if (!cookie) {
      return void 0;
    }
    let finalKey = key;
    if (prefix === "secure") {
      finalKey = "__Secure-" + key;
    } else if (prefix === "host") {
      finalKey = "__Host-" + key;
    }
    const obj2 = parse(cookie, finalKey);
    return obj2[finalKey];
  }
  if (!cookie) {
    return {};
  }
  const obj = parse(cookie);
  return obj;
}, "getCookie");
var getSignedCookie = /* @__PURE__ */ __name(async (c, secret, key, prefix) => {
  const cookie = c.req.raw.headers.get("Cookie");
  if (typeof key === "string") {
    if (!cookie) {
      return void 0;
    }
    let finalKey = key;
    if (prefix === "secure") {
      finalKey = "__Secure-" + key;
    } else if (prefix === "host") {
      finalKey = "__Host-" + key;
    }
    const obj2 = await parseSigned(cookie, secret, finalKey);
    return obj2[finalKey];
  }
  if (!cookie) {
    return {};
  }
  const obj = await parseSigned(cookie, secret);
  return obj;
}, "getSignedCookie");
var generateCookie = /* @__PURE__ */ __name((name, value, opt) => {
  let cookie;
  if (opt?.prefix === "secure") {
    cookie = serialize("__Secure-" + name, value, { path: "/", ...opt, secure: true });
  } else if (opt?.prefix === "host") {
    cookie = serialize("__Host-" + name, value, {
      ...opt,
      path: "/",
      secure: true,
      domain: void 0
    });
  } else {
    cookie = serialize(name, value, { path: "/", ...opt });
  }
  return cookie;
}, "generateCookie");
var setCookie = /* @__PURE__ */ __name((c, name, value, opt) => {
  const cookie = generateCookie(name, value, opt);
  c.header("Set-Cookie", cookie, { append: true });
}, "setCookie");
var generateSignedCookie = /* @__PURE__ */ __name(async (name, value, secret, opt) => {
  let cookie;
  if (opt?.prefix === "secure") {
    cookie = await serializeSigned("__Secure-" + name, value, secret, {
      path: "/",
      ...opt,
      secure: true
    });
  } else if (opt?.prefix === "host") {
    cookie = await serializeSigned("__Host-" + name, value, secret, {
      ...opt,
      path: "/",
      secure: true,
      domain: void 0
    });
  } else {
    cookie = await serializeSigned(name, value, secret, { path: "/", ...opt });
  }
  return cookie;
}, "generateSignedCookie");
var setSignedCookie = /* @__PURE__ */ __name(async (c, name, value, secret, opt) => {
  const cookie = await generateSignedCookie(name, value, secret, opt);
  c.header("set-cookie", cookie, { append: true });
}, "setSignedCookie");
var deleteCookie = /* @__PURE__ */ __name((c, name, opt) => {
  const deletedCookie = getCookie(c, name, opt?.prefix);
  setCookie(c, name, "", { ...opt, maxAge: 0 });
  return deletedCookie;
}, "deleteCookie");

// src/services.ts
var SERVICES = [
  {
    id: "party",
    name: "Private Party",
    tagline: "Birthdays, house parties, celebrations",
    priceCents: 6e4,
    depositCents: 15e3,
    features: ["Up to 4 hours", "Pro sound + lighting", "Open format", "MC on the mic"]
  },
  {
    id: "wedding",
    name: "Wedding",
    tagline: "Ceremony, cocktail hour, reception",
    priceCents: 18e4,
    depositCents: 45e3,
    features: ["Up to 8 hours", "Ceremony + reception", "Planning consultation", "Backup gear on site"]
  },
  {
    id: "club",
    name: "Club / Venue",
    tagline: "Nightlife sets and residencies",
    priceCents: 9e4,
    depositCents: 2e4,
    features: ["Up to 3 hours", "Curated open format", "Crowd reading", "Clean transitions"]
  },
  {
    id: "corporate",
    name: "Corporate Event",
    tagline: "Launches, galas, brand activations",
    priceCents: 15e4,
    depositCents: 4e4,
    features: ["Up to 6 hours", "Professional setup", "Custom playlist", "On time, every time"]
  }
];
function getService(id) {
  return SERVICES.find((s) => s.id === id);
}
__name(getService, "getService");
function money(cents, currency = "usd") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(cents / 100);
}
__name(money, "money");

// src/stripe.ts
async function createCheckoutSession(p) {
  const body = new URLSearchParams();
  body.set("mode", "payment");
  body.set("success_url", p.successUrl);
  body.set("cancel_url", p.cancelUrl);
  body.set("customer_email", p.customerEmail);
  body.set("client_reference_id", p.bookingId);
  body.set("metadata[booking_id]", p.bookingId);
  body.set("line_items[0][quantity]", "1");
  body.set("line_items[0][price_data][currency]", p.currency);
  body.set("line_items[0][price_data][unit_amount]", String(p.amountCents));
  body.set("line_items[0][price_data][product_data][name]", p.productName);
  body.set("line_items[0][price_data][product_data][description]", p.description);
  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${p.secretKey}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: body.toString()
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Stripe error ${res.status}: ${text}`);
  }
  const json = await res.json();
  return { id: json.id, url: json.url };
}
__name(createCheckoutSession, "createCheckoutSession");
async function verifyStripeSignature(payload, sigHeader, secret, toleranceSeconds = 300) {
  const parts = Object.fromEntries(
    sigHeader.split(",").map((kv) => {
      const [k, v] = kv.split("=");
      return [k, v];
    })
  );
  const timestamp = parts["t"];
  const expectedSig = parts["v1"];
  if (!timestamp || !expectedSig) return false;
  const age = Math.abs(Date.now() / 1e3 - Number(timestamp));
  if (age > toleranceSeconds) return false;
  const signedPayload = `${timestamp}.${payload}`;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sigBuf = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(signedPayload));
  const computed = [...new Uint8Array(sigBuf)].map((b) => b.toString(16).padStart(2, "0")).join("");
  return timingSafeEqual(computed, expectedSig);
}
__name(verifyStripeSignature, "verifyStripeSignature");
function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}
__name(timingSafeEqual, "timingSafeEqual");

// node_modules/hono/dist/jsx/constants.js
var DOM_RENDERER = /* @__PURE__ */ Symbol("RENDERER");
var DOM_ERROR_HANDLER = /* @__PURE__ */ Symbol("ERROR_HANDLER");
var DOM_INTERNAL_TAG = /* @__PURE__ */ Symbol("INTERNAL");
var PERMALINK = /* @__PURE__ */ Symbol("PERMALINK");

// node_modules/hono/dist/jsx/dom/utils.js
var setInternalTagFlag = /* @__PURE__ */ __name((fn) => {
  ;
  fn[DOM_INTERNAL_TAG] = true;
  return fn;
}, "setInternalTagFlag");

// node_modules/hono/dist/jsx/dom/context.js
var createContextProviderFunction = /* @__PURE__ */ __name((values) => ({ value, children }) => {
  if (!children) {
    return void 0;
  }
  const props = {
    children: [
      {
        tag: setInternalTagFlag(() => {
          values.push(value);
        }),
        props: {}
      }
    ]
  };
  if (Array.isArray(children)) {
    props.children.push(...children.flat());
  } else {
    props.children.push(children);
  }
  props.children.push({
    tag: setInternalTagFlag(() => {
      values.pop();
    }),
    props: {}
  });
  const res = { tag: "", props, type: "" };
  res[DOM_ERROR_HANDLER] = (err) => {
    values.pop();
    throw err;
  };
  return res;
}, "createContextProviderFunction");

// node_modules/hono/dist/jsx/context.js
var globalContexts = [];
var alsProbed = false;
var asyncLocalStorage;
var fallbackStore;
var fallbackRendersInFlight = 0;
var warnedFallbackDefault = false;
var loadAsyncLocalStorage = /* @__PURE__ */ __name(() => {
  if (alsProbed) {
    return asyncLocalStorage;
  }
  alsProbed = true;
  const global = globalThis;
  let AsyncLocalStorage;
  for (const probe of [
    // Node.js >= 20.16, Deno, Bun, Cloudflare Workers (nodejs_compat). Property
    // access only, so bundlers don't statically resolve `node:async_hooks`.
    () => global.process?.getBuiltinModule?.("node:async_hooks")?.AsyncLocalStorage,
    // Node.js < 20.16 has no `process.getBuiltinModule`, but a CJS entrypoint
    // exposes the main module's `require` here.
    () => global.process?.mainModule?.require?.("node:async_hooks")?.AsyncLocalStorage
  ]) {
    try {
      AsyncLocalStorage = probe();
    } catch {
    }
    if (AsyncLocalStorage) {
      break;
    }
  }
  if (AsyncLocalStorage) {
    asyncLocalStorage = new AsyncLocalStorage();
  }
  return asyncLocalStorage;
}, "loadAsyncLocalStorage");
var getCurrentStore = /* @__PURE__ */ __name(() => {
  return loadAsyncLocalStorage()?.getStore() || fallbackStore;
}, "getCurrentStore");
var warnIfStorelessAccess = /* @__PURE__ */ __name(() => {
  if (fallbackRendersInFlight > 0 && !warnedFallbackDefault) {
    warnedFallbackDefault = true;
    console.warn(
      "hono/jsx: AsyncLocalStorage is unavailable in this runtime, so useContext() after an await in an async component falls back to the context default value during server-side rendering. To get provided values across await boundaries, use a runtime with AsyncLocalStorage (Node.js >= 20.16, Deno, Bun, or Cloudflare Workers with the nodejs_compat flag)."
    );
  }
}, "warnIfStorelessAccess");
var getContextValuesIn = /* @__PURE__ */ __name((store, context2) => {
  if (!store) {
    warnIfStorelessAccess();
    return context2.values;
  }
  let values = store.get(context2);
  if (!values) {
    values = [context2.values[0]];
    store.set(context2, values);
  }
  return values;
}, "getContextValuesIn");
var readContextValueIn = /* @__PURE__ */ __name((store, context2) => {
  if (!store) {
    warnIfStorelessAccess();
    return context2.values.at(-1);
  }
  const values = store.get(context2);
  return values?.length ? values.at(-1) : context2.values[0];
}, "readContextValueIn");
var captureContextValues = /* @__PURE__ */ __name((store) => (store ? globalContexts.filter((c) => store.has(c)) : globalContexts).map((c) => [
  c,
  readContextValueIn(store, c)
]), "captureContextValues");
var resumeWithContextValues = /* @__PURE__ */ __name((callback, store, contexts) => runWithRenderContext(() => {
  const currentStore = getCurrentStore();
  const valuesPerContext = contexts.map(([context2, value]) => {
    const values = getContextValuesIn(currentStore, context2);
    values.push(value);
    return values;
  });
  const popContextValues = /* @__PURE__ */ __name(() => {
    valuesPerContext.forEach((values) => {
      values.pop();
    });
  }, "popContextValues");
  try {
    const result = callback();
    if (result instanceof Promise) {
      return result.finally(popContextValues);
    }
    popContextValues();
    return result;
  } catch (e) {
    popContextValues();
    throw e;
  }
}, store), "resumeWithContextValues");
var runWithRenderContext = /* @__PURE__ */ __name((callback, resumeStore) => {
  if (getCurrentStore()) {
    return callback();
  }
  const store = resumeStore ?? /* @__PURE__ */ new WeakMap();
  const storage = loadAsyncLocalStorage();
  if (storage) {
    return storage.run(store, callback);
  }
  fallbackStore = store;
  let result;
  try {
    result = callback();
  } finally {
    fallbackStore = void 0;
  }
  if (!warnedFallbackDefault && result instanceof Promise) {
    fallbackRendersInFlight++;
    result = result.finally(() => {
      fallbackRendersInFlight--;
    });
  }
  return result;
}, "runWithRenderContext");
var captureRenderContext = /* @__PURE__ */ __name(() => {
  const store = getCurrentStore();
  const contexts = captureContextValues(store);
  return (callback) => resumeWithContextValues(callback, store, contexts);
}, "captureRenderContext");
var createContext = /* @__PURE__ */ __name((defaultValue) => {
  const values = [defaultValue];
  const context2 = /* @__PURE__ */ __name(((props) => {
    const contextValues = getContextValuesIn(getCurrentStore(), context2);
    contextValues.push(props.value);
    let string;
    try {
      string = props.children ? (Array.isArray(props.children) ? new JSXFragmentNode("", {}, props.children) : props.children).toString() : "";
    } catch (e) {
      contextValues.pop();
      throw e;
    }
    if (string instanceof Promise) {
      return string.finally(() => contextValues.pop()).then((resString) => raw(resString, resString.callbacks));
    } else {
      contextValues.pop();
      return raw(string);
    }
  }), "context");
  context2.values = values;
  context2.Provider = context2;
  context2[DOM_RENDERER] = createContextProviderFunction(values);
  globalContexts.push(context2);
  return context2;
}, "createContext");
var useContext = /* @__PURE__ */ __name((context2) => {
  return readContextValueIn(getCurrentStore(), context2);
}, "useContext");

// node_modules/hono/dist/jsx/intrinsic-element/common.js
var deDupeKeyMap = {
  title: [],
  script: ["src"],
  style: ["data-href"],
  link: ["href"],
  meta: ["name", "httpEquiv", "charset", "itemProp"]
};
var domRenderers = {};
var dataPrecedenceAttr = "data-precedence";
var isStylesheetLinkWithPrecedence = /* @__PURE__ */ __name((props) => props.rel === "stylesheet" && "precedence" in props, "isStylesheetLinkWithPrecedence");
var shouldDeDupeByKey = /* @__PURE__ */ __name((tagName, supportSort) => {
  if (tagName === "link") {
    return supportSort;
  }
  return deDupeKeyMap[tagName].length > 0;
}, "shouldDeDupeByKey");

// node_modules/hono/dist/jsx/intrinsic-element/components.js
var components_exports = {};
__export(components_exports, {
  button: () => button,
  form: () => form,
  input: () => input,
  link: () => link,
  meta: () => meta,
  script: () => script,
  style: () => style,
  title: () => title2
});

// node_modules/hono/dist/jsx/children.js
var toArray = /* @__PURE__ */ __name((children) => Array.isArray(children) ? children : [children], "toArray");

// node_modules/hono/dist/jsx/intrinsic-element/components.js
var metaTagMap = /* @__PURE__ */ new WeakMap();
var insertIntoHead = /* @__PURE__ */ __name((tagName, tag, props, precedence) => ({ buffer, context: context2 }) => {
  if (!buffer) {
    return;
  }
  const map = metaTagMap.get(context2) || {};
  metaTagMap.set(context2, map);
  const tags = map[tagName] ||= [];
  let duped = false;
  const deDupeKeys = deDupeKeyMap[tagName];
  const deDupeByKey = shouldDeDupeByKey(tagName, precedence !== void 0);
  if (deDupeByKey) {
    LOOP: for (const [, tagProps] of tags) {
      if (tagName === "link" && !(tagProps.rel === "stylesheet" && tagProps[dataPrecedenceAttr] !== void 0)) {
        continue;
      }
      for (const key of deDupeKeys) {
        if ((tagProps?.[key] ?? null) === props?.[key]) {
          duped = true;
          break LOOP;
        }
      }
    }
  }
  if (duped) {
    buffer[0] = buffer[0].replaceAll(tag, "");
  } else if (deDupeByKey || tagName === "link") {
    tags.push([tag, props, precedence]);
  } else {
    tags.unshift([tag, props, precedence]);
  }
  if (buffer[0].indexOf("</head>") !== -1) {
    let insertTags;
    if (tagName === "link" || precedence !== void 0) {
      const precedences = [];
      insertTags = tags.map(([tag2, , tagPrecedence], index) => {
        if (tagPrecedence === void 0) {
          return [tag2, Number.MAX_SAFE_INTEGER, index];
        }
        let order = precedences.indexOf(tagPrecedence);
        if (order === -1) {
          precedences.push(tagPrecedence);
          order = precedences.length - 1;
        }
        return [tag2, order, index];
      }).sort((a, b) => a[1] - b[1] || a[2] - b[2]).map(([tag2]) => tag2);
    } else {
      insertTags = tags.map(([tag2]) => tag2);
    }
    insertTags.forEach((tag2) => {
      buffer[0] = buffer[0].replaceAll(tag2, "");
    });
    buffer[0] = buffer[0].replace(/(?=<\/head>)/, insertTags.join(""));
  }
}, "insertIntoHead");
var returnWithoutSpecialBehavior = /* @__PURE__ */ __name((tag, children, props) => raw(new JSXNode(tag, props, toArray(children ?? [])).toString()), "returnWithoutSpecialBehavior");
var documentMetadataTag = /* @__PURE__ */ __name((tag, children, props, sort) => {
  if ("itemProp" in props) {
    return returnWithoutSpecialBehavior(tag, children, props);
  }
  let { precedence, blocking, ...restProps } = props;
  precedence = sort ? precedence ?? "" : void 0;
  if (sort) {
    restProps[dataPrecedenceAttr] = precedence;
  }
  const string = new JSXNode(tag, restProps, toArray(children || [])).toString();
  if (string instanceof Promise) {
    return string.then(
      (resString) => raw(string, [
        ...resString.callbacks || [],
        insertIntoHead(tag, resString, restProps, precedence)
      ])
    );
  } else {
    return raw(string, [insertIntoHead(tag, string, restProps, precedence)]);
  }
}, "documentMetadataTag");
var title2 = /* @__PURE__ */ __name(({ children, ...props }) => {
  const nameSpaceContext2 = getNameSpaceContext();
  if (nameSpaceContext2) {
    const context2 = useContext(nameSpaceContext2);
    if (context2 === "svg" || context2 === "head") {
      return new JSXNode(
        "title",
        props,
        toArray(children ?? [])
      );
    }
  }
  return documentMetadataTag("title", children, props, false);
}, "title");
var script = /* @__PURE__ */ __name(({
  children,
  ...props
}) => {
  const nameSpaceContext2 = getNameSpaceContext();
  if (["src", "async"].some((k) => !props[k]) || nameSpaceContext2 && useContext(nameSpaceContext2) === "head") {
    return returnWithoutSpecialBehavior("script", children, props);
  }
  return documentMetadataTag("script", children, props, false);
}, "script");
var style = /* @__PURE__ */ __name(({
  children,
  ...props
}) => {
  if (!["href", "precedence"].every((k) => k in props)) {
    return returnWithoutSpecialBehavior("style", children, props);
  }
  props["data-href"] = props.href;
  delete props.href;
  return documentMetadataTag("style", children, props, true);
}, "style");
var link = /* @__PURE__ */ __name(({ children, ...props }) => {
  if (["onLoad", "onError"].some((k) => k in props) || props.rel === "stylesheet" && (!("precedence" in props) || "disabled" in props)) {
    return returnWithoutSpecialBehavior("link", children, props);
  }
  return documentMetadataTag("link", children, props, isStylesheetLinkWithPrecedence(props));
}, "link");
var meta = /* @__PURE__ */ __name(({ children, ...props }) => {
  const nameSpaceContext2 = getNameSpaceContext();
  if (nameSpaceContext2 && useContext(nameSpaceContext2) === "head") {
    return returnWithoutSpecialBehavior("meta", children, props);
  }
  return documentMetadataTag("meta", children, props, false);
}, "meta");
var newJSXNode = /* @__PURE__ */ __name((tag, { children, ...props }) => (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new JSXNode(tag, props, toArray(children ?? []))
), "newJSXNode");
var form = /* @__PURE__ */ __name((props) => {
  if (typeof props.action === "function") {
    props.action = PERMALINK in props.action ? props.action[PERMALINK] : void 0;
  }
  return newJSXNode("form", props);
}, "form");
var formActionableElement = /* @__PURE__ */ __name((tag, props) => {
  if (typeof props.formAction === "function") {
    props.formAction = PERMALINK in props.formAction ? props.formAction[PERMALINK] : void 0;
  }
  return newJSXNode(tag, props);
}, "formActionableElement");
var input = /* @__PURE__ */ __name((props) => formActionableElement("input", props), "input");
var button = /* @__PURE__ */ __name((props) => formActionableElement("button", props), "button");

// node_modules/hono/dist/jsx/utils.js
var normalizeElementKeyMap = /* @__PURE__ */ new Map([
  ["className", "class"],
  ["htmlFor", "for"],
  ["crossOrigin", "crossorigin"],
  ["httpEquiv", "http-equiv"],
  ["itemProp", "itemprop"],
  ["fetchPriority", "fetchpriority"],
  ["noModule", "nomodule"],
  ["formAction", "formaction"]
]);
var normalizeIntrinsicElementKey = /* @__PURE__ */ __name((key) => normalizeElementKeyMap.get(key) || key, "normalizeIntrinsicElementKey");
var invalidAttributeNameCharRe = /[\s"'<>/=`\\\x00-\x1f\x7f-\x9f]/;
var validAttributeNameCache = /* @__PURE__ */ new Set();
var validAttributeNameCacheMax = 1024;
var invalidTagNameCharRe = /^[!?]|[\s"'<>/=`\\\x00-\x1f\x7f-\x9f]/;
var validTagNameCache = /* @__PURE__ */ new Set();
var validTagNameCacheMax = 256;
var cacheValidName = /* @__PURE__ */ __name((cache, max, name) => {
  if (cache.size >= max) {
    cache.clear();
  }
  cache.add(name);
}, "cacheValidName");
var isValidTagName = /* @__PURE__ */ __name((name) => {
  if (validTagNameCache.has(name)) {
    return true;
  }
  if (typeof name !== "string") {
    return false;
  }
  if (name.length === 0) {
    return true;
  }
  if (invalidTagNameCharRe.test(name)) {
    return false;
  }
  cacheValidName(validTagNameCache, validTagNameCacheMax, name);
  return true;
}, "isValidTagName");
var isValidAttributeName = /* @__PURE__ */ __name((name) => {
  if (validAttributeNameCache.has(name)) {
    return true;
  }
  const len = name.length;
  if (len === 0) {
    return false;
  }
  for (let i = 0; i < len; i++) {
    const c = name.charCodeAt(i);
    if (!(c >= 97 && c <= 122 || // a-z
    c >= 65 && c <= 90 || // A-Z
    c >= 48 && c <= 57 || // 0-9
    c === 45 || // -
    c === 95 || // _
    c === 46 || // .
    c === 58)) {
      if (!invalidAttributeNameCharRe.test(name)) {
        cacheValidName(validAttributeNameCache, validAttributeNameCacheMax, name);
        return true;
      } else {
        return false;
      }
    }
  }
  cacheValidName(validAttributeNameCache, validAttributeNameCacheMax, name);
  return true;
}, "isValidAttributeName");
var invalidStylePropertyNameCharRe = /[\s"'():;\\/\[\]{}\x00-\x1f\x7f-\x9f]/;
var validStylePropertyNameCache = /* @__PURE__ */ new Set();
var validStylePropertyNameCacheMax = 1024;
var isValidStylePropertyName = /* @__PURE__ */ __name((name) => {
  if (validStylePropertyNameCache.has(name)) {
    return true;
  }
  const len = name.length;
  if (len === 0) {
    return false;
  }
  for (let i = 0; i < len; i++) {
    const c = name.charCodeAt(i);
    if (!(c >= 97 && c <= 122 || // a-z
    c >= 65 && c <= 90 || // A-Z
    c >= 48 && c <= 57 || // 0-9
    c === 45 || // -
    c === 95)) {
      if (!invalidStylePropertyNameCharRe.test(name)) {
        cacheValidName(validStylePropertyNameCache, validStylePropertyNameCacheMax, name);
        return true;
      } else {
        return false;
      }
    }
  }
  cacheValidName(validStylePropertyNameCache, validStylePropertyNameCacheMax, name);
  return true;
}, "isValidStylePropertyName");
var unsafeStyleValueCharRe = /[;"'\\/\[\](){}]/;
var hasUnsafeStyleValue = /* @__PURE__ */ __name((value) => {
  if (!unsafeStyleValueCharRe.test(value)) {
    return false;
  }
  let quote = 0;
  const blockStack = [];
  for (let i = 0, len = value.length; i < len; i++) {
    const c = value.charCodeAt(i);
    if (c === 92) {
      if (i === len - 1) {
        return true;
      }
      i++;
    } else if (quote !== 0) {
      if (c === 10 || c === 12 || c === 13) {
        return true;
      }
      if (c === quote) {
        quote = 0;
      }
    } else if (c === 47 && value.charCodeAt(i + 1) === 42) {
      const end = value.indexOf("*/", i + 2);
      if (end === -1) {
        return true;
      }
      i = end + 1;
    } else if (c === 34 || c === 39) {
      quote = c;
    } else if (c === 40) {
      blockStack.push(41);
    } else if (c === 91) {
      blockStack.push(93);
    } else if (c === 123 || c === 125) {
      return true;
    } else if (c === 41 || c === 93) {
      if (blockStack[blockStack.length - 1] !== c) {
        return true;
      }
      blockStack.pop();
    } else if (c === 59 && blockStack.length === 0) {
      return true;
    }
  }
  return quote !== 0 || blockStack.length !== 0;
}, "hasUnsafeStyleValue");
var styleObjectForEach = /* @__PURE__ */ __name((style2, fn) => {
  for (const [k, v] of Object.entries(style2)) {
    const key = k[0] === "-" || !/[A-Z]/.test(k) ? k : k.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
    if (!isValidStylePropertyName(key)) {
      continue;
    }
    if (v == null) {
      fn(key, null);
      continue;
    }
    let value;
    if (typeof v === "number") {
      value = !key.match(
        /^(?:a|border-im|column(?:-c|s)|flex(?:$|-[^b])|grid-(?:ar|[^a])|font-w|li|or|sca|st|ta|wido|z)|ty$/
      ) ? `${v}px` : `${v}`;
    } else if (typeof v === "string") {
      if (hasUnsafeStyleValue(v)) {
        continue;
      }
      value = v;
    } else {
      continue;
    }
    fn(key, value);
  }
}, "styleObjectForEach");

// node_modules/hono/dist/jsx/base.js
var nameSpaceContext = void 0;
var getNameSpaceContext = /* @__PURE__ */ __name(() => nameSpaceContext, "getNameSpaceContext");
var toSVGAttributeName = /* @__PURE__ */ __name((key) => /[A-Z]/.test(key) && // Presentation attributes are findable in style object. "clip-path", "font-size", "stroke-width", etc.
// Or other un-deprecated kebab-case attributes. "overline-position", "paint-order", "strikethrough-position", etc.
key.match(
  /^(?:al|basel|clip(?:Path|Rule)$|co|do|fill|fl|fo|gl|let|lig|i|marker[EMS]|o|pai|pointe|sh|st[or]|text[^L]|tr|u|ve|w)/
) ? key.replace(/([A-Z])/g, "-$1").toLowerCase() : key, "toSVGAttributeName");
var emptyTags = [
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
];
var booleanAttributes = [
  "allowfullscreen",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "download",
  "formnovalidate",
  "hidden",
  "inert",
  "ismap",
  "itemscope",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "selected"
];
var childrenToStringToBuffer = /* @__PURE__ */ __name((children, buffer) => {
  for (let i = 0, len = children.length; i < len; i++) {
    const child = children[i];
    if (typeof child === "string") {
      escapeToBuffer(child, buffer);
    } else if (typeof child === "boolean" || child === null || child === void 0) {
      continue;
    } else if (child instanceof JSXNode) {
      child.toStringToBuffer(buffer);
    } else if (typeof child === "number" || child.isEscaped) {
      ;
      buffer[0] += child;
    } else if (child instanceof Promise) {
      buffer.unshift("", child);
    } else {
      childrenToStringToBuffer(child, buffer);
    }
  }
}, "childrenToStringToBuffer");
var JSXNode = class {
  static {
    __name(this, "JSXNode");
  }
  tag;
  props;
  key;
  children;
  isEscaped = true;
  suspendedContext;
  constructor(tag, props, children) {
    if (typeof tag !== "function" && !isValidTagName(tag)) {
      throw new Error(`Invalid JSX tag name: ${tag}`);
    }
    this.tag = tag;
    this.props = props;
    this.children = children;
  }
  get type() {
    return this.tag;
  }
  // Added for compatibility with libraries that rely on React's internal structure
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get ref() {
    return this.props.ref || null;
  }
  toString() {
    const render = /* @__PURE__ */ __name(() => {
      const buffer = [""];
      this.toStringToBuffer(buffer);
      return buffer.length === 1 ? "callbacks" in buffer ? resolveCallbackSync(raw(buffer[0], buffer.callbacks)).toString() : buffer[0] : stringBufferToString(buffer, buffer.callbacks);
    }, "render");
    return this.suspendedContext ? this.suspendedContext(render) : runWithRenderContext(render);
  }
  toStringToBuffer(buffer) {
    const tag = this.tag;
    const props = this.props;
    let { children } = this;
    buffer[0] += `<${tag}`;
    const normalizeKey = tag === "svg" || nameSpaceContext && useContext(nameSpaceContext) === "svg" ? (key) => toSVGAttributeName(normalizeIntrinsicElementKey(key)) : (key) => normalizeIntrinsicElementKey(key);
    for (let [key, v] of Object.entries(props)) {
      key = normalizeKey(key);
      if (!isValidAttributeName(key)) {
        continue;
      }
      if (key === "children") {
      } else if (key === "style" && typeof v === "object") {
        let styleStr = "";
        styleObjectForEach(v, (property, value) => {
          if (value != null) {
            styleStr += `${styleStr ? ";" : ""}${property}:${value}`;
          }
        });
        buffer[0] += ' style="';
        escapeToBuffer(styleStr, buffer);
        buffer[0] += '"';
      } else if (typeof v === "string") {
        buffer[0] += ` ${key}="`;
        escapeToBuffer(v, buffer);
        buffer[0] += '"';
      } else if (v === null || v === void 0) {
      } else if (typeof v === "number" || v.isEscaped) {
        buffer[0] += ` ${key}="${v}"`;
      } else if (typeof v === "boolean" && booleanAttributes.includes(key)) {
        if (v) {
          buffer[0] += ` ${key}=""`;
        }
      } else if (key === "dangerouslySetInnerHTML") {
        if (children.length > 0) {
          throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
        }
        children = [raw(v.__html)];
      } else if (v instanceof Promise) {
        buffer[0] += ` ${key}="`;
        buffer.unshift('"', v);
      } else if (typeof v === "function") {
        if (!key.startsWith("on") && key !== "ref") {
          throw new Error(`Invalid prop '${key}' of type 'function' supplied to '${tag}'.`);
        }
      } else {
        buffer[0] += ` ${key}="`;
        escapeToBuffer(v.toString(), buffer);
        buffer[0] += '"';
      }
    }
    if (emptyTags.includes(tag) && children.length === 0) {
      buffer[0] += "/>";
      return;
    }
    buffer[0] += ">";
    childrenToStringToBuffer(children, buffer);
    buffer[0] += `</${tag}>`;
  }
};
var JSXFunctionNode = class extends JSXNode {
  static {
    __name(this, "JSXFunctionNode");
  }
  toStringToBuffer(buffer) {
    const { children } = this;
    const props = { ...this.props };
    if (children.length) {
      props.children = children.length === 1 ? children[0] : children;
    }
    const res = this.tag.call(null, props);
    if (typeof res === "boolean" || res == null) {
      return;
    } else if (res instanceof Promise) {
      if (globalContexts.length === 0) {
        buffer.unshift("", res);
      } else {
        const suspendedContext = captureRenderContext();
        buffer.unshift(
          "",
          res.then((childRes) => {
            if (childRes instanceof JSXNode) {
              childRes.suspendedContext = suspendedContext;
            }
            return childRes;
          })
        );
      }
    } else if (res instanceof JSXNode) {
      res.toStringToBuffer(buffer);
    } else if (typeof res === "number" || res.isEscaped) {
      buffer[0] += res;
      if (res.callbacks) {
        buffer.callbacks ||= [];
        buffer.callbacks.push(...res.callbacks);
      }
    } else {
      escapeToBuffer(res, buffer);
    }
  }
};
var JSXFragmentNode = class extends JSXNode {
  static {
    __name(this, "JSXFragmentNode");
  }
  toStringToBuffer(buffer) {
    childrenToStringToBuffer(this.children, buffer);
  }
};
var initDomRenderer = false;
var jsxFn = /* @__PURE__ */ __name((tag, props, children) => {
  if (!initDomRenderer) {
    for (const k in domRenderers) {
      ;
      components_exports[k][DOM_RENDERER] = domRenderers[k];
    }
    initDomRenderer = true;
  }
  if (typeof tag === "function") {
    return new JSXFunctionNode(tag, props, children);
  } else if (components_exports[tag]) {
    return new JSXFunctionNode(
      components_exports[tag],
      props,
      children
    );
  } else if (tag === "svg" || tag === "head") {
    nameSpaceContext ||= createContext("");
    return new JSXNode(tag, props, [
      new JSXFunctionNode(
        nameSpaceContext,
        {
          value: tag
        },
        children
      )
    ]);
  } else {
    return new JSXNode(tag, props, children);
  }
}, "jsxFn");
var Fragment = /* @__PURE__ */ __name(({
  children
}) => {
  return new JSXFragmentNode(
    "",
    {
      children
    },
    Array.isArray(children) ? children : children ? [children] : []
  );
}, "Fragment");

// node_modules/hono/dist/jsx/jsx-dev-runtime.js
function jsxDEV(tag, props, key) {
  let node;
  if (!props || !("children" in props)) {
    node = jsxFn(tag, props, []);
  } else {
    const children = props.children;
    node = Array.isArray(children) ? jsxFn(tag, props, children) : jsxFn(tag, props, [children]);
  }
  node.key = key;
  return node;
}
__name(jsxDEV, "jsxDEV");

// src/ui.tsx
var Layout = /* @__PURE__ */ __name((props) => {
  const canonical = props.siteUrl.replace(/\/$/, "") + (props.path ?? "");
  return /* @__PURE__ */ jsxDEV("html", { lang: "en", children: [
    /* @__PURE__ */ jsxDEV("head", { children: [
      /* @__PURE__ */ jsxDEV("meta", { charset: "utf-8" }),
      /* @__PURE__ */ jsxDEV("meta", { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" }),
      /* @__PURE__ */ jsxDEV("title", { children: props.title }),
      /* @__PURE__ */ jsxDEV("meta", { name: "description", content: props.description }),
      /* @__PURE__ */ jsxDEV("link", { rel: "canonical", href: canonical }),
      /* @__PURE__ */ jsxDEV("meta", { name: "theme-color", content: "#04050a" }),
      /* @__PURE__ */ jsxDEV("link", { rel: "icon", href: "/logo.svg" }),
      /* @__PURE__ */ jsxDEV("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsxDEV("meta", { property: "og:title", content: props.title }),
      /* @__PURE__ */ jsxDEV("meta", { property: "og:description", content: props.description }),
      /* @__PURE__ */ jsxDEV("meta", { property: "og:image", content: props.siteUrl.replace(/\/$/, "") + "/logo.svg" }),
      /* @__PURE__ */ jsxDEV("meta", { property: "og:url", content: canonical }),
      /* @__PURE__ */ jsxDEV("meta", { name: "twitter:card", content: "summary_large_image" }),
      props.jsonLd ? /* @__PURE__ */ jsxDEV(
        "script",
        {
          type: "application/ld+json",
          dangerouslySetInnerHTML: { __html: JSON.stringify(props.jsonLd) }
        }
      ) : null,
      /* @__PURE__ */ jsxDEV("style", { dangerouslySetInnerHTML: { __html: CSS } })
    ] }),
    /* @__PURE__ */ jsxDEV("body", { children: [
      /* @__PURE__ */ jsxDEV(CityBackground, {}),
      props.children,
      /* @__PURE__ */ jsxDEV("script", { dangerouslySetInnerHTML: { __html: PARALLAX_JS } })
    ] })
  ] });
}, "Layout");
var CityBackground = /* @__PURE__ */ __name(() => /* @__PURE__ */ jsxDEV("div", { class: "city-bg", "aria-hidden": "true", children: [
  /* @__PURE__ */ jsxDEV("div", { class: "starfield" }),
  /* @__PURE__ */ jsxDEV("div", { class: "haze" }),
  /* @__PURE__ */ jsxDEV("div", { class: "fog" }),
  /* @__PURE__ */ jsxDEV("svg", { class: "skyline back", viewBox: "0 0 1440 500", preserveAspectRatio: "xMidYMax slice", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxDEV("g", { fill: "#161a26", children: [
    /* @__PURE__ */ jsxDEV("rect", { x: "0", y: "400", width: "150", height: "100" }),
    /* @__PURE__ */ jsxDEV("rect", { x: "170", y: "380", width: "160", height: "120" }),
    /* @__PURE__ */ jsxDEV("rect", { x: "360", y: "412", width: "130", height: "88" }),
    /* @__PURE__ */ jsxDEV("rect", { x: "520", y: "392", width: "150", height: "108" }),
    /* @__PURE__ */ jsxDEV("rect", { x: "700", y: "402", width: "150", height: "98" }),
    /* @__PURE__ */ jsxDEV("rect", { x: "880", y: "386", width: "160", height: "114" }),
    /* @__PURE__ */ jsxDEV("rect", { x: "1070", y: "408", width: "150", height: "92" }),
    /* @__PURE__ */ jsxDEV("rect", { x: "1250", y: "396", width: "190", height: "104" })
  ] }) }),
  /* @__PURE__ */ jsxDEV("svg", { class: "skyline mid", viewBox: "0 0 1440 500", preserveAspectRatio: "xMidYMax slice", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxDEV("g", { fill: "#0e1017", children: [
    /* @__PURE__ */ jsxDEV("rect", { x: "20", y: "360", width: "100", height: "140" }),
    /* @__PURE__ */ jsxDEV("rect", { x: "140", y: "330", width: "90", height: "170" }),
    /* @__PURE__ */ jsxDEV("rect", { x: "250", y: "380", width: "120", height: "120" }),
    /* @__PURE__ */ jsxDEV("rect", { x: "390", y: "340", width: "80", height: "160" }),
    /* @__PURE__ */ jsxDEV("rect", { x: "500", y: "360", width: "110", height: "140" }),
    /* @__PURE__ */ jsxDEV("rect", { x: "640", y: "320", width: "90", height: "180" }),
    /* @__PURE__ */ jsxDEV("rect", { x: "760", y: "370", width: "100", height: "130" }),
    /* @__PURE__ */ jsxDEV("rect", { x: "880", y: "340", width: "120", height: "160" }),
    /* @__PURE__ */ jsxDEV("rect", { x: "1020", y: "360", width: "94", height: "140" }),
    /* @__PURE__ */ jsxDEV("rect", { x: "1130", y: "330", width: "110", height: "170" }),
    /* @__PURE__ */ jsxDEV("rect", { x: "1260", y: "372", width: "100", height: "128" }),
    /* @__PURE__ */ jsxDEV("rect", { x: "1372", y: "350", width: "68", height: "150" })
  ] }) }),
  /* @__PURE__ */ jsxDEV("svg", { class: "skyline front", viewBox: "0 0 1440 500", preserveAspectRatio: "xMidYMax slice", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsxDEV("g", { fill: "#08090e", children: [
      /* @__PURE__ */ jsxDEV("rect", { x: "0", y: "250", width: "120", height: "250" }),
      /* @__PURE__ */ jsxDEV("rect", { x: "126", y: "300", width: "74", height: "200" }),
      /* @__PURE__ */ jsxDEV("rect", { x: "206", y: "170", width: "110", height: "330" }),
      /* @__PURE__ */ jsxDEV("rect", { x: "326", y: "230", width: "64", height: "270" }),
      /* @__PURE__ */ jsxDEV("rect", { x: "396", y: "120", width: "140", height: "380" }),
      /* @__PURE__ */ jsxDEV("rect", { x: "546", y: "270", width: "80", height: "230" }),
      /* @__PURE__ */ jsxDEV("rect", { x: "636", y: "200", width: "96", height: "300" }),
      /* @__PURE__ */ jsxDEV("rect", { x: "742", y: "150", width: "120", height: "350" }),
      /* @__PURE__ */ jsxDEV("rect", { x: "872", y: "260", width: "70", height: "240" }),
      /* @__PURE__ */ jsxDEV("rect", { x: "952", y: "190", width: "104", height: "310" }),
      /* @__PURE__ */ jsxDEV("rect", { x: "1066", y: "300", width: "64", height: "200" }),
      /* @__PURE__ */ jsxDEV("rect", { x: "1140", y: "160", width: "126", height: "340" }),
      /* @__PURE__ */ jsxDEV("rect", { x: "1276", y: "240", width: "88", height: "260" }),
      /* @__PURE__ */ jsxDEV("rect", { x: "1372", y: "210", width: "68", height: "290" })
    ] }),
    /* @__PURE__ */ jsxDEV("g", { fill: "#c79a54", "fill-opacity": "0.3", children: [
      /* @__PURE__ */ jsxDEV("rect", { x: "18", y: "300", width: "4", height: "6" }),
      /* @__PURE__ */ jsxDEV("rect", { x: "70", y: "382", width: "4", height: "6" }),
      /* @__PURE__ */ jsxDEV("rect", { x: "150", y: "344", width: "4", height: "6" }),
      /* @__PURE__ */ jsxDEV("rect", { x: "230", y: "212", width: "4", height: "6" }),
      /* @__PURE__ */ jsxDEV("rect", { x: "282", y: "262", width: "4", height: "6" }),
      /* @__PURE__ */ jsxDEV("rect", { x: "252", y: "332", width: "4", height: "6" }),
      /* @__PURE__ */ jsxDEV("rect", { x: "346", y: "272", width: "4", height: "6" }),
      /* @__PURE__ */ jsxDEV("rect", { x: "420", y: "162", width: "4", height: "6" }),
      /* @__PURE__ */ jsxDEV("rect", { x: "470", y: "212", width: "4", height: "6" }),
      /* @__PURE__ */ jsxDEV("rect", { x: "440", y: "282", width: "4", height: "6" }),
      /* @__PURE__ */ jsxDEV("rect", { x: "492", y: "360", width: "4", height: "6" }),
      /* @__PURE__ */ jsxDEV("rect", { x: "566", y: "312", width: "4", height: "6" }),
      /* @__PURE__ */ jsxDEV("rect", { x: "656", y: "242", width: "4", height: "6" }),
      /* @__PURE__ */ jsxDEV("rect", { x: "702", y: "302", width: "4", height: "6" }),
      /* @__PURE__ */ jsxDEV("rect", { x: "762", y: "192", width: "4", height: "6" }),
      /* @__PURE__ */ jsxDEV("rect", { x: "840", y: "242", width: "4", height: "6" }),
      /* @__PURE__ */ jsxDEV("rect", { x: "782", y: "322", width: "4", height: "6" }),
      /* @__PURE__ */ jsxDEV("rect", { x: "892", y: "302", width: "4", height: "6" }),
      /* @__PURE__ */ jsxDEV("rect", { x: "972", y: "232", width: "4", height: "6" }),
      /* @__PURE__ */ jsxDEV("rect", { x: "1020", y: "192", width: "4", height: "6" }),
      /* @__PURE__ */ jsxDEV("rect", { x: "1002", y: "302", width: "4", height: "6" }),
      /* @__PURE__ */ jsxDEV("rect", { x: "1086", y: "342", width: "4", height: "6" }),
      /* @__PURE__ */ jsxDEV("rect", { x: "1160", y: "202", width: "4", height: "6" }),
      /* @__PURE__ */ jsxDEV("rect", { x: "1240", y: "252", width: "4", height: "6" }),
      /* @__PURE__ */ jsxDEV("rect", { x: "1182", y: "342", width: "4", height: "6" }),
      /* @__PURE__ */ jsxDEV("rect", { x: "1296", y: "282", width: "4", height: "6" }),
      /* @__PURE__ */ jsxDEV("rect", { x: "1392", y: "252", width: "4", height: "6" }),
      /* @__PURE__ */ jsxDEV("rect", { x: "1416", y: "342", width: "4", height: "6" })
    ] }),
    /* @__PURE__ */ jsxDEV("g", { fill: "#a8505a", "fill-opacity": "0.34", children: [
      /* @__PURE__ */ jsxDEV("rect", { x: "502", y: "152", width: "4", height: "6" }),
      /* @__PURE__ */ jsxDEV("rect", { x: "812", y: "152", width: "4", height: "6" }),
      /* @__PURE__ */ jsxDEV("rect", { x: "1212", y: "162", width: "4", height: "6" })
    ] })
  ] }),
  /* @__PURE__ */ jsxDEV("div", { class: "ground-glow" }),
  /* @__PURE__ */ jsxDEV("div", { class: "bg-dim" })
] }), "CityBackground");
var Header = /* @__PURE__ */ __name(() => /* @__PURE__ */ jsxDEV("header", { class: "site-head", children: [
  /* @__PURE__ */ jsxDEV("a", { href: "/", class: "brand", "aria-label": "DJ Chan home", children: [
    /* @__PURE__ */ jsxDEV("img", { src: "/logo.svg", alt: "DJ Chan", width: "52", height: "52" }),
    /* @__PURE__ */ jsxDEV("span", { children: "DJ\xA0CHAN" })
  ] }),
  /* @__PURE__ */ jsxDEV("nav", { children: /* @__PURE__ */ jsxDEV("a", { href: "/book", class: "btn btn-gold btn-sm", children: "Book now" }) })
] }), "Header");
var Footer = /* @__PURE__ */ __name((p) => /* @__PURE__ */ jsxDEV("footer", { class: "site-foot", children: [
  /* @__PURE__ */ jsxDEV("img", { src: "/logo.svg", alt: "", width: "40", height: "40", "aria-hidden": "true" }),
  /* @__PURE__ */ jsxDEV("div", { class: "foot-links", children: [
    /* @__PURE__ */ jsxDEV("a", { href: p.instagram, children: "Instagram" }),
    /* @__PURE__ */ jsxDEV("a", { href: p.tiktok, children: "TikTok" }),
    /* @__PURE__ */ jsxDEV("a", { href: `mailto:${p.contactEmail}`, children: p.contactEmail })
  ] }),
  /* @__PURE__ */ jsxDEV("p", { class: "muted", children: [
    "\xA9 ",
    (/* @__PURE__ */ new Date()).getFullYear(),
    " DJ Chan. All rights reserved."
  ] })
] }), "Footer");
var CSS = `
:root{
  --bg:#04050a; --gold:#d4af57; --gold-deep:#9c722b; --gold-soft:#806329; --gold-bright:#f4dda0; --gold-gradient:linear-gradient(135deg,#f6e6b4 0%,#d4af57 48%,#a67c32 100%);
  --steel:#9aa1b2;
  --panel:rgba(16,18,24,.62); --panel-solid:#0d0e13;
  --ink:#e7e9ef; --muted:#858b9a; --line:rgba(150,160,180,.12); --line-strong:rgba(160,170,190,.22);
  --radius:16px;
}
*{box-sizing:border-box}
html,body{margin:0;padding:0}
body{
  background:#04050a; color:var(--ink);
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  line-height:1.6;-webkit-font-smoothing:antialiased;min-height:100dvh;
}
a{color:var(--gold-bright);text-decoration:none}
img{display:block}
.muted{color:var(--muted)}
.wrap{max-width:720px;margin:0 auto;padding:0 20px}
body>*:not(.city-bg){position:relative;z-index:1}

/* ---------- Cinematic city night background ---------- */
.city-bg{position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none;
  background:linear-gradient(180deg,#04050a 0%,#05060c 40%,#0a0b12 70%,#121008 100%)}
.starfield{position:absolute;inset:-10% 0 46%;background-repeat:repeat;background-size:440px 440px;opacity:.16;will-change:transform;
  background-image:
    radial-gradient(1px 1px at 40px 60px,#aeb4c4,transparent),
    radial-gradient(1px 1px at 180px 120px,#98a0b4,transparent),
    radial-gradient(1px 1px at 320px 40px,#aeb4c4,transparent),
    radial-gradient(1px 1px at 120px 260px,#8a90a4,transparent)}
.haze{position:absolute;left:0;right:0;bottom:0;height:56vh;will-change:transform;
  background:radial-gradient(130% 92% at 50% 122%,rgba(184,145,64,.2),rgba(112,85,34,.09) 42%,transparent 70%)}
.fog{position:absolute;left:-25%;right:-25%;bottom:16vh;height:26vh;filter:blur(26px);opacity:.6;will-change:transform;
  background:linear-gradient(180deg,transparent,rgba(120,124,150,.06) 45%,transparent);
  animation:drift 120s ease-in-out infinite alternate}
.skyline{position:absolute;left:-2%;right:-2%;bottom:0;width:104%;will-change:transform}
.skyline.back{height:40vh;opacity:.55}
.skyline.mid{height:46vh;opacity:.8}
.skyline.front{height:52vh}
.ground-glow{position:absolute;left:0;right:0;bottom:0;height:22vh;mix-blend-mode:screen;
  background:linear-gradient(180deg,transparent,rgba(156,114,43,.14) 60%,rgba(212,175,87,.24))}
.bg-dim{position:absolute;inset:0;background:#000;opacity:.6}
@keyframes drift{from{transform:translateX(-8%)}to{transform:translateX(8%)}}
@media(prefers-reduced-motion:reduce){ .fog{animation:none} }

/* ---------- Mobile: link in bio ---------- */
.site-head{display:flex;align-items:center;justify-content:space-between;max-width:720px;margin:0 auto;padding:16px 20px}
.brand{display:flex;align-items:center;gap:10px;color:var(--ink);font-weight:800;letter-spacing:2px;font-size:15px}
.brand img{border-radius:10px}

.gold-text{background:var(--gold-gradient);
  -webkit-background-clip:text;background-clip:text;color:transparent}

.hero{text-align:center;padding:24px 20px 8px}
.hero .logo-badge{width:196px;height:196px;margin:0 auto 10px;border-radius:24px;
  box-shadow:0 0 0 1px rgba(160,170,190,.2),0 20px 60px rgba(0,0,0,.55),0 0 46px rgba(212,175,87,.2)}
.hero h1{font-size:13px;letter-spacing:5px;color:var(--muted);text-transform:uppercase;margin:0 0 6px;font-weight:700}
.hero .tag{font-size:19px;font-weight:600;margin:0 auto;max-width:26ch}

.links{max-width:460px;margin:22px auto 0;display:flex;flex-direction:column;gap:12px;padding:0 20px}
.link-btn{display:flex;align-items:center;justify-content:center;gap:10px;padding:16px;border-radius:14px;font-weight:700;font-size:15px;
  border:1px solid var(--line);background:var(--panel);color:var(--ink);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);
  transition:transform .12s ease,border-color .12s ease,box-shadow .12s ease}
.link-btn:hover{transform:translateY(-2px);border-color:var(--gold);box-shadow:0 0 22px rgba(212,175,87,.28)}
.link-btn.primary{background:var(--gold-gradient);color:#171208;border:none;box-shadow:0 8px 34px rgba(212,175,87,.4)}

.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:14px 22px;border-radius:12px;font-weight:700;font-size:15px;cursor:pointer;
  border:1px solid var(--line-strong);background:var(--panel);color:var(--ink);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);transition:transform .12s ease,box-shadow .12s ease}
.btn:hover{transform:translateY(-1px);box-shadow:0 0 22px rgba(212,175,87,.24)}
.btn-sm{padding:9px 16px;font-size:13px;border-radius:10px}
.btn-gold{background:var(--gold-gradient);color:#171208;border:none;box-shadow:0 6px 26px rgba(212,175,87,.4)}
.btn-block{width:100%}

section.band{padding:34px 0}
h2.section-title{font-size:12px;letter-spacing:4px;text-transform:uppercase;color:var(--muted);text-align:center;margin:0 0 20px}

.cards{display:grid;gap:14px}
@media(min-width:640px){.cards{grid-template-columns:1fr 1fr}}
.card{background:var(--panel);border:1px solid var(--line);border-radius:var(--radius);padding:20px;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}
.card:hover{border-color:var(--line-strong)}
.card h3{margin:0 0 2px;font-size:19px}
.card .price{font-size:24px;font-weight:800;margin:10px 0 2px}
.card .dep{font-size:13px;color:var(--muted);margin:0 0 12px}
.card ul{list-style:none;padding:0;margin:0 0 16px}
.card li{padding:5px 0 5px 22px;position:relative;font-size:14px;color:#c4c8d3}
.card li:before{content:"";position:absolute;left:0;top:12px;width:9px;height:9px;border-radius:50%;
  background:var(--gold);box-shadow:0 0 8px var(--gold)}

form{display:flex;flex-direction:column;gap:16px}
label{font-size:13px;color:var(--muted);font-weight:600;display:block;margin-bottom:6px;letter-spacing:.3px}
input,select,textarea{width:100%;padding:14px;border-radius:12px;border:1px solid var(--line);
  background:rgba(6,8,16,.6);color:var(--ink);font-size:16px;font-family:inherit}
input:focus,select:focus,textarea:focus{outline:none;border-color:var(--gold);box-shadow:0 0 0 3px rgba(212,175,87,.2)}
.row{display:grid;gap:16px}
@media(min-width:560px){.row.two{grid-template-columns:1fr 1fr}}
.pay-opts{display:grid;gap:12px}
.pay-opt{border:1px solid var(--line);border-radius:12px;padding:14px;display:flex;gap:12px;align-items:flex-start;cursor:pointer;background:rgba(6,8,16,.5)}
.pay-opt input{width:auto;margin-top:4px}
.pay-opt.sel{border-color:var(--gold);box-shadow:0 0 0 2px rgba(212,175,87,.24)}
.pay-opt b{display:block}

.panel{background:var(--panel);border:1px solid var(--line);border-radius:var(--radius);padding:22px;margin-top:20px;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}
.notice{border-radius:12px;padding:14px 16px;margin:16px 0;font-size:14px}
.notice.ok{background:rgba(40,150,100,.14);border:1px solid rgba(46,190,130,.4);color:#79e6b4}
.notice.warn{background:rgba(200,150,40,.12);border:1px solid rgba(210,160,50,.38);color:#e6be6a}
.notice.err{background:rgba(200,40,60,.16);border:1px solid rgba(210,50,70,.44);color:#ff9aa9}

table{width:100%;border-collapse:collapse;font-size:14px}
th,td{text-align:left;padding:11px 10px;border-bottom:1px solid var(--line)}
th{font-size:11px;letter-spacing:1px;text-transform:uppercase;color:var(--muted)}
td .pill,.pill{display:inline-block;padding:3px 10px;border-radius:999px;font-size:12px;font-weight:700}
.pill.paid{background:rgba(46,190,130,.16);color:#79e6b4}
.pill.pending{background:rgba(210,160,50,.16);color:#e6be6a}

.stat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:6px}
.stat{background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:16px;backdrop-filter:blur(10px)}
.stat .n{font-size:26px;font-weight:800}
.stat .l{font-size:12px;color:var(--muted);text-transform:uppercase;letter-spacing:1px}

.site-foot{text-align:center;padding:40px 20px 48px;border-top:1px solid var(--line);margin-top:36px}
.site-foot img{margin:0 auto 12px;border-radius:8px;opacity:.9}
.foot-links{display:flex;gap:18px;justify-content:center;flex-wrap:wrap;margin-bottom:10px;font-size:14px}
.foot-links a{color:var(--ink)}
.tabler{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px}
h1.page-title{font-size:26px;margin:6px 0 2px}
.sub{color:var(--muted);margin:0 0 8px}
.back{font-size:14px;color:var(--muted)}

/* ---------- Responsive switch ---------- */
.desktop-site{display:none}
.mobile-bio{display:block}
@media(min-width:769px){.mobile-bio{display:none}.desktop-site{display:block}}

.topnav{position:sticky;top:0;z-index:20;background:rgba(4,5,10,.78);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-bottom:1px solid var(--line)}
.topnav .inner{max-width:1120px;margin:0 auto;padding:14px 32px;display:flex;align-items:center;justify-content:space-between}
.topnav .brand{font-size:16px}
.topnav .navlinks{display:flex;align-items:center;gap:28px}
.topnav .navlinks a{color:#b7bcc8;font-weight:600;font-size:15px}
.topnav .navlinks a:hover{color:var(--gold-bright)}
.topnav .navlinks a.btn-gold{color:#171208}

.d-wrap{max-width:1120px;margin:0 auto;padding:0 32px}
.d-hero{display:grid;grid-template-columns:1.1fr .9fr;gap:48px;align-items:center;padding:96px 0 80px}
.d-hero .eyebrow{letter-spacing:5px;text-transform:uppercase;color:var(--gold-bright);font-weight:700;font-size:13px;margin:0 0 16px;text-shadow:0 0 16px rgba(212,175,87,.5)}
.d-hero h1{font-size:66px;line-height:1.02;margin:0 0 20px;font-weight:800;letter-spacing:-1.5px;filter:drop-shadow(0 6px 30px rgba(212,175,87,.22))}
.d-hero p.lede{font-size:20px;color:#c3c7d2;max-width:46ch;margin:0 0 30px}
.d-hero .cta-row{display:flex;gap:14px;flex-wrap:wrap}
.d-hero .art{display:flex;justify-content:center}
.d-hero .art img{width:100%;max-width:420px;border-radius:28px;
  box-shadow:0 0 0 1px rgba(160,170,190,.2),0 30px 90px rgba(0,0,0,.6),0 0 66px rgba(212,175,87,.22)}

.d-section{padding:74px 0;border-top:1px solid var(--line)}
.d-section h2{font-size:40px;font-weight:800;letter-spacing:-.5px;margin:0 0 10px;text-align:center}
.d-section .sect-sub{text-align:center;color:var(--muted);max-width:54ch;margin:0 auto 42px;font-size:17px}
.cards-4{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}

.about{display:grid;grid-template-columns:1fr 1fr;gap:52px;align-items:center}
.about h2{text-align:left;margin-bottom:16px}
.about p{color:#c3c7d2;font-size:17px}
.stats-row{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:8px}
.stat-big{background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:24px;text-align:center;backdrop-filter:blur(10px)}
.stat-big .n{font-size:34px;font-weight:800}
.stat-big .l{color:var(--muted);font-size:12px;text-transform:uppercase;letter-spacing:1px;margin-top:4px}

.quotes{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.quote{background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:26px;backdrop-filter:blur(10px)}
.quote p{font-size:16px;color:#d7dae4;margin:0 0 16px;line-height:1.6}
.quote .who{color:var(--gold-bright);font-weight:700;font-size:14px}

.cta-band{background:linear-gradient(135deg,rgba(100,74,28,.55),rgba(10,11,16,.6));border:1px solid var(--line-strong);border-radius:24px;padding:56px 40px;text-align:center;margin:24px 0;backdrop-filter:blur(12px);
  box-shadow:0 0 60px rgba(184,145,64,.28)}
.cta-band h2{font-size:42px;margin:0 0 12px;font-weight:800;letter-spacing:-.5px}
.cta-band p{color:#c3c7d2;font-size:18px;margin:0 0 26px}

.d-foot{border-top:1px solid var(--line);margin-top:8px;background:rgba(4,5,10,.6);backdrop-filter:blur(10px)}
.d-foot .inner{max-width:1120px;margin:0 auto;padding:44px 32px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:22px}
.d-foot .foot-links{display:flex;gap:24px}
.d-foot .foot-links a{color:#b7bcc8;font-size:15px;font-weight:600}
.d-foot .foot-links a:hover{color:var(--gold-bright)}

@media(min-width:769px) and (max-width:980px){
  .d-hero{grid-template-columns:1fr;text-align:center;padding-top:72px}
  .d-hero .cta-row{justify-content:center}
  .d-hero p.lede{margin-left:auto;margin-right:auto}
  .d-hero h1{font-size:50px}
  .d-hero .art{order:-1}
  .d-hero .art img{max-width:300px}
  .cards-4{grid-template-columns:1fr 1fr}
  .about{grid-template-columns:1fr}
  .about h2{text-align:center}
  .quotes{grid-template-columns:1fr}
}
`;
var PARALLAX_JS = `
(function(){
  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var back=document.querySelector('.skyline.back'),
      mid=document.querySelector('.skyline.mid'),
      front=document.querySelector('.skyline.front'),
      sky=document.querySelector('.starfield'),
      haze=document.querySelector('.haze'),
      ticking=false;
  function frame(){
    var se=document.scrollingElement||document.documentElement;
    var y=window.scrollY||window.pageYOffset||(se?se.scrollTop:0)||0;
    if(sky) sky.style.transform='translateY('+(y*0.12)+'px)';
    if(haze) haze.style.transform='translateY('+(y*0.06)+'px)';
    if(back) back.style.transform='translateY('+(y*0.14)+'px)';
    if(mid) mid.style.transform='translateY('+(y*0.24)+'px)';
    if(front) front.style.transform='translateY('+(y*0.34)+'px)';
    ticking=false;
  }
  window.addEventListener('scroll',function(){ if(!ticking){window.requestAnimationFrame(frame);ticking=true;} },{passive:true});
  frame();
})();
`;

// src/pages/landing.tsx
var STATS = [
  { n: "100+", l: "Events played" },
  { n: "5 yrs", l: "On the decks" },
  { n: "4.9\u2605", l: "Average rating" }
];
var Landing = /* @__PURE__ */ __name((p) => {
  const base = p.siteUrl.replace(/\/$/, "");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["MusicGroup", "LocalBusiness"],
    name: "DJ Chan",
    description: "Open format DJ and MC for weddings, private parties, clubs and corporate events.",
    url: base,
    logo: `${base}/logo.svg`,
    image: `${base}/logo.svg`,
    email: p.contactEmail,
    priceRange: "$$",
    makesOffer: SERVICES.map((s) => ({
      "@type": "Offer",
      name: s.name,
      description: s.tagline,
      priceCurrency: p.currency.toUpperCase(),
      price: (s.priceCents / 100).toFixed(0),
      url: `${base}/book?service=${s.id}`
    }))
  };
  return /* @__PURE__ */ jsxDEV(
    Layout,
    {
      title: "DJ Chan | Book a DJ for weddings, parties and events",
      description: "DJ Chan brings the energy to weddings, private parties, clubs and corporate events. Check availability and lock your date with a deposit in minutes.",
      siteUrl: p.siteUrl,
      path: "/",
      jsonLd,
      children: [
        /* @__PURE__ */ jsxDEV("div", { class: "mobile-bio", children: [
          /* @__PURE__ */ jsxDEV("main", { children: [
            /* @__PURE__ */ jsxDEV("section", { class: "hero", children: [
              /* @__PURE__ */ jsxDEV("img", { class: "logo-badge", src: "/logo.svg", alt: "DJ Chan logo", width: "200", height: "200" }),
              /* @__PURE__ */ jsxDEV("h1", { children: "Open format DJ & MC" }),
              /* @__PURE__ */ jsxDEV("p", { class: "tag", children: [
                "Weddings, parties, clubs and brand events. ",
                /* @__PURE__ */ jsxDEV("span", { class: "gold-text", children: "Let's make it unforgettable." })
              ] })
            ] }),
            /* @__PURE__ */ jsxDEV("nav", { class: "links", "aria-label": "Primary links", children: [
              /* @__PURE__ */ jsxDEV("a", { class: "link-btn primary", href: "/book", children: "Check availability & book" }),
              /* @__PURE__ */ jsxDEV("a", { class: "link-btn", href: p.instagram, children: "Instagram" }),
              /* @__PURE__ */ jsxDEV("a", { class: "link-btn", href: p.tiktok, children: "TikTok / mixes" }),
              /* @__PURE__ */ jsxDEV("a", { class: "link-btn", href: `mailto:${p.contactEmail}`, children: "Email for inquiries" })
            ] }),
            /* @__PURE__ */ jsxDEV("section", { class: "band", children: /* @__PURE__ */ jsxDEV("div", { class: "wrap", children: [
              /* @__PURE__ */ jsxDEV("h2", { class: "section-title", children: "Packages" }),
              /* @__PURE__ */ jsxDEV("div", { class: "cards", children: SERVICES.map((s) => /* @__PURE__ */ jsxDEV("div", { class: "card", children: [
                /* @__PURE__ */ jsxDEV("h3", { children: s.name }),
                /* @__PURE__ */ jsxDEV("p", { class: "muted", style: "margin:0;font-size:14px", children: s.tagline }),
                /* @__PURE__ */ jsxDEV("div", { class: "price", children: [
                  "From ",
                  /* @__PURE__ */ jsxDEV("span", { class: "gold-text", children: money(s.priceCents, p.currency) })
                ] }),
                /* @__PURE__ */ jsxDEV("p", { class: "dep", children: [
                  money(s.depositCents, p.currency),
                  " deposit to reserve"
                ] }),
                /* @__PURE__ */ jsxDEV("ul", { children: s.features.map((f) => /* @__PURE__ */ jsxDEV("li", { children: f })) }),
                /* @__PURE__ */ jsxDEV("a", { class: "btn btn-gold btn-block", href: `/book?service=${s.id}`, children: [
                  "Book ",
                  s.name
                ] })
              ] })) })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxDEV(Footer, { contactEmail: p.contactEmail, instagram: p.instagram, tiktok: p.tiktok })
        ] }),
        /* @__PURE__ */ jsxDEV("div", { class: "desktop-site", children: [
          /* @__PURE__ */ jsxDEV("header", { class: "topnav", children: /* @__PURE__ */ jsxDEV("div", { class: "inner", children: [
            /* @__PURE__ */ jsxDEV("a", { class: "brand", href: "/", "aria-label": "DJ Chan home", children: [
              /* @__PURE__ */ jsxDEV("img", { src: "/logo.svg", alt: "DJ Chan", width: "44", height: "44" }),
              /* @__PURE__ */ jsxDEV("span", { children: "DJ\xA0CHAN" })
            ] }),
            /* @__PURE__ */ jsxDEV("nav", { class: "navlinks", "aria-label": "Primary", children: [
              /* @__PURE__ */ jsxDEV("a", { href: "#services", children: "Packages" }),
              /* @__PURE__ */ jsxDEV("a", { href: "#about", children: "About" }),
              /* @__PURE__ */ jsxDEV("a", { href: "#reviews", children: "Reviews" }),
              /* @__PURE__ */ jsxDEV("a", { href: "#contact", children: "Contact" }),
              /* @__PURE__ */ jsxDEV("a", { class: "btn btn-gold btn-sm", href: "/book", children: "Book now" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxDEV("main", { children: [
            /* @__PURE__ */ jsxDEV("section", { class: "d-wrap d-hero", children: [
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("p", { class: "eyebrow", children: "Open format DJ & MC" }),
                /* @__PURE__ */ jsxDEV("h1", { children: [
                  "Turn your night into ",
                  /* @__PURE__ */ jsxDEV("span", { class: "gold-text", children: "a headline show." })
                ] }),
                /* @__PURE__ */ jsxDEV("p", { class: "lede", children: "DJ Chan brings the energy, the gear and the crowd-reading instincts to weddings, private parties, clubs and brand events. Lock your date online in minutes." }),
                /* @__PURE__ */ jsxDEV("div", { class: "cta-row", children: [
                  /* @__PURE__ */ jsxDEV("a", { class: "btn btn-gold", href: "/book", children: "Check availability & book" }),
                  /* @__PURE__ */ jsxDEV("a", { class: "btn", href: "#services", children: "View packages" })
                ] })
              ] }),
              /* @__PURE__ */ jsxDEV("div", { class: "art", children: /* @__PURE__ */ jsxDEV("img", { src: "/logo.svg", alt: "DJ Chan logo", width: "430", height: "430" }) })
            ] }),
            /* @__PURE__ */ jsxDEV("section", { id: "services", class: "d-section", children: /* @__PURE__ */ jsxDEV("div", { class: "d-wrap", children: [
              /* @__PURE__ */ jsxDEV("h2", { children: "Packages" }),
              /* @__PURE__ */ jsxDEV("p", { class: "sect-sub", children: "Straightforward pricing. A deposit reserves your date, balance due before the event." }),
              /* @__PURE__ */ jsxDEV("div", { class: "cards-4", children: SERVICES.map((s) => /* @__PURE__ */ jsxDEV("div", { class: "card", children: [
                /* @__PURE__ */ jsxDEV("h3", { children: s.name }),
                /* @__PURE__ */ jsxDEV("p", { class: "muted", style: "margin:0;font-size:14px", children: s.tagline }),
                /* @__PURE__ */ jsxDEV("div", { class: "price", children: [
                  "From ",
                  /* @__PURE__ */ jsxDEV("span", { class: "gold-text", children: money(s.priceCents, p.currency) })
                ] }),
                /* @__PURE__ */ jsxDEV("p", { class: "dep", children: [
                  money(s.depositCents, p.currency),
                  " deposit to reserve"
                ] }),
                /* @__PURE__ */ jsxDEV("ul", { children: s.features.map((f) => /* @__PURE__ */ jsxDEV("li", { children: f })) }),
                /* @__PURE__ */ jsxDEV("a", { class: "btn btn-gold btn-block", href: `/book?service=${s.id}`, children: [
                  "Book ",
                  s.name
                ] })
              ] })) })
            ] }) }),
            /* @__PURE__ */ jsxDEV("section", { id: "about", class: "d-section", children: /* @__PURE__ */ jsxDEV("div", { class: "d-wrap about", children: [
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("h2", { children: "Built for the dancefloor" }),
                /* @__PURE__ */ jsxDEV("p", { children: "From intimate weddings to sold-out venues, DJ Chan blends open-format sets with clean transitions and real crowd reading. Professional sound and lighting, backup gear on site, and an MC who keeps the night moving." }),
                /* @__PURE__ */ jsxDEV("p", { class: "muted", children: "Every booking includes a planning consultation so your timeline, must-play songs and do-not-play list are dialed in before you arrive." })
              ] }),
              /* @__PURE__ */ jsxDEV("div", { class: "stats-row", children: STATS.map((s) => /* @__PURE__ */ jsxDEV("div", { class: "stat-big", children: [
                /* @__PURE__ */ jsxDEV("div", { class: "n gold-text", children: s.n }),
                /* @__PURE__ */ jsxDEV("div", { class: "l", children: s.l })
              ] })) })
            ] }) }),
            /* @__PURE__ */ jsxDEV("section", { id: "reviews", class: "d-section", children: /* @__PURE__ */ jsxDEV("div", { class: "d-wrap", children: [
              /* @__PURE__ */ jsxDEV("h2", { children: "Reviews" }),
              /* @__PURE__ */ jsxDEV("p", { class: "sect-sub", children: "Been on the dancefloor with DJ Chan? Share your experience." }),
              p.googleReviewUrl ? /* @__PURE__ */ jsxDEV("div", { style: "text-align:center", children: /* @__PURE__ */ jsxDEV("a", { class: "btn btn-gold", href: p.googleReviewUrl, target: "_blank", rel: "noopener noreferrer", children: "Review on Google" }) }) : null
            ] }) }),
            /* @__PURE__ */ jsxDEV("section", { class: "d-wrap", children: /* @__PURE__ */ jsxDEV("div", { class: "cta-band", children: [
              /* @__PURE__ */ jsxDEV("h2", { children: "Ready to lock your date?" }),
              /* @__PURE__ */ jsxDEV("p", { children: "Check availability and reserve with a deposit in a couple of minutes." }),
              /* @__PURE__ */ jsxDEV("a", { class: "btn btn-gold", href: "/book", children: "Book DJ Chan" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxDEV("footer", { id: "contact", class: "d-foot", children: /* @__PURE__ */ jsxDEV("div", { class: "inner", children: [
            /* @__PURE__ */ jsxDEV("a", { class: "brand", href: "/", "aria-label": "DJ Chan home", children: [
              /* @__PURE__ */ jsxDEV("img", { src: "/logo.svg", alt: "DJ Chan", width: "40", height: "40" }),
              /* @__PURE__ */ jsxDEV("span", { children: "DJ\xA0CHAN" })
            ] }),
            /* @__PURE__ */ jsxDEV("nav", { class: "foot-links", "aria-label": "Social and contact", children: [
              /* @__PURE__ */ jsxDEV("a", { href: p.instagram, children: "Instagram" }),
              /* @__PURE__ */ jsxDEV("a", { href: p.tiktok, children: "TikTok" }),
              /* @__PURE__ */ jsxDEV("a", { href: `mailto:${p.contactEmail}`, children: p.contactEmail })
            ] }),
            /* @__PURE__ */ jsxDEV("p", { class: "muted", style: "margin:0;font-size:14px", children: [
              "\xA9 ",
              (/* @__PURE__ */ new Date()).getFullYear(),
              " DJ Chan"
            ] })
          ] }) })
        ] })
      ]
    }
  );
}, "Landing");

// src/pages/booking.tsx
var BookingPage = /* @__PURE__ */ __name((p) => {
  const selected = getService(p.selectedServiceId ?? "") ?? SERVICES[0];
  return /* @__PURE__ */ jsxDEV(
    Layout,
    {
      title: "Book DJ Chan | Check availability and reserve your date",
      description: "Tell DJ Chan about your event and secure your date online. Pay a deposit to reserve, or pay in full.",
      siteUrl: p.siteUrl,
      path: "/book",
      children: [
        /* @__PURE__ */ jsxDEV(Header, {}),
        /* @__PURE__ */ jsxDEV("main", { class: "wrap", style: "padding-top:8px", children: [
          /* @__PURE__ */ jsxDEV("a", { class: "back", href: "/", children: "\u2190 Back" }),
          /* @__PURE__ */ jsxDEV("h1", { class: "page-title", children: "Book your date" }),
          /* @__PURE__ */ jsxDEV("p", { class: "sub", children: "Fill in the details below. You'll pay securely through Stripe on the next screen." }),
          p.error ? /* @__PURE__ */ jsxDEV("div", { class: "notice err", children: p.error }) : null,
          /* @__PURE__ */ jsxDEV("div", { class: "panel", children: /* @__PURE__ */ jsxDEV("form", { method: "post", action: "/book", children: [
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("label", { for: "service_id", children: "Package" }),
              /* @__PURE__ */ jsxDEV("select", { id: "service_id", name: "service_id", required: true, children: SERVICES.map((s) => /* @__PURE__ */ jsxDEV("option", { value: s.id, selected: s.id === selected.id, children: [
                s.name,
                " \u2014 from ",
                money(s.priceCents, p.currency),
                " (",
                money(s.depositCents, p.currency),
                " deposit)"
              ] })) })
            ] }),
            /* @__PURE__ */ jsxDEV("div", { class: "row two", children: [
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("label", { for: "customer_name", children: "Your name" }),
                /* @__PURE__ */ jsxDEV("input", { id: "customer_name", name: "customer_name", required: true, autocomplete: "name" })
              ] }),
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("label", { for: "phone", children: "Phone" }),
                /* @__PURE__ */ jsxDEV("input", { id: "phone", name: "phone", type: "tel", autocomplete: "tel" })
              ] })
            ] }),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("label", { for: "email", children: "Email" }),
              /* @__PURE__ */ jsxDEV("input", { id: "email", name: "email", type: "email", required: true, autocomplete: "email" })
            ] }),
            /* @__PURE__ */ jsxDEV("div", { class: "row two", children: [
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("label", { for: "event_date", children: "Event date" }),
                /* @__PURE__ */ jsxDEV("input", { id: "event_date", name: "event_date", type: "date", required: true })
              ] }),
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("label", { for: "venue", children: "Venue / location" }),
                /* @__PURE__ */ jsxDEV("input", { id: "venue", name: "venue", placeholder: "City or venue name" })
              ] })
            ] }),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("label", { for: "message", children: "Anything else?" }),
              /* @__PURE__ */ jsxDEV("textarea", { id: "message", name: "message", rows: 3, placeholder: "Guest count, vibe, must-play songs..." })
            ] }),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("label", { children: "Payment" }),
              /* @__PURE__ */ jsxDEV("div", { class: "pay-opts", id: "pay-opts", children: [
                /* @__PURE__ */ jsxDEV("label", { class: "pay-opt sel", children: [
                  /* @__PURE__ */ jsxDEV("input", { type: "radio", name: "payment_type", value: "deposit", checked: true }),
                  /* @__PURE__ */ jsxDEV("span", { children: [
                    /* @__PURE__ */ jsxDEV("b", { children: "Pay deposit to reserve" }),
                    /* @__PURE__ */ jsxDEV("span", { class: "muted", "data-dep": true, children: [
                      money(selected.depositCents, p.currency),
                      " now, balance due before the event"
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxDEV("label", { class: "pay-opt", children: [
                  /* @__PURE__ */ jsxDEV("input", { type: "radio", name: "payment_type", value: "full" }),
                  /* @__PURE__ */ jsxDEV("span", { children: [
                    /* @__PURE__ */ jsxDEV("b", { children: "Pay in full" }),
                    /* @__PURE__ */ jsxDEV("span", { class: "muted", "data-full": true, children: [
                      money(selected.priceCents, p.currency),
                      " total, all set"
                    ] })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxDEV("button", { class: "btn btn-gold btn-block", type: "submit", children: "Continue to secure payment \u2192" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxDEV(Footer, { contactEmail: p.contactEmail, instagram: p.instagram, tiktok: p.tiktok }),
        /* @__PURE__ */ jsxDEV(
          "script",
          {
            dangerouslySetInnerHTML: {
              __html: `
        (function(){
          var services = ${JSON.stringify(
                Object.fromEntries(SERVICES.map((s) => [s.id, { p: s.priceCents, d: s.depositCents }]))
              )};
          var cur = ${JSON.stringify(p.currency)};
          var fmt = new Intl.NumberFormat('en-US',{style:'currency',currency:cur.toUpperCase(),maximumFractionDigits:0});
          var sel = document.getElementById('service_id');
          var dep = document.querySelector('[data-dep]');
          var full = document.querySelector('[data-full]');
          function update(){
            var s = services[sel.value]; if(!s) return;
            dep.textContent = fmt.format(s.d/100) + ' now, balance due before the event';
            full.textContent = fmt.format(s.p/100) + ' total, all set';
          }
          sel.addEventListener('change', update); update();
          document.querySelectorAll('.pay-opt input').forEach(function(r){
            r.addEventListener('change', function(){
              document.querySelectorAll('.pay-opt').forEach(function(o){o.classList.remove('sel');});
              r.closest('.pay-opt').classList.add('sel');
            });
          });
        })();
      `
            }
          }
        )
      ]
    }
  );
}, "BookingPage");
var ResultPage = /* @__PURE__ */ __name((p) => /* @__PURE__ */ jsxDEV(Layout, { title: `${p.heading} | DJ Chan`, description: p.body, siteUrl: p.siteUrl, children: [
  /* @__PURE__ */ jsxDEV(Header, {}),
  /* @__PURE__ */ jsxDEV("main", { class: "wrap", style: "padding-top:8px", children: /* @__PURE__ */ jsxDEV("div", { class: "panel", style: "text-align:center", children: [
    /* @__PURE__ */ jsxDEV("img", { src: "/logo.svg", alt: "DJ Chan", width: "90", height: "90", style: "margin:0 auto 14px;border-radius:12px" }),
    /* @__PURE__ */ jsxDEV("div", { class: `notice ${p.ok ? "ok" : "warn"}`, style: "text-align:left", children: p.body }),
    /* @__PURE__ */ jsxDEV("h1", { class: "page-title", children: p.heading }),
    /* @__PURE__ */ jsxDEV("a", { class: "btn btn-gold", href: "/", children: "Back to home" })
  ] }) }),
  /* @__PURE__ */ jsxDEV(Footer, { contactEmail: p.contactEmail, instagram: p.instagram, tiktok: p.tiktok })
] }), "ResultPage");

// src/pages/admin.tsx
var AdminLogin = /* @__PURE__ */ __name((p) => /* @__PURE__ */ jsxDEV(Layout, { title: "Admin | DJ Chan", description: "DJ Chan admin", siteUrl: p.siteUrl, children: /* @__PURE__ */ jsxDEV("main", { class: "wrap", style: "max-width:420px;padding-top:60px", children: [
  /* @__PURE__ */ jsxDEV("div", { style: "text-align:center;margin-bottom:20px", children: [
    /* @__PURE__ */ jsxDEV("img", { src: "/logo.svg", alt: "DJ Chan", width: "80", height: "80", style: "margin:0 auto 10px;border-radius:12px" }),
    /* @__PURE__ */ jsxDEV("h1", { class: "page-title", children: "Admin login" })
  ] }),
  p.error ? /* @__PURE__ */ jsxDEV("div", { class: "notice err", children: p.error }) : null,
  /* @__PURE__ */ jsxDEV("div", { class: "panel", children: /* @__PURE__ */ jsxDEV("form", { method: "post", action: "/admin/login", children: [
    /* @__PURE__ */ jsxDEV("div", { children: [
      /* @__PURE__ */ jsxDEV("label", { for: "password", children: "Password" }),
      /* @__PURE__ */ jsxDEV("input", { id: "password", name: "password", type: "password", required: true, autofocus: true })
    ] }),
    /* @__PURE__ */ jsxDEV("button", { class: "btn btn-gold btn-block", type: "submit", children: "Sign in" })
  ] }) })
] }) }), "AdminLogin");
var AdminDashboard = /* @__PURE__ */ __name((p) => {
  const paid = p.bookings.filter((b) => b.payment_status === "paid");
  const collected = paid.reduce((sum, b) => sum + b.amount_cents, 0);
  return /* @__PURE__ */ jsxDEV(Layout, { title: "Dashboard | DJ Chan", description: "DJ Chan admin dashboard", siteUrl: p.siteUrl, children: /* @__PURE__ */ jsxDEV("main", { class: "wrap", style: "max-width:900px", children: [
    /* @__PURE__ */ jsxDEV("div", { class: "tabler", style: "padding:18px 0", children: [
      /* @__PURE__ */ jsxDEV("div", { class: "brand", style: "display:flex;align-items:center;gap:10px", children: [
        /* @__PURE__ */ jsxDEV("img", { src: "/logo.svg", alt: "", width: "42", height: "42", style: "border-radius:9px" }),
        /* @__PURE__ */ jsxDEV("strong", { style: "letter-spacing:1px", children: "Admin dashboard" })
      ] }),
      /* @__PURE__ */ jsxDEV("div", { style: "display:flex;gap:10px", children: [
        /* @__PURE__ */ jsxDEV("a", { class: "btn btn-sm", href: "/", target: "_blank", children: "View site" }),
        /* @__PURE__ */ jsxDEV("form", { method: "post", action: "/admin/logout", style: "margin:0", children: /* @__PURE__ */ jsxDEV("button", { class: "btn btn-sm", type: "submit", children: "Sign out" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxDEV("div", { class: "stat-grid", children: [
      /* @__PURE__ */ jsxDEV("div", { class: "stat", children: [
        /* @__PURE__ */ jsxDEV("div", { class: "n", children: p.bookings.length }),
        /* @__PURE__ */ jsxDEV("div", { class: "l", children: "Bookings" })
      ] }),
      /* @__PURE__ */ jsxDEV("div", { class: "stat", children: [
        /* @__PURE__ */ jsxDEV("div", { class: "n", children: paid.length }),
        /* @__PURE__ */ jsxDEV("div", { class: "l", children: "Paid" })
      ] }),
      /* @__PURE__ */ jsxDEV("div", { class: "stat", children: [
        /* @__PURE__ */ jsxDEV("div", { class: "n gold-text", children: money(collected, p.currency) }),
        /* @__PURE__ */ jsxDEV("div", { class: "l", children: "Collected" })
      ] })
    ] }),
    /* @__PURE__ */ jsxDEV("div", { class: "panel", children: [
      /* @__PURE__ */ jsxDEV("h2", { class: "section-title", style: "text-align:left;margin-bottom:14px", children: "Booking requests" }),
      p.bookings.length === 0 ? /* @__PURE__ */ jsxDEV("p", { class: "muted", children: "No bookings yet." }) : /* @__PURE__ */ jsxDEV("div", { style: "overflow-x:auto", children: /* @__PURE__ */ jsxDEV("table", { children: [
        /* @__PURE__ */ jsxDEV("thead", { children: /* @__PURE__ */ jsxDEV("tr", { children: [
          /* @__PURE__ */ jsxDEV("th", { children: "Date" }),
          /* @__PURE__ */ jsxDEV("th", { children: "Client" }),
          /* @__PURE__ */ jsxDEV("th", { children: "Package" }),
          /* @__PURE__ */ jsxDEV("th", { children: "Event" }),
          /* @__PURE__ */ jsxDEV("th", { children: "Amount" }),
          /* @__PURE__ */ jsxDEV("th", { children: "Status" }),
          /* @__PURE__ */ jsxDEV("th", {})
        ] }) }),
        /* @__PURE__ */ jsxDEV("tbody", { children: p.bookings.map((b) => /* @__PURE__ */ jsxDEV("tr", { children: [
          /* @__PURE__ */ jsxDEV("td", { children: (b.created_at || "").slice(0, 10) }),
          /* @__PURE__ */ jsxDEV("td", { children: [
            /* @__PURE__ */ jsxDEV("b", { children: b.customer_name }),
            /* @__PURE__ */ jsxDEV("br", {}),
            /* @__PURE__ */ jsxDEV("span", { class: "muted", style: "font-size:12px", children: [
              b.email,
              b.phone ? ` \xB7 ${b.phone}` : ""
            ] })
          ] }),
          /* @__PURE__ */ jsxDEV("td", { children: b.service_name }),
          /* @__PURE__ */ jsxDEV("td", { children: [
            b.event_date || "\u2014",
            /* @__PURE__ */ jsxDEV("br", {}),
            /* @__PURE__ */ jsxDEV("span", { class: "muted", style: "font-size:12px", children: b.venue || "" })
          ] }),
          /* @__PURE__ */ jsxDEV("td", { children: [
            money(b.amount_cents, p.currency),
            /* @__PURE__ */ jsxDEV("br", {}),
            /* @__PURE__ */ jsxDEV("span", { class: "muted", style: "font-size:12px", children: b.payment_type === "deposit" ? "deposit" : "full" })
          ] }),
          /* @__PURE__ */ jsxDEV("td", { children: /* @__PURE__ */ jsxDEV("span", { class: `pill ${b.payment_status === "paid" ? "paid" : "pending"}`, children: b.payment_status }) }),
          /* @__PURE__ */ jsxDEV("td", { style: "text-align:right;white-space:nowrap", children: /* @__PURE__ */ jsxDEV("div", { style: "display:inline-flex;gap:8px;justify-content:flex-end", children: [
            b.payment_status !== "paid" ? /* @__PURE__ */ jsxDEV("form", { method: "post", action: `/admin/bookings/${b.id}/paid`, style: "margin:0", children: /* @__PURE__ */ jsxDEV("button", { class: "btn btn-sm btn-gold", type: "submit", children: "Mark paid" }) }) : null,
            /* @__PURE__ */ jsxDEV(
              "form",
              {
                method: "post",
                action: `/admin/bookings/${b.id}/delete`,
                style: "margin:0",
                onsubmit: "return confirm('Delete this booking?')",
                children: /* @__PURE__ */ jsxDEV("button", { class: "btn btn-sm", type: "submit", "aria-label": "Delete booking", children: "Delete" })
              }
            )
          ] }) })
        ] })) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxDEV("div", { class: "panel", children: [
      /* @__PURE__ */ jsxDEV("h2", { class: "section-title", style: "text-align:left;margin-bottom:14px", children: "Events / calendar" }),
      /* @__PURE__ */ jsxDEV("form", { method: "post", action: "/admin/events", style: "margin-bottom:20px", children: [
        /* @__PURE__ */ jsxDEV("div", { class: "row two", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { for: "e_title", children: "Event title" }),
            /* @__PURE__ */ jsxDEV("input", { id: "e_title", name: "title", required: true, placeholder: "e.g. Skyline Rooftop Party" })
          ] }),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { for: "e_date", children: "Date" }),
            /* @__PURE__ */ jsxDEV("input", { id: "e_date", name: "event_date", type: "date" })
          ] })
        ] }),
        /* @__PURE__ */ jsxDEV("div", { class: "row two", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { for: "e_venue", children: "Venue" }),
            /* @__PURE__ */ jsxDEV("input", { id: "e_venue", name: "venue", placeholder: "Venue / location" })
          ] }),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { for: "e_status", children: "Status" }),
            /* @__PURE__ */ jsxDEV("select", { id: "e_status", name: "status", children: [
              /* @__PURE__ */ jsxDEV("option", { value: "confirmed", children: "Confirmed" }),
              /* @__PURE__ */ jsxDEV("option", { value: "hold", children: "Hold" }),
              /* @__PURE__ */ jsxDEV("option", { value: "completed", children: "Completed" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { for: "e_notes", children: "Notes" }),
          /* @__PURE__ */ jsxDEV("input", { id: "e_notes", name: "notes", placeholder: "Set length, contact, gear..." })
        ] }),
        /* @__PURE__ */ jsxDEV("button", { class: "btn btn-gold", type: "submit", children: "Add event" })
      ] }),
      p.events.length === 0 ? /* @__PURE__ */ jsxDEV("p", { class: "muted", children: "No events scheduled." }) : /* @__PURE__ */ jsxDEV("div", { style: "overflow-x:auto", children: /* @__PURE__ */ jsxDEV("table", { children: [
        /* @__PURE__ */ jsxDEV("thead", { children: /* @__PURE__ */ jsxDEV("tr", { children: [
          /* @__PURE__ */ jsxDEV("th", { children: "Date" }),
          /* @__PURE__ */ jsxDEV("th", { children: "Title" }),
          /* @__PURE__ */ jsxDEV("th", { children: "Venue" }),
          /* @__PURE__ */ jsxDEV("th", { children: "Status" }),
          /* @__PURE__ */ jsxDEV("th", {})
        ] }) }),
        /* @__PURE__ */ jsxDEV("tbody", { children: p.events.map((e) => /* @__PURE__ */ jsxDEV("tr", { children: [
          /* @__PURE__ */ jsxDEV("td", { children: e.event_date || "\u2014" }),
          /* @__PURE__ */ jsxDEV("td", { children: [
            /* @__PURE__ */ jsxDEV("b", { children: e.title }),
            e.notes ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
              /* @__PURE__ */ jsxDEV("br", {}),
              /* @__PURE__ */ jsxDEV("span", { class: "muted", style: "font-size:12px", children: e.notes })
            ] }) : null
          ] }),
          /* @__PURE__ */ jsxDEV("td", { children: e.venue || "\u2014" }),
          /* @__PURE__ */ jsxDEV("td", { children: /* @__PURE__ */ jsxDEV("span", { class: "pill pending", children: e.status }) }),
          /* @__PURE__ */ jsxDEV("td", { style: "text-align:right", children: /* @__PURE__ */ jsxDEV("form", { method: "post", action: `/admin/events/${e.id}/delete`, style: "margin:0", children: /* @__PURE__ */ jsxDEV("button", { class: "btn btn-sm", type: "submit", "aria-label": "Delete event", children: "Delete" }) }) })
        ] })) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxDEV("div", { style: "height:40px" })
  ] }) });
}, "AdminDashboard");

// src/index.tsx
var app = new Hono2();
app.get("/logo.svg", (c) => c.body("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><defs><linearGradient id=\"gold\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop stop-color=\"#f6e6b4\"/><stop offset=\".48\" stop-color=\"#d4af57\"/><stop offset=\"1\" stop-color=\"#a67c32\"/></linearGradient></defs><rect width=\"512\" height=\"512\" rx=\"64\" fill=\"#08090e\"/><rect x=\"22\" y=\"22\" width=\"468\" height=\"468\" rx=\"48\" fill=\"none\" stroke=\"url(#gold)\" stroke-width=\"3\"/><path d=\"M96 344h320\" stroke=\"url(#gold)\" stroke-width=\"2\"/><text x=\"256\" y=\"285\" text-anchor=\"middle\" font-family=\"Arial,Helvetica,sans-serif\" font-weight=\"900\" font-size=\"208\" letter-spacing=\"-12\" fill=\"url(#gold)\">DJ</text><text x=\"260\" y=\"404\" text-anchor=\"middle\" font-family=\"Arial,Helvetica,sans-serif\" font-weight=\"700\" font-size=\"56\" letter-spacing=\"16\" fill=\"url(#gold)\">CHAN</text></svg>", 200, { "Content-Type": "image/svg+xml", "Cache-Control": "public, max-age=3600" }));
var ADMIN_COOKIE = "dj_admin";
function sessionSecret(env2) {
  return env2.SESSION_SECRET || "dev-insecure-session-secret-change-me";
}
__name(sessionSecret, "sessionSecret");
function adminPassword(env2) {
  return env2.ADMIN_PASSWORD || "djchan-admin";
}
__name(adminPassword, "adminPassword");
async function isAdmin(c) {
  const val = await getSignedCookie(c, sessionSecret(c.env), ADMIN_COOKIE);
  return val === "ok";
}
__name(isAdmin, "isAdmin");
async function ensureEventForBooking(db, bookingId) {
  const b = await db.prepare(`SELECT * FROM bookings WHERE id=?`).bind(bookingId).first();
  if (!b) return;
  const existing = await db.prepare(`SELECT id FROM events WHERE booking_id=?`).bind(bookingId).first();
  if (existing) return;
  await db.prepare(
    `INSERT INTO events (id, title, event_date, venue, status, notes, booking_id)
       VALUES (?,?,?,?,'confirmed',?,?)`
  ).bind(
    "evt_" + crypto.randomUUID().replace(/-/g, "").slice(0, 18),
    `${b.service_name} \u2014 ${b.customer_name}`,
    b.event_date,
    b.venue,
    `${b.payment_type} \xB7 ${b.email}`,
    bookingId
  ).run();
}
__name(ensureEventForBooking, "ensureEventForBooking");
app.get("/", (c) => {
  const e = c.env;
  return c.html(
    /* @__PURE__ */ jsxDEV(
      Landing,
      {
        siteUrl: e.SITE_URL,
        googleReviewUrl: e.GOOGLE_REVIEW_URL,
        contactEmail: e.CONTACT_EMAIL,
        instagram: e.INSTAGRAM_URL,
        tiktok: e.TIKTOK_URL,
        currency: e.CURRENCY
      }
    )
  );
});
app.get("/book", (c) => {
  const e = c.env;
  return c.html(
    /* @__PURE__ */ jsxDEV(
      BookingPage,
      {
        siteUrl: e.SITE_URL,
        contactEmail: e.CONTACT_EMAIL,
        instagram: e.INSTAGRAM_URL,
        tiktok: e.TIKTOK_URL,
        currency: e.CURRENCY,
        selectedServiceId: c.req.query("service")
      }
    )
  );
});
app.post("/book", async (c) => {
  const e = c.env;
  const form2 = await c.req.formData();
  const serviceId = String(form2.get("service_id") || "");
  const service = getService(serviceId);
  const name = String(form2.get("customer_name") || "").trim();
  const email = String(form2.get("email") || "").trim();
  const phone = String(form2.get("phone") || "").trim() || null;
  const eventDate = String(form2.get("event_date") || "").trim() || null;
  const venue = String(form2.get("venue") || "").trim() || null;
  const message = String(form2.get("message") || "").trim() || null;
  const paymentType = form2.get("payment_type") === "full" ? "full" : "deposit";
  const renderErr = /* @__PURE__ */ __name((msg) => c.html(
    /* @__PURE__ */ jsxDEV(
      BookingPage,
      {
        siteUrl: e.SITE_URL,
        contactEmail: e.CONTACT_EMAIL,
        instagram: e.INSTAGRAM_URL,
        tiktok: e.TIKTOK_URL,
        currency: e.CURRENCY,
        selectedServiceId: serviceId,
        error: msg
      }
    ),
    400
  ), "renderErr");
  if (!service) return renderErr("Please choose a valid package.");
  if (!name || !email) return renderErr("Name and email are required.");
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return renderErr("Please enter a valid email address.");
  const amount = paymentType === "full" ? service.priceCents : service.depositCents;
  const id = "bk_" + crypto.randomUUID().replace(/-/g, "").slice(0, 20);
  await e.DB.prepare(
    `INSERT INTO bookings (id, service_id, service_name, customer_name, email, phone, event_date, venue, message, amount_cents, total_cents, payment_type, payment_status)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,'pending')`
  ).bind(
    id,
    service.id,
    service.name,
    name,
    email,
    phone,
    eventDate,
    venue,
    message,
    amount,
    service.priceCents,
    paymentType
  ).run();
  if (e.STRIPE_SECRET_KEY) {
    try {
      const base = e.SITE_URL.replace(/\/$/, "");
      const session = await createCheckoutSession({
        secretKey: e.STRIPE_SECRET_KEY,
        currency: e.CURRENCY,
        amountCents: amount,
        productName: `${service.name} \u2014 DJ Chan (${paymentType === "full" ? "full payment" : "deposit"})`,
        description: `${eventDate ? eventDate + " \xB7 " : ""}${venue ?? ""}`.trim() || "Event booking",
        customerEmail: email,
        bookingId: id,
        successUrl: `${base}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${base}/book?service=${service.id}`
      });
      await e.DB.prepare(`UPDATE bookings SET stripe_session_id=? WHERE id=?`).bind(session.id, id).run();
      return c.redirect(session.url, 303);
    } catch (err) {
      console.error("Stripe checkout failed", err);
      return renderErr("Payment could not be started. Please try again or email us directly.");
    }
  }
  return c.html(
    /* @__PURE__ */ jsxDEV(
      ResultPage,
      {
        siteUrl: e.SITE_URL,
        contactEmail: e.CONTACT_EMAIL,
        instagram: e.INSTAGRAM_URL,
        tiktok: e.TIKTOK_URL,
        ok: true,
        heading: "Request received",
        body: `Thanks ${name}! Your ${service.name} request is saved. Payments aren't live in this environment yet \u2014 we'll email you at ${email} to arrange the ${money(
          amount,
          e.CURRENCY
        )} ${paymentType}.`
      }
    )
  );
});
app.get("/success", (c) => {
  const e = c.env;
  return c.html(
    /* @__PURE__ */ jsxDEV(
      ResultPage,
      {
        siteUrl: e.SITE_URL,
        contactEmail: e.CONTACT_EMAIL,
        instagram: e.INSTAGRAM_URL,
        tiktok: e.TIKTOK_URL,
        ok: true,
        heading: "You're booked!",
        body: "Payment received \u2014 your date is reserved. A confirmation email is on its way. Can't wait to play your event!"
      }
    )
  );
});
app.post("/webhook/stripe", async (c) => {
  const e = c.env;
  const sig = c.req.header("stripe-signature");
  const raw2 = await c.req.text();
  if (!e.STRIPE_WEBHOOK_SECRET || !sig) return c.text("Webhook not configured", 400);
  const valid = await verifyStripeSignature(raw2, sig, e.STRIPE_WEBHOOK_SECRET);
  if (!valid) return c.text("Invalid signature", 400);
  const event = JSON.parse(raw2);
  if (event.type === "checkout.session.completed") {
    const obj = event.data.object;
    const bookingId = obj?.metadata?.booking_id || obj?.client_reference_id;
    if (bookingId) {
      await e.DB.prepare(`UPDATE bookings SET payment_status='paid' WHERE id=?`).bind(bookingId).run();
      await ensureEventForBooking(e.DB, bookingId);
    }
  }
  return c.json({ received: true });
});
app.get("/admin", async (c) => {
  const e = c.env;
  if (!await isAdmin(c)) return c.html(/* @__PURE__ */ jsxDEV(AdminLogin, { siteUrl: e.SITE_URL }));
  const bookings = (await e.DB.prepare(`SELECT * FROM bookings ORDER BY created_at DESC`).all()).results;
  const events = (await e.DB.prepare(`SELECT * FROM events ORDER BY event_date IS NULL, event_date ASC`).all()).results;
  return c.html(/* @__PURE__ */ jsxDEV(AdminDashboard, { siteUrl: e.SITE_URL, currency: e.CURRENCY, bookings, events }));
});
app.post("/admin/login", async (c) => {
  const e = c.env;
  const form2 = await c.req.formData();
  const password = String(form2.get("password") || "");
  if (password !== adminPassword(e)) {
    return c.html(/* @__PURE__ */ jsxDEV(AdminLogin, { siteUrl: e.SITE_URL, error: "Incorrect password." }), 401);
  }
  await setSignedCookie(c, ADMIN_COOKIE, "ok", sessionSecret(e), {
    httpOnly: true,
    secure: e.SITE_URL.startsWith("https"),
    sameSite: "Lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });
  return c.redirect("/admin", 303);
});
app.post("/admin/logout", (c) => {
  deleteCookie(c, ADMIN_COOKIE, { path: "/" });
  return c.redirect("/admin", 303);
});
app.post("/admin/events", async (c) => {
  const e = c.env;
  if (!await isAdmin(c)) return c.redirect("/admin", 303);
  const form2 = await c.req.formData();
  const title3 = String(form2.get("title") || "").trim();
  if (!title3) return c.redirect("/admin", 303);
  await e.DB.prepare(
    `INSERT INTO events (id, title, event_date, venue, status, notes) VALUES (?,?,?,?,?,?)`
  ).bind(
    "evt_" + crypto.randomUUID().replace(/-/g, "").slice(0, 18),
    title3,
    String(form2.get("event_date") || "").trim() || null,
    String(form2.get("venue") || "").trim() || null,
    String(form2.get("status") || "confirmed"),
    String(form2.get("notes") || "").trim() || null
  ).run();
  return c.redirect("/admin", 303);
});
app.post("/admin/events/:id/delete", async (c) => {
  const e = c.env;
  if (!await isAdmin(c)) return c.redirect("/admin", 303);
  await e.DB.prepare(`DELETE FROM events WHERE id=?`).bind(c.req.param("id")).run();
  return c.redirect("/admin", 303);
});
app.post("/admin/bookings/:id/paid", async (c) => {
  const e = c.env;
  if (!await isAdmin(c)) return c.redirect("/admin", 303);
  const id = c.req.param("id");
  await e.DB.prepare(`UPDATE bookings SET payment_status='paid' WHERE id=?`).bind(id).run();
  await ensureEventForBooking(e.DB, id);
  return c.redirect("/admin", 303);
});
app.post("/admin/bookings/:id/delete", async (c) => {
  const e = c.env;
  if (!await isAdmin(c)) return c.redirect("/admin", 303);
  const id = c.req.param("id");
  await e.DB.prepare(`DELETE FROM events WHERE booking_id=?`).bind(id).run();
  await e.DB.prepare(`DELETE FROM bookings WHERE id=?`).bind(id).run();
  return c.redirect("/admin", 303);
});
app.get(
  "/robots.txt",
  (c) => c.text(`User-agent: *
Allow: /
Disallow: /admin
Sitemap: ${c.env.SITE_URL.replace(/\/$/, "")}/sitemap.xml
`)
);
app.get("/sitemap.xml", (c) => {
  const base = c.env.SITE_URL.replace(/\/$/, "");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${base}/</loc><priority>1.0</priority></url>
  <url><loc>${base}/book</loc><priority>0.8</priority></url>
</urlset>`;
  return c.body(xml, 200, { "Content-Type": "application/xml" });
});
var index_default = app;
export {
  index_default as default
};
//# sourceMappingURL=index.js.map

