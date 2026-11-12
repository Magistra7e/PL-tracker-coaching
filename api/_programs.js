/* Programs live in the private Blob store. Showdown is seeded from _program.js the first time. */
import { readJSON, writeJSON, safeId } from "./_lib.js";
import { PROGRAM } from "./_program.js";
/* Coach's 4-week Conditioning and Strength blocks, added once each so she can edit or delete them. */
import { BLOCKS } from "./_blocks.js";

const INDEX = "programs/index.json";
const ASSIGN = "programs/assignments.json";
export const DAYS = [
  { k: "LL", n: "Light Lower" }, { k: "HU", n: "Heavy Upper" },
  { k: "HL", n: "Heavy Lower" }, { k: "LU", n: "Light Upper" },
];

function showdownProgram() {
  const weeks = [];
  for (let w = 1; w <= 12; w++) {
    const days = {};
    DAYS.forEach(({ k }) => {
      days[k] = {
        main: (PROGRAM.main[w][k] || []).map((l) => ({ ...l })),
        acc: (PROGRAM.origW[w][k] || []).map(([n, sets]) => [n, sets.slice()]),
      };
    });
    weeks.push({ notes: PROGRAM.notes[w] || "", days });
  }
  return { id: "showdown", name: "Showdown Prep", days: DAYS, weeks, updatedAt: new Date().toISOString() };
}

export async function getIndex() {
  let idx = await readJSON(INDEX);
  if (!idx) {
    const p = showdownProgram();
    await writeJSON(`programs/${p.id}.json`, p);
    idx = { defaultId: p.id, programs: [{ id: p.id, name: p.name, updatedAt: p.updatedAt }], seeded: ["showdown"] };
    await writeJSON(INDEX, idx);
  }
  idx.seeded = idx.seeded || ["showdown"];
  let changed = false;
  for (const id of ["conditioning", "strength"]) {
    if (idx.seeded.includes(id)) continue;
    const p = { ...BLOCKS[id], updatedAt: new Date().toISOString() };
    if (!idx.programs.some((x) => x.id === id)) {
      await writeJSON(`programs/${id}.json`, p);
      idx.programs.push({ id, name: p.name, updatedAt: p.updatedAt });
    }
    idx.seeded.push(id); changed = true;
  }
  if (changed) await writeJSON(INDEX, idx);
  return idx;
}
export async function getProgram(id) {
  await getIndex();
  return readJSON(`programs/${safeId(id)}.json`);
}
export async function getAssignments() { return (await readJSON(ASSIGN)) || {}; }

export async function programIdFor(lifterId) {
  const [idx, asg] = await Promise.all([getIndex(), getAssignments()]);
  const pid = asg[lifterId];
  return pid && idx.programs.some((p) => p.id === pid) ? pid : idx.defaultId;
}

/* Validates and normalizes a program sent from the editor. */
export function cleanProgram(p, id) {
  const str = (v, n = 120) => String(v == null ? "" : v).slice(0, n);
  const days = (Array.isArray(p.days) && p.days.length ? p.days : DAYS).slice(0, 7).map((d, i) => ({
    k: safeId(d.k || "D" + (i + 1)).slice(0, 8) || "D" + (i + 1), n: str(d.n || "Day " + (i + 1), 40),
  }));
  const weeks = (Array.isArray(p.weeks) ? p.weeks : []).slice(0, 52).map((wk) => {
    const out = { notes: str(wk && wk.notes, 1000), days: {} };
    days.forEach(({ k }) => {
      const d = (wk && wk.days && wk.days[k]) || {};
      out.days[k] = {
        main: (Array.isArray(d.main) ? d.main : []).slice(0, 12).map((l) => ({
          lift: str(l.lift, 60), bar: str(l.bar, 40), pct: str(l.pct, 20), bands: str(l.bands, 30), reps: str(l.reps, 30),
        })).filter((l) => l.lift),
        acc: (Array.isArray(d.acc) ? d.acc : []).slice(0, 20).map((a) => [
          str(a[0], 60), (Array.isArray(a[1]) ? a[1] : []).slice(0, 10).map((r) => str(r, 12)).filter(Boolean),
        ]).filter((a) => a[0] && a[1].length),
      };
    });
    return out;
  });
  if (!weeks.length) throw new Error("A program needs at least one week.");
  return { id, name: str(p.name || "Untitled program", 60), days, weeks, updatedAt: new Date().toISOString() };
}

export async function saveProgram(prog) {
  const idx = await getIndex();
  await writeJSON(`programs/${prog.id}.json`, prog);
  const row = { id: prog.id, name: prog.name, updatedAt: prog.updatedAt };
  const i = idx.programs.findIndex((p) => p.id === prog.id);
  if (i >= 0) idx.programs[i] = row; else idx.programs.push(row);
  await writeJSON(INDEX, idx);
  return idx;
}
export async function saveIndex(idx) { await writeJSON(INDEX, idx); }
export async function saveAssignments(a) { await writeJSON(ASSIGN, a); }
