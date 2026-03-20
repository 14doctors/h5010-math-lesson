import { useState, useEffect, useRef } from "react";

const fmt = n => "$" + Math.round(n).toLocaleString();
const SAL = 73655;

const STEPS = [
  { title: "Welcome", icon: "🎓" },
  { title: "Percentages", icon: "📊" },
  { title: "The Split", icon: "✂️" },
  { title: "The Variable", icon: "🎲" },
  { title: "The Formulas", icon: "🔧" },
  { title: "Pay Timeline", icon: "📅" },
  { title: "Who Earns More?", icon: "⚖️" },
  { title: "The Discovery", icon: "💡" },
  { title: "Two Kinds", icon: "📊" },
  { title: "Big Picture", icon: "🌍" },
];

// ─── Shared mobile components ────────────────────────────────────────
const mono = "'Courier New', monospace";

function Slider({ label, value, onChange, min, max, step = 1, color = "#4ade80", display }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
        <span style={{ fontSize: "14px", fontWeight: 600 }}>{label}</span>
        <span style={{ fontSize: "18px", fontWeight: 800, color, fontFamily: mono }}>{display || value}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(+e.target.value)}
        style={{ width: "100%", accentColor: color, height: "6px" }} />
    </div>
  );
}

function Card({ children, bg = "#fff", border = "#e5e7eb", style: s = {} }) {
  return <div style={{ padding: "20px", borderRadius: "16px", background: bg, border: `1px solid ${border}`, marginBottom: "16px", ...s }}>{children}</div>;
}

function DarkCard({ children, style: s = {} }) {
  return <div style={{ padding: "20px", borderRadius: "16px", background: "#0f172a", color: "#e2e8f0", marginBottom: "16px", ...s }}>{children}</div>;
}

function ChalkCard({ children }) {
  return <div style={{ padding: "20px", borderRadius: "16px", background: "#1a3328", border: "2px solid #5a3e28", color: "#e8e0d0", marginBottom: "16px" }}>{children}</div>;
}

function Formula({ children }) {
  return <pre style={{ fontFamily: mono, fontSize: "14px", padding: "16px", borderRadius: "12px", background: "#0f1923", color: "#4ade80", border: "1px solid #166534", margin: "12px 0", lineHeight: 1.9, whiteSpace: "pre-wrap", overflowX: "auto" }}>{children}</pre>;
}

function Tip({ children }) {
  return <div style={{ background: "#fef3c7", border: "1px solid #f59e0b", borderRadius: "12px", padding: "14px 16px", margin: "12px 0", fontSize: "13px", color: "#92400e", lineHeight: 1.6 }}>🍎 <strong>Teacher Note:</strong> {children}</div>;
}

function Think({ q, a }) {
  const [show, setShow] = useState(false);
  return (
    <div style={{ background: "#eef2ff", border: "2px dashed #818cf8", borderRadius: "14px", padding: "16px", margin: "16px 0" }}>
      <div style={{ fontSize: "15px", fontWeight: 700, color: "#4338ca", marginBottom: "6px" }}>🤔 Think About It</div>
      <div style={{ fontSize: "14px", color: "#312e81", marginBottom: "12px", lineHeight: 1.6 }}>{q}</div>
      <button onClick={() => setShow(!show)} style={{
        padding: "10px 20px", borderRadius: "10px", border: "none", cursor: "pointer",
        background: show ? "#4338ca" : "#c7d2fe", color: show ? "#fff" : "#4338ca",
        fontSize: "14px", fontWeight: 700, width: "100%"
      }}>{show ? "Hide Answer" : "Tap to Reveal"}</button>
      {show && <div style={{ marginTop: "12px", fontSize: "14px", color: "#312e81", padding: "12px", background: "#c7d2fe", borderRadius: "10px", lineHeight: 1.6 }}>{a}</div>}
    </div>
  );
}

function BarViz({ value, max, color, label }) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  return (
    <div style={{ marginBottom: "8px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "4px" }}>
        <span>{label}</span>
        <span style={{ fontWeight: 700, fontFamily: mono }}>{fmt(value)}</span>
      </div>
      <div style={{ height: "24px", background: "rgba(255,255,255,0.1)", borderRadius: "12px", overflow: "hidden" }}>
        <div style={{ height: "100%", width: pct + "%", background: color, borderRadius: "12px", transition: "width 0.3s ease" }} />
      </div>
    </div>
  );
}

// ─── STEP COMPONENTS ─────────────────────────────────────────────────

function S0() {
  return <>
    <DarkCard style={{ background: "linear-gradient(135deg, #1e3a5f, #2d6a4f)", textAlign: "center", padding: "32px 20px" }}>
      <div style={{ fontSize: "56px", marginBottom: "12px" }}>🏛️📐</div>
      <div style={{ fontSize: "24px", fontWeight: 800, marginBottom: "10px" }}>When Laws Need Math</div>
      <div style={{ fontSize: "15px", opacity: 0.9, lineHeight: 1.7 }}>
        In 2025, Massachusetts citizens wrote a law to change how legislators get paid. The law uses percentages, formulas, and variables — and buried inside the math is a surprise that nobody caught until someone did the algebra.
      </div>
    </DarkCard>
    <Card>
      <div style={{ fontSize: "16px", fontWeight: 700, marginBottom: "12px" }}>Today you'll learn:</div>
      {[
        ["📊", "Calculate percentages of real salaries"],
        ["✂️", "What happens when you split a payment in half"],
        ["🎲", "How a variable changes what people earn"],
        ["⚖️", "Compare two formulas with inequalities"],
        ["💡", "What it means when algebra gives an impossible answer"],
        ["📊", "Two different kinds of math functions — and which is fairer"],
      ].map(([icon, text], i) => (
        <div key={i} style={{ display: "flex", gap: "10px", padding: "8px 0", borderBottom: i < 4 ? "1px solid #f3f4f6" : "none" }}>
          <span style={{ fontSize: "20px" }}>{icon}</span>
          <span style={{ fontSize: "14px", lineHeight: 1.5 }}>{text}</span>
        </div>
      ))}
    </Card>
  </>;
}

function S1() {
  const [base, setBase] = useState(SAL);
  const groups = [
    { name: "Group 1 — Speaker", pct: 0.75, emoji: "👑", color: "#ef4444" },
    { name: "Group 2 — Budget Chair", pct: 0.50, emoji: "💼", color: "#f59e0b" },
    { name: "Group 3 — Asst. Leader", pct: 0.33, emoji: "🤝", color: "#06b6d4" },
    { name: "Committee Member", pct: 0.20, emoji: "📋", color: "#a855f7" },
  ];
  return <>
    <Card>
      <div style={{ fontSize: "15px", lineHeight: 1.7 }}>Every MA legislator earns a <strong>base salary</strong> of {fmt(SAL)}/year. The law gives certain legislators a <strong>bonus</strong> — a percentage of that base.</div>
    </Card>
    <ChalkCard>
      <Slider label="Base Salary" value={base} onChange={setBase} min={50000} max={100000} step={1000} display={fmt(base)} color="#4ade80" />
      {groups.map((g, i) => (
        <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", borderRadius: "10px", background: "rgba(255,255,255,0.06)", marginBottom: "8px" }}>
          <div>
            <div style={{ fontSize: "14px", fontWeight: 700, color: g.color }}>{g.emoji} {g.name}</div>
            <div style={{ fontSize: "12px", opacity: 0.6 }}>{fmt(base)} × {(g.pct * 100)}%</div>
          </div>
          <div style={{ fontSize: "20px", fontWeight: 800, color: g.color, fontFamily: mono }}>{fmt(base * g.pct)}</div>
        </div>
      ))}
    </ChalkCard>
    <Formula>{"Bonus = Base × Rate\n\nExample:\n$73,655 × 0.75 = $55,241"}</Formula>
    <Tip>Key concept: multiplying by a decimal &lt; 1 gives a fraction. 75% = 0.75 = ¾. Ask: "If you earned {fmt(base)}, what's 75% of that?"</Tip>
  </>;
}

function S2() {
  const bonus = SAL * 0.33;
  const half = bonus / 2;
  return <>
    <Card>
      <div style={{ fontSize: "15px", lineHeight: 1.7, marginBottom: "16px" }}>The law doesn't hand over the full bonus. For <strong>leaders</strong>, it splits it in half:</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        <div style={{ padding: "16px", background: "#dcfce7", borderRadius: "14px", textAlign: "center" }}>
          <div style={{ fontSize: "24px" }}>✅</div>
          <div style={{ fontSize: "13px", fontWeight: 700, color: "#166534" }}>First Half</div>
          <div style={{ fontSize: "22px", fontWeight: 800, color: "#15803d", fontFamily: mono }}>{fmt(half)}</div>
          <div style={{ fontSize: "11px", color: "#166534" }}>Paid every 2 weeks</div>
          <div style={{ fontSize: "11px", color: "#166534", fontWeight: 700 }}>GUARANTEED</div>
        </div>
        <div style={{ padding: "16px", background: "#fef9c3", borderRadius: "14px", textAlign: "center" }}>
          <div style={{ fontSize: "24px" }}>⏳</div>
          <div style={{ fontSize: "13px", fontWeight: 700, color: "#854d0e" }}>Second Half</div>
          <div style={{ fontSize: "22px", fontWeight: 800, color: "#a16207", fontFamily: mono }}>{fmt(half)}</div>
          <div style={{ fontSize: "11px", color: "#854d0e" }}>Held until December</div>
          <div style={{ fontSize: "11px", color: "#854d0e", fontWeight: 700 }}>DEPENDS ON C</div>
        </div>
      </div>
      <div style={{ fontSize: "12px", color: "#78716c", marginTop: "10px", textAlign: "center" }}>Group 3 example: {fmt(SAL)} × 33% = {fmt(bonus)}</div>
    </Card>
    <Formula>{"Guaranteed = Base × Rate × 0.50\nHeld back  = Base × Rate × 0.50 × ???\n\nWhat's the ???  That's next..."}</Formula>
    <Think q="If the Speaker (75% bonus = $55,241) gets the same split, how much is guaranteed vs. held back?" a={`$55,241 ÷ 2 = $27,621 each half. Math: $73,655 × 0.75 × 0.50 = $27,621`} />
  </>;
}

function S3() {
  const [elig, setElig] = useState(20);
  const [comp, setComp] = useState(14);
  const C = elig > 0 ? comp / elig : 0;
  const held = SAL * 0.75 * 0.50;
  const released = held * C;
  return <>
    <Card>
      <div style={{ fontSize: "15px", lineHeight: 1.7 }}>The held-back half gets <strong>multiplied by a number between 0 and 1</strong> based on how many committees did their work. This number is the <strong>compliance percentage (C)</strong>.</div>
    </Card>
    <ChalkCard>
      <Slider label="Eligible committees" value={elig} onChange={v => { setElig(v); if (comp > v) setComp(v); }} min={1} max={30} color="#06b6d4" display={elig} />
      <Slider label="Committees that passed" value={comp} onChange={setComp} min={0} max={elig} color="#4ade80" display={`${comp} / ${elig}`} />
      <div style={{ textAlign: "center", margin: "16px 0" }}>
        <div style={{ fontSize: "13px", opacity: 0.7 }}>C = {comp} ÷ {elig}</div>
        <div style={{ fontSize: "56px", fontWeight: 800, color: C >= 0.8 ? "#4ade80" : C >= 0.5 ? "#fbbf24" : "#ef4444" }}>
          {(C * 100).toFixed(0)}%
        </div>
      </div>
      <div style={{ height: "28px", background: "rgba(255,255,255,0.1)", borderRadius: "14px", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${C * 100}%`, background: C >= 0.8 ? "#4ade80" : C >= 0.5 ? "#fbbf24" : "#ef4444", borderRadius: "14px", transition: "width 0.3s", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: "12px", fontWeight: 800, color: "#000" }}>{comp}/{elig}</span>
        </div>
      </div>
      <div style={{ marginTop: "16px", padding: "12px", background: "rgba(255,255,255,0.06)", borderRadius: "10px", textAlign: "center" }}>
        <div style={{ fontSize: "13px", opacity: 0.7 }}>Speaker's held-back: {fmt(held)}</div>
        <div style={{ fontSize: "13px", opacity: 0.7 }}>× C = × {C.toFixed(2)}</div>
        <div style={{ fontSize: "22px", fontWeight: 800, color: "#4ade80" }}>Released: {fmt(released)}</div>
        <div style={{ fontSize: "13px", color: "#ef4444" }}>Lost: {fmt(held - released)}</div>
      </div>
    </ChalkCard>
    <Formula>{"C = passed ÷ total\n\nReleased = Base × Rate × 0.50 × C\n\nC is always between 0 and 1\n• C = 0 → lose all held-back pay\n• C = 1 → get it all back"}</Formula>
    <Tip>Ask: "Can C ever be greater than 1?" No — more committees can't pass than exist. That ceiling becomes critical in Step 7.</Tip>
  </>;
}

function S4() {
  const [C, setC] = useState(0.80);
  const rows = [
    { name: "Speaker (G1)", rate: 0.75, color: "#ef4444", holdback: true },
    { name: "Asst. Leader (G3)", rate: 0.33, color: "#06b6d4", holdback: true },
    { name: "Committee Member", rate: 0.20, color: "#a855f7", holdback: false },
  ];
  return <>
    <Card>
      <div style={{ fontSize: "15px", lineHeight: 1.7 }}>Two different formulas depending on your role:</div>
    </Card>
    <Formula>{"LEADERS (Groups 1–4):\nTotal = Base × Rate × (0.50 + 0.50 × C)\n\nCOMMITTEE MEMBERS:\nTotal = Base × Rate\n        ↑ no C — always the same!"}</Formula>
    <ChalkCard>
      <Slider label="Compliance %" value={C} onChange={setC} min={0} max={1} step={0.05} color="#4ade80" display={(C * 100).toFixed(0) + "%"} />
      {rows.map((r, i) => {
        const total = r.holdback ? SAL * r.rate * (0.50 + 0.50 * C) : SAL * r.rate;
        const max = SAL * r.rate;
        return (
          <div key={i} style={{ padding: "14px", borderRadius: "12px", background: "rgba(255,255,255,0.06)", marginBottom: "10px", borderLeft: `4px solid ${r.color}` }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontWeight: 700, color: r.color }}>{r.name}</span>
              <span style={{ fontSize: "20px", fontWeight: 800, fontFamily: mono }}>{fmt(total)}</span>
            </div>
            {r.holdback
              ? <div style={{ fontSize: "12px", opacity: 0.6, marginTop: "4px" }}>= {fmt(SAL)} × {r.rate} × (0.50 + 0.50 × {C.toFixed(2)})</div>
              : <div style={{ fontSize: "12px", color: "#fbbf24", marginTop: "4px" }}>⭐ Same amount no matter what C is!</div>
            }
          </div>
        );
      })}
    </ChalkCard>
    <Card bg="#fef2f2" border="#fecaca">
      <div style={{ fontSize: "14px", color: "#dc2626", fontWeight: 700 }}>👀 Notice something?</div>
      <div style={{ fontSize: "14px", color: "#991b1b", lineHeight: 1.6, marginTop: "4px" }}>The committee member's pay doesn't change when you move the slider. Leaders' pay does. This difference is the key to our discovery...</div>
    </Card>
  </>;
}

function S5() {
  const events = [
    { mo: "JAN", icon: "🏛️", title: "Session starts", desc: "Bills start flowing to committees", color: "#6366f1" },
    { mo: "MAR", icon: "📋", title: "Eligibility locked", desc: "Committees with >50 bills = \"eligible\"", color: "#06b6d4" },
    { mo: "ALL YEAR", icon: "💰", title: "Biweekly paychecks", desc: "Leaders get guaranteed 50%. Members get 100%.", color: "#4ade80" },
    { mo: "NOV", icon: "⏰", title: "Bill cutoff", desc: "All bills must have had hearings + markups", color: "#f59e0b" },
    { mo: "DEC", icon: "📊", title: "Clerks calculate C", desc: "Count compliant committees, compute %", color: "#ef4444" },
    { mo: "DEC", icon: "🎁", title: "Holdback released", desc: "Leaders get remaining 50% × C", color: "#a855f7" },
  ];
  return <>
    <Card>
      <div style={{ fontSize: "15px", fontWeight: 700, marginBottom: "12px" }}>When does the money flow?</div>
    </Card>
    <DarkCard>
      {events.map((ev, i) => (
        <div key={i} style={{ display: "flex", gap: "12px", padding: "12px 0", borderBottom: i < events.length - 1 ? "1px solid #1e293b" : "none" }}>
          <div style={{ fontSize: "28px", width: "36px", textAlign: "center", flexShrink: 0 }}>{ev.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "11px", color: ev.color, fontWeight: 700, letterSpacing: "0.08em" }}>{ev.mo}</div>
            <div style={{ fontSize: "15px", fontWeight: 700, marginTop: "2px" }}>{ev.title}</div>
            <div style={{ fontSize: "13px", opacity: 0.6, marginTop: "2px" }}>{ev.desc}</div>
          </div>
        </div>
      ))}
    </DarkCard>
    <Formula>{"Biweekly check (26/year):\n  Leader  = (Base × Rate × 0.50) ÷ 26\n  Member  = (Base × Rate) ÷ 26\n\nDecember lump sum (leaders only):\n  = Base × Rate × 0.50 × C"}</Formula>
  </>;
}

function S6() {
  const [C, setC] = useState(0.80);
  const alex = SAL * 0.20;
  const jordanHB = SAL * 0.33 * 0.50 * C;
  const jordanTotal = SAL * 0.33 * (0.50 + 0.50 * C);
  return <>
    <Card>
      <div style={{ fontSize: "15px", fontWeight: 700, marginBottom: "12px" }}>Meet Alex & Jordan</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        <div style={{ padding: "14px", background: "#f3e8ff", borderRadius: "14px", textAlign: "center" }}>
          <div style={{ fontSize: "28px" }}>👤</div>
          <div style={{ fontSize: "15px", fontWeight: 800, color: "#7c3aed" }}>Alex</div>
          <div style={{ fontSize: "11px", color: "#6d28d9" }}>Committee member</div>
          <div style={{ fontSize: "11px", color: "#6d28d9" }}>20% bonus, NO holdback</div>
          <div style={{ fontSize: "18px", fontWeight: 800, color: "#7c3aed", fontFamily: mono, marginTop: "6px" }}>{fmt(alex)}</div>
          <div style={{ fontSize: "10px", color: "#6d28d9" }}>Always the same</div>
        </div>
        <div style={{ padding: "14px", background: "#e0f2fe", borderRadius: "14px", textAlign: "center" }}>
          <div style={{ fontSize: "28px" }}>👤</div>
          <div style={{ fontSize: "15px", fontWeight: 800, color: "#0891b2" }}>Jordan</div>
          <div style={{ fontSize: "11px", color: "#0e7490" }}>Asst. Leader (Group 3)</div>
          <div style={{ fontSize: "11px", color: "#0e7490" }}>33% bonus, WITH holdback</div>
          <div style={{ fontSize: "18px", fontWeight: 800, color: "#0891b2", fontFamily: mono, marginTop: "6px" }}>{fmt(jordanTotal)}</div>
          <div style={{ fontSize: "10px", color: "#0e7490" }}>Changes with C</div>
        </div>
      </div>
    </Card>
    <ChalkCard>
      <Slider label="Compliance %" value={C} onChange={setC} min={0} max={1} step={0.01} color="#06b6d4" display={(C * 100).toFixed(0) + "%"} />
      <div style={{ textAlign: "center", padding: "16px 0" }}>
        <div style={{ fontSize: "13px", opacity: 0.7, marginBottom: "6px" }}>Alex's bonus vs. Jordan's holdback portion:</div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "12px" }}>
          <div style={{ fontSize: "22px", fontWeight: 800, color: "#a855f7", fontFamily: mono }}>{fmt(alex)}</div>
          <div style={{ fontSize: "24px", fontWeight: 800, color: alex > jordanHB ? "#ef4444" : "#4ade80" }}>{alex > jordanHB ? ">" : "="}</div>
          <div style={{ fontSize: "22px", fontWeight: 800, color: "#06b6d4", fontFamily: mono }}>{fmt(jordanHB)}</div>
        </div>
        {alex > jordanHB && (
          <div style={{ marginTop: "12px", padding: "10px", background: "#ef4444", borderRadius: "10px", fontSize: "13px", fontWeight: 700 }}>
            🚨 Alex's guaranteed bonus beats Jordan's performance-dependent holdback!
          </div>
        )}
      </div>
    </ChalkCard>
    <Think
      q="Slide C all the way to 100%. Does Jordan's holdback EVER exceed Alex's bonus?"
      a={`No! Even at C = 1.0: Jordan's holdback = $73,655 × 0.33 × 0.50 × 1.0 = $12,153. Alex's bonus = $73,655 × 0.20 = $14,731. Alex always wins. The maximum holdback is permanently less than the guaranteed bonus.`}
    />
  </>;
}

function S7() {
  const [step, setStep] = useState(0);
  const algebra = [
    { btn: "Set up", math: "When are they equal?\n\nAlex's bonus = Jordan's holdback\n\nBase × 0.20 = Base × 0.33 × 0.50 × C" },
    { btn: "Simplify", math: "Base cancels (it's on both sides):\n\n0.20 = 0.33 × 0.50 × C\n\n0.20 = 0.165 × C" },
    { btn: "Solve", math: "Divide both sides by 0.165:\n\nC = 0.20 ÷ 0.165\n\nC = 1.212..." },
    { btn: "🤯 What?!", math: "C = 1.21 means you'd need\n121% compliance!\n\nBut C can NEVER exceed 1.0\n(100% is the max)\n\n→ There is NO crossover\n→ Alex ALWAYS wins\n→ The inversion is PERMANENT" },
  ];
  return <>
    <DarkCard style={{ background: "linear-gradient(135deg, #1e1b4b, #312e81)", textAlign: "center", padding: "28px 20px" }}>
      <div style={{ fontSize: "48px" }}>💡</div>
      <div style={{ fontSize: "22px", fontWeight: 800, color: "#e0e7ff" }}>The Algebra Reveals What the Words Hid</div>
    </DarkCard>
    <ChalkCard>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "6px", marginBottom: "16px" }}>
        {algebra.map((a, i) => (
          <button key={i} onClick={() => setStep(i)} style={{
            padding: "10px 4px", borderRadius: "8px", border: "none", cursor: "pointer",
            background: step === i ? "#4ade80" : "rgba(255,255,255,0.1)",
            color: step === i ? "#000" : "#e8e0d0",
            fontSize: "12px", fontWeight: 700
          }}>{a.btn}</button>
        ))}
      </div>
      <Formula>{algebra[step].math}</Formula>
      {step === 3 && (
        <div style={{ padding: "14px", background: "rgba(239,68,68,0.15)", borderRadius: "12px", border: "1px solid #ef4444", marginTop: "12px" }}>
          <div style={{ fontSize: "14px", fontWeight: 800, color: "#ef4444" }}>🎯 Absurd-Result Crossover Point</div>
          <div style={{ fontSize: "13px", color: "#fca5a5", lineHeight: 1.7, marginTop: "6px" }}>
            When algebra gives an answer <strong>outside the possible range</strong>, it means the condition is <em>impossible</em>. C can't be 1.21, so the equation has no solution. Alex's guaranteed bonus will <em>always</em> exceed Jordan's performance-dependent holdback.
          </div>
        </div>
      )}
    </ChalkCard>
    <Card bg="#fef2f2" border="#fecaca">
      <div style={{ fontSize: "14px", fontWeight: 700, color: "#dc2626" }}>Bonus: The Deeper Crossover</div>
      <div style={{ fontSize: "13px", color: "#991b1b", lineHeight: 1.6, marginTop: "6px" }}>
        Compare Alex's bonus to Jordan's <em>entire</em> stipend:
      </div>
      <Formula>{"0.20 = 0.33 × (0.50 + 0.50 × C)\n0.606 = 0.50 + 0.50 × C\nC = 0.212 ≈ 21%\n\nBelow 21% compliance, Alex earns\nmore than Jordan's ENTIRE stipend."}</Formula>
    </Card>
    <Tip>This is the most powerful moment. The math found something the law's authors missed — a permanent structural flaw. Ask: "What would you change to fix it?"</Tip>
  </>;
}

function S8() {
  const [bills, setBills] = useState(75);
  const C = bills / 100;
  const isCompliant = bills === 100;

  const g3Guaranteed = SAL * 0.33 * 0.50;
  const g3Holdback   = SAL * 0.33 * 0.50 * C;
  const g3Total      = g3Guaranteed + g3Holdback;

  const g4Guaranteed = SAL * 0.33 * 0.50;
  const g4Holdback   = isCompliant ? SAL * 0.33 * 0.50 : 0;
  const g4Total      = g4Guaranteed + g4Holdback;

  const pctReleased = n => Math.round(n / (SAL * 0.33 * 0.50) * 100) + "%";

  return <>
    <DarkCard style={{ background: "linear-gradient(135deg, #1e1b4b, #0f172a)", padding: "28px 20px" }}>
      <div style={{ fontSize: "22px", fontWeight: 800, color: "#e0e7ff", marginBottom: "12px" }}>
        📐 A question about fairness
      </div>
      <div style={{ fontSize: "14px", lineHeight: 1.7, color: "#c7d2fe" }}>
        Two legislators both process <strong style={{ color: "#fbbf24" }}>99 out of 100</strong> bills
        referred to their committees. One gets paid almost in full. The other gets nothing extra.
        <br /><br />
        Same effort. Wildly different results.
        The difference is the <strong style={{ color: "#4ade80" }}>shape of the math.</strong>
      </div>
    </DarkCard>

    <ChalkCard>
      <Slider
        label="Bills processed"
        value={bills}
        onChange={setBills}
        min={0} max={100} step={1}
        color={isCompliant ? "#4ade80" : "#06b6d4"}
        display={bills + "%  " + (isCompliant ? "✓ Fully compliant" : "✗ Not fully compliant")}
      />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "8px" }}>
        {/* Group 3 card */}
        <div style={{ padding: "14px", background: "rgba(6,182,212,0.12)", borderRadius: "12px", border: "1px solid #06b6d4" }}>
          <div style={{ fontSize: "11px", fontWeight: 800, color: "#06b6d4", textTransform: "uppercase", marginBottom: "6px" }}>Group 3 Leader</div>
          <div style={{ fontSize: "11px", color: "#94a3b8", marginBottom: "8px" }}>compliance = group average</div>
          <div style={{ fontSize: "12px", marginBottom: "3px" }}>Guaranteed: <strong style={{ fontFamily: mono }}>{fmt(g3Guaranteed)}</strong></div>
          <div style={{ fontSize: "12px", marginBottom: "8px" }}>Holdback: <strong style={{ color: "#06b6d4", fontFamily: mono }}>{fmt(g3Holdback)}</strong></div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "8px" }}>
            <div style={{ fontSize: "15px", fontWeight: 800, fontFamily: mono }}>{fmt(g3Total)}</div>
            <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "2px" }}>{pctReleased(g3Holdback)} of holdback released</div>
          </div>
        </div>
        {/* Group 4 card */}
        <div style={{ padding: "14px", background: isCompliant ? "rgba(74,222,128,0.12)" : "rgba(239,68,68,0.12)", borderRadius: "12px", border: `1px solid ${isCompliant ? "#4ade80" : "#ef4444"}` }}>
          <div style={{ fontSize: "11px", fontWeight: 800, color: isCompliant ? "#4ade80" : "#ef4444", textTransform: "uppercase", marginBottom: "6px" }}>Group 4 Chair</div>
          <div style={{ fontSize: "11px", color: "#94a3b8", marginBottom: "8px" }}>compliance = own committee</div>
          <div style={{ fontSize: "12px", marginBottom: "3px" }}>Guaranteed: <strong style={{ fontFamily: mono }}>{fmt(g4Guaranteed)}</strong></div>
          <div style={{ fontSize: "12px", marginBottom: "8px" }}>Holdback: <strong style={{ color: isCompliant ? "#4ade80" : "#ef4444", fontFamily: mono }}>{fmt(g4Holdback)}</strong></div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "8px" }}>
            <div style={{ fontSize: "15px", fontWeight: 800, fontFamily: mono }}>{fmt(g4Total)}</div>
            <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "2px" }}>{isCompliant ? "100%" : "0%"} of holdback released</div>
          </div>
        </div>
      </div>
    </ChalkCard>

    <Card>
      <div style={{ fontSize: "14px", fontWeight: 800, marginBottom: "10px" }}>🧮 The Functions Behind Each Group</div>
      <div style={{ fontSize: "13px", fontWeight: 700, color: "#0891b2", marginBottom: "4px" }}>Group 3 — Continuous Linear</div>
      <Formula>{"T₃ = Base × 0.33 × (0.50 + 0.50 × C)\nwhere C can be ANY value 0.00 → 1.00\n\nC = 0.75 → 75% of holdback released\nC = 0.40 → 40% released\nEvery % point of compliance = more money"}</Formula>
      <div style={{ fontSize: "13px", fontWeight: 700, color: "#dc2626", marginBottom: "4px", marginTop: "8px" }}>Group 4 — Piecewise Step</div>
      <Formula>{"T₄ = Base × 0.33 × 0.50      if C < 1.00\nT₄ = Base × 0.33 × 1.00      if C = 1.00\n\nC_own ∈ { 0, 1 } — only TWO values\n\nC = 0.99 → same as C = 0.00\nOnly C = 1.00 unlocks the holdback"}</Formula>
    </Card>

    <Card bg="#eff6ff" border="#bfdbfe">
      <div style={{ fontSize: "14px", fontWeight: 800, color: "#1d4ed8", marginBottom: "8px" }}>📚 What is a piecewise function?</div>
      <div style={{ fontSize: "13px", color: "#1e3a8a", lineHeight: 1.7 }}>
        A <strong>piecewise function</strong> uses different formulas for different parts of the input.
        Group 4 has two pieces:
        <br />• <strong>Piece 1:</strong> C &lt; 1 → guaranteed pay only
        <br />• <strong>Piece 2:</strong> C = 1 → guaranteed pay + full holdback
        <br /><br />
        Real-world examples: <strong>tax brackets</strong> (different rates at different incomes),
        <strong> overtime</strong> (regular rate ≤40 hrs, 1.5× above), <strong>shipping tiers</strong> (free above $50).
        Anywhere a rule <em>changes at a threshold</em>, that's a piecewise function.
      </div>
    </Card>

    <Think
      q="Move the slider to 99%. Group 3 gets 99% of the holdback. Group 4 gets 0%. Is the piecewise function fair?"
      a={`It enforces stricter individual accountability — but one missing bill hearing, out of fifty, costs the same as missing all fifty. A fairer design might use a per-committee continuous formula: T₄ = Base × 0.33 × (0.50 + 0.50 × C_own), where C_own = bills processed ÷ bills referred. Can you write that formula out?`}
    />

    <Card bg="#fef2f2" border="#fecaca">
      <div style={{ fontSize: "13px", fontWeight: 700, color: "#dc2626", marginBottom: "8px" }}>📈 Picture It</div>
      <svg viewBox="0 0 280 160" style={{ width: "100%", height: "auto" }}>
        <line x1="35" y1="135" x2="265" y2="135" stroke="#e5e7eb" strokeWidth="1.5"/>
        <line x1="35" y1="20"  x2="35"  y2="135" stroke="#e5e7eb" strokeWidth="1.5"/>
        <text x="148" y="155" textAnchor="middle" fontSize="9" fill="#6b7280">Compliance (C)</text>
        <text x="12"  y="82"  textAnchor="middle" fontSize="9" fill="#6b7280" transform="rotate(-90,12,82)">Holdback</text>
        <text x="35"  y="149" textAnchor="middle" fontSize="8" fill="#9ca3af">0%</text>
        <text x="265" y="149" textAnchor="middle" fontSize="8" fill="#9ca3af">100%</text>
        <text x="30"  y="137" textAnchor="end"    fontSize="8" fill="#9ca3af">0%</text>
        <text x="30"  y="24"  textAnchor="end"    fontSize="8" fill="#9ca3af">100%</text>
        {/* Group 3 — diagonal */}
        <line x1="35" y1="135" x2="265" y2="20" stroke="#06b6d4" strokeWidth="2.5"/>
        {/* Group 4 — step */}
        <line x1="35"  y1="135" x2="263" y2="135" stroke="#ef4444" strokeWidth="2.5"/>
        <line x1="265" y1="135" x2="265" y2="20"  stroke="#ef4444" strokeWidth="2.5"/>
        <circle cx="265" cy="20"  r="4" fill="#ef4444"/>
        <circle cx="263" cy="135" r="4" fill="white" stroke="#ef4444" strokeWidth="2"/>
        {/* Current marker */}
        {bills < 100 && (
          <>
            <line x1={35 + (bills/100)*230} y1="18" x2={35 + (bills/100)*230} y2="135" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="4,3" opacity="0.8"/>
            <circle cx={35 + (bills/100)*230} cy={135 - (bills/100)*115} r="5" fill="#06b6d4"/>
            <circle cx={35 + (bills/100)*230} cy="135" r="5" fill="#ef4444"/>
          </>
        )}
        <text x="148" y="62"  fontSize="10" fill="#06b6d4" fontWeight="bold">Group 3 (linear)</text>
        <text x="148" y="128" fontSize="10" fill="#ef4444" fontWeight="bold">Group 4 (step)</text>
      </svg>
      <div style={{ fontSize: "11px", color: "#9ca3af", textAlign: "center", marginTop: "4px" }}>
        The open circle at C=100% shows the step function "jumps" — mathematically discontinuous.
      </div>
    </Card>

    <Tip>Great discussion prompt: "If you were writing this law, which formula would you use for committee chairs — and why?" Connects algebra to policy design.</Tip>
  </>;
}

function S9() {
  const lessons = [
    { icon: "📐", title: "Math reveals truth", text: "The law's words looked fine. Only algebra exposed the structural flaw." },
    { icon: "⚖️", title: "Laws are math problems", text: "Every time a law says \"percentage\" or \"not more than,\" it's creating a formula someone needs to check." },
    { icon: "💡", title: "Impossible answers = information", text: "C = 1.21 isn't an error. It means the condition can never happen. That's a finding." },
    { icon: "🔍", title: "Always check your work", text: "The professional analyst who first studied this law made an arithmetic mistake and said the crossover was 61%. Going back to basics caught the error." },
  ];
  const concepts = [
    "Percentages & Decimals", "Variables", "Linear Functions",
    "Constants", "Inequalities", "Domain Restrictions",
    "Solving Equations", "Interpreting Results", "Piecewise Functions"
  ];
  return <>
    <DarkCard style={{ background: "linear-gradient(135deg, #064e3b, #1e3a5f)", padding: "28px 20px" }}>
      <div style={{ fontSize: "48px", textAlign: "center" }}>🌍</div>
      <div style={{ fontSize: "22px", fontWeight: 800, textAlign: "center", marginBottom: "16px" }}>Why This Matters</div>
      {lessons.map((l, i) => (
        <div key={i} style={{ display: "flex", gap: "12px", padding: "12px", background: "rgba(255,255,255,0.06)", borderRadius: "12px", marginBottom: "10px" }}>
          <div style={{ fontSize: "24px", flexShrink: 0 }}>{l.icon}</div>
          <div>
            <div style={{ fontSize: "14px", fontWeight: 700 }}>{l.title}</div>
            <div style={{ fontSize: "13px", opacity: 0.8, marginTop: "4px", lineHeight: 1.5 }}>{l.text}</div>
          </div>
        </div>
      ))}
    </DarkCard>
    <Card>
      <div style={{ fontSize: "15px", fontWeight: 700, marginBottom: "12px" }}>Math concepts we used:</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {concepts.map((c, i) => (
          <span key={i} style={{ padding: "6px 14px", background: "#f0fdf4", border: "1px solid #86efac", borderRadius: "20px", fontSize: "13px", fontWeight: 600, color: "#166534" }}>{c}</span>
        ))}
      </div>
    </Card>
    <Tip>Extension: Have students pick a different group comparison and solve for the crossover. Or find other laws with formulas (tax brackets, speed limits, zoning rules) and translate them into equations.</Tip>
  </>;
}

// ─── MAIN ────────────────────────────────────────────────────────────
export default function App() {
  const [cur, setCur] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }, [cur]);

  const comps = [<S0/>,<S1/>,<S2/>,<S3/>,<S4/>,<S5/>,<S6/>,<S7/>,<S8/>,<S9/>];

  return (
    <div style={{ maxWidth: "480px", margin: "0 auto", minHeight: "100vh", display: "flex", flexDirection: "column", background: "#fafaf9", fontFamily: "'Nunito', 'Segoe UI', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ background: "#1e3a5f", color: "#fff", padding: "12px 16px", flexShrink: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: "15px", fontWeight: 800 }}>📐 Laws & Math</div>
          <div style={{ fontSize: "12px", opacity: 0.7 }}>{cur + 1} / {STEPS.length}</div>
        </div>
        {/* Progress dots */}
        <div style={{ display: "flex", gap: "4px", marginTop: "8px" }}>
          {STEPS.map((_, i) => (
            <div key={i} onClick={() => setCur(i)} style={{
              flex: 1, height: "4px", borderRadius: "2px", cursor: "pointer",
              background: i === cur ? "#fbbf24" : i < cur ? "#4ade80" : "rgba(255,255,255,0.2)",
              transition: "all 0.2s"
            }} />
          ))}
        </div>
      </div>

      {/* Step title */}
      <div style={{ padding: "14px 16px 8px", flexShrink: 0 }}>
        <div style={{ fontSize: "11px", color: "#6b7280", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Step {cur + 1}</div>
        <div style={{ fontSize: "22px", fontWeight: 800, color: "#1e3a5f" }}>{STEPS[cur].icon} {STEPS[cur].title}</div>
      </div>

      {/* Content */}
      <div ref={contentRef} style={{ flex: 1, overflow: "auto", padding: "0 16px 16px", WebkitOverflowScrolling: "touch" }}>
        {comps[cur]}
      </div>

      {/* Bottom nav */}
      <div style={{ display: "flex", gap: "10px", padding: "12px 16px", borderTop: "1px solid #e5e7eb", background: "#fff", flexShrink: 0 }}>
        <button onClick={() => setCur(Math.max(0, cur - 1))} disabled={cur === 0} style={{
          flex: 1, padding: "14px", borderRadius: "12px", border: "none", cursor: cur === 0 ? "default" : "pointer",
          background: cur === 0 ? "#f3f4f6" : "#1e3a5f", color: cur === 0 ? "#9ca3af" : "#fff",
          fontSize: "15px", fontWeight: 700
        }}>← Back</button>
        <button onClick={() => setCur(Math.min(STEPS.length - 1, cur + 1))} disabled={cur === STEPS.length - 1} style={{
          flex: 1, padding: "14px", borderRadius: "12px", border: "none", cursor: cur === STEPS.length - 1 ? "default" : "pointer",
          background: cur === STEPS.length - 1 ? "#f3f4f6" : "#4ade80", color: cur === STEPS.length - 1 ? "#9ca3af" : "#000",
          fontSize: "15px", fontWeight: 700
        }}>{cur === 6 ? "The Reveal →" : cur === 7 ? "Two Kinds →" : cur === STEPS.length - 1 ? "Done ✓" : "Next →"}</button>
      </div>
    </div>
  );
}
