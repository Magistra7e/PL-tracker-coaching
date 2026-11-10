import { json, authUser } from "./_lib.js";
import { getIndex, getProgram, getAssignments, cleanProgram, saveProgram, saveIndex, saveAssignments } from "./_programs.js";

async function coach(request) {
  const user = await authUser(request);
  if (!user) return [null, json({ error: "Sign in first." }, 401)];
  if (!user.isCoach) return [null, json({ error: "Coach access only." }, 403)];
  return [user, null];
}

/* List programs, or ?id= for one program. */
export async function GET(request) {
  const [, err] = await coach(request); if (err) return err;
  const id = new URL(request.url).searchParams.get("id");
  if (id) {
    const p = await getProgram(id);
    return p ? json({ program: p }) : json({ error: "Program not found." }, 404);
  }
  const [idx, asg] = await Promise.all([getIndex(), getAssignments()]);
  return json({ ...idx, assignments: asg });
}

/* Save an edited program. Body: {program} */
export async function PUT(request) {
  const [, err] = await coach(request); if (err) return err;
  const body = await request.json().catch(() => ({}));
  const p = body.program || {};
  const idx = await getIndex();
  if (!idx.programs.some((x) => x.id === p.id)) return json({ error: "Program not found." }, 404);
  try {
    const prog = cleanProgram(p, p.id);
    await saveProgram(prog);
    return json({ program: prog });
  } catch (e) { return json({ error: e.message }, 400); }
}

/* Actions: create (copy or blank), default, assign, delete. */
export async function POST(request) {
  const [, err] = await coach(request); if (err) return err;
  const b = await request.json().catch(() => ({}));
  const idx = await getIndex();
  if (b.action === "create") {
    let base = b.copyFrom ? await getProgram(b.copyFrom) : null;
    const weeks = Math.min(52, Math.max(1, parseInt(b.weeks, 10) || 12));
    if (!base) {
      const days = [{ k: "D1", n: "Day 1" }, { k: "D2", n: "Day 2" }, { k: "D3", n: "Day 3" }, { k: "D4", n: "Day 4" }];
      base = { days, weeks: Array.from({ length: weeks }, () => ({ notes: "", days: {} })) };
      base.weeks.forEach((w) => days.forEach((d) => { w.days[d.k] = { main: [], acc: [] }; }));
    }
    const id = "p" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    const prog = cleanProgram({ ...base, name: b.name || (base.name ? base.name + " (copy)" : "New program") }, id);
    await saveProgram(prog);
    return json({ program: prog });
  }
  if (b.action === "default") {
    if (!idx.programs.some((p) => p.id === b.id)) return json({ error: "Program not found." }, 404);
    idx.defaultId = b.id; await saveIndex(idx);
    return json({ ok: true });
  }
  if (b.action === "assign") {
    const asg = await getAssignments();
    if (!b.lifterId) return json({ error: "Pick a lifter." }, 400);
    if (b.programId && !idx.programs.some((p) => p.id === b.programId)) return json({ error: "Program not found." }, 404);
    if (b.programId) asg[b.lifterId] = b.programId; else delete asg[b.lifterId];
    await saveAssignments(asg);
    return json({ ok: true });
  }
  if (b.action === "delete") {
    if (b.id === idx.defaultId) return json({ error: "Make another program the default before deleting this one." }, 400);
    idx.programs = idx.programs.filter((p) => p.id !== b.id);
    await saveIndex(idx);
    const asg = await getAssignments();
    Object.keys(asg).forEach((k) => { if (asg[k] === b.id) delete asg[k]; });
    await saveAssignments(asg);
    return json({ ok: true });
  }
  return json({ error: "Unknown action." }, 400);
}
