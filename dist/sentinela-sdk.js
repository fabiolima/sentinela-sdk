var m = Object.defineProperty;
var h = (e, n, t) => n in e ? m(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t;
var a = (e, n, t) => (h(e, typeof n != "symbol" ? n + "" : n, t), t), p = (e, n, t) => {
  if (!n.has(e))
    throw TypeError("Cannot " + t);
};
var d = (e, n, t) => {
  if (n.has(e))
    throw TypeError("Cannot add the same private member more than once");
  n instanceof WeakSet ? n.add(e) : n.set(e, t);
};
var u = (e, n, t) => (p(e, n, "access private method"), t);
let s;
const y = new Uint8Array(16);
function w() {
  if (!s && (s = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !s))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return s(y);
}
const r = [];
for (let e = 0; e < 256; ++e)
  r.push((e + 256).toString(16).slice(1));
function D(e, n = 0) {
  return r[e[n + 0]] + r[e[n + 1]] + r[e[n + 2]] + r[e[n + 3]] + "-" + r[e[n + 4]] + r[e[n + 5]] + "-" + r[e[n + 6]] + r[e[n + 7]] + "-" + r[e[n + 8]] + r[e[n + 9]] + "-" + r[e[n + 10]] + r[e[n + 11]] + r[e[n + 12]] + r[e[n + 13]] + r[e[n + 14]] + r[e[n + 15]];
}
const I = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), l = {
  randomUUID: I
};
function U(e, n, t) {
  if (l.randomUUID && !n && !e)
    return l.randomUUID();
  e = e || {};
  const i = e.random || (e.rng || w)();
  if (i[6] = i[6] & 15 | 64, i[8] = i[8] & 63 | 128, n) {
    t = t || 0;
    for (let o = 0; o < 16; ++o)
      n[t + o] = i[o];
    return n;
  }
  return D(i);
}
function v() {
  return U();
}
function S() {
  const e = window.localStorage.getItem("sentinela-userid");
  if (!e) {
    const n = v();
    return window.localStorage.setItem("sentinela-userid", n), n;
  }
  return e;
}
function x() {
  return console.log("https://sentinela-analytics.onrender.com"), "https://sentinela-analytics.onrender.com";
}
function A() {
  return "userAgentData" in navigator ? navigator.userAgentData.mobile : "maxTouchPoints" in navigator ? navigator.maxTouchPoints > 0 : !1;
}
function b() {
  return "userAgentData" in navigator ? navigator.userAgentData.platform : navigator.platform;
}
function V() {
  return {
    mobile: A(),
    platform: b(),
    appVersion: navigator.appVersion,
    userAgent: navigator.userAgent,
    width: window.innerWidth,
    height: window.innerHeight
  };
}
var c, g;
class T {
  constructor({ domain: n }) {
    d(this, c);
    a(this, "endpoint");
    a(this, "domain");
    a(this, "userId");
    this.domain = n, this.endpoint = x(), this.userId = S(), u(this, c, g).call(this);
  }
  async onError(n) {
    try {
      await this.sendError(n);
    } catch (t) {
      console.error(t);
    }
  }
  async sendError(n) {
    const t = V();
    n = {
      ...n,
      ...t,
      user_id: this.userId,
      date: (/* @__PURE__ */ new Date()).toISOString(),
      href: location.href,
      referrer: document.referrer || null,
      domain: this.domain
    };
    const i = `${this.endpoint}/errors`;
    return fetch(i, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...n })
    });
  }
}
c = new WeakSet(), g = function() {
  window.addEventListener("error", (n) => this.onError({
    source: "global",
    message: n.error.message,
    stack: n.error.stack,
    filename: n.filename,
    lineno: n.lineno,
    colno: n.colno
  }));
};
export {
  T as default
};
