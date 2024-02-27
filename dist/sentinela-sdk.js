var m = Object.defineProperty;
var h = (t, e, n) => e in t ? m(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var o = (t, e, n) => (h(t, typeof e != "symbol" ? e + "" : e, n), n), g = (t, e, n) => {
  if (!e.has(t))
    throw TypeError("Cannot " + n);
};
var a = (t, e, n) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, n);
};
var c = (t, e, n) => (g(t, e, "access private method"), n);
function p() {
  return window.crypto.randomUUID();
}
function f() {
  const t = window.localStorage.getItem("sentinela-userid");
  if (!t) {
    const e = p();
    return window.localStorage.setItem("sentinela-userid", e), e;
  }
  return t;
}
function S() {
  return console.log("https://sentinela-analytics.onrender.com"), "https://sentinela-analytics.onrender.com";
}
var i, d, s, l;
class I {
  constructor() {
    a(this, i);
    a(this, s);
    o(this, "endpoint");
    o(this, "domain");
    o(this, "userId");
  }
  start() {
    this.endpoint = S(), this.domain = document.currentScript.getAttribute("data-domain"), this.userId = f(), c(this, i, d).call(this);
  }
  async sendError(e) {
    e = {
      ...e,
      user_id: this.userId,
      date: (/* @__PURE__ */ new Date()).toISOString(),
      href: location.href,
      referrer: document.referrer || null,
      domain: this.domain
    };
    const n = `${this.endpoint}/errors`;
    return fetch(n, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...e })
    });
  }
}
i = new WeakSet(), d = function() {
  window.addEventListener("error", (e) => c(this, s, l).call(this, e));
}, s = new WeakSet(), l = async function(e) {
  const n = {
    message: e.error.message,
    stack: e.error.stack,
    filename: e.filename,
    lineno: e.lineno,
    colno: e.colno
  };
  try {
    await this.sendError(n);
  } catch (r) {
    console.error(r);
  }
};
((t, e) => {
  t.location;
  var r = t.document.querySelector('[src*="' + e + '"]');
  r && r.getAttribute("data-domain");
  const u = new I({
    apiDomain: e,
    host: e
  });
  t.Sentinela = u, t.Sentinela.start();
})(window, "http://localhost:3000");
