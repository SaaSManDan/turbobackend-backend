import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import { tmpdir } from 'node:os';
import destr from 'file:///Users/danielrodriguez/Desktop/Projects/TurboBackend-backend/node_modules/destr/dist/index.mjs';
import { defineEventHandler, handleCacheHeaders, splitCookiesString, createEvent, fetchWithEvent, isEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, getRequestURL, getRequestHeader, getResponseHeader, getRequestHeaders, setResponseHeaders, setResponseStatus, send, appendResponseHeader, removeResponseHeader, createError, setResponseHeader, getHeader, createApp, createRouter as createRouter$1, toNodeListener, lazyEventHandler, getRouterParam, readBody, getQuery as getQuery$1, readRawBody, setHeader } from 'file:///Users/danielrodriguez/Desktop/Projects/TurboBackend-backend/node_modules/h3/dist/index.mjs';
import { createHooks } from 'file:///Users/danielrodriguez/Desktop/Projects/TurboBackend-backend/node_modules/hookable/dist/index.mjs';
import { createFetch, Headers as Headers$1 } from 'file:///Users/danielrodriguez/Desktop/Projects/TurboBackend-backend/node_modules/ofetch/dist/node.mjs';
import { fetchNodeRequestHandler, callNodeRequestHandler } from 'file:///Users/danielrodriguez/Desktop/Projects/TurboBackend-backend/node_modules/node-mock-http/dist/index.mjs';
import { parseURL, withoutBase, joinURL, getQuery, withQuery, decodePath, withLeadingSlash, withoutTrailingSlash } from 'file:///Users/danielrodriguez/Desktop/Projects/TurboBackend-backend/node_modules/ufo/dist/index.mjs';
import { createStorage, prefixStorage } from 'file:///Users/danielrodriguez/Desktop/Projects/TurboBackend-backend/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file:///Users/danielrodriguez/Desktop/Projects/TurboBackend-backend/node_modules/unstorage/drivers/fs.mjs';
import { digest } from 'file:///Users/danielrodriguez/Desktop/Projects/TurboBackend-backend/node_modules/ohash/dist/index.mjs';
import { klona } from 'file:///Users/danielrodriguez/Desktop/Projects/TurboBackend-backend/node_modules/klona/dist/index.mjs';
import defu, { defuFn } from 'file:///Users/danielrodriguez/Desktop/Projects/TurboBackend-backend/node_modules/defu/dist/defu.mjs';
import { snakeCase } from 'file:///Users/danielrodriguez/Desktop/Projects/TurboBackend-backend/node_modules/scule/dist/index.mjs';
import { getContext } from 'file:///Users/danielrodriguez/Desktop/Projects/TurboBackend-backend/node_modules/unctx/dist/index.mjs';
import { toRouteMatcher, createRouter } from 'file:///Users/danielrodriguez/Desktop/Projects/TurboBackend-backend/node_modules/radix3/dist/index.mjs';
import { readFile } from 'node:fs/promises';
import { resolve, dirname, join } from 'node:path';
import consola from 'file:///Users/danielrodriguez/Desktop/Projects/TurboBackend-backend/node_modules/consola/dist/index.mjs';
import { ErrorParser } from 'file:///Users/danielrodriguez/Desktop/Projects/TurboBackend-backend/node_modules/youch-core/build/index.js';
import { Youch } from 'file:///Users/danielrodriguez/Desktop/Projects/TurboBackend-backend/node_modules/youch/build/index.js';
import { SourceMapConsumer } from 'file:///Users/danielrodriguez/Desktop/Projects/TurboBackend-backend/node_modules/source-map/source-map.js';
import { config as config$1 } from 'file:///Users/danielrodriguez/Desktop/Projects/TurboBackend-backend/node_modules/dotenv/lib/main.js';
import { existsSync, promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname as dirname$1, resolve as resolve$1 } from 'file:///Users/danielrodriguez/Desktop/Projects/TurboBackend-backend/node_modules/pathe/dist/index.mjs';
import { verifyToken } from 'file:///Users/danielrodriguez/Desktop/Projects/TurboBackend-backend/node_modules/@clerk/backend/dist/index.mjs';
import { Server } from 'node:http';
import crypto from 'node:crypto';
import { parentPort, threadId } from 'node:worker_threads';
import { nanoid } from 'file:///Users/danielrodriguez/Desktop/Projects/TurboBackend-backend/node_modules/nanoid/index.js';
import BullMQ from 'file:///Users/danielrodriguez/Desktop/Projects/TurboBackend-backend/node_modules/bullmq/dist/cjs/index.js';
import { GetObjectCommand, ListObjectsV2Command, S3Client } from 'file:///Users/danielrodriguez/Desktop/Projects/TurboBackend-backend/node_modules/@aws-sdk/client-s3/dist-cjs/index.js';
import { Pool } from 'file:///Users/danielrodriguez/Desktop/Projects/TurboBackend-backend/node_modules/pg/esm/index.mjs';
import Stripe from 'file:///Users/danielrodriguez/Desktop/Projects/TurboBackend-backend/node_modules/stripe/esm/stripe.esm.node.js';
import { Webhook } from 'file:///Users/danielrodriguez/Desktop/Projects/TurboBackend-backend/node_modules/svix/dist/index.js';
import { LogSnag } from 'file:///Users/danielrodriguez/Desktop/Projects/TurboBackend-backend/node_modules/@logsnag/node/dist/index.js';
import nodemailer from 'file:///Users/danielrodriguez/Desktop/Projects/TurboBackend-backend/node_modules/nodemailer/lib/nodemailer.js';
import Redis from 'file:///Users/danielrodriguez/Desktop/Projects/TurboBackend-backend/node_modules/ioredis/built/index.js';

const serverAssets = [{"baseName":"server","dir":"/Users/danielrodriguez/Desktop/Projects/TurboBackend-backend/server/assets"}];

const assets$1 = createStorage();

for (const asset of serverAssets) {
  assets$1.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir, ignore: (asset?.ignore || []) }));
}

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/Users/danielrodriguez/Desktop/Projects/TurboBackend-backend"}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/Users/danielrodriguez/Desktop/Projects/TurboBackend-backend/server"}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/Users/danielrodriguez/Desktop/Projects/TurboBackend-backend/.nitro"}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/Users/danielrodriguez/Desktop/Projects/TurboBackend-backend/.nitro/cache"}));
storage.mount('data', unstorage_47drivers_47fs({"driver":"fs","base":"/Users/danielrodriguez/Desktop/Projects/TurboBackend-backend/.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const Hasher = /* @__PURE__ */ (() => {
  class Hasher2 {
    buff = "";
    #context = /* @__PURE__ */ new Map();
    write(str) {
      this.buff += str;
    }
    dispatch(value) {
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    }
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = this.#context.get(object)) === void 0) {
        this.#context.set(object, this.#context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        this.write("buffer:");
        return this.write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else {
          this.unknown(object, objType);
        }
      } else {
        const keys = Object.keys(object).sort();
        const extraKeys = [];
        this.write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          this.write(":");
          this.dispatch(object[key]);
          this.write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    }
    array(arr, unordered) {
      unordered = unordered === void 0 ? false : unordered;
      this.write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = new Hasher2();
        hasher.dispatch(entry);
        for (const [key, value] of hasher.#context) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      this.#context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    }
    date(date) {
      return this.write("date:" + date.toJSON());
    }
    symbol(sym) {
      return this.write("symbol:" + sym.toString());
    }
    unknown(value, type) {
      this.write(type);
      if (!value) {
        return;
      }
      this.write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          [...value.entries()],
          true
          /* ordered */
        );
      }
    }
    error(err) {
      return this.write("error:" + err.toString());
    }
    boolean(bool) {
      return this.write("bool:" + bool);
    }
    string(string) {
      this.write("string:" + string.length + ":");
      this.write(string);
    }
    function(fn) {
      this.write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
    }
    number(number) {
      return this.write("number:" + number);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(regex) {
      return this.write("regex:" + regex.toString());
    }
    arraybuffer(arr) {
      this.write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    }
    url(url) {
      return this.write("url:" + url.toString());
    }
    map(map) {
      this.write("map:");
      const arr = [...map];
      return this.array(arr, false);
    }
    set(set) {
      this.write("set:");
      const arr = [...set];
      return this.array(arr, false);
    }
    bigint(number) {
      return this.write("bigint:" + number.toString());
    }
  }
  for (const type of [
    "uint8array",
    "uint8clampedarray",
    "unt8array",
    "uint16array",
    "unt16array",
    "uint32array",
    "unt32array",
    "float32array",
    "float64array"
  ]) {
    Hasher2.prototype[type] = function(arr) {
      this.write(type + ":");
      return this.array([...arr], false);
    };
  }
  function isNativeFunction(f) {
    if (typeof f !== "function") {
      return false;
    }
    return Function.prototype.toString.call(f).slice(
      -15
      /* "[native code] }".length */
    ) === "[native code] }";
  }
  return Hasher2;
})();
function serialize(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
function hash(value) {
  return digest(typeof value === "string" ? value : serialize(value)).replace(/[-_]/g, "").slice(0, 10);
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.waitUntil = incomingEvent.waitUntil;
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const inlineAppConfig = {};



const appConfig = defuFn(inlineAppConfig);

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/"
  },
  "nitro": {
    "routeRules": {}
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  {
    return _sharedRuntimeConfig;
  }
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

getContext("nitro-app", {
  asyncContext: undefined,
  AsyncLocalStorage: void 0
});

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$0 = defineNitroErrorHandler(
  async function defaultNitroErrorHandler(error, event) {
    const res = await defaultHandler(error, event);
    if (!event.node?.res.headersSent) {
      setResponseHeaders(event, res.headers);
    }
    setResponseStatus(event, res.status, res.statusText);
    return send(
      event,
      typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2)
    );
  }
);
async function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  await loadStackTrace(error).catch(consola.error);
  const youch = new Youch();
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    const ansiError = await (await youch.toANSI(error)).replaceAll(process.cwd(), ".");
    consola.error(
      `[request error] ${tags} [${event.method}] ${url}

`,
      ansiError
    );
  }
  const useJSON = opts?.json || !getRequestHeader(event, "accept")?.includes("text/html");
  const headers = {
    "content-type": useJSON ? "application/json" : "text/html",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self';"
  };
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = useJSON ? {
    error: true,
    url,
    statusCode,
    statusMessage,
    message: error.message,
    data: error.data,
    stack: error.stack?.split("\n").map((line) => line.trim())
  } : await youch.toHTML(error, {
    request: {
      url: url.href,
      method: event.method,
      headers: getRequestHeaders(event)
    }
  });
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}
async function loadStackTrace(error) {
  if (!(error instanceof Error)) {
    return;
  }
  const parsed = await new ErrorParser().defineSourceLoader(sourceLoader).parse(error);
  const stack = error.message + "\n" + parsed.frames.map((frame) => fmtFrame(frame)).join("\n");
  Object.defineProperty(error, "stack", { value: stack });
  if (error.cause) {
    await loadStackTrace(error.cause).catch(consola.error);
  }
}
async function sourceLoader(frame) {
  if (!frame.fileName || frame.fileType !== "fs" || frame.type === "native") {
    return;
  }
  if (frame.type === "app") {
    const rawSourceMap = await readFile(`${frame.fileName}.map`, "utf8").catch(() => {
    });
    if (rawSourceMap) {
      const consumer = await new SourceMapConsumer(rawSourceMap);
      const originalPosition = consumer.originalPositionFor({ line: frame.lineNumber, column: frame.columnNumber });
      if (originalPosition.source && originalPosition.line) {
        frame.fileName = resolve(dirname(frame.fileName), originalPosition.source);
        frame.lineNumber = originalPosition.line;
        frame.columnNumber = originalPosition.column || 0;
      }
    }
  }
  const contents = await readFile(frame.fileName, "utf8").catch(() => {
  });
  return contents ? { contents } : void 0;
}
function fmtFrame(frame) {
  if (frame.type === "native") {
    return frame.raw;
  }
  const src = `${frame.fileName || ""}:${frame.lineNumber}:${frame.columnNumber})`;
  return frame.functionName ? `at ${frame.functionName} (${src}` : `at ${src}`;
}

const errorHandlers = [errorHandler$0];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

const dotenvFiles = [".env", ".env.local"];
let hasLoadedEnv = false;
const _jWwMC7yOmPFfbhVuHX073FBke0spPuAL9zjPvOqs0 = defineNitroPlugin(() => {
  if (hasLoadedEnv) {
    return;
  }
  for (const file of dotenvFiles) {
    if (!existsSync(file)) {
      continue;
    }
    config$1({ path: file, override: true });
  }
  hasLoadedEnv = true;
});

async function sendEmail(to, subject, text) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    // Replace with your SMTP server
    port: 465,
    // Replace with your SMTP port
    secure: true,
    // true for 465, false for other ports
    auth: {
      user: process.env.GMAIL_APP_USER,
      // Your email user
      pass: process.env.GMAIL_APP_PASSWORD
      // Your email password
    }
  });
  try {
    await transporter.sendMail({
      from: `"DDF Notifications" <${process.env.GMAIL_APP_USER}>`,
      // Sender address with name
      to,
      // List of recipients
      subject,
      // Subject line
      text
      // Plain text body
    });
  } catch (error) {
    errorLogger("emailSender.js", error, "emailSender");
  }
}

let cachedLogsnag;
let attemptedInit = false;
function getLogsnagClient() {
  if (cachedLogsnag || attemptedInit) {
    return cachedLogsnag;
  }
  attemptedInit = true;
  const token = process.env.LOGSNAG_API_TOKEN;
  const project = process.env.LOGSNAG_PROJECT || "dev-docs";
  if (!token) {
    console.warn("LogSnag token is missing; skipping LogSnag tracking.");
    return null;
  }
  cachedLogsnag = new LogSnag({
    token,
    project
  });
  return cachedLogsnag;
}
async function errorLogger(errorLocation, errorDetails, userId) {
  var _a;
  const errorId = nanoid();
  const logsnagClient = getLogsnagClient();
  if (logsnagClient) {
    try {
      await logsnagClient.track({
        channel: "backend-errors",
        event: "API Error",
        description: "There was an error at:\n" + errorLocation + ": \n" + ((errorDetails == null ? void 0 : errorDetails.stack) || errorDetails),
        icon: ":warning:",
        user_id: userId,
        tags: {
          errorId
        }
      });
    } catch (err) {
      console.error("LogSnag logging error:", ((_a = err == null ? void 0 : err.response) == null ? void 0 : _a.data) || err);
    }
  }
  if (errorLocation != "emailSender") {
    await sendEmail(
      "drodriguez.dcr@gmail.com",
      "API Error",
      "There was an error at " + errorLocation + ": \n" + ((errorDetails == null ? void 0 : errorDetails.stack) || errorDetails) + "\nerror-id:" + errorId
    );
  }
}

const _nvxqqlUv_f8OFSsqWbBJAuFEkCKgV1CPt420lRYzHpc = defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("error", async (error, { event }) => {
    var _a, _b, _c;
    const path = (_a = event == null ? void 0 : event.path) != null ? _a : "unknown route";
    const userId = (_c = (_b = event == null ? void 0 : event.context) == null ? void 0 : _b.userId) != null ? _c : "no-user-id";
    await errorLogger(path, error, userId);
  });
});

const plugins = [
  _jWwMC7yOmPFfbhVuHX073FBke0spPuAL9zjPvOqs0,
_nvxqqlUv_f8OFSsqWbBJAuFEkCKgV1CPt420lRYzHpc
];

const assets = {
  "/index.mjs": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"17528-DC/8kirlIu4CmC/ENUC01xo5Vxg\"",
    "mtime": "2025-12-05T19:47:58.403Z",
    "size": 95528,
    "path": "index.mjs"
  },
  "/index.mjs.map": {
    "type": "application/json",
    "etag": "\"53fa2-Hy5RtIyKSBpdiiyhodwnkuCCfNk\"",
    "mtime": "2025-12-05T19:47:58.403Z",
    "size": 343970,
    "path": "index.mjs.map"
  }
};

function readAsset (id) {
  const serverDir = dirname$1(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve$1(serverDir, assets[id].path))
}

const publicAssetBases = {};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _A5GC5O = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError({ statusCode: 404 });
    }
    return;
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

const _p8kr_S = defineEventHandler((event) => {
  const origin = getHeader(event, "origin");
  const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];
  const allowOrigin = origin && allowedOrigins.includes(origin) ? origin : "http://localhost:3000";
  setResponseHeaders(event, {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "Access-Control-Allow-Headers": "authorization,content-type"
  });
  if (event.method === "OPTIONS") {
    event.node.res.statusCode = 200;
    return "OK";
  }
});

async function requireUser(event) {
  const authHeader = getHeader(event, "authorization");
  const token = authHeader == null ? void 0 : authHeader.replace("Bearer ", "");
  if (!token) {
    throw createError({ statusCode: 401, statusMessage: "No token provided" });
  }
  try {
    const verifiedToken = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
      authorizedParties: ["http://localhost:3000"]
    });
    event.context.auth = { userId: verifiedToken.sub, sessionId: verifiedToken.sid };
    console.log("Token verification successful.");
  } catch (error) {
    console.error("Token verification error:", error);
    throw createError({ statusCode: 401, statusMessage: `Invalid token: ${error.message}` });
  }
}

const _7FSRYA = defineEventHandler(async (event) => {
  var _a, _b, _c, _d;
  if (event.method === "OPTIONS") return;
  if ((_a = event.path) == null ? void 0 : _a.startsWith("/webhooks")) return;
  if ((_b = event.path) == null ? void 0 : _b.startsWith("/v1/vscode-extension-key/validate")) return;
  if ((_c = event.path) == null ? void 0 : _c.startsWith("/v1/handleFileSync")) return;
  if ((_d = event.path) == null ? void 0 : _d.startsWith("/mcp")) return;
  await requireUser(event);
});

const requiredEnvVars = [
  "PG_DB_HOST",
  "PG_DB_PORT",
  "PG_DB_USER",
  "PG_DB_PASS",
  "PG_DB_NAME"
];
const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key]);
if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing Postgres environment variables: ${missingEnvVars.join(", ")}`
  );
}
const pool = new Pool({
  host: process.env.PG_DB_HOST,
  port: Number(process.env.PG_DB_PORT),
  user: process.env.PG_DB_USER,
  password: process.env.PG_DB_PASS,
  database: process.env.PG_DB_NAME,
  ssl: false
});
async function testPostgresConnection() {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT tablename FROM pg_tables WHERE schemaname = '" + process.env.PG_DB_SCHEMA + "';"
    );
    client.release();
    console.log("PostgresDB connection successful.");
    result.rows.forEach((row) => {
      console.log(`- ${row.tablename}`);
    });
    return true;
  } catch (error) {
    console.error("Postgres connection failed:", error);
    return false;
  }
}
testPostgresConnection();

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 16;
function encryptKey(plaintext) {
  const encryptionKey = process.env.MCP_ENCRYPTION_KEY;
  if (!encryptionKey) {
    throw new Error("MCP_ENCRYPTION_KEY environment variable is not set");
  }
  const key = Buffer.from(encryptionKey, "hex");
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  let encrypted = cipher.update(plaintext, "utf8", "hex");
  encrypted += cipher.final("hex");
  const authTag = cipher.getAuthTag();
  return `${iv.toString("hex")}:${authTag.toString("hex")}:${encrypted}`;
}
function decryptKey(encryptedText) {
  const encryptionKey = process.env.MCP_ENCRYPTION_KEY;
  if (!encryptionKey) {
    throw new Error("MCP_ENCRYPTION_KEY environment variable is not set");
  }
  const key = Buffer.from(encryptionKey, "hex");
  const parts = encryptedText.split(":");
  if (parts.length !== 3) {
    throw new Error("Invalid encrypted text format");
  }
  const iv = Buffer.from(parts[0], "hex");
  const authTag = Buffer.from(parts[1], "hex");
  const encrypted = parts[2];
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

const _LQQTfc = defineEventHandler(async function(event) {
  if (!event.path.startsWith("/mcp")) {
    return;
  }
  try {
    const authHeader = getHeader(event, "Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized: Missing or invalid Authorization header"
      });
    }
    const providedKey = authHeader.substring(7);
    const keysResult = await pool.query(
      `SELECT mcp_key_id, mcp_key, project_id, user_id, is_active, expires_at 
       FROM ${process.env.PG_DB_SCHEMA}.mcp_keys 
       WHERE is_active = true`
    );
    let keyData = null;
    for (const row of keysResult.rows) {
      try {
        const decryptedKey = decryptKey(row.mcp_key);
        if (decryptedKey === providedKey) {
          keyData = row;
          break;
        }
      } catch (decryptError) {
        continue;
      }
    }
    if (!keyData) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized: Invalid API key"
      });
    }
    if (!keyData.is_active) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized: API key is inactive"
      });
    }
    const currentTimestamp = Math.floor(Date.now() / 1e3);
    if (keyData.expires_at !== null && keyData.expires_at < currentTimestamp) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized: API key has expired"
      });
    }
    const rateLimit = parseInt(process.env.MCP_RATE_LIMIT || "100");
    const oneHourAgo = currentTimestamp - 3600;
    const rateLimitResult = await pool.query(
      `SELECT COUNT(*) as request_count 
       FROM ${process.env.PG_DB_SCHEMA}.mcp_requests 
       WHERE mcp_key_id = $1 AND created_at > $2`,
      [keyData.mcp_key_id, oneHourAgo]
    );
    const requestCount = parseInt(rateLimitResult.rows[0].request_count);
    if (requestCount >= rateLimit) {
      throw createError({
        statusCode: 429,
        statusMessage: "Too Many Requests: Rate limit exceeded"
      });
    }
    await pool.query(
      `UPDATE ${process.env.PG_DB_SCHEMA}.mcp_keys 
       SET last_used_at = $1 
       WHERE mcp_key_id = $2`,
      [currentTimestamp, keyData.mcp_key_id]
    );
    event.context.project_id = keyData.project_id;
    event.context.user_id = keyData.user_id;
    event.context.mcp_key_id = keyData.mcp_key_id;
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    console.error("MCP Auth error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error"
    });
  }
});

const _lazy_aOkEPe = () => Promise.resolve().then(function () { return index$1; });
const _lazy_4hSVct = () => Promise.resolve().then(function () { return index_post$5; });
const _lazy_Pv6YYh = () => Promise.resolve().then(function () { return createNewProject_post$1; });
const _lazy_hydq3j = () => Promise.resolve().then(function () { return getAllProjects_get$1; });
const _lazy_Tdtuop = () => Promise.resolve().then(function () { return getApiBlueprints_get$1; });
const _lazy_bmCy_P = () => Promise.resolve().then(function () { return getCloudCredentials_get$1; });
const _lazy_4rgEPY = () => Promise.resolve().then(function () { return getMcpKey_get$1; });
const _lazy_pyF_xR = () => Promise.resolve().then(function () { return getProjectActions_get$1; });
const _lazy_HCPjDo = () => Promise.resolve().then(function () { return getProjectDatabases_get$1; });
const _lazy_X4lGVy = () => Promise.resolve().then(function () { return getProjectDeployments_get$1; });
const _lazy_oGSnUd = () => Promise.resolve().then(function () { return getProjectDetails_get$1; });
const _lazy_IlUmRc = () => Promise.resolve().then(function () { return getProjectFileContent_get$1; });
const _lazy_sPiore = () => Promise.resolve().then(function () { return getProjectFiles_get$1; });
const _lazy_0Ks5sW = () => Promise.resolve().then(function () { return updateCloudCredentials_post$1; });
const _lazy_RfXMPi = () => Promise.resolve().then(function () { return index_post$3; });
const _lazy_I7tX3l = () => Promise.resolve().then(function () { return index_post$1; });

const handlers = [
  { route: '', handler: _A5GC5O, lazy: false, middleware: true, method: undefined },
  { route: '', handler: _p8kr_S, lazy: false, middleware: true, method: undefined },
  { route: '', handler: _7FSRYA, lazy: false, middleware: true, method: undefined },
  { route: '', handler: _LQQTfc, lazy: false, middleware: true, method: undefined },
  { route: '/', handler: _lazy_aOkEPe, lazy: true, middleware: false, method: undefined },
  { route: '/mcp', handler: _lazy_4hSVct, lazy: true, middleware: false, method: "post" },
  { route: '/v1/createNewProject', handler: _lazy_Pv6YYh, lazy: true, middleware: false, method: "post" },
  { route: '/v1/getAllProjects', handler: _lazy_hydq3j, lazy: true, middleware: false, method: "get" },
  { route: '/v1/getApiBlueprints', handler: _lazy_Tdtuop, lazy: true, middleware: false, method: "get" },
  { route: '/v1/getCloudCredentials', handler: _lazy_bmCy_P, lazy: true, middleware: false, method: "get" },
  { route: '/v1/getMcpKey', handler: _lazy_4rgEPY, lazy: true, middleware: false, method: "get" },
  { route: '/v1/getProjectActions', handler: _lazy_pyF_xR, lazy: true, middleware: false, method: "get" },
  { route: '/v1/getProjectDatabases', handler: _lazy_HCPjDo, lazy: true, middleware: false, method: "get" },
  { route: '/v1/getProjectDeployments', handler: _lazy_X4lGVy, lazy: true, middleware: false, method: "get" },
  { route: '/v1/getProjectDetails', handler: _lazy_oGSnUd, lazy: true, middleware: false, method: "get" },
  { route: '/v1/getProjectFileContent', handler: _lazy_IlUmRc, lazy: true, middleware: false, method: "get" },
  { route: '/v1/getProjectFiles', handler: _lazy_sPiore, lazy: true, middleware: false, method: "get" },
  { route: '/v1/updateCloudCredentials', handler: _lazy_0Ks5sW, lazy: true, middleware: false, method: "post" },
  { route: '/webhooks/signup', handler: _lazy_RfXMPi, lazy: true, middleware: false, method: "post" },
  { route: '/webhooks/testRedisJob', handler: _lazy_I7tX3l, lazy: true, middleware: false, method: "post" }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(true),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const fetchContext = event.node.req?.__unenv__;
      if (fetchContext?._platform) {
        event.context = {
          _platform: fetchContext?._platform,
          // #3335
          ...fetchContext._platform,
          ...event.context
        };
      }
      if (!event.context.waitUntil && fetchContext?.waitUntil) {
        event.context.waitUntil = fetchContext.waitUntil;
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (event.context.waitUntil) {
          event.context.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter$1({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => callNodeRequestHandler(
    nodeHandler,
    aRequest
  );
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return fetchNodeRequestHandler(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

function defineNitroPlugin(def) {
  return def;
}

const scheduledTasks = false;

const tasks = {
  
};

const __runningTasks__ = {};
async function runTask(name, {
  payload = {},
  context = {}
} = {}) {
  if (__runningTasks__[name]) {
    return __runningTasks__[name];
  }
  if (!(name in tasks)) {
    throw createError({
      message: `Task \`${name}\` is not available!`,
      statusCode: 404
    });
  }
  if (!tasks[name].resolve) {
    throw createError({
      message: `Task \`${name}\` is not implemented!`,
      statusCode: 501
    });
  }
  const handler = await tasks[name].resolve();
  const taskEvent = { name, payload, context };
  __runningTasks__[name] = handler.run(taskEvent);
  try {
    const res = await __runningTasks__[name];
    return res;
  } finally {
    delete __runningTasks__[name];
  }
}

if (!globalThis.crypto) {
  globalThis.crypto = crypto;
}
const { NITRO_NO_UNIX_SOCKET, NITRO_DEV_WORKER_ID } = process.env;
trapUnhandledNodeErrors();
parentPort?.on("message", (msg) => {
  if (msg && msg.event === "shutdown") {
    shutdown();
  }
});
const nitroApp = useNitroApp();
const server = new Server(toNodeListener(nitroApp.h3App));
let listener;
listen().catch(() => listen(
  true
  /* use random port */
)).catch((error) => {
  console.error("Dev worker failed to listen:", error);
  return shutdown();
});
nitroApp.router.get(
  "/_nitro/tasks",
  defineEventHandler(async (event) => {
    const _tasks = await Promise.all(
      Object.entries(tasks).map(async ([name, task]) => {
        const _task = await task.resolve?.();
        return [name, { description: _task?.meta?.description }];
      })
    );
    return {
      tasks: Object.fromEntries(_tasks),
      scheduledTasks
    };
  })
);
nitroApp.router.use(
  "/_nitro/tasks/:name",
  defineEventHandler(async (event) => {
    const name = getRouterParam(event, "name");
    const payload = {
      ...getQuery$1(event),
      ...await readBody(event).then((r) => r?.payload).catch(() => ({}))
    };
    return await runTask(name, { payload });
  })
);
function listen(useRandomPort = Boolean(
  NITRO_NO_UNIX_SOCKET || process.versions.webcontainer || "Bun" in globalThis && process.platform === "win32"
)) {
  return new Promise((resolve, reject) => {
    try {
      listener = server.listen(useRandomPort ? 0 : getSocketAddress(), () => {
        const address = server.address();
        parentPort?.postMessage({
          event: "listen",
          address: typeof address === "string" ? { socketPath: address } : { host: "localhost", port: address?.port }
        });
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}
function getSocketAddress() {
  const socketName = `nitro-worker-${process.pid}-${threadId}-${NITRO_DEV_WORKER_ID}-${Math.round(Math.random() * 1e4)}.sock`;
  if (process.platform === "win32") {
    return join(String.raw`\\.\pipe`, socketName);
  }
  if (process.platform === "linux") {
    const nodeMajor = Number.parseInt(process.versions.node.split(".")[0], 10);
    if (nodeMajor >= 20) {
      return `\0${socketName}`;
    }
  }
  return join(tmpdir(), socketName);
}
async function shutdown() {
  server.closeAllConnections?.();
  await Promise.all([
    new Promise((resolve) => listener?.close(resolve)),
    nitroApp.hooks.callHook("close").catch(console.error)
  ]);
  parentPort?.postMessage({ event: "exit" });
}

const index = eventHandler(() => {
  console.log("This endpoint has been hit.");
  return { message: "Hello from Nitro!" };
});

const index$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index
});

function getToolDefinitions() {
  return [
    {
      name: "spin_up_new_backend_project",
      description: "Creates a new Nitro.js backend project with optional features. This is a long-running operation that streams progress updates.",
      inputSchema: {
        type: "object",
        properties: {
          userPrompt: {
            type: "string",
            description: "The original user prompt/request that triggered this tool call"
          },
          projectName: {
            type: "string",
            description: "Name of the new backend project"
          },
          includeAuth: {
            type: "boolean",
            description: "Include Clerk authentication setup"
          },
          includeDatabase: {
            type: "boolean",
            description: "Include Postgres database setup"
          },
          includeRedis: {
            type: "boolean",
            description: "Include Redis setup"
          },
          includeEmail: {
            type: "boolean",
            description: "Include email service setup"
          }
        },
        required: ["projectName"]
      }
    },
    {
      name: "modify_backend_code",
      description: "Modifies or adds code to an existing backend project. Streams progress updates.",
      inputSchema: {
        type: "object",
        properties: {
          userPrompt: {
            type: "string",
            description: "The original user prompt/request that triggered this tool call"
          },
          projectPath: {
            type: "string",
            description: "Path to the backend project"
          },
          modificationType: {
            type: "string",
            enum: ["add_route", "add_middleware", "add_service", "add_database_table", "modify_existing_file"],
            description: "Type of modification to perform"
          },
          fileContent: {
            type: "string",
            description: "The code content to add or modify"
          },
          filePath: {
            type: "string",
            description: "Relative path where file should be created/modified"
          },
          additionalContext: {
            type: "object",
            description: "Extra parameters based on modification type"
          }
        },
        required: ["projectPath", "modificationType", "fileContent", "filePath"]
      }
    },
    {
      name: "modifyProject",
      description: "Request modifications to an existing backend project. Accepts natural language modification requests that will be processed by an AI agent. This is a long-running operation that streams progress updates.",
      inputSchema: {
        type: "object",
        properties: {
          modificationRequest: {
            type: "string",
            description: "Natural language description of the modification to make (e.g., 'Add a new GET /users/:id endpoint', 'Create a middleware for rate limiting', 'Add a new database table for storing user preferences')"
          }
        },
        required: ["modificationRequest"]
      }
    }
  ];
}

function formatSuccess(id, result) {
  return {
    jsonrpc: "2.0",
    id,
    result
  };
}
function formatError(id, code, message) {
  return {
    jsonrpc: "2.0",
    id,
    error: {
      code,
      message
    }
  };
}
function formatToolResult(content, isError2 = false) {
  return {
    content: Array.isArray(content) ? content : [
      {
        type: "text",
        text: content
      }
    ],
    isError: isError2
  };
}

function createSSEStream(event) {
  event.node.res.setHeader("Content-Type", "text/event-stream");
  event.node.res.setHeader("Cache-Control", "no-cache");
  event.node.res.setHeader("Connection", "keep-alive");
  let eventId = 0;
  return {
    sendEvent: function(id, data) {
      sendSSEEvent(event, id, data);
    },
    sendProgress: function(message, progress) {
      eventId++;
      const progressData = {
        jsonrpc: "2.0",
        method: "notifications/progress",
        params: {
          progress,
          message
        }
      };
      sendSSEEvent(event, eventId, progressData);
    },
    sendComplete: function(result) {
      eventId++;
      sendSSEEvent(event, eventId, result);
    },
    close: function() {
      event.node.res.end();
    }
  };
}
function sendSSEEvent(event, eventId, data) {
  const formattedData = typeof data === "string" ? data : JSON.stringify(data);
  event.node.res.write(`id: ${eventId}
`);
  event.node.res.write(`data: ${formattedData}

`);
}

const redis = new Redis({
  host: "localhost",
  port: 6379,
  ...false,
  maxRetriesPerRequest: null
});

const { Queue: Queue$1 } = BullMQ;
const queue$1 = new Queue$1("turbobackend-queue", {
  connection: redis.duplicate()
});
async function handleMCPRequest(requestBody, event) {
  try {
    if (!requestBody.jsonrpc || requestBody.jsonrpc !== "2.0") {
      return formatError(requestBody.id || null, -32600, "Invalid JSON-RPC version");
    }
    if (!requestBody.method) {
      return formatError(requestBody.id || null, -32600, "Missing method");
    }
    const { project_id, user_id, mcp_key_id } = event.context;
    if (requestBody.method === "tools/list") {
      const tools = getToolDefinitions();
      return formatSuccess(requestBody.id, { tools });
    }
    if (requestBody.method === "tools/call") {
      if (!requestBody.params || !requestBody.params.name) {
        return formatError(requestBody.id, -32602, "Missing tool name");
      }
      const toolName = requestBody.params.name;
      const toolArguments = requestBody.params.arguments || {};
      const streamId = nanoid();
      const request_id = nanoid();
      const created_at = Math.floor(Date.now() / 1e3);
      try {
        await pool.query(
          `INSERT INTO ${process.env.PG_DB_SCHEMA}.mcp_requests 
           (request_id, mcp_key_id, tool_name, request_params, response_status, created_at)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [request_id, mcp_key_id, toolName, JSON.stringify(toolArguments), "pending", created_at]
        );
      } catch (dbError) {
        console.error("Database error:", dbError);
        return formatError(requestBody.id, -32603, "Internal error: Failed to create request record");
      }
      const stream = createSSEStream(event);
      stream.sendEvent(1, "");
      try {
        console.log("Attempting to add job to queue:", {
          request_id,
          tool_name: toolName,
          mcp_key_id: toolArguments._apiKey,
          project_id,
          user_id
        });
        let jobName;
        if (toolName === "modifyProject") {
          jobName = "projectModificationJob";
        } else {
          jobName = "initialProjectCreationJob";
        }
        const job = await queue$1.add(jobName, {
          mcp_key_id: toolArguments._apiKey,
          project_id,
          user_id,
          request_id,
          tool_name: toolName,
          streamId,
          request_params: toolArguments
        }, {
          attempts: 3
        });
        console.log("Job successfully added to queue:", {
          jobId: job.id,
          jobName,
          request_id,
          tool_name: toolName
        });
      } catch (jobError) {
        console.error("Job queue error:", jobError);
        await pool.query(
          `UPDATE ${process.env.PG_DB_SCHEMA}.mcp_requests 
           SET response_status = $1 
           WHERE request_id = $2`,
          ["error", request_id]
        );
        const errorResult = formatSuccess(requestBody.id, formatToolResult("Failed to queue job", true));
        stream.sendComplete(errorResult);
        stream.close();
        return;
      }
      const subscriber = redis.duplicate();
      await subscriber.subscribe(streamId);
      let apiBlueprint = null;
      subscriber.on("message", async function(channel, message) {
        console.log("Redis message received on channel:", channel);
        console.log("Raw message:", message);
        try {
          const data = JSON.parse(message);
          console.log("Parsed message data:", JSON.stringify(data, null, 2));
          if (data.type === "apiBlueprint") {
            if (typeof data.content === "object" && data.content.blueprint) {
              apiBlueprint = data.content.blueprint;
            } else if (typeof data.content === "string") {
              apiBlueprint = data.content;
            } else {
              apiBlueprint = JSON.stringify(data.content);
            }
            console.log("\u2713 Received API blueprint (length:", (apiBlueprint == null ? void 0 : apiBlueprint.length) || 0, "chars)");
            return;
          }
          if (data.complete) {
            console.log("\u2713 FINAL MESSAGE RECEIVED - Job complete");
            console.log("  Status:", data.isError ? "ERROR" : "SUCCESS");
            console.log("  Content:", data.content);
            const finalStatus = data.isError ? "error" : "success";
            await pool.query(
              `UPDATE ${process.env.PG_DB_SCHEMA}.mcp_requests 
               SET response_status = $1 
               WHERE request_id = $2`,
              [finalStatus, request_id]
            );
            let toolResult;
            if (apiBlueprint) {
              toolResult = {
                content: [
                  {
                    type: "text",
                    text: data.content
                  },
                  {
                    type: "resource",
                    resource: {
                      uri: "blueprint://api-documentation",
                      mimeType: "text/markdown",
                      text: apiBlueprint
                    }
                  }
                ],
                isError: data.isError
              };
              console.log("  Including API blueprint in response");
            } else {
              toolResult = formatToolResult(data.content, data.isError);
            }
            const result = formatSuccess(requestBody.id, toolResult);
            stream.sendComplete(result);
            console.log("\u2713 Final result sent to client via SSE");
            await subscriber.unsubscribe(streamId);
            await subscriber.quit();
            stream.close();
            console.log("\u2713 Redis subscription closed and SSE stream ended");
          } else {
            console.log("\u2192 Progress update:", data.message, `(${data.progress || 0}%)`);
            stream.sendProgress(data.message, data.progress || 0);
          }
        } catch (parseError) {
          console.error("Error parsing Redis message:", parseError);
          console.error("Failed message content:", message);
        }
      });
      return;
    }
    return formatError(requestBody.id, -32601, `Method not found: ${requestBody.method}`);
  } catch (error) {
    console.error("MCP Handler error:", error);
    return formatError(requestBody.id || null, -32603, "Internal error");
  }
}

const index_post$4 = defineEventHandler(async function(event) {
  try {
    const body = await readBody(event);
    console.log("MCP request received:", JSON.stringify(body, null, 2));
    const protocolVersion = getHeader(event, "MCP-Protocol-Version");
    if (protocolVersion && protocolVersion !== "2025-11-25") {
      console.warn(`Unsupported MCP protocol version: ${protocolVersion}`);
    }
    const response = await handleMCPRequest(body, event);
    if (response === void 0) {
      return;
    }
    return response;
  } catch (error) {
    console.error("MCP endpoint error:", error);
    if (error instanceof SyntaxError) {
      return formatError(null, -32700, "Parse error: Invalid JSON");
    }
    return formatError(null, -32603, "Internal error");
  }
});

const index_post$5 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_post$4
});

const createNewProject_post = defineEventHandler(async function(event) {
  const client = await pool.connect();
  try {
    const body = await readBody(event);
    const { projectName } = body;
    if (!projectName) {
      setResponseStatus(event, 400);
      return {
        success: false,
        error: "Invalid input. projectName is required."
      };
    }
    const userId = event.context.auth.userId;
    await client.query("BEGIN");
    const unsanitizedNanoid = nanoid();
    const projectId = unsanitizedNanoid.replace(/_/g, function() {
      const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
      return chars[Math.floor(Math.random() * chars.length)];
    }).toLowerCase();
    const currentTime = Math.floor(Date.now() / 1e3);
    await client.query(
      `INSERT INTO ${process.env.PG_DB_SCHEMA}.projects 
       (project_id, user_id, project_name, created_at, updated_at) 
       VALUES ($1, $2, $3, $4, $5)`,
      [projectId, userId, projectName, currentTime, currentTime]
    );
    const mcpKeyId = nanoid();
    const randomString = nanoid(32);
    const mcpKeyPlaintext = `tb_live_${randomString}`;
    const mcpKeyEncrypted = encryptKey(mcpKeyPlaintext);
    await client.query(
      `INSERT INTO ${process.env.PG_DB_SCHEMA}.mcp_keys 
       (mcp_key_id, mcp_key, project_id, user_id, key_name, is_active, created_at, last_used_at, expires_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [mcpKeyId, mcpKeyEncrypted, projectId, userId, "Default Key", true, currentTime, null, null]
    );
    await client.query("COMMIT");
    return {
      success: true,
      projectId,
      mcpKey: mcpKeyPlaintext
    };
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error creating project:", error);
    setResponseStatus(event, 500);
    return {
      success: false,
      error: "Failed to create project"
    };
  } finally {
    client.release();
  }
});

const createNewProject_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: createNewProject_post
});

const getAllProjects_get = defineEventHandler(async function(event) {
  const client = await pool.connect();
  try {
    const userId = event.context.auth.userId;
    const result = await client.query(
      `SELECT project_id, project_name, created_at, updated_at 
       FROM ${process.env.PG_DB_SCHEMA}.projects 
       WHERE user_id = $1 
       ORDER BY created_at DESC`,
      [userId]
    );
    return {
      success: true,
      projects: result.rows
    };
  } catch (error) {
    console.error("Error fetching projects:", error);
    setResponseStatus(event, 500);
    return {
      success: false,
      error: "Failed to fetch projects"
    };
  } finally {
    client.release();
  }
});

const getAllProjects_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: getAllProjects_get
});

async function verifyProjectAccess(userId, projectId) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT user_id FROM ${process.env.PG_DB_SCHEMA}.projects WHERE project_id = $1`,
      [projectId]
    );
    if (result.rows.length === 0) {
      throw createError({
        statusCode: 404,
        message: "Project not found"
      });
    }
    if (result.rows[0].user_id !== userId) {
      throw createError({
        statusCode: 403,
        message: "Access denied"
      });
    }
    return true;
  } finally {
    client.release();
  }
}

const getApiBlueprints_get = defineEventHandler(async function(event) {
  const client = await pool.connect();
  try {
    const userId = event.context.auth.userId;
    const query = getQuery$1(event);
    const { projectId, environment } = query;
    if (!projectId || !environment) {
      setResponseStatus(event, 400);
      return {
        success: false,
        error: "projectId and environment are required"
      };
    }
    await verifyProjectAccess(userId, projectId);
    const result = await client.query(
      `SELECT blueprint_id, project_id, request_id, blueprint_content, created_at
       FROM ${process.env.PG_DB_SCHEMA}.api_blueprints 
       WHERE project_id = $1
       ORDER BY created_at DESC`,
      [projectId]
    );
    return {
      success: true,
      blueprints: result.rows
    };
  } catch (error) {
    console.error("Error fetching API blueprints:", error);
    const statusCode = error.statusCode || 500;
    setResponseStatus(event, statusCode);
    return {
      success: false,
      error: error.message || "Failed to fetch API blueprints"
    };
  } finally {
    client.release();
  }
});

const getApiBlueprints_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: getApiBlueprints_get
});

const getCloudCredentials_get = defineEventHandler(async function(event) {
  const client = await pool.connect();
  try {
    const userId = event.context.auth.userId;
    const query = getQuery$1(event);
    const { projectId } = query;
    if (!projectId) {
      setResponseStatus(event, 400);
      return {
        success: false,
        error: "projectId is required"
      };
    }
    await verifyProjectAccess(userId, projectId);
    const result = await client.query(
      `SELECT credential_id, cloud_provider, credential_name, credential, 
              default_region, is_active, created_at, updated_at
       FROM ${process.env.PG_DB_SCHEMA}.cloud_credentials 
       WHERE project_id = $1
       ORDER BY created_at DESC`,
      [projectId]
    );
    const credentials = result.rows.map(function(cred) {
      let decryptedCredential = null;
      let credentialFields = {};
      let hasMissingFields = false;
      try {
        decryptedCredential = cred.credential ? JSON.parse(decryptKey(cred.credential)) : null;
      } catch (error) {
        console.error("Error decrypting credential:", error);
      }
      if (decryptedCredential) {
        Object.keys(decryptedCredential).forEach(function(key) {
          const value = decryptedCredential[key];
          const isEmpty = !value || typeof value === "string" && value.trim() === "";
          credentialFields[key] = value;
          if (isEmpty) {
            hasMissingFields = true;
          }
        });
      } else {
        hasMissingFields = true;
      }
      return {
        credentialId: cred.credential_id,
        cloudProvider: cred.cloud_provider,
        credentialName: cred.credential_name,
        defaultRegion: cred.default_region,
        isActive: cred.is_active,
        hasMissingFields,
        credentialFields,
        createdAt: cred.created_at,
        updatedAt: cred.updated_at
      };
    });
    return {
      success: true,
      credentials
    };
  } catch (error) {
    console.error("Error fetching cloud credentials:", error);
    const statusCode = error.statusCode || 500;
    setResponseStatus(event, statusCode);
    return {
      success: false,
      error: error.message || "Failed to fetch cloud credentials"
    };
  } finally {
    client.release();
  }
});

const getCloudCredentials_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: getCloudCredentials_get
});

const getMcpKey_get = defineEventHandler(async function(event) {
  try {
    const query = getQuery$1(event);
    const { project_id } = query;
    if (!project_id) {
      setResponseStatus(event, 400);
      return {
        success: false,
        error: "project_id is required"
      };
    }
    const userId = event.context.auth.userId;
    const projectResult = await pool.query(
      `SELECT project_id FROM ${process.env.PG_DB_SCHEMA}.projects 
       WHERE project_id = $1 AND user_id = $2`,
      [project_id, userId]
    );
    if (projectResult.rows.length === 0) {
      setResponseStatus(event, 404);
      return {
        success: false,
        error: "Project not found or access denied"
      };
    }
    const keyResult = await pool.query(
      `SELECT mcp_key_id, mcp_key, key_name, created_at, last_used_at, expires_at 
       FROM ${process.env.PG_DB_SCHEMA}.mcp_keys 
       WHERE project_id = $1 AND is_active = true 
       ORDER BY created_at DESC 
       LIMIT 1`,
      [project_id]
    );
    if (keyResult.rows.length === 0) {
      setResponseStatus(event, 404);
      return {
        success: false,
        error: "No active MCP key found for this project"
      };
    }
    const keyData = keyResult.rows[0];
    let decryptedKey;
    try {
      decryptedKey = decryptKey(keyData.mcp_key);
    } catch (decryptError) {
      console.error("Decryption error:", decryptError);
      setResponseStatus(event, 500);
      return {
        success: false,
        error: "Failed to decrypt MCP key"
      };
    }
    return {
      success: true,
      mcpKey: decryptedKey,
      keyName: keyData.key_name,
      createdAt: keyData.created_at,
      lastUsedAt: keyData.last_used_at,
      expiresAt: keyData.expires_at
    };
  } catch (error) {
    console.error("Error getting MCP key:", error);
    setResponseStatus(event, 500);
    return {
      success: false,
      error: "Failed to get MCP key"
    };
  }
});

const getMcpKey_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: getMcpKey_get
});

const getProjectActions_get = defineEventHandler(async function(event) {
  const client = await pool.connect();
  try {
    const userId = event.context.auth.userId;
    const query = getQuery$1(event);
    const { projectId, environment } = query;
    if (!projectId || !environment) {
      setResponseStatus(event, 400);
      return {
        success: false,
        error: "projectId and environment are required"
      };
    }
    await verifyProjectAccess(userId, projectId);
    const result = await client.query(
      `SELECT action_id, project_id, user_id, request_id, action_type, 
              action_details, status, environment, reference_ids, created_at
       FROM ${process.env.PG_DB_SCHEMA}.project_actions 
       WHERE project_id = $1 AND environment = $2
       ORDER BY created_at DESC`,
      [projectId, environment]
    );
    return {
      success: true,
      actions: result.rows
    };
  } catch (error) {
    console.error("Error fetching project actions:", error);
    const statusCode = error.statusCode || 500;
    setResponseStatus(event, statusCode);
    return {
      success: false,
      error: error.message || "Failed to fetch project actions"
    };
  } finally {
    client.release();
  }
});

const getProjectActions_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: getProjectActions_get
});

const getProjectDatabases_get = defineEventHandler(async function(event) {
  const client = await pool.connect();
  try {
    const userId = event.context.auth.userId;
    const query = getQuery$1(event);
    const { projectId, environment } = query;
    if (!projectId || !environment) {
      setResponseStatus(event, 400);
      return {
        success: false,
        error: "projectId and environment are required"
      };
    }
    await verifyProjectAccess(userId, projectId);
    const result = await client.query(
      `SELECT database_id, project_id, user_id, db_name, db_schema, 
              environment, is_active, created_at, updated_at
       FROM ${process.env.PG_DB_SCHEMA}.project_databases 
       WHERE project_id = $1 AND environment = $2
       ORDER BY created_at DESC`,
      [projectId, environment]
    );
    return {
      success: true,
      databases: result.rows
    };
  } catch (error) {
    console.error("Error fetching project databases:", error);
    const statusCode = error.statusCode || 500;
    setResponseStatus(event, statusCode);
    return {
      success: false,
      error: error.message || "Failed to fetch project databases"
    };
  } finally {
    client.release();
  }
});

const getProjectDatabases_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: getProjectDatabases_get
});

const getProjectDeployments_get = defineEventHandler(async function(event) {
  const client = await pool.connect();
  try {
    const userId = event.context.auth.userId;
    const query = getQuery$1(event);
    const { projectId, environment } = query;
    if (!projectId || !environment) {
      setResponseStatus(event, 400);
      return {
        success: false,
        error: "projectId and environment are required"
      };
    }
    await verifyProjectAccess(userId, projectId);
    const result = await client.query(
      `SELECT deployment_id, project_id, platform, app_name, url, 
              status, deployed_at, last_updated
       FROM ${process.env.PG_DB_SCHEMA}.project_deployments 
       WHERE project_id = $1
       ORDER BY deployed_at DESC`,
      [projectId]
    );
    return {
      success: true,
      deployments: result.rows
    };
  } catch (error) {
    console.error("Error fetching project deployments:", error);
    const statusCode = error.statusCode || 500;
    setResponseStatus(event, statusCode);
    return {
      success: false,
      error: error.message || "Failed to fetch project deployments"
    };
  } finally {
    client.release();
  }
});

const getProjectDeployments_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: getProjectDeployments_get
});

const getProjectDetails_get = defineEventHandler(async function(event) {
  const client = await pool.connect();
  try {
    const userId = event.context.auth.userId;
    const query = getQuery$1(event);
    const { projectId } = query;
    if (!projectId) {
      setResponseStatus(event, 400);
      return {
        success: false,
        error: "projectId is required"
      };
    }
    await verifyProjectAccess(userId, projectId);
    const result = await client.query(
      `SELECT project_id, project_name, created_at, updated_at
       FROM ${process.env.PG_DB_SCHEMA}.projects 
       WHERE project_id = $1`,
      [projectId]
    );
    if (result.rows.length === 0) {
      setResponseStatus(event, 404);
      return {
        success: false,
        error: "Project not found"
      };
    }
    return {
      success: true,
      project: result.rows[0]
    };
  } catch (error) {
    console.error("Error fetching project details:", error);
    const statusCode = error.statusCode || 500;
    setResponseStatus(event, statusCode);
    return {
      success: false,
      error: error.message || "Failed to fetch project details"
    };
  } finally {
    client.release();
  }
});

const getProjectDetails_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: getProjectDetails_get
});

function getS3Client() {
  return new S3Client({
    region: process.env.AWS_REGION || "us-east-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
  });
}
async function listProjectFiles(projectId) {
  const s3Client = getS3Client();
  const bucketName = process.env.S3_PROJECTS_BUCKET;
  const prefix = `${projectId}/`;
  try {
    const command = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: prefix
    });
    const response = await s3Client.send(command);
    if (!response.Contents || response.Contents.length === 0) {
      return [];
    }
    return response.Contents.filter(function(item) {
      return item.Key !== prefix;
    }).map(function(item) {
      return {
        key: item.Key.replace(prefix, ""),
        size: item.Size,
        lastModified: item.LastModified
      };
    });
  } catch (error) {
    console.error("Error listing S3 files:", error);
    throw error;
  }
}
async function getProjectFileContent(projectId, filePath) {
  const s3Client = getS3Client();
  const bucketName = process.env.S3_PROJECTS_BUCKET;
  const key = `${projectId}/${filePath}`;
  try {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key
    });
    const response = await s3Client.send(command);
    const bodyContents = await streamToString(response.Body);
    return bodyContents;
  } catch (error) {
    console.error("Error getting S3 file content:", error);
    throw error;
  }
}
async function streamToString(stream) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString("utf-8");
}

const getProjectFileContent_get = defineEventHandler(async function(event) {
  try {
    const userId = event.context.auth.userId;
    const query = getQuery$1(event);
    const { projectId, filePath } = query;
    if (!projectId || !filePath) {
      setResponseStatus(event, 400);
      return {
        success: false,
        error: "projectId and filePath are required"
      };
    }
    await verifyProjectAccess(userId, projectId);
    const content = await getProjectFileContent(projectId, filePath);
    return {
      success: true,
      content,
      filePath
    };
  } catch (error) {
    console.error("Error fetching project file content:", error);
    const statusCode = error.statusCode || 500;
    setResponseStatus(event, statusCode);
    return {
      success: false,
      error: error.message || "Failed to fetch project file content"
    };
  }
});

const getProjectFileContent_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: getProjectFileContent_get
});

const getProjectFiles_get = defineEventHandler(async function(event) {
  try {
    const userId = event.context.auth.userId;
    const query = getQuery$1(event);
    const { projectId } = query;
    if (!projectId) {
      setResponseStatus(event, 400);
      return {
        success: false,
        error: "projectId is required"
      };
    }
    await verifyProjectAccess(userId, projectId);
    const files = await listProjectFiles(projectId);
    return {
      success: true,
      files
    };
  } catch (error) {
    console.error("Error fetching project files:", error);
    const statusCode = error.statusCode || 500;
    setResponseStatus(event, statusCode);
    return {
      success: false,
      error: error.message || "Failed to fetch project files"
    };
  }
});

const getProjectFiles_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: getProjectFiles_get
});

const updateCloudCredentials_post = defineEventHandler(async function(event) {
  const client = await pool.connect();
  try {
    const body = await readBody(event);
    const { projectId, credentialId, cloudProvider, credentialName, credentials, defaultRegion } = body;
    const userId = event.context.auth.userId;
    if (!projectId) {
      setResponseStatus(event, 400);
      return {
        success: false,
        error: "projectId is required"
      };
    }
    if (!credentials || typeof credentials !== "object") {
      setResponseStatus(event, 400);
      return {
        success: false,
        error: "credentials object is required"
      };
    }
    await verifyProjectAccess(userId, projectId);
    const currentTime = Math.floor(Date.now() / 1e3);
    await client.query("BEGIN");
    if (credentialId) {
      const verifyResult = await client.query(
        `SELECT credential_id, credential FROM ${process.env.PG_DB_SCHEMA}.cloud_credentials 
         WHERE credential_id = $1 AND project_id = $2`,
        [credentialId, projectId]
      );
      if (verifyResult.rows.length === 0) {
        await client.query("ROLLBACK");
        setResponseStatus(event, 404);
        return {
          success: false,
          error: "Credential not found"
        };
      }
      let existingCredentials = {};
      try {
        existingCredentials = verifyResult.rows[0].credential ? JSON.parse(decryptKey(verifyResult.rows[0].credential)) : {};
      } catch (error) {
        console.error("Error decrypting existing credential:", error);
      }
      const mergedCredentials = { ...existingCredentials, ...credentials };
      const encryptedCredential = encryptKey(JSON.stringify(mergedCredentials));
      await client.query(
        `UPDATE ${process.env.PG_DB_SCHEMA}.cloud_credentials 
         SET credential = $1, updated_at = $2
         ${defaultRegion ? ", default_region = $3" : ""}
         WHERE credential_id = ${defaultRegion ? "$4" : "$3"}`,
        defaultRegion ? [encryptedCredential, currentTime, defaultRegion, credentialId] : [encryptedCredential, currentTime, credentialId]
      );
      await client.query("COMMIT");
      return {
        success: true,
        credentialId,
        message: "Credentials updated successfully"
      };
    } else {
      if (!cloudProvider) {
        await client.query("ROLLBACK");
        setResponseStatus(event, 400);
        return {
          success: false,
          error: "cloudProvider is required when creating new credentials"
        };
      }
      const newCredentialId = nanoid();
      const encryptedCredential = encryptKey(JSON.stringify(credentials));
      await client.query(
        `INSERT INTO ${process.env.PG_DB_SCHEMA}.cloud_credentials 
         (credential_id, project_id, cloud_provider, credential_name, 
          credential, default_region, is_active, created_at, updated_at) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          newCredentialId,
          projectId,
          cloudProvider,
          credentialName || `${cloudProvider} Credentials`,
          encryptedCredential,
          defaultRegion || null,
          true,
          currentTime,
          currentTime
        ]
      );
      await client.query("COMMIT");
      return {
        success: true,
        credentialId: newCredentialId,
        message: "Credentials created successfully"
      };
    }
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error updating cloud credentials:", error);
    const statusCode = error.statusCode || 500;
    setResponseStatus(event, statusCode);
    return {
      success: false,
      error: error.message || "Failed to update cloud credentials"
    };
  } finally {
    client.release();
  }
});

const updateCloudCredentials_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: updateCloudCredentials_post
});

const stripeSecret = process.env.STRIPE_STANDARD_SECRET_KEY;
if (!stripeSecret) {
  throw new Error("Missing STRIPE_STANDARD_SECRET_KEY environment variable");
}
const stripe = new Stripe(stripeSecret);
const index_post$2 = eventHandler(async (event) => {
  const req = event.node.req;
  const headers = getRequestHeaders(event);
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    errorLogger(req.url, "Webhook secret key error", "stripe-webhook");
    throw new Error("Webhook secret key error");
  }
  const svix_id = headers["svix-id"];
  const svix_timestamp = headers["svix-timestamp"];
  const svix_signature = headers["svix-signature"];
  if (!svix_id || !svix_timestamp || !svix_signature) {
    errorLogger(req.url, "Error occured -- no svix headers");
    setResponseStatus(event, 400);
    return { message: "Error occured -- no svix headers" };
  }
  const payload = await readRawBody(event);
  if (!payload) {
    errorLogger(req.url, "Error occured -- empty payload");
    setResponseStatus(event, 400);
    return { message: "Error occured -- empty payload" };
  }
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;
  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature
    });
  } catch (err) {
    errorLogger(req.nextUrl, err, "signup-webhook");
    setResponseStatus(event, 400);
    return { message: "Error occured" };
  }
  const eventType = evt.type;
  if (eventType === "user.created") {
    console.log("User created event received" + JSON.stringify(evt, null, 2));
    const userId = evt.data.id;
    const userEmail = evt.data.email_addresses[0].email_address;
    try {
      const customer = await stripe.customers.create({
        email: userEmail
      });
      const customerId = customer.id;
      console.log("Customer created in Stripe: " + JSON.stringify(customer, null, 2));
      const joinedAt = Math.floor(Date.now() / 1e3);
      await pool.query(
        "INSERT INTO " + process.env.PG_DB_SCHEMA + ".users(user_id, email, joined_at, payment_status, stripe_customer_id) VALUES ($1, $2, $3, $4, $5)",
        [userId, userEmail, joinedAt, "trial", customerId]
      );
      await sendEmail("drodriguez.dcr@gmail.com", "New User Signed Up", "A new user has signed up!");
      setResponseStatus(event, 200);
      return { message: "Success" };
    } catch (error) {
      errorLogger(req.url, error, "signup-webhook");
      console.error(error);
      setResponseStatus(event, 500);
      return { message: "Internal Server Error" };
    }
  }
});

const index_post$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_post$2
});

const { Queue } = BullMQ;
const queue = new Queue("devdocsflow-queue", {
  connection: redis.duplicate()
});
const index_post = eventHandler(async (event) => {
  await readBody(event);
  const projectAndJobId = nanoid();
  const jobId = projectAndJobId;
  const channel = `llm-stream-${jobId}`;
  const subscriber = redis.duplicate();
  await subscriber.subscribe(channel);
  setHeader(event, "Content-Type", "text/event-stream; charset=utf-8");
  setHeader(event, "Cache-Control", "no-cache, no-transform");
  setHeader(event, "Connection", "keep-alive");
  async function send(data) {
    event.node.res.write(`data: ${JSON.stringify(data)}

`);
  }
  send({ jobId, status: "queued" });
  async function cleanup() {
    subscriber.removeAllListeners();
    await subscriber.unsubscribe(channel).catch(() => {
    });
    await subscriber.quit().catch(() => {
    });
  }
  subscriber.on("message", async (chan, message) => {
    if (chan !== channel) return;
    const payload2 = JSON.parse(message);
    send(payload2);
    if (payload2.done) {
      await cleanup();
      event.node.res.end();
    }
  });
  event.node.req.on("close", cleanup);
  const projectDescription = "I want you to create me an simple CRM";
  const projectPreferences = "I have no preferences.";
  const userId = "test-user-123";
  const payload = {
    projectDescription,
    projectId: projectAndJobId,
    userId,
    projectPreferences
  };
  await queue.add("initialProjectCreationJob", payload, {
    jobId,
    // Use custom jobId so worker publishes to the right channel
    removeOnComplete: true,
    attempts: 3
  });
  return new Promise(() => {
  });
});

const index_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_post
});
//# sourceMappingURL=index.mjs.map
