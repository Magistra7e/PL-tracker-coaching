/* Weight helpers: unit conversion, % suggestions from SBD maxes, and a competition-loaded bar drawing. */
(function () {
  "use strict";
  var KG_PER_LB = 0.45359237;
  /* IPF competition plates (kg), with their standard colors. */
  var ALL = [
    { kg: 25, c: "#d6202f", h: 1, w: 14 }, { kg: 20, c: "#1f5fbf", h: 1, w: 13 },
    { kg: 15, c: "#f2c230", h: 0.92, w: 12 }, { kg: 10, c: "#2e9e48", h: 0.82, w: 11 },
    { kg: 5, c: "#f4f4f4", h: 0.62, w: 9 }, { kg: 2.5, c: "#222222", h: 0.5, w: 7 },
    { kg: 1.25, c: "#b8bcc2", h: 0.42, w: 6 }, { kg: 0.5, c: "#b8bcc2", h: 0.34, w: 5 }, { kg: 0.25, c: "#b8bcc2", h: 0.3, w: 4 }
  ];
  var PLATES = ALL.slice(), BAR = 20, COLLARS = 5, STEP = 2.5; /* 20 kg bar + two 2.5 kg competition collars */
  /* Coach's setup: {barKg, collarKg (each), plates:[kg sizes available]}. */
  function configure(cfg) {
    if (!cfg) return;
    BAR = cfg.barKg > 0 ? +cfg.barKg : 20;
    COLLARS = cfg.collarKg >= 0 ? 2 * cfg.collarKg : 5;
    var have = Array.isArray(cfg.plates) && cfg.plates.length ? cfg.plates.map(Number) : ALL.map(function (p) { return p.kg; });
    PLATES = ALL.filter(function (p) { return have.indexOf(p.kg) >= 0; });
    STEP = PLATES.length ? Math.max(2.5, 2 * PLATES[PLATES.length - 1].kg) : 2.5; /* competition attempts move in 2.5 kg steps */
  }

  function toKg(v, unit) { return unit === "kg" ? v : v * KG_PER_LB; }
  function fromKg(kg, unit) { return unit === "kg" ? kg : kg / KG_PER_LB; }
  function roundTo(v, step) { return Math.round(v / step) * step; }
  function fmt(v) { return (Math.round(v * 100) / 100).toString(); }
  /* Rounds to what can actually be loaded: 2.5 kg steps, or 5 lb steps. */
  function loadable(v, unit) { return roundTo(v, unit === "kg" ? STEP : 5); }

  /* "75%" -> {lo:75}, "80–85%" -> {lo:80,hi:85}, "100+%" -> {lo:100,plus:true}. Anything else -> null. */
  function parsePct(s) {
    var m = String(s || "").replace(/\s/g, "").match(/^(\d+(?:\.\d+)?)(?:[-–](\d+(?:\.\d+)?))?(\+)?%?$/);
    if (!m) return null;
    var lo = parseFloat(m[1]); if (!(lo > 0 && lo <= 150)) return null;
    return { lo: lo, hi: m[2] ? parseFloat(m[2]) : null, plus: !!m[3] };
  }
  function liftKind(name) {
    var n = String(name || "").toLowerCase();
    if (/squat/.test(n)) return "squat";
    if (/bench/.test(n)) return "bench";
    if (/dead|\bdl\b/.test(n)) return "deadlift";
    return null;
  }
  /* Suggested working weight for a main lift, in the lifter's unit. */
  function suggest(lift, profile) {
    if (!profile || !profile.maxes) return null;
    var kind = liftKind(lift.lift), max = kind && profile.maxes[kind], pct = parsePct(lift.pct);
    if (!max || !pct) return null;
    var unit = profile.unit === "kg" ? "kg" : "lb";
    var lo = loadable(max * pct.lo / 100, unit), hi = pct.hi ? loadable(max * pct.hi / 100, unit) : null;
    return { kind: kind, unit: unit, lo: lo, hi: hi, plus: pct.plus, bands: lift.bands && !/^nb$/i.test(lift.bands) ? lift.bands : "" };
  }
  function label(v, unit) {
    var other = unit === "kg" ? fmt(roundTo(fromKg(v, "lb"), 1)) + " lb" : fmt(roundTo(toKg(v, "lb"), 0.5)) + " kg";
    return fmt(v) + " " + unit + " (" + other + ")";
  }
  /* Plates per side for a total in kg, competition style (bar + collars). */
  function perSide(totalKg) {
    var side = (totalKg - BAR - COLLARS) / 2, out = [];
    if (side < 0) return null;
    PLATES.forEach(function (p) { while (side >= p.kg - 1e-9) { out.push(p); side = Math.round((side - p.kg) * 100) / 100; } });
    out.left = side;
    return out;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  /* SVG of a loaded competition bar for a total in kg. */
  function barSVG(totalKg, from) {
    var kg = loadable(totalKg, "kg"), side = perSide(kg);
    if (!side) return '<p class="sub">' + fmt(kg) + ' kg is lighter than the bar' + (COLLARS ? ' with collars' : '') + ' (' + fmt(BAR + COLLARS) + ' kg).</p>';
    var W = 460, H = 92, mid = W / 2, sleeve = 100, x, s = "";
    s += '<rect x="8" y="' + (H / 2 - 3) + '" width="' + (W - 16) + '" height="6" rx="3" fill="#8a9099"/>';
    function drawSide(dir) {
      x = mid + dir * sleeve;
      s += '<rect x="' + (dir > 0 ? x - 4 : x) + '" y="' + (H / 2 - 9) + '" width="4" height="18" rx="1" fill="#5d6672"/>';
      side.forEach(function (p) {
        var h = (H - 10) * p.h, px = dir > 0 ? x : x - p.w;
        s += '<rect x="' + px + '" y="' + (H - h) / 2 + '" width="' + p.w + '" height="' + h + '" rx="2" fill="' + p.c + '" stroke="#00000055" stroke-width="1"/>';
        x += dir * (p.w + 1);
      });
      if (COLLARS) { var cx = dir > 0 ? x : x - 6;
      s += '<rect x="' + cx + '" y="' + (H / 2 - 11) + '" width="6" height="22" rx="1" fill="#9aa3af"/>'; }
    }
    drawSide(1); drawSide(-1);
    var names = side.map(function (p) { return fmt(p.kg); });
    return '<figure class="bar"><svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(fmt(kg) + " kg loaded: " + (names.length ? names.join(", ") + " kg per side" : "empty bar") + (COLLARS ? " plus collars" : "")) + '">' + s + '</svg>' +
      '<figcaption>' + (from ? esc(from) + ' ≈ ' : '') + '<b>' + fmt(kg) + ' kg</b> · per side: ' + (names.length ? names.join(" · ") : "nothing") + (COLLARS ? ' + collar' : '') + (side.left > 0.001 ? ' · ' + fmt(side.left) + ' kg per side can\'t be loaded with these plates' : '') + '</figcaption></figure>';
  }
  /* DOTS score. Coefficients from the DOTS formula used by OpenPowerlifting. */
  var DOTS = {
    M: [-307.75076, 24.0900756, -0.1918759221, 0.0007391293, -0.000001093],
    F: [-57.96288, 13.6175032, -0.1126655495, 0.0005158568, -0.0000010706]
  };
  function dots(totalKg, bwKg, sex) {
    var c = DOTS[sex === "M" ? "M" : "F"];
    if (!(totalKg > 0) || !(bwKg > 0)) return null;
    var bw = Math.min(Math.max(bwKg, 40), sex === "M" ? 210 : 150);
    var den = c[0] + c[1] * bw + c[2] * bw * bw + c[3] * Math.pow(bw, 3) + c[4] * Math.pow(bw, 4);
    return Math.round(totalKg * 500 / den * 100) / 100;
  }
  /* Starting attempts from a max in kg: about 90%, 95%, 100%, in 2.5 kg steps. */
  function attempts(maxKg) {
    if (!(maxKg > 0)) return null;
    return [0.9, 0.95, 1].map(function (p) { return Math.floor(maxKg * p / 2.5) * 2.5; });
  }
  window.Plates = { dots: dots, attempts: attempts, configure: configure, ALL: ALL.map(function (p) { return p.kg; }), toKg: toKg, fromKg: fromKg, loadable: loadable, suggest: suggest, label: label, barSVG: barSVG, fmt: fmt, liftKind: liftKind };
})();
