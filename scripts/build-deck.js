#!/usr/bin/env node
// Partcast — PM Strategy Deck Generator
// Uses pptxgenjs 4.x to produce slides/partcast-deck.pptx

'use strict';

const PptxGenJS = require('pptxgenjs');
const path = require('path');
const fs = require('fs');

const OUT_PATH = path.join(__dirname, '../slides/partcast-deck.pptx');
fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });

const pptx = new PptxGenJS();
pptx.defineLayout({ name: 'WIDE', width: 13.33, height: 7.5 });
pptx.layout = 'WIDE';
pptx.author  = 'Arad Adler';
pptx.subject = 'Partcast PM Strategy — Avathon Assignment';
pptx.title   = 'Partcast';

// ─── Palette ─────────────────────────────────────────────────────────────────
const C = {
  navy:     '1F4E79',
  blue:     '2E75B6',
  blueLight:'D6E4F0',
  white:    'FFFFFF',
  gray:     '595959',
  lgray:    'D9D9D9',
  offwhite: 'F5F8FD',
  accent:   'C9492C',
  tblAlt:   'EAF0F9',
  tblHdr:   '2E75B6',
  tblHdr2:  '1F4E79',
};
const F = 'Calibri';
const W = 13.33;  // slide width
const H = 7.5;    // slide height

// ─── Low-level helpers ───────────────────────────────────────────────────────

function rect(slide, x, y, w, h, fill, border) {
  slide.addShape(pptx.ShapeType.rect, {
    x, y, w, h,
    fill: { color: fill },
    line: { color: border || fill, width: border ? 1 : 0 },
  });
}

function line(slide, x, y, len, vertical, color, width) {
  slide.addShape(pptx.ShapeType.line, {
    x, y,
    w: vertical ? 0 : len,
    h: vertical ? len : 0,
    line: { color: color || C.lgray, width: width || 1 },
  });
}

function arrow(slide, x, y, len, vertical, color) {
  slide.addShape(pptx.ShapeType.line, {
    x, y,
    w: vertical ? 0 : len,
    h: vertical ? len : 0,
    line: { color: color || C.blue, width: 2, endArrowType: 'arrow' },
  });
}

function txt(slide, text, x, y, w, h, opts) {
  const o = opts || {};
  slide.addText(text, {
    x, y, w, h,
    fontFace:  o.font    || F,
    fontSize:  o.size    || 14,
    bold:      o.bold    || false,
    italic:    o.italic  || false,
    color:     o.color   || C.gray,
    align:     o.align   || 'left',
    valign:    o.valign  || 'top',
    wrap:      true,
    ...( o.bullet !== undefined ? { bullet: o.bullet } : {} ),
    ...( o.indentLevel !== undefined ? { indentLevel: o.indentLevel } : {} ),
  });
}

// ─── Compound helpers ────────────────────────────────────────────────────────

function header(slide, title, fontSize) {
  rect(slide, 0, 0, W, 0.88, C.navy);
  txt(slide, title, 0.35, 0.04, W - 0.7, 0.82, {
    size: fontSize || 22, bold: true, color: C.white, valign: 'middle',
  });
}

function footer(slide, num) {
  line(slide, 0.3, 7.08, W - 0.6, false, C.lgray, 0.75);
  txt(slide, 'PARTCAST', 0.3, 7.12, 2.2, 0.3, { size: 9, bold: true, color: C.navy });
  txt(slide, String(num), 12.8, 7.12, 0.3, 0.3, { size: 9, color: C.gray, align: 'right' });
}

function sectionLabel(slide, text, x, y, w, h, fillColor) {
  rect(slide, x, y, w, h, fillColor || C.navy);
  txt(slide, text, x + 0.08, y, w - 0.16, h, {
    size: 11, bold: true, color: C.white, valign: 'middle', align: 'center',
  });
}

function flowBox(slide, text, x, y, w, h, opts) {
  const o = opts || {};
  rect(slide, x, y, w, h, o.fill || C.blueLight, o.border || C.blue);
  txt(slide, text, x + 0.07, y + 0.04, w - 0.14, h - 0.08, {
    size: o.size || 10, bold: o.bold || false,
    color: o.color || C.navy, valign: 'middle', align: 'center',
  });
}

function diamond(slide, text, cx, y, w, h) {
  // Approximate a diamond using a rotated square shape via a table trick.
  // pptxgenjs v4 supports ShapeType with rotation.
  // We use the diamond ShapeType directly.
  slide.addShape('diamond', {
    x: cx - w / 2, y, w, h,
    fill: { color: 'FFF2CC' },
    line: { color: 'C9A800', width: 1.5 },
  });
  txt(slide, text, cx - w / 2 + 0.05, y + 0.05, w - 0.1, h - 0.1, {
    size: 9, bold: true, color: C.gray, align: 'center', valign: 'middle',
  });
}

// ─── TABLE BUILDER ──────────────────────────────────────────────────────────

function mkRow(cells, isHeader) {
  return cells.map((cell, i) => {
    if (typeof cell === 'object' && cell.raw) return cell;
    const isFirstCol = i === 0;
    return {
      text: typeof cell === 'string' ? cell : cell.text,
      options: {
        fontFace: F,
        fontSize: isHeader ? 12 : 11,
        bold: isHeader || (isFirstCol && !cell.noFirstBold),
        color: isHeader ? C.white : (typeof cell === 'object' && cell.color ? cell.color : C.gray),
        fill: {
          color: isHeader
            ? (i === 0 ? C.tblHdr2 : C.tblHdr)
            : (typeof cell === 'object' && cell.fill ? cell.fill : C.white),
        },
        align: isHeader ? 'center' : (typeof cell === 'object' && cell.align ? cell.align : 'left'),
        valign: 'middle',
        wrap: true,
        border: [
          { type: 'solid', color: C.lgray, pt: 0.5 },
          { type: 'solid', color: C.lgray, pt: 0.5 },
          { type: 'solid', color: C.lgray, pt: 0.5 },
          { type: 'solid', color: C.lgray, pt: 0.5 },
        ],
      },
    };
  });
}

function addTable(slide, headers, rows, x, y, w, colW, rowH) {
  const tableRows = [
    mkRow(headers, true),
    ...rows.map((r, ri) =>
      r.map((cell, ci) => {
        const base = mkRow([cell], false)[0];
        if (ri % 2 === 1 && base.options.fill.color === C.white) {
          base.options.fill.color = C.tblAlt;
        }
        return base;
      })
    ),
  ];
  slide.addTable(tableRows, {
    x, y, w,
    colW,
    rowH: rowH || 0.45,
    fontFace: F,
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 1 — Title
// ═══════════════════════════════════════════════════════════════════════════════
(function () {
  const s = pptx.addSlide();

  // Full navy background
  rect(s, 0, 0, W, H, C.navy);

  // Accent bar — left edge
  rect(s, 0, 0, 0.18, H, C.accent);

  // Decorative thin blue horizontal band
  rect(s, 0.18, 2.8, W - 0.18, 0.05, C.blue);

  // Product name
  txt(s, 'PARTCAST', 0.7, 1.5, W - 1.4, 1.3, {
    size: 54, bold: true, color: C.white, align: 'left', valign: 'middle',
  });

  // Tagline
  txt(s, 'AI-native demand planning for Aerospace MRO spare parts', 0.7, 3.0, W - 1.4, 0.7, {
    size: 20, bold: false, color: C.blueLight, align: 'left',
  });

  // Assignment subtitle
  txt(s, 'PM Strategy Assignment  ·  Arad Adler', 0.7, 3.85, W - 1.4, 0.45, {
    size: 14, color: C.lgray, align: 'left',
  });

  // Submission context
  txt(s, 'Submitted for: Avathon  ·  April 2026', 0.7, 4.35, W - 1.4, 0.4, {
    size: 12, color: C.lgray, align: 'left', italic: true,
  });

  // Footer text only (no line on title slide)
  txt(s, 'PARTCAST', 0.3, 7.12, 2, 0.3, { size: 9, bold: true, color: '3A6FA8' });
  txt(s, '1', 12.8, 7.12, 0.3, 0.3, { size: 9, color: C.lgray, align: 'right' });
})();

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 2 — The Problem: Root Cause
// ═══════════════════════════════════════════════════════════════════════════════
(function () {
  const s = pptx.addSlide();
  header(s,
    'The Most Tractable Demand Planning Problem in Manufacturing — Managed as if It Were Unknowable',
    18);
  footer(s, 2);

  const paraW = W - 0.8;
  const paraX = 0.4;
  const paraH = 1.65;
  const gap   = 0.18;

  // Accent numbers
  const numX = 0.38;
  const numW = 0.42;

  const paras = [
    {
      num: '01',
      head: 'MRO demand is forward-deterministic, not probabilistic.',
      body: 'A large share of future spare parts demand in aerospace MRO is knowable in advance. When an aircraft approaches a C-check, the required parts are encoded in the maintenance program, the tail\'s flight-hours log, the active airworthiness directives governing that airframe type, and the flight schedule driving utilization rates. AD compliance deadlines create hard replacement triggers on specific part numbers. Contract SLAs define which operators must be served and with what turnaround commitments. The demand trigger is an engineering event with a known time horizon and a specific parts list attached — categorically different from the consumer or industrial demand that incumbent planning tools were designed to sense.',
    },
    {
      num: '02',
      head: 'Planners spend 60–70% of their review cycle on data reconciliation, not judgment.',
      body: 'Instead of evaluating demand signals, analysts spend the majority of every planning cycle manually pulling ERP exports, airline schedule feeds, FAA and EASA AD portals, supplier portals, and accumulated spreadsheets — and reconciling them into a consensus forecast by hand. By the time that forecast reaches the supply chain team, it is already stale. A new AD was issued. A tail had an unscheduled removal. A supplier moved a delivery date. No one updated the plan. The process fails not because planners are bad at their jobs. It fails because the architecture of the tooling they use was designed around a consumption-history model of demand.',
    },
    {
      num: '03',
      head: 'The consequence of getting it wrong is binary and catastrophic.',
      body: 'In most supply chains, a forecast miss degrades service levels — orders are delayed, customers are frustrated. In MRO, running out of a critical part grounds an aircraft. A grounded commercial aircraft costs an operator $150,000 or more per hour in lost revenue, crew costs, and passenger compensation. Many critical parts are single-source with 12–18 month lead times, no spot market, and in some cases export licensing requirements that add weeks to the procurement timeline. When you are out of the part, you are out. The cost of a forecast miss is not a premium freight charge — it is an aircraft on the ground for weeks.',
    },
  ];

  const startY = 1.0;
  paras.forEach((p, i) => {
    const y = startY + i * (paraH + gap);

    // Left accent strip
    rect(s, numX, y, 0.06, paraH, C.accent);

    // Number
    txt(s, p.num, numX + 0.12, y + 0.05, 0.38, 0.45, {
      size: 22, bold: true, color: C.blue, valign: 'top',
    });

    // Heading
    txt(s, p.head, numX + 0.55, y + 0.05, paraW - 0.55, 0.38, {
      size: 12, bold: true, color: C.navy, valign: 'top',
    });

    // Body
    txt(s, p.body, numX + 0.55, y + 0.46, paraW - 0.55, paraH - 0.52, {
      size: 10.5, color: C.gray, valign: 'top',
    });
  });
})();

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 3 — Why Incumbents Fail
// ═══════════════════════════════════════════════════════════════════════════════
(function () {
  const s = pptx.addSlide();
  header(s, 'The Tools Are Built for the Wrong Problem');
  footer(s, 3);

  txt(s,
    'SAP IBP, Kinaxis, and Oracle Demantra are powerful platforms built for industries where demand flows through point-of-sale systems and distributor orders. Their core architectural assumption — that demand is a statistical property of time series — is wrong for aerospace MRO.',
    0.4, 0.95, W - 0.8, 0.55, { size: 11, italic: false, color: C.gray });

  addTable(
    s,
    ['Capability', 'What Aerospace MRO Requires', 'What SAP IBP / Kinaxis / Oracle Demantra Delivers'],
    [
      [
        'Demand signal type',
        'Forward-deterministic: maintenance events, AD compliance deadlines, flight schedules, and contract SLAs create knowable future demand before it occurs',
        'Consumption-history model: statistical pattern detection on historical actuals — designed to extrapolate past behavior, not reason about future scheduled events',
      ],
      [
        'Inventory unit',
        'Serialized unit: each part carries a serial number, maintenance history, airworthiness certification status, and documentation chain required for installation',
        'Fungible SKU: aggregate quantities with no individual unit tracking, no certification status, no airworthiness documentation requirement',
      ],
      [
        'Consequence model',
        'AOG avoidance: asymmetric cost function — a stockout grounds an aircraft at $150K+/hour; holding an extra unit is a carrying cost, not a symmetric downside',
        'Service level optimization: symmetric cost function — a stockout is a delayed order; expedite routes and spot markets exist as a safety valve',
      ],
      [
        'Supplier structure',
        'Single-source with 12–18 month lead times, no spot market, potential export licensing requirements — when supply is exhausted, no alternative procurement path exists',
        'Multi-source assumption: spot procurement and expedite are treated as available recovery options; lead time variability is a cost, not an absolute constraint',
      ],
      [
        'Org topology',
        'Split demand and supply ownership: the airline knows the demand (maintenance program, tail utilization) and the MRO provider owns the supply obligation — demand signals must cross an organizational boundary',
        'Single-org assumption: demand planner and supply planner share data within one ERP instance; no designed-in support for cross-organizational demand signal handoff',
      ],
    ],
    0.35, 1.55, W - 0.7,
    [2.6, 4.5, 5.08],
    0.76
  );
})();

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 4 — Why Now (two-column)
// ═══════════════════════════════════════════════════════════════════════════════
(function () {
  const s = pptx.addSlide();
  header(s, 'Five Structural Characteristics That Define a Categorically Different Planning Problem', 19);
  footer(s, 4);

  // Column divider
  line(s, 7.05, 0.95, 5.85, true, C.lgray, 1);

  // Left column header
  sectionLabel(s, 'Five Structural Characteristics', 0.35, 0.95, 6.55, 0.42, C.navy);

  // Right column header
  sectionLabel(s, 'Three Forcing Functions — Why Now', 7.15, 0.95, 5.85, 0.42, C.accent);

  const chars = [
    {
      label: 'Event-driven demand',
      body:  'Demand is not probabilistic — it is the structured output of maintenance programs, AD compliance deadlines, and flight-hour thresholds. A large share of future demand is knowable before it occurs.',
    },
    {
      label: 'Serialized inventory',
      body:  'Each part is not a fungible unit. It carries a serial number, a certification status, and a documentation chain. Substitution and repositioning require verifying airworthiness status on every individual unit.',
    },
    {
      label: 'Binary consequence function',
      body:  'A stockout does not reduce service levels — it grounds an aircraft. The expected cost of a miss is a fraction of the AOG event probability times $150K+ per hour, not a symmetric carrying-cost trade-off.',
    },
    {
      label: 'Single-source supplier structure',
      body:  'Critical parts often have one OEM source, 12–18 month lead times, and no spot market. Expedite is not an option. When the procurement window closes, it closes permanently for that demand event.',
    },
    {
      label: 'Split organizational topology',
      body:  'The airline owns the demand signal and the MRO provider owns the supply obligation. These are separate organizations with separate ERP systems, separate planning cadences, and imperfect information sharing across a contractual boundary.',
    },
  ];

  const charY = 1.48;
  const charH = 0.98;
  const charGap = 0.04;
  chars.forEach((c, i) => {
    const y = charY + i * (charH + charGap);
    rect(s, 0.35, y, 6.55, charH, i % 2 === 0 ? C.offwhite : C.white, C.lgray);
    rect(s, 0.35, y, 0.06, charH, C.blue);
    txt(s, c.label, 0.52, y + 0.06, 6.2, 0.32, { size: 11, bold: true, color: C.navy });
    txt(s, c.body,  0.52, y + 0.38, 6.2, charH - 0.44, { size: 9.5, color: C.gray });
  });

  const forces = [
    {
      label: 'Post-2020 supply chain fragility',
      body:  'The 2020 disruption exposed the fragility of lean MRO inventory strategies. Lead times that were measured in weeks stretched to 18 months. The industry spent two years in reactive mode and many operators are still rebuilding buffer stock — creating genuine urgency around planning visibility that did not exist before.',
    },
    {
      label: '2025 tariff volatility',
      body:  'Components sourced from international suppliers face cost uncertainty that makes procurement planning harder and makes demand accuracy — knowing what you will actually need before you have to order it — more valuable than it has ever been.',
    },
    {
      label: '700,000 technician shortage by 2043',
      body:  'The industry is projected to need 700,000 additional MRO technicians by 2043 and will not come close to filling that gap. Every hour a technician spends waiting for a part that should have been on the shelf is an hour of productive capacity permanently lost. Demand planning accuracy becomes a workforce productivity problem, not just a logistics problem.',
    },
  ];

  const frcY = 1.48;
  const frcH = 1.65;
  const frcGap = 0.04;
  forces.forEach((f, i) => {
    const y = frcY + i * (frcH + frcGap);
    rect(s, 7.15, y, 5.85, frcH, i % 2 === 0 ? C.offwhite : C.white, C.lgray);
    rect(s, 7.15, y, 0.06, frcH, C.accent);
    txt(s, f.label, 7.32, y + 0.08, 5.5, 0.35, { size: 11, bold: true, color: C.accent });
    txt(s, f.body,  7.32, y + 0.44, 5.5, frcH - 0.5, { size: 9.5, color: C.gray });
  });
})();

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 5 — Personas and Agentic Flows
// ═══════════════════════════════════════════════════════════════════════════════
(function () {
  const s = pptx.addSlide();
  header(s, 'Four Personas. Three Agents. One Planning Loop.');
  footer(s, 5);

  // Persona table
  addTable(
    s,
    ['Persona', 'Current daily reality', 'What changes with Partcast'],
    [
      [
        'MRO Demand Analyst',
        'Spends 60–70% of the planning cycle manually reconciling flight schedules, AD portals, ERP exports, and spreadsheets — producing a forecast that is stale before it reaches supply.',
        'Arrives at the demand review with a draft forecast pre-generated, top signals already surfaced, and changes since last cycle flagged with explanations. The job shifts from data assembly to signal evaluation.',
      ],
      [
        'Supply Planner',
        'Receives a consensus demand plan that is already stale; spends significant time in reactive mode expediting after AOG events occur rather than positioning inventory in advance of them.',
        'Sees live AOG risk scores by tail number, immediately knows when an approved demand update changes their inventory position, and gets ranked repositioning recommendations with downstream trade-off analysis.',
      ],
      [
        'S&OP Leader',
        'Spends the first hour of every S&OP meeting reconciling data — figuring out what the current plan actually is and why it changed — instead of making forward-looking allocation decisions.',
        'Receives an AI-generated S&OP package 48 hours before the meeting: FVA history, root-cause attribution, AOG risk summary, and forward plan. The meeting becomes a decision forum, not a data reconciliation session.',
      ],
      [
        'VP MRO Operations',
        'Learns about AOG risk when an aircraft is already grounded, not 30–60 days before. The leading indicators — a tail approaching C-check with a critical part not yet on order — are buried in systems no one is synthesizing.',
        'Has a live view of tails ranked by AOG risk with the specific demand and inventory factors driving each score. Escalations arrive before events, not after. Forward planning position is visible without depending on the planning team to surface it.',
      ],
    ],
    0.35, 0.95, W - 0.7,
    [2.3, 4.9, 5.38],
    0.74
  );

  // Agentic flows section
  sectionLabel(s, 'Agentic Flows', 0.35, 4.97, W - 0.7, 0.38, C.navy);

  const agents = [
    {
      name:       'AD Compliance Demand Agent',
      autonomous: 'Parses new ADs, identifies in-scope tails, calculates time-to-compliance and demand gap, and queues a recommendation to the planner.',
      handoff:    'Hands off when the demand gap requires a procurement decision — planner sees the full reasoning chain, per-tail calculations, and confidence flags before approving.',
    },
    {
      name:       'AOG Risk Scoring Agent',
      autonomous: 'Re-scores AOG risk for every tail on a 6-hour cadence and immediately on unscheduled removal events, supplier lead time changes, or flight schedule shifts.',
      handoff:    'Hands off at Alert (66+) with a demand recommendation; at Critical (86+) escalates to the S&OP Leader with a procurement countdown and time-sensitive action bar.',
    },
    {
      name:       'S&OP Package Agent',
      autonomous: 'Computes cycle variances, classifies root causes (model error vs override error vs external shock), calculates FVA metrics, and assembles the full S&OP package.',
      handoff:    'Hands off a live annotatable document — not a PDF — where the S&OP Leader records decisions on each flagged item and closes the cycle.',
    },
  ];

  const agentY = 5.42;
  const agentW = (W - 0.7 - 0.3) / 3;
  agents.forEach((a, i) => {
    const x = 0.35 + i * (agentW + 0.15);
    rect(s, x, agentY, agentW, 1.55, C.offwhite, C.blue);
    rect(s, x, agentY, agentW, 0.34, C.blue);
    txt(s, a.name, x + 0.08, agentY + 0.03, agentW - 0.16, 0.3, {
      size: 10, bold: true, color: C.white, valign: 'middle',
    });
    txt(s, 'Autonomous: ' + a.autonomous,
      x + 0.1, agentY + 0.4, agentW - 0.2, 0.52, { size: 9, color: C.gray });
    txt(s, 'Handoff: ' + a.handoff,
      x + 0.1, agentY + 0.95, agentW - 0.2, 0.55, { size: 9, color: C.gray });
  });
})();

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 6 — Architecture
// ═══════════════════════════════════════════════════════════════════════════════
(function () {
  const s = pptx.addSlide();
  header(s, 'Four Layers. One Closed Loop.');
  footer(s, 6);

  const layers = [
    {
      name:   'Signal Ingestion Layer',
      color:  C.navy,
      bullets: [
        'Flight schedules and maintenance event calendars (structured, deterministic parsing)',
        'FAA and EASA airworthiness directive feeds with LLM-assisted extraction of affected parts and compliance thresholds',
        'Supplier lead time feeds, contract SLA documents — confidence-scored, low-confidence extractions routed to planner review queue before propagating downstream',
      ],
    },
    {
      name:   'Demand Intelligence Engine',
      color:  '1A6B3A',
      bullets: [
        'Event-driven demand model per part number per tail — reasons forward from maintenance calendar, not backward from consumption history',
        'AI signal enrichment: LLM parses AD documents and structures affected part numbers, compliance timelines, and replacement quantities into joinable records',
        'ML anomaly detection: flags deviations between actual consumption and event-driven baseline — routes emerging failure patterns for planner review',
      ],
    },
    {
      name:   'Collaborative Planning UX',
      color:  '5B3FA8',
      bullets: [
        'Demand Review Queue: AI-generated recommendations with full signal evidence, confidence level expressed as inventory risk scenarios, not probability scores',
        'Approve / Override / Escalate workflow with structured rationale capture — every override is a labeled training signal for the learning loop',
        'Override audit trail and FVA tracking from day one: planner can see whether AI or their overrides have been more accurate, by demand event category',
      ],
    },
    {
      name:   'Demand-Supply Matching Engine',
      color:  C.accent,
      bullets: [
        'Serialized inventory matching: approved demand plan cross-referenced against individual certified units, not aggregate SKU counts',
        'AOG risk scoring per tail: scored by parts coverage gap, event proximity, supplier lead time vs procurement window, and historical removal rate',
        'Repositioning recommendations with explicit trade-off surface: solving one tail\'s risk while increasing another\'s is shown, not hidden',
      ],
    },
  ];

  const boxX = 0.35;
  const boxW = 3.6;
  const bulletX = 4.1;
  const bulletW = 5.1;
  const boxH = 0.48;
  const rowH = 1.28;
  const startY = 1.0;

  layers.forEach((layer, i) => {
    const y = startY + i * rowH;

    // Layer box
    rect(s, boxX, y, boxW, boxH, layer.color);
    txt(s, layer.name, boxX + 0.1, y, boxW - 0.2, boxH, {
      size: 11, bold: true, color: C.white, valign: 'middle', align: 'center',
    });

    // Bullets
    layer.bullets.forEach((b, bi) => {
      txt(s, '▸  ' + b, bulletX, y + bi * 0.38 + 0.05, bulletW, 0.36, {
        size: 9.5, color: C.gray, valign: 'top',
      });
    });

    // Downward arrow between layers (except after last)
    if (i < layers.length - 1) {
      arrow(s, boxX + boxW / 2 - 0.01, y + boxH, rowH - boxH - 0.08, true, C.navy);
    }
  });

  // Feedback arrow: right side, from bottom box up to top box
  const fbX = boxX + boxW + 0.25;
  const topY = startY + boxH / 2;
  const botY = startY + 3 * rowH + boxH / 2;
  // Down segment along right
  line(s, fbX, topY, botY - topY, true, C.accent, 1.5);
  // Horizontal segments top and bottom
  line(s, fbX, topY, 0.25, false, C.accent, 1.5);
  line(s, fbX, botY, 0.25, false, C.accent, 1.5);
  // Arrowhead at top (pointing right, back toward the box)
  arrow(s, boxX + boxW + 0.05, topY - 0.01, 0.2, false, C.accent);
  txt(s, 'Learning\nfeedback', fbX + 0.05, topY + (botY - topY) / 2 - 0.2, 0.7, 0.4, {
    size: 8, color: C.accent, italic: true, align: 'center',
  });

  // AI callout box
  const callX = 9.35;
  const callY = 1.0;
  const callW = 3.65;
  const callH = 5.95;

  rect(s, callX, callY, callW, callH, C.offwhite, C.lgray);
  rect(s, callX, callY, callW, 0.45, C.navy);
  txt(s, 'Where AI is used vs. not', callX + 0.1, callY + 0.02, callW - 0.2, 0.4, {
    size: 11, bold: true, color: C.white, valign: 'middle',
  });

  txt(s, 'Deterministic logic — not AI', callX + 0.15, callY + 0.55, callW - 0.3, 0.3, {
    size: 10, bold: true, color: C.navy,
  });
  const det = [
    'Time-to-compliance calculation per tail',
    'Demand gap: required minus available units',
    'Coverage ratio: units available ÷ units required',
    'AOG risk score aggregation from four components',
    'Lead time arithmetic — procurement window close date',
  ];
  det.forEach((d, i) => {
    txt(s, '·  ' + d, callX + 0.15, callY + 0.9 + i * 0.38, callW - 0.3, 0.35, {
      size: 9.5, color: C.gray,
    });
  });

  txt(s, 'AI / ML — used here', callX + 0.15, callY + 2.95, callW - 0.3, 0.3, {
    size: 10, bold: true, color: C.accent,
  });
  const ai = [
    'LLM parses AD documents → structured part + compliance records',
    'Recommendation explanation — signal ranking and plain-language rationale',
    'Confidence scoring on extracted supplier and contract data',
    'ML anomaly detection on consumption vs event-driven baseline',
    'Override pattern learning → confidence threshold recalibration',
  ];
  ai.forEach((a, i) => {
    txt(s, '·  ' + a, callX + 0.15, callY + 3.35 + i * 0.44, callW - 0.3, 0.42, {
      size: 9.5, color: C.gray,
    });
  });
})();

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 7 — Demand Review UX
// ═══════════════════════════════════════════════════════════════════════════════
(function () {
  const s = pptx.addSlide();
  header(s, 'The Planner Experience: From Signal to Approved Forecast in One Screen');
  footer(s, 7);

  // Left: workflow steps
  sectionLabel(s, 'Five-Step Workflow — Screen 2: Demand Recommendation Detail', 0.35, 0.95, 6.85, 0.4, C.navy);

  const steps = [
    {
      n: '1',
      head: 'Agent detects signal change and generates recommendation',
      body: 'AD Compliance or AOG Risk Scoring agent identifies a new signal — new AD issued, tail approaching a C-check, supplier delivery date changed. A structured recommendation is pre-generated and placed in the planner\'s Demand Review Queue with a priority level and confidence flag.',
    },
    {
      n: '2',
      head: 'Planner opens recommendation detail — forecast comparison and signal evidence',
      body: 'Screen 2 shows three forecasts side by side: current approved, AI recommended, and statistical baseline — each as a 12-month bar chart on a shared y-axis scale. The Signal Evidence panel on the right surfaces the specific signals that drove the recommendation, ranked by unit impact.',
    },
    {
      n: '3',
      head: 'Planner evaluates AI reasoning — signals, confidence, and inventory risk trade-offs',
      body: 'Each signal entry is expandable to show the source system, raw data value, and a "Flag as incorrect" link. Confidence is expressed as a three-row inventory scenario table — holding N-2, N, and N+2 units — with plain-language AOG exposure and carrying cost for each, not a probability percentage.',
    },
    {
      n: '4',
      head: 'Planner approves, overrides with rationale, or escalates',
      body: 'Approve advances to the next pending item automatically. Override opens an inline panel (Screen 3) requiring a structured reason category, 20+ character free-text rationale, revised monthly forecast values, and the planner\'s own confidence level. Escalate routes the item to the S&OP review queue with an optional note.',
    },
    {
      n: '5',
      head: 'Decision logged — actuals outcome tracked for FVA measurement',
      body: 'Every approval, override, and escalation is written to the audit trail with a timestamp, the agent\'s original recommendation, and the planner\'s decision. When the demand period closes, actuals are joined to the recommendation record and the AI vs override accuracy outcome is logged to the FVA dashboard.',
    },
  ];

  const stepY = 1.42;
  const stepH = 1.03;
  const stepGap = 0.04;
  steps.forEach((step, i) => {
    const y = stepY + i * (stepH + stepGap);
    rect(s, 0.35, y, 0.48, stepH, C.blue);
    txt(s, step.n, 0.35, y, 0.48, stepH, {
      size: 18, bold: true, color: C.white, align: 'center', valign: 'middle',
    });
    rect(s, 0.83, y, 6.37, stepH, i % 2 === 0 ? C.offwhite : C.white, C.lgray);
    txt(s, step.head, 0.95, y + 0.07, 6.15, 0.32, { size: 10, bold: true, color: C.navy });
    txt(s, step.body,  0.95, y + 0.4,  6.15, stepH - 0.46, { size: 9, color: C.gray });
  });

  // Right: Wireframe placeholder
  const phX = 7.55;
  const phY = 0.95;
  const phW = 5.45;
  const phH = 6.1;

  rect(s, phX, phY, phW, phH, 'F0F4F8', C.lgray);

  // Dashed border simulation — four thin rect outlines
  slide_rect_dashed(s, phX, phY, phW, phH);

  txt(s, '[ Wireframe: Demand Recommendation Detail ]',
    phX + 0.2, phY + phH / 2 - 0.4, phW - 0.4, 0.5, {
      size: 12, bold: false, italic: true, color: C.lgray, align: 'center', valign: 'middle',
    });
  txt(s, 'Insert Figma export here',
    phX + 0.2, phY + phH / 2 + 0.15, phW - 0.4, 0.4, {
      size: 10, italic: true, color: C.lgray, align: 'center',
    });

  function slide_rect_dashed(sl, x, y, w, h) {
    // Top
    line(sl, x, y, w, false, C.lgray, 1.5);
    // Bottom
    line(sl, x, y + h, w, false, C.lgray, 1.5);
    // Left
    line(sl, x, y, h, true, C.lgray, 1.5);
    // Right
    line(sl, x + w, y, h, true, C.lgray, 1.5);
  }
})();

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 8 — Agent Workflow: AD Compliance Demand Agent
// ═══════════════════════════════════════════════════════════════════════════════
(function () {
  const s = pptx.addSlide();
  header(s, 'Agent Workflow: AD Compliance Demand Agent');
  footer(s, 8);

  // Six reasoning-chain boxes + downward arrow into confidence decision
  const steps6 = [
    { n: '1', label: 'Parse AD\ndocument',           sub: 'Aircraft types, part numbers, compliance type, threshold, alt parts' },
    { n: '2', label: 'Identify in-scope\ntails',     sub: 'Type match → mod status match → operator assignment' },
    { n: '3', label: 'Time-to-compliance\nper tail', sub: '(Threshold hrs − current hrs) ÷ daily utilization rate' },
    { n: '4', label: 'Inventory and\nPO position',   sub: 'Certified on-hand units, confirmed PO deliveries, lead time' },
    { n: '5', label: 'Demand gap\nper tail',          sub: 'Units required − units available within procurement window' },
    { n: '6', label: 'Assign confidence\nlevel',      sub: 'HIGH · MEDIUM · LOW based on data staleness and AD type' },
  ];

  const bw = 1.82;
  const bh = 0.98;
  const bGap = 0.2;
  const totalW = steps6.length * bw + (steps6.length - 1) * bGap;
  const startX = (W - totalW) / 2;
  const rowY = 0.95;

  steps6.forEach((step, i) => {
    const x = startX + i * (bw + bGap);
    rect(s, x, rowY, bw, bh, C.blueLight, C.blue);
    rect(s, x, rowY, bw, 0.28, C.blue);
    txt(s, 'Step ' + step.n, x + 0.04, rowY + 0.02, bw - 0.08, 0.26, {
      size: 9, bold: true, color: C.white, align: 'center', valign: 'middle',
    });
    txt(s, step.label, x + 0.05, rowY + 0.3, bw - 0.1, 0.4, {
      size: 10, bold: true, color: C.navy, align: 'center', valign: 'top',
    });
    txt(s, step.sub, x + 0.05, rowY + 0.68, bw - 0.1, 0.28, {
      size: 8, color: C.gray, align: 'center',
    });

    if (i < steps6.length - 1) {
      arrow(s, x + bw + 0.02, rowY + bh / 2, bGap - 0.04, false, C.blue);
    }
  });

  // Decision diamond below Step 6
  const diaX = startX + 5 * (bw + bGap) + bw / 2;
  const diaY = rowY + bh + 0.18;
  const diaW = 2.0;
  const diaH = 0.72;
  arrow(s, diaX, rowY + bh + 0.02, 0.14, true, C.navy);
  diamond(s, 'Confidence\nlevel?', diaX + bw / 2 - 0.02, diaY, diaW, diaH);

  // Three outcome boxes
  const outY = diaY + diaH + 0.28;
  const outH = 1.3;
  const outcomes = [
    {
      conf:  'HIGH CONFIDENCE',
      color: '1A6B3A',
      text:  'Generate URGENT recommendation\nAI quantity = demand gap from Step 5\nAll signals pre-populated in Signal Evidence panel\nNo advisory flags — planner may approve immediately',
    },
    {
      conf:  'MEDIUM CONFIDENCE',
      color: C.blue,
      text:  'Generate URGENT recommendation\nAmber "Data Gaps" subsection in Signal Evidence panel\nAdvisory above action bar: "Review flagged gaps before approving"\nPlanner may approve, override, or flag gap for resolution',
    },
    {
      conf:  'LOW CONFIDENCE',
      color: C.accent,
      text:  'Draft — Status: Requires Planner Input\nApprove button replaced by "Resolve Data Gaps"\nRed callout box above signal list listing unresolved questions\nRe-runs Steps 5–6 after planner resolves data gaps',
    },
  ];

  const outW = (W - 0.7 - 0.4) / 3;
  outcomes.forEach((o, i) => {
    const x = 0.35 + i * (outW + 0.2);
    rect(s, x, outY, outW, outH, C.offwhite, C.lgray);
    rect(s, x, outY, outW, 0.3, o.color);
    txt(s, o.conf, x + 0.08, outY + 0.02, outW - 0.16, 0.28, {
      size: 9, bold: true, color: C.white, align: 'center', valign: 'middle',
    });
    txt(s, o.text, x + 0.1, outY + 0.35, outW - 0.2, outH - 0.42, {
      size: 8.5, color: C.gray,
    });
  });

  // Draw arrow from diamond to each outcome (approximate centers)
  const diaCenterX = diaX + bw / 2 - 0.02 + diaW / 2;
  const diaCenterY = diaY + diaH;
  const outCenterXs = outcomes.map((_, i) => 0.35 + i * (outW + 0.2) + outW / 2);

  // Vertical drop from diamond
  const dropY = diaY + diaH + 0.1;
  line(s, diaCenterX, diaCenterY, 0.12, true, C.navy, 1.5);
  // Horizontal bar connecting the three branch points
  line(s, outCenterXs[0], dropY, outCenterXs[2] - outCenterXs[0], false, C.navy, 1.5);
  // Vertical drops to each outcome
  outCenterXs.forEach((cx) => {
    arrow(s, cx, dropY, outY - dropY - 0.02, true, C.navy);
  });

  // Labels on arrows
  txt(s, 'High', outCenterXs[0] + 0.05, dropY + 0.05, 0.5, 0.25, { size: 8, color: '1A6B3A', bold: true });
  txt(s, 'Medium', outCenterXs[1] + 0.05, dropY + 0.05, 0.7, 0.25, { size: 8, color: C.blue, bold: true });
  txt(s, 'Low', outCenterXs[2] + 0.05, dropY + 0.05, 0.4, 0.25, { size: 8, color: C.accent, bold: true });

  // Bottom two-column section
  const colY = outY + outH + 0.15;
  const colH = 7.0 - colY - 0.3;
  const halfW = (W - 0.7 - 0.2) / 2;

  rect(s, 0.35, colY, halfW, colH, C.offwhite, C.blue);
  rect(s, 0.35, colY, halfW, 0.32, C.navy);
  txt(s, 'Agent acts autonomously', 0.45, colY + 0.02, halfW - 0.2, 0.3, {
    size: 10, bold: true, color: C.white, valign: 'middle',
  });

  const autoItems = [
    'Reads and parses the full AD document from the regulatory feed',
    'Filters operator fleet to identify in-scope tail numbers',
    'Calculates projected compliance date per tail from flight-hours and utilization rate',
    'Queries certified on-hand inventory, open POs, and confirmed lead times',
    'Computes demand gap and assigns confidence level from data quality signals',
    'Queues the recommendation — no human input required up to this point',
  ];
  autoItems.forEach((item, i) => {
    txt(s, '·  ' + item, 0.48, colY + 0.38 + i * 0.27, halfW - 0.26, 0.26, {
      size: 9, color: C.gray,
    });
  });

  const col2X = 0.35 + halfW + 0.2;
  rect(s, col2X, colY, halfW, colH, C.offwhite, C.accent);
  rect(s, col2X, colY, halfW, 0.32, C.accent);
  txt(s, 'Agent hands off to planner', col2X + 0.1, colY + 0.02, halfW - 0.2, 0.3, {
    size: 10, bold: true, color: C.white, valign: 'middle',
  });

  const handoffItems = [
    'Any demand gap > 0 requires a procurement decision — planner approves the quantity',
    'Confidence Medium: planner verifies specific flagged data gaps before approving',
    'Confidence Low: planner resolves unresolved questions (mod status, alt part mapping)',
    'Planner sees: AD number and title, per-tail time-to-compliance, and unit contribution per tail',
    'Inventory risk shown as operational scenarios anchored to the compliance deadline date',
    'Override requires structured reason category + 20+ character rationale for audit trail',
  ];
  handoffItems.forEach((item, i) => {
    txt(s, '·  ' + item, col2X + 0.13, colY + 0.38 + i * 0.27, halfW - 0.26, 0.26, {
      size: 9, color: C.gray,
    });
  });
})();

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 9 — Roadmap
// ═══════════════════════════════════════════════════════════════════════════════
(function () {
  const s = pptx.addSlide();
  header(s, 'From Wedge to Moat — 24 Months');
  footer(s, 9);

  const phases = [
    {
      n:      '01',
      label:  'Signal Foundation',
      period: 'Months 0–6',
      color:  C.blue,
      scope: [
        'ERP historical consumption and flight schedule ingestion and normalization',
        'Deterministic event-driven baseline forecast per part number per tail — anchored to maintenance calendar, not consumption history',
        'Demand review UX live: AI recommendations with signal explanations, approve / override / escalate workflow, full audit trail',
      ],
      moat: 'Clean, documented demand signal that no incumbent delivers out of the box. Behavioral moat: override rationale data begins accumulating from day one.',
    },
    {
      n:      '02',
      label:  'AI Sensing',
      period: 'Months 6–12',
      color:  '1A6B3A',
      scope: [
        'ML demand sensing trained on Phase 1 override and actuals data — learns systematic ways event-driven baseline over- or under-predicts for specific part types and operators',
        'FVA analytics live: AI forecast accuracy vs planner override accuracy, broken out by demand event type, visible in the product from first use',
        'Bias tracking: flags part categories where the team is systematically over- or under-forecasting, with root cause attribution',
      ],
      moat: 'FVA tracking as a native product metric. Planners see the measured value of AI vs their overrides — the product earns trust through a visible track record.',
    },
    {
      n:      '03',
      label:  'Supply Matching',
      period: 'Months 12–18',
      color:  '6B3FA8',
      scope: [
        'Demand-Supply Matching Engine: approved demand plans flow into serialized inventory matching — AOG risk scored per tail against confirmed supply positions',
        'Repositioning recommendations with explicit trade-off surface: solving one tail\'s risk at the cost of another\'s is shown, not hidden',
        'S&OP package auto-generated: actuals variance, root-cause attribution, FVA metrics, and forward plan delivered 48 hours before the meeting',
      ],
      moat: 'Closing the demand-to-supply loop in a single product. The S&OP meeting now runs on Partcast output — switching cost begins to compound.',
    },
    {
      n:      '04',
      label:  'Agentic Planning',
      period: 'Months 18–24',
      color:  C.accent,
      scope: [
        'Autonomous forecast agents: AD Compliance Agent, AOG Risk Scoring Agent, and S&OP Package Agent operate continuously — planners work in exception-based mode',
        'Planner supervision UX: full visibility into what the agent acted on autonomously, what it escalated, and why — autonomy is granted incrementally by category',
        'Agentic scope defined by demonstrated FVA track record: agents earn autonomous action in the categories where their accuracy is proven',
      ],
      moat: 'Knowledge graph becomes institutional memory — it has learned every override pattern, every utilization anomaly, every supplier reliability signal for this specific operator. Irreplaceable.',
    },
  ];

  const phW = (W - 0.7 - 0.45) / 4;
  const phX0 = 0.35;
  const phY = 1.0;

  phases.forEach((ph, i) => {
    const x = phX0 + i * (phW + 0.15);

    // Header box
    rect(s, x, phY, phW, 0.72, ph.color);
    txt(s, ph.n, x + 0.1, phY + 0.04, 0.5, 0.36, {
      size: 20, bold: true, color: C.white,
    });
    txt(s, ph.label, x + 0.1, phY + 0.06, phW - 0.15, 0.32, {
      size: 13, bold: true, color: C.white, align: 'right',
    });
    txt(s, ph.period, x + 0.1, phY + 0.44, phW - 0.15, 0.24, {
      size: 9.5, color: C.white, italic: true, align: 'right',
    });

    // Scope area
    rect(s, x, phY + 0.72, phW, 3.62, C.offwhite, C.lgray);
    txt(s, 'Scope', x + 0.1, phY + 0.78, phW - 0.2, 0.25, {
      size: 9, bold: true, color: ph.color,
    });
    ph.scope.forEach((item, si) => {
      txt(s, '▸  ' + item, x + 0.1, phY + 1.07 + si * 0.74, phW - 0.2, 0.72, {
        size: 9, color: C.gray, valign: 'top',
      });
    });

    // Moat box
    rect(s, x, phY + 4.34, phW, 1.08, 'FFF7F0', C.accent);
    rect(s, x, phY + 4.34, phW, 0.26, C.accent);
    txt(s, 'Moat being built', x + 0.1, phY + 4.35, phW - 0.2, 0.24, {
      size: 8.5, bold: true, color: C.white, valign: 'middle',
    });
    txt(s, ph.moat, x + 0.1, phY + 4.64, phW - 0.2, 0.74, {
      size: 8.5, color: C.gray,
    });
  });

  // Arrow between phases
  phases.forEach((_, i) => {
    if (i < phases.length - 1) {
      const ax = phX0 + (i + 1) * (phW + 0.15) - 0.13;
      arrow(s, ax, phY + 0.36 - 0.01, 0.12, false, C.white);
    }
  });

  // Phase 1 callout
  rect(s, phX0, 5.5, phW, 0.42, 'FFF2CC', 'C9A800');
  txt(s, '⚡  Phase 1 delivers standalone value. This is not a 24-month wait for ROI.',
    phX0 + 0.1, 5.5, phW - 0.2, 0.42, {
      size: 9, bold: true, color: '7A5800', valign: 'middle',
    });
})();

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 10 — Why This Becomes a Great Business
// ═══════════════════════════════════════════════════════════════════════════════
(function () {
  const s = pptx.addSlide();
  header(s, 'ICP → Wedge → Moat → Irreplaceable');
  footer(s, 10);

  const sections = [
    {
      label: 'ICP',
      color: C.navy,
      body: [
        'Mid-to-large airline-affiliated or independent MRO operator',
        '50+ aircraft under management, 10+ stocking locations',
        'SAP or IFS as ERP — existing system records, no greenfield data',
        'Dedicated S&OP process that already produces a consensus demand plan',
        'Recent AOG event, service level miss, or supplier disruption creating active pain',
        'Planning team sophisticated enough to understand forecast accuracy as a KPI',
      ],
    },
    {
      label: 'Wedge',
      color: C.blue,
      body: [
        'Entry point: the demand review workflow — replaces the spreadsheet-and-email cycle',
        'No supply-side integration required for initial value delivery',
        'Phase 1 delivers measurable ROI in 90 days: FVA tracking, cycle time reduction',
        'Creates the clean labeled demand signal dataset that powers everything downstream',
        'Sits alongside the existing ERP — no rip-and-replace, no implementation risk',
      ],
    },
    {
      label: 'Expansion',
      color: '1A6B3A',
      body: [
        'Horizontal within account: demand analyst → supply planner → S&OP leader → VP Ops',
        'Each persona has a distinct workflow — each expansion adds a new ACV layer',
        'Vertical across accounts: as MRO provider fleet coverage deepens, introduce airline-side connected view of MRO forward demand position — cross-org data product no ERP can offer',
        'ACV target: $400K–$1.2M per enterprise account at maturity',
      ],
    },
    {
      label: 'Moat',
      color: C.accent,
      body: [
        'Data moat: accumulated record of every recommendation, every override, and every actuals outcome — 18 months with one customer at 100 aircraft produces a planning feedback dataset no competitor can replicate without identical customer relationships',
        'Workflow moat: when the S&OP meeting rhythm is organized around the Partcast-generated package, switching is not replacing software — it is rebuilding the meeting, retraining the team, and losing FVA visibility leadership has come to rely on',
      ],
    },
  ];

  const colW = (W - 0.7 - 0.45) / 4;
  const colY = 1.0;
  const colH = 5.95;

  sections.forEach((sec, i) => {
    const x = 0.35 + i * (colW + 0.15);

    // Header
    rect(s, x, colY, colW, 0.52, sec.color);
    txt(s, sec.label, x, colY, colW, 0.52, {
      size: 18, bold: true, color: C.white, align: 'center', valign: 'middle',
    });

    // Arrows between columns
    if (i < sections.length - 1) {
      arrow(s, x + colW + 0.02, colY + 0.26, 0.11, false, C.lgray);
    }

    // Body
    rect(s, x, colY + 0.52, colW, colH - 0.52, C.offwhite, C.lgray);
    sec.body.forEach((item, bi) => {
      const yItem = colY + 0.62 + bi * 0.82;
      rect(s, x + 0.08, yItem, 0.06, 0.06, sec.color);
      txt(s, item, x + 0.22, yItem - 0.05, colW - 0.32, 0.82, {
        size: 9.5, color: C.gray, valign: 'top',
      });
    });
  });
})();

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 11 — On AI Trust
// ═══════════════════════════════════════════════════════════════════════════════
(function () {
  const s = pptx.addSlide();
  header(s, 'We Are Not Asking You to Trust the Model. We Are Asking You to Evaluate Its Reasoning.', 17);
  footer(s, 11);

  const cols = [
    {
      head:  'Show the work, not just the answer',
      color: C.navy,
      body:
        'Every recommendation surfaces the specific signals that drove it — AD number, affected tails, per-tail time-to-compliance calculations, demand impact in units per signal. The planner evaluates a chain of reasoning, not a probability score.\n\nIf the planner knows that tail N1234 was just sold to another operator, they override the recommendation with that context, and the model updates. The recommendation is not a black-box output — it is a structured argument the planner can agree or disagree with at each signal level.',
    },
    {
      head:  'Make confidence tangible as operational trade-offs',
      color: C.blue,
      body:
        'A confidence interval expressed as "82% probability" is not actionable for a planner deciding whether to authorize a purchase order. The same uncertainty expressed as "holding 4 units covers expected demand; holding 6 units covers the scenario where tail N5678\'s check accelerates; holding 2 units leaves you exposed if any AD compliance event triggers before the next order window" is a decision a planner can make.\n\nPartcast converts statistical uncertainty into inventory risk language that maps directly to the operational choices available and the dollar cost of each.',
    },
    {
      head:  'Build trust through a visible track record',
      color: '1A6B3A',
      body:
        'From the first week of production use, Partcast\'s FVA dashboard shows AI forecast accuracy against planner-overridden accuracy, by demand event type. After six months, the planner can see that the AI was more accurate in 73% of AD-driven demand events but that they consistently made better calls on unscheduled removal demand — where they have fleet-level reliability data that is not yet in the system.\n\nThat visibility does two things: it shows the AI earning trust where it has earned it, and it gives the planner a clear signal about what context they should be providing to the system to improve it.',
    },
  ];

  const colW = (W - 0.7 - 0.4) / 3;
  const colY = 0.97;
  const colH = 5.35;

  cols.forEach((col, i) => {
    const x = 0.35 + i * (colW + 0.2);

    // Header box
    rect(s, x, colY, colW, 0.55, col.color);
    txt(s, col.head, x + 0.1, colY + 0.05, colW - 0.2, 0.48, {
      size: 11, bold: true, color: C.white, valign: 'middle',
    });

    // Body
    rect(s, x, colY + 0.55, colW, colH - 0.55, C.offwhite, C.lgray);
    txt(s, col.body, x + 0.12, colY + 0.68, colW - 0.24, colH - 0.68 - 0.1, {
      size: 10, color: C.gray, valign: 'top',
    });
  });

  // Bottom bold sentence
  const bsY = colY + colH + 0.2;
  rect(s, 0.35, bsY, W - 0.7, 0.62, C.navy);
  txt(s,
    '"The goal is not to replace your planners. It is to make them measurably better — and to give you visibility into where planning value is created or lost."',
    0.5, bsY + 0.04, W - 1.0, 0.56, {
      size: 13, bold: true, color: C.white, align: 'center', valign: 'middle', italic: true,
    });
})();

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 12 — Key Metrics
// ═══════════════════════════════════════════════════════════════════════════════
(function () {
  const s = pptx.addSlide();
  header(s, 'How We Know It Is Working');
  footer(s, 12);

  txt(s,
    'Every metric below is measurable from day one of production use. None require waiting for Phase 2 or later — the audit trail, FVA tracking, and cycle time instrumentation are built into Phase 1.',
    0.4, 0.94, W - 0.8, 0.48, { size: 11, color: C.gray, italic: false });

  addTable(
    s,
    ['Metric', 'Definition', 'Baseline Today', 'Target at 12 Months'],
    [
      [
        'Forecast Value Add (FVA)',
        '% of cases where AI forecast is more accurate than planner-overridden forecast, measured at actuals close',
        { text: 'Unmeasured — no attribution system exists; overrides are not tracked', color: C.accent },
        { text: 'AI outperforms human override in >15% more cases', color: '1A6B3A', fill: 'F0FFF4' },
      ],
      [
        'AOG Risk Coverage',
        '% of AOG events that were preceded by a Partcast early-warning flag in the prior 30-day window',
        { text: '0% — no proactive risk scoring exists in current tooling', color: C.accent },
        { text: '>80% of AOG events preceded by an active Alert or Critical flag', color: '1A6B3A', fill: 'F0FFF4' },
      ],
      [
        'Demand Review Cycle Time',
        'Calendar days from signal update to approved consensus plan — from trigger to planner sign-off',
        { text: '~10 days — manual reconciliation across disconnected systems', color: C.accent },
        { text: '<2 days — AI pre-builds the recommendation; planner evaluates and approves', color: '1A6B3A', fill: 'F0FFF4' },
      ],
      [
        'Override Attribution Rate',
        '% of planner overrides that have a documented structured rationale — reason category plus free-text explanation',
        { text: '<10% — the vast majority of overrides are undocumented and untraceable', color: C.accent },
        { text: '>90% — mandatory structured rationale capture built into the override flow', color: '1A6B3A', fill: 'F0FFF4' },
      ],
      [
        'Planner Adoption Rate',
        '% of demand analysts using the AI-generated forecast as their starting point rather than building from scratch',
        { text: '0% — the tool does not exist', color: C.accent },
        { text: '>80% of active demand analysts at 6 months post-launch', color: '1A6B3A', fill: 'F0FFF4' },
      ],
    ],
    0.35, 1.5, W - 0.7,
    [2.55, 3.9, 3.0, 3.03],
    0.86
  );
})();

// ─── Write file ───────────────────────────────────────────────────────────────
pptx.writeFile({ fileName: OUT_PATH }).then(() => {
  console.log('');
  console.log('✓  Deck written to:', OUT_PATH);
  console.log('');
  console.log('Slide list:');
  console.log('  01 — Partcast (Title)');
  console.log('  02 — The Most Tractable Demand Planning Problem in Manufacturing...');
  console.log('  03 — The Tools Are Built for the Wrong Problem');
  console.log('  04 — Five Structural Characteristics That Define a Categorically Different Planning Problem');
  console.log('  05 — Four Personas. Three Agents. One Planning Loop.');
  console.log('  06 — Four Layers. One Closed Loop.');
  console.log('  07 — The Planner Experience: From Signal to Approved Forecast in One Screen');
  console.log('  08 — Agent Workflow: AD Compliance Demand Agent');
  console.log('  09 — From Wedge to Moat — 24 Months');
  console.log('  10 — ICP → Wedge → Moat → Irreplaceable');
  console.log('  11 — We Are Not Asking You to Trust the Model. We Are Asking You to Evaluate Its Reasoning.');
  console.log('  12 — How We Know It Is Working');
  console.log('');
}).catch(err => {
  console.error('Error generating deck:', err);
  process.exit(1);
});
