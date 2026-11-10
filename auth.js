/* Sign-in with Clerk (email link) and an authorized fetch helper, shared by the tracker and the coach dashboard. */
(function () {
  "use strict";
  function frontendApi(pk) {
    try { return atob(pk.replace(/^pk_(test|live)_/, "")).replace(/\$$/, ""); } catch (e) { return ""; }
  }
  function loadClerk(pk) {
    return new Promise(function (resolve, reject) {
      var host = frontendApi(pk);
      if (!host) { reject(new Error("Sign-in isn't set up yet.")); return; }
      var s = document.createElement("script");
      s.async = true; s.crossOrigin = "anonymous";
      s.setAttribute("data-clerk-publishable-key", pk);
      s.src = "https://" + host + "/npm/@clerk/clerk-js@5/dist/clerk.browser.js";
      s.onload = function () { window.Clerk.load().then(function () { resolve(window.Clerk); }, reject); };
      s.onerror = function () { reject(new Error("Couldn't load sign-in. Check your connection and reload.")); };
      document.head.appendChild(s);
    });
  }
  var clerk = null;
  window.SDP = {
    /* Resolves with the Clerk instance once someone is signed in. Shows the sign-in form in `mountEl` until then. */
    start: function (mountEl) {
      return fetch("/api/config").then(function (r) { return r.json(); }).then(function (cfg) {
        if (!cfg.publishableKey) throw new Error("Sign-in isn't set up yet. Add CLERK_PUBLISHABLE_KEY in Vercel.");
        return loadClerk(cfg.publishableKey);
      }).then(function (c) {
        clerk = c;
        if (c.user) return c;
        mountEl.hidden = false;
        c.mountSignIn(mountEl, { fallbackRedirectUrl: location.href, signUpFallbackRedirectUrl: location.href });
        return new Promise(function (resolve) {
          c.addListener(function (e) { if (e.user) { mountEl.hidden = true; try { c.unmountSignIn(mountEl); } catch (x) {} resolve(c); } });
        });
      });
    },
    api: function (path, opts) {
      opts = opts || {};
      return clerk.session.getToken().then(function (t) {
        var h = Object.assign({}, opts.headers || {}, { authorization: "Bearer " + t });
        if (opts.body && typeof opts.body === "string") h["content-type"] = "application/json";
        return fetch(path, Object.assign({}, opts, { headers: h }));
      }).then(function (r) {
        return r.json().catch(function () { return {}; }).then(function (j) {
          if (!r.ok) { var e = new Error(j.error || ("Request failed (" + r.status + ")")); e.status = r.status; throw e; }
          return j;
        });
      });
    },
    signOut: function () { return clerk.signOut().then(function () { location.reload(); }); },
    email: function () { return clerk && clerk.user && clerk.user.primaryEmailAddress ? clerk.user.primaryEmailAddress.emailAddress : ""; }
  };
})();
