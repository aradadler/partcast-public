# Partcast — Screen 1: Demand Review Dashboard

---

## Design Principles (Applied Throughout All Screens)

These principles govern every layout and interaction decision in this spec. Apply them consistently.

**Information density over whitespace.** The primary user is an MRO Demand Analyst running a demand review cycle at a desktop workstation. They are working with many rows of data simultaneously. Compact tables, tight spacing, and multi-panel layouts are correct. Generous whitespace and large hero areas are not appropriate for this tool.

**Clear primary action on every screen.** At no point should the planner be unsure what to do next. One action per screen should be visually dominant — larger, filled button, contrasting color — and it should be obvious.

**AI-generated content is visually distinct from human-entered data.** Use a consistent visual treatment throughout all screens to distinguish AI recommendations from human inputs or approved values. A good approach: AI-generated values appear with a small AI icon or chip label (e.g., a subtle filled badge reading "AI") next to the value, rendered in a muted blue or violet tint. Human-entered or approved values appear in standard black text with no badge. This distinction must be apparent at a glance without reading labels.

**Plain-language explanations, not probability scores.** Wherever confidence or risk is displayed, express it as an operational consequence — units held, AOG exposure, dollar carrying cost — not as a percentage. The goal is to give the planner a decision, not a statistic.

**Domain vocabulary throughout.** Use terminology native to aerospace MRO: tail numbers, ATA chapters, C-checks, airworthiness directives (ADs), S&OP, FVA, AOG risk. This tool is for experts. Do not simplify or generalize domain labels.

---

## Global Layout Shell (Persistent Across All Screens)

**Purpose:** Provides consistent navigation, identity, and cycle context on every screen.

**Position:** Spans the full screen width at the top. Fixed — does not scroll.

**Height:** Compact. Two rows total. First row is the application header. Second row is the cycle context strip.

### Top Application Header Bar (Row 1)

**Left side:** Product logotype — the word "PARTCAST" in a bold, sans-serif typeface. No icon required. Immediately to the right of the logotype, a small text label in muted color reads the organization name, e.g., "Heico MRO." This is the tenant identifier.

**Center:** Empty in this row. Navigation links are not needed in Phase 1 — navigation happens via the sidebar, not a top nav.

**Right side:** The planner's full name and role, e.g., "Sarah Chen — Demand Analyst," followed by a small avatar circle using initials. To the left of the name, a small bell icon for notifications with a numeric badge showing unread count.

**Background:** Dark background — near-black or very dark navy. Light text. This bar anchors the page visually and distinguishes the chrome from the content area.

### Cycle Context Strip (Row 2)

**Purpose:** Gives the planner immediate orientation about where they are in the S&OP calendar. Visible on all screens.

**Background:** One shade lighter than the header bar, but still dark. Light text.

**Left side:** Label "Planning Cycle:" followed by the current cycle name and date range, e.g., "April 2026 S&OP — Apr 1 to Apr 18."

**Center:** A horizontal progress indicator showing the S&OP calendar stages as labeled steps, e.g., "Demand Review → Consensus → Supply Review → Executive Sign-off." The current stage is highlighted (filled dot or underline). Completed stages appear with a checkmark. Future stages appear dimmed. This is a status indicator, not a clickable nav element.

**Right side:** Two small stat chips: "47 pending review" and "12 approved this cycle." These are high-level counters that update in real time. Clicking either chip navigates to the Demand Review Dashboard filtered by that status.

---

## Screen 1: Demand Review Dashboard

**Purpose:** The planner's daily starting point. Provides a full view of the demand review queue, cycle status, and exceptions. The planner arrives here each morning and uses it to decide what to work on first.

**Layout:** Three columns. Left sidebar (approximately 20% width), main content area (approximately 60% width), right sidebar (approximately 20% width). The main content area contains the primary table and tabs. The sidebars contain contextual summary panels.

---

### 1.1 Summary Strip

**Purpose:** Gives the planner an immediate read on the state of the current review cycle before they look at any individual row.

**Position:** Top of the main content area, spanning all three columns. Below the global header and above the main table. Fixed height — two rows of stats presented as a horizontal band of stat cards.

**Content:** Four stat cards in a row, each showing a number and a label:

- **Open for Review** — count of demand recommendations currently in "Pending" or "In Review" status. Label: "Awaiting Review." Colored in amber or orange to signal action is needed.
- **Flagged Exceptions** — count of signals that have changed since the last review cycle and have not yet been reflected in an open recommendation. Label: "New Exceptions." Colored in red or coral to signal urgency.
- **Approved This Cycle** — count of items approved so far in the current planning cycle. Label: "Approved." Colored in green to signal progress.
- **Cycle Progress** — a small radial or linear progress indicator showing percentage of total queue items that have been reviewed (approved or overridden). Label: "Cycle Completion." Neutral color — dark gray.

Each card is compact and bordered. Clicking the "Open for Review" card filters the main table to Pending + In Review rows. Clicking "Flagged Exceptions" switches the main table to the Exceptions tab.

---

### 1.2 Demand Review Queue (Main Table)

**Purpose:** The primary working surface. Lists all parts awaiting review in the current planning cycle. The planner clicks a row to open the Demand Recommendation Detail screen (Screen 2).

**Position:** Center of the main content area, below the Summary Strip. Takes up the majority of the page height. Scrollable — the table is tall enough that the planner will scroll through rows.

**Table columns (left to right):**

1. **Part Number** — alphanumeric, e.g., "PN-78902-A." Monospace font to distinguish it from prose text. Clicking the part number opens Screen 2 (Demand Recommendation Detail). This column is always pinned (does not scroll horizontally if the table is wide).
2. **Part Description** — short plain-language label, e.g., "Hydraulic actuator seal kit." Truncated with ellipsis if too long; full text appears on hover tooltip.
3. **Fleet / Tail Scope** — the tails or fleet type driving this demand item, e.g., "B737-800 / N1234, N5678" or "All A320 fleet." If more than two tails, show "N1234 + 3 more" with a tooltip listing all affected tails.
4. **Current Forecast (units)** — the currently approved forecast quantity for the next 90-day window. Plain black text. No AI badge — this is the human-approved value.
5. **AI Recommended Forecast (units)** — the AI's recommended forecast for the same window. This value always displays with the AI badge (small filled chip reading "AI" in muted blue). If the AI recommendation differs from the current forecast by more than 15%, bold the AI recommended value to draw attention to the discrepancy.
6. **Signal Change** — the primary reason the AI generated or updated this recommendation. Displayed as a short tag or chip indicating the signal type (e.g., "AD Issued," "C-Check Approaching," "Supplier Lead Time Change," "Unscheduled Removal," "Contract SLA"). The chip uses a color coding system: AD-related signals in amber, maintenance event signals in blue, supplier signals in purple, contract signals in teal. Clicking the chip opens a tooltip with the full signal detail text.
7. **Confidence** — the AI's confidence level expressed as a pill badge: "High" (green), "Medium" (amber), "Low" (red/coral). This is not a percentage — it is a categorical label. The confidence level reflects how complete and reliable the input signals are.
8. **Status** — current workflow status of this recommendation. Displayed as a pill badge: "Pending" (gray), "In Review" (blue), "Approved" (green), "Overridden" (purple). Approved and Overridden rows can be filtered out to focus the view on actionable items.

**Sorting:** All columns are sortable by clicking the column header. Default sort is by urgency: items with Low confidence and large forecast changes appear first, followed by High confidence items sorted by days until demand event.

**Filtering:** Above the table, a compact filter bar with the following controls laid out in a single horizontal row:
- Status filter: multi-select dropdown (All / Pending / In Review / Approved / Overridden). Default: Pending + In Review.
- Confidence filter: multi-select dropdown (All / High / Medium / Low).
- Signal Type filter: multi-select dropdown listing all signal change types.
- Search field: free-text search across Part Number and Part Description columns.

Filters are additive. A small "Clear Filters" link appears when any filter is active.

**Row behavior:** Hovering a row highlights it with a subtle background tint. Clicking anywhere in the row opens Screen 2 (Demand Recommendation Detail) for that part. Rows for items in "Approved" or "Overridden" status appear in a slightly lighter shade to visually de-emphasize them relative to actionable rows.

**Empty state:** If all items have been reviewed, show a centered message in the table body: "All items reviewed for this cycle. Next cycle opens Apr 19." with a small checkmark illustration.

---

### 1.3 Left Sidebar: S&OP Milestones and Recent Activity

**Purpose:** Keeps the planner aware of upcoming deadlines and recent team activity without requiring them to leave the dashboard.

**Position:** Left column, spanning the full height of the content area below the Summary Strip. Approximately 20% of the screen width.

**Content — two stacked panels:**

**Panel A: S&OP Calendar (top half of sidebar)**

Label: "This Cycle" as a section header.

A vertical list of upcoming S&OP milestones with dates and status indicators:
- Each milestone is one line: a small colored dot (green = complete, amber = upcoming, red = overdue), the milestone name (e.g., "Demand Review Freeze"), and the date.
- The current milestone (where the team is right now) is bolded and the dot is filled amber.
- Up to 5 milestones shown. A link "View full calendar" appears below the list but is low-priority.

**Panel B: Recently Approved Items (bottom half of sidebar)**

Label: "Recently Approved" as a section header.

A compact vertical list of the last 5 items approved in this cycle. Each entry shows:
- Part number (monospace, links to Screen 2 for that part in read-only mode).
- Part description (truncated).
- Approved by whom and how long ago, e.g., "S. Chen · 2h ago."

If nothing has been approved yet, show: "No approvals yet this cycle."

---

### 1.4 Right Sidebar: FVA Scorecard and Exceptions Alert

**Purpose:** Surfaces AI trust-building data (FVA scorecard) and flags unresolved exceptions at a glance.

**Position:** Right column, spanning the full height of the content area below the Summary Strip. Approximately 20% of the screen width.

**Content — two stacked panels:**

**Panel A: FVA Scorecard (top half of sidebar)**

Label: "AI Accuracy — Last 30 Days" as a section header.

A compact 2×2 grid of comparison stats:
- AI Forecast Accuracy: percentage
- Planner Override Accuracy: percentage
- Cases where AI outperformed overrides: percentage
- Cases where overrides outperformed AI: percentage

Below the stats, one line of bold text summarizing the headline insight, e.g., "AI outperformed overrides by 18% on scheduled maintenance demand."

A link at the bottom: "Full FVA Dashboard →" which navigates to Screen 4.

**Panel B: Open Exceptions (bottom half of sidebar)**

Label: "Unresolved Exceptions" as a section header.

A compact vertical list of the top 3 unresolved exception signals — signals that have changed (new AD issued, tail utilization spike, supplier delivery moved) and have not yet been reflected in an open recommendation. Each entry shows:
- Signal type chip (same color coding as the main table).
- One-line signal description, e.g., "AD 2026-03-18 issued — affects PN-78902-A."
- Time since signal was detected, e.g., "3 days ago."

A link at the bottom: "View all exceptions →" which switches the main content area to the Exceptions tab (see section 1.5 below).

---

### 1.5 Exceptions Tab

**Purpose:** Shows signals that have changed since the last review cycle but have not yet generated an open recommendation or been acknowledged.

**Position:** This replaces the main table content area when selected. Access via a tab toggle above the main table — two tabs: "Review Queue" (default) and "Exceptions."

**Content:** A table with the following columns:
1. Signal Type — chip with color coding matching the main table.
2. Signal Detail — plain language description of what changed, e.g., "Tail N1234: Unscheduled removal of PN-78902-A recorded 2 days ago. No open recommendation exists for this part."
3. Affected Part Numbers — list of part numbers potentially affected. Each is a link that opens a new recommendation draft in Screen 2 or links to the existing row in the review queue if one exists.
4. Detected — timestamp of when Partcast first flagged this signal.
5. Action — a single inline action button: "Create Recommendation" (if no recommendation exists for the affected part) or "View Existing" (if one already exists in the queue).

Rows are sorted by recency (most recent first). Exceptions that have been acknowledged (but not yet actioned) appear in a lighter shade.
