var d = Object.defineProperty;
var l = (e, n, t) => n in e ? d(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t;
var o = (e, n, t) => (l(e, typeof n != "symbol" ? n + "" : n, t), t), u = (e, n, t) => {
  if (!n.has(e))
    throw TypeError("Cannot " + t);
};
var i = (e, n, t) => {
  if (n.has(e))
    throw TypeError("Cannot add the same private member more than once");
  n instanceof WeakSet ? n.add(e) : n.set(e, t);
};
var s = (e, n, t) => (u(e, n, "access private method"), t);
function h() {
  return window.crypto.randomUUID();
}
function m() {
  const e = window.localStorage.getItem("sentinela-userid");
  if (!e) {
    const n = h();
    return window.localStorage.setItem("sentinela-userid", n), n;
  }
  return e;
}
function g() {
  return console.log("https://sentinela-analytics.onrender.com"), "https://sentinela-analytics.onrender.com";
}
var r, a;
class w {
  constructor() {
    i(this, r);
    o(this, "endpoint");
    o(this, "domain");
    o(this, "userId");
  }
  start() {
    this.endpoint = g(), this.domain = document.currentScript.getAttribute("data-domain"), this.userId = m(), s(this, r, a).call(this);
  }
  async onError(n) {
    console.log("Error caught", n);
    const t = {
      message: n.error.message,
      stack: n.error.stack,
      filename: n.filename,
      lineno: n.lineno,
      colno: n.colno
    };
    try {
      await this.sendError(t);
    } catch (c) {
      console.error(c);
    }
  }
  async sendError(n) {
    n = {
      ...n,
      user_id: this.userId,
      date: (/* @__PURE__ */ new Date()).toISOString(),
      href: location.href,
      referrer: document.referrer || null,
      domain: this.domain
    };
    const t = `${this.endpoint}/errors`;
    return fetch(t, {
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
r = new WeakSet(), a = function() {
  window.addEventListener("error", (n) => this.onError(n));
};
(() => {
  console.log("Running sdk");
  const e = new w();
  window.Sentinela = e, window.Sentinela.start();
})();
