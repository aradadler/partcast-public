# Partcast — Demand Review Module: Wireframe Specification

**Document type:** UX design specification for wireframe generation
**Target audience:** Figma AI, visual designer
**Product:** Partcast — AI-native demand planning for Aerospace MRO spare parts
**Scope:** Phase 1 — Demand Review Module (four screens)
**Last updated:** 2026-04-08

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

---

## Screen 2: Demand Recommendation Detail

**Purpose:** The core working screen. A planner arrives here after clicking a row in the Demand Review Queue. This is where the planner evaluates the AI's recommendation, reviews signal evidence, and takes action (approve, override, or escalate). This screen must be self-contained — the planner should be able to make a fully informed decision without leaving it.

**Layout:** A persistent part header at the top. Below that, two columns: the left column takes approximately 60% of the width and contains the forecast comparison chart and action bar. The right column takes approximately 40% of the width and contains the Signal Evidence panel and Confidence/Risk panel. An expandable history section sits at the bottom of the left column. The action bar is fixed at the bottom of the screen.

---

### 2.1 Part Header

**Purpose:** Gives the planner instant orientation about which part they are reviewing and its current supply position.

**Position:** Top of the screen, spanning full width. Below the global header. Fixed — does not scroll.

**Background:** A slightly lighter shade than the main background — a subtle panel differentiation, not a color change.

**Content laid out in a single horizontal row:**

- **Part Number** — large, monospace, prominent. E.g., "PN-78902-A." This is the primary identifier and should be the most visually dominant text element in the header.
- **Part Description** — full description in regular weight text immediately to the right of the part number. E.g., "Hydraulic Actuator Seal Kit."
- **ATA Chapter** — small label chip showing the ATA chapter code and name, e.g., "ATA 29 — Hydraulic Power."
- **On-Hand Inventory** — label "On Hand:" followed by a number and unit, e.g., "On Hand: 4 units." Displayed in bold. If on-hand is below the AI-recommended quantity, this number appears in red.
- **Open POs** — label "Open POs:" followed by count and total units on order, e.g., "Open POs: 2 (6 units expected)." If no open POs, show "Open POs: None" in amber.
- **Supplier Lead Time** — label "Lead Time:" followed by a range, e.g., "Lead Time: 75–90 days." If the lead time exceeds the time to the nearest demand event, display this in red.

At the far right of the header: a small breadcrumb link "← Back to Queue" that returns to Screen 1 without losing the scroll position.

---

### 2.2 Forecast Comparison Panel

**Purpose:** Shows the planner three forecasts side by side — what is currently approved, what the AI recommends, and what a pure statistical baseline would produce — so they can see both the magnitude and direction of the AI's recommendation relative to their existing plan.

**Position:** Left column, top section. Takes up approximately the top 45% of the left column.

**Layout:** Three adjacent chart panels with a shared x-axis (12-month rolling horizon, labeled by month). Each panel is labeled at the top with its type and the total for the period.

**Panel 1 — Current Approved Forecast**
- Label at top: "Current Approved Forecast — 28 units (12 mo)"
- Chart type: simple bar chart. Each bar represents one month. Bars are standard dark gray.
- No AI badge — this is the human-approved plan.

**Panel 2 — AI Recommended Forecast**
- Label at top: "AI Recommended — 34 units (12 mo)" with the AI badge chip inline.
- Chart type: same bar chart format as Panel 1 for easy visual comparison. Bars are rendered in the muted blue used for AI content throughout the app.
- Where the AI recommended value is higher than the current approved value for a given month, that month's bar has a subtle upward delta indicator (a small triangle or the bar renders slightly taller with a distinct top segment). Where lower, a downward delta indicator.

**Panel 3 — Statistical Baseline**
- Label at top: "Statistical Baseline — 21 units (12 mo)"
- Chart type: same bar chart format. Bars are rendered in a lighter gray to indicate this is the least-preferred reference.
- Small tooltip on hover: "Statistical baseline uses consumption history only and does not account for maintenance event calendar signals."

All three panels must use the same y-axis scale so bar heights are directly comparable. A thin vertical red dashed line on all three charts marks "today" and the current planning horizon boundary (90 days out).

Below the three chart panels: a one-line text summary rendered in a slightly larger font: "AI recommends increasing demand by 6 units (+21%) over the 12-month horizon, driven by 2 upcoming maintenance events." This summary line bridges the visual chart and the Signal Evidence panel to the right.

---

### 2.3 Signal Evidence Panel

**Purpose:** The most important element on this screen. Shows the specific signals that caused the AI to generate its recommendation — in the order of their influence. This panel is the AI showing its reasoning, not a probability score. The planner should be able to evaluate each signal independently and decide whether they agree with the AI's interpretation.

**Position:** Right column, top section. Takes up approximately the top 60% of the right column.

**Label:** "Why the AI Recommends This" as a section header, rendered in the AI badge color (muted blue) to reinforce that this content is AI-generated reasoning.

**Content:** A vertical list of signal entries. Each signal entry is a card-like row with a clear separator between entries. Between 2 and 6 signals are typically shown, ranked by contribution to the recommendation.

**Each signal entry contains:**

- **Signal Type Badge** — a colored chip on the left indicating the signal category: "Maintenance Event" (blue), "AD Compliance" (amber), "Flight Schedule" (teal), "Contract SLA" (green), "Supplier Lead Time" (purple). Uses the same color system as the main queue table.
- **Signal Detail** — plain-language description of the specific signal immediately below the badge. This is the most important text on the card and should be rendered in normal weight at readable size. Example: "Tail N1234: 12,000-hr C-check due in 67 days at current utilization rate of 420 hrs/month. Maintenance program specifies 2 units of PN-78902-A required at this check type."
- **Demand Impact** — on the right side of the signal entry, a small bold number showing the unit impact of this specific signal on the recommendation. E.g., "+2 units" in the AI badge color. This tells the planner the quantitative contribution of each signal to the total recommendation change.

Signals are listed in descending order of demand impact — the signal contributing the most units appears first.

**Below the signal list:** A small note in muted text: "These signals were evaluated as of [timestamp]. If any of these signals are no longer accurate, use Override to enter your revised assessment."

**Interaction:** Each signal entry is individually expandable. Clicking the signal detail text expands the entry to show additional metadata: the source system where this signal originated (e.g., "Maintenance Event Calendar — last synced 6h ago"), the raw data value (e.g., "Current flight hours: 10,847. Check interval: 12,000 hrs. Projected check date: June 14, 2026"), and a small "Flag as incorrect" link that routes a data quality issue to the planner review queue.

---

### 2.4 Confidence and Risk Panel

**Purpose:** Translates the AI's statistical confidence into operational language the planner can use to make a stocking decision. Avoids probability scores entirely. Uses inventory risk language.

**Position:** Right column, below the Signal Evidence Panel. Takes up approximately the remaining 40% of the right column.

**Label:** "Confidence and Inventory Risk" as a section header.

**Confidence summary (top of panel):**

A confidence badge (High / Medium / Low, same pill style as the queue table) followed immediately by one to two plain-language sentences explaining what is driving the confidence level. Examples:
- High: "All input signals are current and from verified sources. The maintenance event calendar and flight schedule are synchronized and up to date."
- Medium: "Supplier lead time data for this part was last updated 34 days ago and may not reflect current conditions. Demand estimate is reliable; procurement window has higher uncertainty."
- Low: "Tail N5678's flight schedule has not been updated in 14 days. The demand estimate for this tail is based on its previous utilization rate, which may have changed."

**Inventory Risk Table (below confidence summary):**

A compact three-row table. Each row represents a different stocking scenario. Column headers: Scenario, Units, Demand Coverage, Exposure, Carrying Cost Impact.

Row 1 — Conservative (below AI recommendation): E.g., "Hold 4 units / Current Approved" — Coverage: "Covered for statistical baseline. Exposed if C-check on N1234 triggers early or AD compliance accelerates." — Exposure: "AOG risk: Moderate" — Cost: "—"

Row 2 — AI Recommended (middle row, visually highlighted as the recommended option): E.g., "Hold 6 units / AI Recommended" with the AI badge — Coverage: "Covered for all identified scheduled events. Uncovered only for simultaneous unscheduled removals on two tails." — Exposure: "AOG risk: Low" — Cost: "+$8,400 carrying cost vs. current"

Row 3 — Buffer (above AI recommendation): E.g., "Hold 8 units / Full Buffer" — Coverage: "Covered for all scenarios including two simultaneous unscheduled removals." — Exposure: "AOG risk: Minimal" — Cost: "+$16,800 carrying cost vs. current"

The AI Recommended row (Row 2) uses the AI badge color as a subtle background tint to visually distinguish it as the recommendation without making it appear mandatory.

---

### 2.5 History Panel (Expandable)

**Purpose:** Gives the planner a longitudinal view of this part's forecast history, including all previous overrides and their documented rationales, and actual consumption outcomes. This enables the planner to see whether past overrides for this part were accurate.

**Position:** Left column, below the Forecast Comparison Panel. Collapsed by default. A toggle button or expand chevron opens it.

**Label when collapsed:** "History — 6 prior forecasts, 2 overrides" (the numbers update dynamically).

**When expanded:** A timeline table with the following columns:
- Cycle (e.g., "Mar 2026 S&OP")
- AI Recommended (units) — with AI badge
- Approved / Overridden (units) — plain text if approved, with "Override" label if changed
- Override Reason — shows the structured reason category and rationale if an override was made. If approved as recommended, shows "Accepted AI recommendation."
- Actual (units) — actual consumption recorded. Available for closed cycles only. If the actual is closer to the AI recommendation than to the override, render the actual in the AI badge color. If the actual is closer to the override, render it in green.

This table tells a story over time: did the planner's overrides add value for this specific part?

---

### 2.6 Action Bar

**Purpose:** The planner's decision point. Three clearly distinct actions with no ambiguity about what each one does.

**Position:** Fixed at the very bottom of the screen, spanning the full screen width. Always visible regardless of scroll position. Clearly separated from the content above by a divider line.

**Background:** Slightly elevated — a subtle shadow or slightly lighter background to make the bar feel anchored and permanent.

**Actions, left to right:**

**Left side — Escalate to S&OP (Tertiary Action)**
- Button style: text button or outlined button with low visual weight. No fill.
- Label: "Escalate to S&OP"
- Color: standard gray.
- Clicking opens a small inline popover anchored to the button that prompts: "Add a note for the S&OP team (optional)" with a text field and a "Send to S&OP Queue" confirmation button. The item then moves to the S&OP collaborative review queue. The planner stays on Screen 2 after submission; the status badge in the header updates to "Escalated."

**Center — Override (Secondary Action)**
- Button style: outlined button with medium visual weight. Not filled.
- Label: "Override Recommendation"
- Color: outlined in a neutral dark color, not red or amber (override is a normal part of the workflow, not an error state).
- Clicking triggers the Override Entry Form (Screen 3), which appears as an inline panel that slides in from the right, partially overlapping the right column. Screen 2 remains visible underneath at reduced opacity.

**Right side — Approve (Primary Action)**
- Button style: large, filled button. This is the most visually prominent element in the action bar.
- Label: "Approve AI Recommendation"
- Color: filled green.
- Clicking approves the AI-recommended forecast value for this item. A brief inline confirmation animation updates the status badge at the top of the page from "Pending" to "Approved" in green. A toast notification appears briefly: "PN-78902-A approved for April 2026 cycle." The planner is then automatically advanced to the next "Pending" item in the queue (next row in order from Screen 1). If no pending items remain, the screen shows a cycle-complete state with a link back to the dashboard.

---

## Screen 3: Override Entry Form

**Purpose:** Captures a structured override when the planner disagrees with the AI recommendation. Ensures every override has a documented rationale. Appears as an inline side panel over Screen 2 — not a separate page.

**Layout:** Slides in from the right as a panel that covers approximately 45% of the screen width. Screen 2 content remains visible to the left at reduced opacity. The planner can glance back at the signal evidence and forecast charts while filling out the override form. A semi-transparent overlay covers the portion of Screen 2 visible behind the panel but does not block it entirely — the planner can still read the underlying data.

**The panel has a header, a form body, a preview section, and a footer with actions.**

---

### 3.1 Panel Header

**Position:** Top of the override panel.

**Content:**
- Title: "Override Recommendation" in medium-weight text.
- Below the title, a reference line showing the part context: "PN-78902-A — Hydraulic Actuator Seal Kit" in smaller text, and then a second reference line: "AI Recommendation: 34 units (12-month horizon)" with the AI badge.
- A close icon (×) at the top right that cancels and dismisses the panel, returning Screen 2 to its full-width state.

---

### 3.2 Reason Category Selector

**Purpose:** Requires the planner to classify their rationale before they can type free text. This structured field is what makes the override data useful for FVA analysis and pattern detection over time.

**Position:** First form field in the panel body, directly below the header.

**Label:** "Reason for Override" with a required field indicator.

**Input type:** Single-select dropdown. Options (exactly as listed, these are the fixed taxonomy):

1. Fleet change not yet in system
2. Supplier reliability concern
3. Contract amendment pending
4. AD compliance timeline changed
5. Other (requires explanation)

When "Other" is selected, a secondary text field appears below the dropdown with the label "Specify reason" (required). This extra field does not appear for the other four categories.

---

### 3.3 Free-Text Rationale Field

**Purpose:** Requires a human-readable explanation of the override decision. This becomes part of the permanent audit trail.

**Position:** Second form field, directly below the reason category selector.

**Label:** "Rationale" with a required field indicator.

**Input type:** Multi-line text area. Minimum height is 4 lines. Character counter displayed below the field.

**Validation:** A minimum of 20 characters is required. If the planner tries to submit with fewer than 20 characters, the field border turns red and an inline error message appears: "Please provide a more detailed rationale (minimum 20 characters)."

**Placeholder text:** "Explain what information or context caused you to disagree with the AI recommendation. This rationale will be retained in the audit trail and used to evaluate override accuracy over time."

---

### 3.4 Revised Forecast Entry

**Purpose:** Captures the planner's revised forecast value at monthly granularity for the next 6 months.

**Position:** Third form field in the panel body, below the rationale field.

**Label:** "Your Revised Forecast" with a required field indicator.

**Layout:** A compact inline table with 6 columns (one per month for the next 6 months, labeled by abbreviated month name, e.g., "May," "Jun," "Jul," "Aug," "Sep," "Oct"). Each cell contains a numeric input field pre-populated with the AI-recommended value for that month (shown in the AI badge color as the default). The planner edits the cells where they disagree.

A total row at the bottom of the table automatically sums the 6-month total and updates in real time as the planner edits values. Below the total, a comparison line in muted text: "AI Recommended Total: 17 units. Your Total: — units." This updates as the planner types.

---

### 3.5 Planner Confidence Selector

**Purpose:** Captures the planner's own confidence level in their override, which feeds into FVA analysis.

**Position:** Fourth form field, below the revised forecast entry.

**Label:** "Your Confidence Level" with a required field indicator.

**Input type:** A set of three radio buttons styled as pill toggles in a horizontal row. Options: "High," "Medium," "Low." No default selection — the planner must choose.

---

### 3.6 Audit Trail Preview

**Purpose:** Shows the planner exactly how their override will appear in the permanent audit trail before they submit. This reinforces that the record is being kept and gives the planner a chance to review their inputs before committing.

**Position:** Below the form fields, above the action buttons. Separated from the form by a divider line.

**Label:** "Audit Trail Preview" in muted italic text.

**Content:** A read-only text block that assembles the planner's inputs into a formatted audit record, updating in real time as they type. Example rendered output:

> Override submitted by Sarah Chen on Apr 8, 2026 at 14:32.
> AI Recommendation: 34 units. Planner Override: 31 units.
> Reason: Contract amendment pending.
> Rationale: "Operator has verbally confirmed that the scheduled C-check on N1234 will be deferred by 45 days pending engine shop workload. Formal amendment expected within 5 business days."
> Planner Confidence: Medium.

Fields that have not been filled in yet appear as underlined blank spaces in the preview, e.g., "Reason: ___." This gives the planner a clear visual of what is still incomplete.

---

### 3.7 Panel Footer Actions

**Position:** Fixed at the bottom of the override panel. Always visible regardless of scroll position within the panel.

**Two actions:**

**Left — Cancel**
- Button style: text button, no fill, no border.
- Label: "Cancel"
- Clicking dismisses the override panel. Screen 2 returns to full width. No data is saved. A brief confirmation popover asks "Discard override?" with "Yes, discard" and "Keep editing" options to prevent accidental loss of work.

**Right — Submit Override**
- Button style: large, filled button.
- Label: "Submit Override"
- Color: a distinct color that is not the same green as the Approve button on Screen 2. A solid dark blue or indigo is appropriate — it signals a deliberate, considered action.
- Clicking submits the override, dismisses the panel, updates the part status to "Overridden" in the Screen 2 header, and advances the planner to the next pending item in the queue (same behavior as Approve).

---

## Screen 4: FVA and Accuracy Dashboard

**Purpose:** The trust-building screen. Gives the planning team visibility into whether AI recommendations or planner overrides have been more accurate over time, broken down by demand event type. Accessible from the FVA Scorecard link in the Screen 1 right sidebar. Also accessible as a standalone view for the S&OP Leader.

**Layout:** Full-width content area. No persistent sidebars. Three sections stacked vertically: a headline callout at the top, a 12-month accuracy chart in the middle, and a detailed breakdown table and supporting panels at the bottom.

---

### 4.1 Headline Insight Callout

**Purpose:** Surfaces the single most important insight from the FVA data in plain language. Ensures the planner immediately understands the takeaway without having to interpret charts.

**Position:** Top of the content area, directly below the global header. Spans full width.

**Visual treatment:** A high-contrast banner or card with a filled background in a neutral dark color. White text. Prominent, legible font.

**Content:** A single bold sentence of plain-language insight followed by one sentence of supporting detail. The content is dynamically generated from the FVA data. Example:

> "Over the last 90 days, AI recommendations outperformed planner overrides by 18% on scheduled maintenance demand."
> Planners outperformed AI by 23% on unscheduled removal demand — an area where fleet-level reliability context not yet in the system provides meaningful edge.

A date range selector sits at the top right of this callout: "Last 30 days / Last 90 days / Last 12 months / Custom." Changing the date range refreshes all data on the page. Default: Last 90 days.

---

### 4.2 12-Month Rolling Accuracy Chart

**Purpose:** Shows three forecast accuracy trends over time so the planner can see whether AI accuracy is improving, whether overrides are consistently better or worse than the AI in specific periods, and how both compare to the statistical baseline.

**Position:** Main content area, below the headline callout. Takes up approximately 40% of the page height. Wide, full-width chart.

**Chart type:** Line chart with three lines sharing a common x-axis (months) and y-axis (forecast accuracy percentage, where 100% = perfect accuracy).

**Three lines:**

1. **AI Forecast Accuracy** — solid line in the muted blue used for AI content throughout the app. Labeled directly on the chart at the right endpoint.
2. **Planner-Overridden Forecast Accuracy** — solid line in dark gray or dark green. Labeled directly at the right endpoint.
3. **Statistical Baseline Accuracy** — dashed line in light gray. Labeled directly at the right endpoint. Presented as a reference floor.

A horizontal dashed line marks the "AI baseline" level (the expected accuracy if the AI recommendations are followed as-is across all items). This makes it easy to see when planner overrides in aggregate moved accuracy above or below this line.

Each data point on the chart is hoverable, showing a tooltip with the month, the accuracy percentage for each of the three lines, and the number of forecast events that contributed to that month's calculation.

Below the chart: a small legend explaining the three lines and a footnote: "Accuracy measured as Mean Absolute Percentage Error (MAPE) against actuals. Lower MAPE = higher accuracy."

---

### 4.3 Accuracy Breakdown Table by Demand Event Type

**Purpose:** Decomposes the aggregate accuracy numbers by demand event category. This is where the planner discovers where AI outperforms them (typically scheduled maintenance with clean signal data) and where their domain knowledge adds genuine value (typically unscheduled removals where the system lacks fleet reliability context).

**Position:** Left section of the bottom area, taking approximately 55% of the width. Below the accuracy chart.

**Label:** "Accuracy by Demand Event Type" as a section header.

**Table structure:**

Column headers: Demand Event Type | AI Forecast Accuracy | Planner Override Accuracy | Verdict | # of Events

**Rows (one per demand event category):**

1. Scheduled Maintenance
2. AD Compliance
3. Unscheduled Removal
4. Contract-Driven Demand
5. Aggregate (a summary row, bolded, at the bottom)

**Accuracy columns:** Show the accuracy metric (e.g., MAPE percentage or a simple "X% accurate" format). Each cell is color-coded: green if accuracy is above 85%, amber if 65–85%, red below 65%.

**Verdict column:** A three-state badge indicating which approach is performing better in this category: "AI leads" (shown in AI badge color), "Override leads" (shown in green), or "No difference" (shown in gray). The verdict is determined by statistical significance — small sample sizes show "Insufficient data" in muted gray.

This table is the core analytical output that shapes how the planning team should think about when to override. It should be readable at a glance.

---

### 4.4 Top Overrides Panel

**Purpose:** Shows the 10 most impactful overrides in the selected period — overrides where the planner changed the forecast by the largest absolute unit amount — along with the outcome (was the override more or less accurate than the AI recommendation?).

**Position:** Right section of the bottom area, taking approximately 45% of the width, to the right of the Accuracy Breakdown Table. Below the accuracy chart.

**Label:** "Most Impactful Overrides" as a section header.

**Content:** A compact vertical list of 10 entries. Each entry shows:

- Part number (monospace, links to Screen 2 for that part in historical read-only mode).
- Part description (truncated).
- Override delta: e.g., "AI: 34 units → Override: 28 units (−6 units)."
- Outcome badge: "Override was more accurate" (green) or "AI was more accurate" (amber/red with AI badge) based on comparison to actuals.
- Override reason category (the structured tag the planner selected when entering the override).

Entries are sorted by absolute override impact (largest unit change first). Entries where the AI was more accurate are subtly highlighted with a light amber background to encourage reflection.

A summary line at the bottom of the panel: "In this period, 6 of the 10 most impactful overrides resulted in less accurate forecasts than the AI recommendation."

---

### 4.5 Bias Indicator Panel

**Purpose:** Shows whether the planning team as a whole is systematically over-forecasting or under-forecasting, broken down by demand event type.

**Position:** Bottom of the page, spanning full width, below both the Accuracy Breakdown Table and the Top Overrides Panel.

**Label:** "Forecast Bias" as a section header.

**Layout:** A horizontal row of five panels — one for each demand event category (same categories as the breakdown table) plus one aggregate panel.

Each panel contains:
- The category name.
- A centered horizontal bar chart (a "bias meter") ranging from −50% to +50% with zero in the center. The bar extends left for under-forecasting bias and right for over-forecasting bias. The bar is colored amber for any bias above ±10%, and green for bias within ±10%.
- A label below the bar: e.g., "Over by 12% on average" or "Within expected range."
- The source (AI or Override) that is contributing most to the bias.

The aggregate panel is sized slightly larger than the category panels and appears on the far left for visual hierarchy.

Below all five panels: a brief explanatory note in muted text: "Bias measures whether forecasts are consistently too high (over-forecasting) or too low (under-forecasting) relative to actuals. Persistent bias in either direction suggests a systematic input signal issue."

---

## Agentic Workflow Specifications

Partcast's agents are not autonomous decision-makers. They are reasoning partners that perform the signal reconciliation work a demand analyst previously did by hand — pulling from maintenance event calendars, AD feeds, flight schedules, supplier portals, and ERP history — and then surface a structured argument for a recommended action. The agent's job ends at the moment a judgment call is required. At that point the human takes over: they review the agent's reasoning, apply context the system cannot see, and make a decision. That decision is then fed back into the agent as a labeled training signal. Autonomy is not assumed from day one — it is earned incrementally through a demonstrated track record of correct recommendations, measured by FVA against actuals, in each specific category of demand event. An agent that has earned a high FVA score on AD compliance demand may still require human review on unscheduled removal demand where its signal coverage is incomplete. The trust boundary is maintained at the category and signal type level, not as a global on/off switch.

---

### Agent 1: AD Compliance Demand Agent

#### Trigger

Activates when a new Airworthiness Directive is published to the FAA or EASA regulatory feed monitored by the Signal Ingestion Layer. Also activates when an existing AD record in the system has its compliance deadline updated — whether because the regulatory authority issued a revision, because the operator's maintenance tracking system reported a change in a tail's modification status, or because a planner manually flagged a data discrepancy that resulted in a corrected compliance date.

Each triggering event creates a discrete agent run scoped to that AD. Runs are independent: a batch of three new ADs published in the same feed update creates three separate agent runs, each processed in sequence.

#### Reasoning Chain

**Step 1 — Parse the AD document.**
The agent reads the full AD text from the regulatory feed. It extracts and structures the following fields into a normalized AD record: affected aircraft types and model variants (e.g., Boeing 737-800, all series), affected part numbers with their role in the compliance requirement (e.g., PN-78902-A: replace at compliance; PN-78903-B: inspect, replace if defective), compliance deadline type (hard time: replace by a fixed flight-hour or calendar threshold; on-condition: replace only if inspection finding meets criteria; out-of-phase: replace at next scheduled check opportunity), approved alternative parts if any (part numbers that can substitute for the primary affected part), and the compliance threshold expressed as flight hours, calendar date, or cycles, whichever is most restrictive.

Output: a structured AD record with all fields above populated. Fields that could not be reliably extracted are flagged with a confidence score below 0.7 and queued for planner review rather than propagated downstream. The agent does not proceed to Step 2 for any field that remains unresolved.

**Step 2 — Identify in-scope tail numbers.**
The agent cross-references the AD's affected aircraft types against the operator's registered fleet in the system. It applies three filters in sequence: aircraft type match (e.g., only 737-800s are in scope), modification status match (some ADs exempt tails that already have a specific modification embodied — the agent checks each tail's modification history against the AD's exemption criteria), and operator assignment (only tails under active contract with the operator using this Partcast instance are included).

Output: a list of in-scope tail numbers with their modification status confirmed. Tails where modification status is uncertain (data not in system or last updated more than 30 days ago) are flagged as having unresolved status and handled via a separate confidence downgrade in Step 6.

**Step 3 — Calculate time-to-compliance per tail.**
For each in-scope tail number, the agent calculates the time remaining before the AD compliance threshold is reached. The calculation uses: current flight hours from the maintenance tracking system feed (timestamp noted), the tail's rolling average utilization rate calculated from the last 90 days of flight schedule data (daily block hours), and the compliance threshold from the AD record.

Formula: days to compliance = (compliance threshold in flight hours − current flight hours) ÷ daily utilization rate.

Where the compliance threshold is a calendar date rather than flight hours, the calculation is simpler: days to compliance = compliance date − today.

Where both a flight-hour threshold and a calendar date apply, the agent uses whichever produces the shorter time-to-compliance (the more restrictive constraint).

Output: a per-tail compliance timeline table — tail number, current flight hours, utilization rate, days to compliance, compliance date (projected). Tails with utilization data more than 7 days stale are flagged.

**Step 4 — Assess inventory and procurement position.**
For each part number identified in Step 1, the agent queries: current on-hand serialized inventory count and the airworthiness certification status of each unit (only units with valid certificates count toward coverage), open purchase orders with confirmed delivery dates and quantities, and the most recently confirmed supplier lead time for this part number.

Output: an availability table — part number, on-hand certified units, units on confirmed PO due within the compliance window, total units available within the procurement window (on-hand + confirmed POs with delivery before compliance date), and confirmed supplier lead time in days.

**Step 5 — Calculate the demand gap.**
For each affected part number, the demand gap is: units required to achieve compliance across all in-scope tails minus units available within the procurement window (from Step 4). If the gap is positive, a procurement action is needed. If the gap is zero or negative, coverage is sufficient but margin may be thin.

The gap is broken out per tail, not just in aggregate, because a planner may need to make tail-specific decisions about prioritization if total supply is constrained.

Output: a demand gap table — part number, total units required, units available, gap (positive = shortfall, negative = surplus), and a per-tail breakdown showing which tails are driving the gap.

**Step 6 — Assign confidence level.**
The agent evaluates confidence based on the quality of the inputs that drove the demand gap calculation.

**High confidence** requires all of the following: the AD is a hard-time directive (no on-condition ambiguity), all in-scope tail modification statuses are confirmed and current, utilization rate data is less than 7 days stale for all affected tails, supplier lead time is a confirmed vendor commitment (not an estimate), and no approved alternative parts are unmapped in the system.

**Medium confidence** applies when any of the following is true: one or more tail utilization records are 7–30 days stale, supplier lead time is an estimate rather than a confirmed commitment, or the AD is on-condition and the inspection finding rate for this part type in this fleet is based on a sample of fewer than 10 historical events.

**Low confidence** applies when any of the following is true: one or more in-scope tails have unresolved modification status, utilization data is more than 30 days stale for any tail, the AD references approved alternative parts that are not yet mapped to their part numbers in the system, or the compliance deadline type is ambiguous in the document and could not be reliably classified.

Output: a confidence level (High / Medium / Low) and a list of specific confidence flags — each flag names the exact data gap and the tail or part number it affects.

#### Decision Logic

**If demand gap > 0 and confidence is High:**
The agent generates a demand adjustment recommendation, sets its priority to Urgent, and places it in the planner's Demand Review Queue (Screen 1). The recommendation is pre-populated with the AI-recommended forecast quantity equal to the demand gap from Step 5. The Signal Evidence panel (Screen 2, Section 2.3) is populated with all signals from the reasoning chain. No additional planner input is flagged as required before approval — the planner can approve immediately if they agree with the reasoning.

**If demand gap > 0 and confidence is Medium:**
The agent generates the demand adjustment recommendation with Urgent priority and places it in the queue. The recommendation is generated but the Signal Evidence panel includes a "Data Gaps" subsection rendered in amber, listing each confidence flag from Step 6 with a plain-language description of what the planner should verify before approving. The Approve button on Screen 2 is not disabled — the planner can override the advisory and approve — but a brief inline note appears above the action bar: "Review flagged data gaps before approving." The planner's options are: Approve (accepting the gaps), Override with rationale, or Flag data gap for resolution (which routes the specific gap to the data quality queue and holds the recommendation in a Pending — Data Verification status).

**If demand gap = 0 but time-to-compliance is less than 2× the supplier lead time:**
The agent does not generate a procurement recommendation. Instead it creates a Watch Item — an entry in the Exceptions panel on the Demand Review Dashboard (Screen 1, Section 1.4, Panel B) with status "Narrow Margin" and a plain-language note: "Coverage appears sufficient for [AD number] compliance across [N] tails, but procurement window closes in [X] days. Any reduction in available units or extension in lead time would create a gap." No queue entry is created. The watch item auto-resolves when the compliance deadline passes.

**If confidence is Low:**
The agent generates a draft recommendation marked "Requires Planner Input" and places it in the queue. The item appears in the queue table (Screen 1) with a distinct status badge — "Input Required" in red — rather than the standard Pending badge. The Signal Evidence panel on Screen 2 prominently shows the unresolved questions at the top, above the signal list, in a red-bordered callout box: "The following information is needed before this recommendation can be assessed." Each unresolved question is listed as a single sentence identifying what is unknown and why it matters. The planner cannot approve this item directly — the Approve button is replaced with a "Resolve Data Gaps" button that opens a structured form for the planner to enter the missing information. Once all gaps are resolved, the recommendation re-runs Steps 5 and 6 with the updated data and re-enters the normal decision logic above.

#### Human Handoff

When a planner opens an AD-triggered recommendation from the queue, Screen 2 (Demand Recommendation Detail) surfaces the following content specific to this agent type:

The part header (Section 2.1) is unchanged — part number, on-hand, open POs, and supplier lead time are displayed as normal. The lead time field is highlighted in red if it exceeds the days to compliance for the nearest affected tail.

The Signal Evidence panel (Section 2.3) leads with the AD signal as the first and highest-impact entry. The signal entry shows: the AD number and title (e.g., "AD 2026-03-18: Hydraulic Actuator Seal Kit — Mandatory Replacement at 12,000 Flight Hours"), the compliance deadline type (e.g., "Hard Time — no extensions permitted"), and the demand impact in units for this AD signal alone.

Below the primary AD entry, there is one signal sub-entry per in-scope tail number, each showing: tail number, current flight hours, projected days to compliance, and the unit contribution from this tail to the total demand gap. These sub-entries are collapsed by default (showing only tail number and days to compliance) and expand on click to show the full calculation.

If confidence is Medium, the "Data Gaps" subsection follows the signal list — each gap rendered as a row with a amber warning icon, the gap description, and a "Flag for resolution" inline link.

If confidence is Low, the unresolved questions callout box appears above the entire signal list, not below it. This ensures the planner sees the blockers before they read the supporting evidence.

The Inventory Risk panel (Section 2.4) is populated with scenarios anchored to the compliance deadline: "Hold X units: covered for compliance on all tails by [compliance date]. Hold Y units: covered for all tails except N5678 if utilization rate increases above [threshold]. Hold Z units: full buffer including on-condition inspection findings."

The planner's decision is one of: Approve the AI-recommended quantity, Override with a revised quantity and documented rationale, or Flag data gap for resolution (which holds the item pending the data update).

#### Learning Loop

After the compliance deadline passes for each AD, the system records the actuals outcome: how many units of each affected part number were actually consumed for compliance purposes across all in-scope tails. This actuals record is joined back to the original recommendation record.

Three signals are captured and logged to the agent's feedback dataset:

**Decision record:** The agent's recommended quantity, the planner's approved or overridden quantity, and the reason category if overridden. This is the primary training signal.

**Accuracy outcome:** The difference between the approved quantity and actual consumption. If the agent's original recommendation was closer to actuals than the planner's override, this is logged as an AI-correct / override-incorrect event for FVA tracking. The inverse is logged as override-correct. Both outcomes are tagged with the confidence level the agent assigned and the specific confidence flags that were active — this allows the system to learn whether its confidence calibration is accurate (i.e., do Low-confidence recommendations actually result in more override-correct outcomes than High-confidence ones?).

**Utilization rate error:** The difference between the projected utilization rate the agent used in Step 3 and the actual utilization rate observed over the compliance window. This signal feeds a utilization rate estimation model that adjusts per-tail rate estimates over time, particularly for tails with irregular utilization patterns.

These signals are reviewed in the FVA and Accuracy Dashboard (Screen 4) at the aggregate level. At the agent level, they update the confidence threshold calibration on a rolling 90-day basis — if the agent's High-confidence recommendations are producing accuracy outcomes that look more like its Medium-confidence recommendations in practice, the thresholds are tightened.

---

### Agent 2: AOG Risk Scoring Agent

#### Trigger

Runs continuously on a configurable cadence. The default scoring cycle is every 6 hours, applied to all tail numbers in the monitored fleet. The cadence can be configured by the system administrator per operator — a high-utilization narrow-body fleet serving short-haul routes may warrant a 2-hour cadence; a low-utilization fleet in long-term storage can run at 24 hours.

The agent also triggers immediately — outside the normal cadence — when any of the following real-time events occur: an unscheduled removal event is logged to the maintenance tracking system for any in-scope tail, a supplier updates a confirmed delivery date on any open purchase order (advance or delay), a flight schedule change materially affects a tail's projected utilization by more than 15% over the next 30 days, or a new demand recommendation is approved or overridden for a part associated with any in-scope maintenance event.

Each cadence run produces a complete re-score for all tails. Each real-time trigger produces a targeted re-score for the tails and parts directly affected by the triggering event, with all other tail scores carried forward from the last cadence run.

#### Reasoning Chain

**Step 1 — Assemble the maintenance event horizon per tail.**
For each tail number in the monitored fleet, the agent pulls all scheduled maintenance events, AD compliance deadlines, and life-limited part replacement thresholds falling within the next 180 days. Sources: the maintenance event calendar feed, the AD compliance records generated by Agent 1, and the life-limited parts register maintained in the ERP. Events beyond 180 days are excluded from active scoring but retained in a lookahead buffer that populates the watch status band.

Output: a per-tail event list — event type, event date or flight-hour threshold, projected event date (calculated using the same utilization rate method as Agent 1, Step 3), and the list of parts required for each event with quantities.

**Step 2 — Cross-reference parts against inventory and in-transit stock.**
For each (tail, event, part number) tuple in the event list, the agent checks: certified on-hand serialized inventory count at the facility designated for this tail's maintenance, units in transit on confirmed purchase orders with delivery dates before the event date, and any existing demand recommendations in the queue that already address this part — noting whether they are Pending, Approved, or Overridden and the approved quantity if resolved.

Output: a coverage table — for each (tail, event, part number), the units available within the event window versus the units required. Where a demand recommendation already exists for a part, the agent uses the approved quantity if approved, or the AI-recommended quantity if still pending, to determine forward coverage.

**Step 3 — Calculate coverage ratio and flag gaps.**
For each row in the coverage table, the coverage ratio is: units available within the event window ÷ units required. A ratio of 1.0 means exactly covered. Below 1.0 means a gap exists. Above 1.0 means surplus.

Any (tail, event, part number) tuple with a coverage ratio below 1.0 is flagged as a coverage gap and carried forward to Step 4. Tuples with a ratio between 1.0 and 1.2 are flagged as thin coverage — technically covered but without meaningful buffer — and noted separately.

Output: a coverage gap list (ratio < 1.0) and a thin coverage list (ratio 1.0–1.2).

**Step 4 — Weight gaps by AOG consequence.**
Not all coverage gaps carry the same operational risk. The agent weights each gap by two factors:

First, event proximity weight: gaps on events within 30 days receive a weight of 3.0; events 31–60 days out receive 2.0; events 61–90 days out receive 1.5; events beyond 90 days receive 1.0.

Second, consequence weight: the agent pulls the operator's contract SLA for the tail's assigned operator. The SLA record contains the financial exposure for an AOG event (daily revenue loss, crew cost, passenger compensation, and any contractual penalty provisions). This financial exposure value is normalized against the fleet average to produce a relative consequence multiplier — a tail whose AOG would cost 2× the fleet average gets a multiplier of 2.0.

The weighted gap score for each (tail, event, part number) row is: coverage shortfall in units × event proximity weight × consequence weight.

**Step 5 — Aggregate to a tail-level AOG Risk Score.**
The tail-level AOG Risk Score (0–100) is computed by summing weighted gap scores across all events and parts for that tail, then normalizing against a calibrated scale. The score has four additive components:

Parts coverage gap: the sum of weighted gap scores from Step 4, normalized to a 0–60 point contribution. This is the heaviest-weighted component because a confirmed parts gap is the most direct AOG precursor.

Time proximity to next check: a 0–20 point contribution based on the days to the nearest scheduled event. The contribution is maximum (20 points) when the event is within 14 days and zero when the nearest event is beyond 90 days.

Supplier lead time versus time available: a 0–10 point contribution that increases as the ratio of supplier lead time to days available for procurement approaches 1.0. A part where the lead time equals the days available to act scores the full 10 points.

Historical unscheduled removal rate for this airframe type: a 0–10 point contribution based on the rolling 12-month average unscheduled removal frequency for parts of the type involved in the nearest event, for this specific airframe model. This component represents background noise — the risk of an unanticipated demand event independent of the scheduled maintenance calendar.

Output: a tail-level AOG Risk Score from 0 to 100, with a score card showing the point contribution of each component and the specific event and part driving the highest contribution.

**Step 6 — Detect fast-moving risk.**
After computing scores for the current run, the agent compares each tail's current score to its score from the previous run (for cadence runs) or from the last full cadence run (for real-time triggered runs). Any tail whose score has increased by more than 15 points in a single cycle is flagged as Fast-Moving Risk — regardless of its absolute score level. A tail that was at 45 and jumped to 62 in one cycle is operationally more urgent than a tail that has been sitting stably at 70, because the jump indicates a new development (a new unscheduled removal, an unexpected utilization spike, a supplier delay) that may not yet have generated a demand recommendation.

Output: a fast-moving risk flag with the score delta and the specific input change that drove the increase.

#### Decision Logic

**Score 0–40 (Normal):**
No action is generated. The tail's score is logged to the scoring history. The tail does not appear in the Exceptions panel or the review queue. The score remains accessible in the tail-level AOG risk detail view but requires no planner attention.

**Score 41–65 (Watch):**
The tail is surfaced in the Exceptions panel on the Demand Review Dashboard (Screen 1, Section 1.4, Panel B) with a Watch badge and its current score and trend arrow (up, down, or stable). No demand recommendation is generated automatically unless a coverage gap already exists that meets the recommendation generation threshold. The watch entry gives the planner visibility that this tail is accumulating risk, without requiring immediate action. Watch items with a fast-moving risk flag (from Step 6) are surfaced at the top of the Exceptions panel, above static watch items.

**Score 66–85 (Alert):**
The agent generates a demand recommendation for the specific parts driving the score elevation. The recommendation is placed in the planner's review queue with High priority. The queue row (Screen 1, Section 1.2) shows the Signal Change chip as "AOG Risk: Alert" in red. The part header on Screen 2 (Section 2.1) displays the AOG Risk Score badge — a prominent red number badge reading "Risk: 74" — immediately to the right of the part number. The planner receives an in-app notification via the bell icon in the global header (a new notification appears with the tail number and score). If the fast-moving risk flag is active, the notification is promoted to a higher visual weight — bolder text, different notification icon — to distinguish a rapidly developing situation from a stable Alert.

**Score 86–100 (Critical):**
The agent generates a demand recommendation with Urgent priority and places it in the review queue. Additionally — beyond the planner notification — the agent creates a separate escalation record sent to the S&OP Leader role within the same Partcast tenant. This escalation appears as a dedicated notification in the S&OP Leader's view and adds the item to their S&OP review queue with a "Critical AOG Risk" tag. The recommendation's action bar (Screen 2, Section 2.6) displays a countdown in the bar: "Procurement window closes in N days" where N is calculated as days to event minus supplier lead time. This countdown renders in red and updates each time the screen loads. The Approve button label changes to "Approve — Time Sensitive" to reinforce urgency without disabling the standard workflow.

**Score change of +15 or more in one cycle, regardless of absolute score:**
The fast-moving risk flag is activated. If the resulting score falls in the Watch band, the tail is promoted to the top of the Exceptions panel regardless of score order. If the resulting score falls in Alert or Critical, the standard Alert or Critical logic applies and the fast-moving flag is appended to the recommendation as an additional signal entry in the Signal Evidence panel, labeled "Risk Acceleration" and showing the score change, the input that drove it, and the cycle in which it was detected.

#### Human Handoff

For a Critical status item, the planner opens Screen 2 (Demand Recommendation Detail). The screen is modified in the following ways:

The part header (Section 2.1) shows the AOG Risk Score badge prominently — a large red badge reading "AOG Risk: 91" positioned immediately after the part description, before the ATA chapter chip. The badge is the most visually prominent element in the header aside from the part number itself.

Below the part header, before the forecast comparison panel, a full-width critical alert banner is inserted. It contains the plain-language AOG summary in a single readable paragraph, e.g.: "Tail N1234 is 34 days from a scheduled C-check. PN-78902-A requires 3 units for this check. Current on-hand certified inventory: 1 unit. Confirmed supplier lead time: 28 days. If a purchase order is not initiated within 6 days, the procurement window closes and on-time delivery for this check cannot be guaranteed." The banner background is a deep red or coral. White text. No icons needed — the text is the signal.

The forecast comparison panel (Section 2.2) is still present but reduced in height. For a Critical AOG item, the planner's attention should be on the action bar and the signal evidence, not the 12-month forecast chart.

The Signal Evidence panel (Section 2.3) leads with the AOG Risk Score breakdown as its first entry — not a conventional signal chip, but a structured score card showing the four score components (parts coverage gap, time proximity, supplier lead time ratio, historical removal rate) as labeled rows with their point contributions. This gives the planner the score's internal structure at a glance. Below the score card, the individual signal entries follow in the normal format.

The Inventory Risk panel (Section 2.4) uses time-anchored scenario language for Critical items: "Order today (6 units): delivery arrives 8 days before check. Full coverage. $8,400 carrying cost. Order in 3 days (6 units): delivery arrives 5 days before check. Covered but no buffer for shipping delays. Order after 6 days: lead time exceeds time available. AOG risk becomes probable."

The action bar (Section 2.6) shows the procurement window countdown as described above.

#### Learning Loop

After each maintenance event or AD compliance deadline passes for a monitored tail, the system performs a retrospective and logs two primary signal types:

**False negatives** occur when an AOG event happens on a tail that was scored below 65 in the 30 days prior to the event. The agent identifies the specific signal that was absent or underweighted: was the unscheduled removal rate too low? Was utilization data stale? Was a supplier delivery recorded as confirmed when it was actually at risk? Each false negative is logged with the signal attribution, and these logs accumulate into a signal quality review report that is surfaced to the system administrator quarterly.

**True positives** occur when a tail was scored above 85, a planner took action based on the recommendation (approved a demand and subsequent supply recommendation), and the maintenance event completed without an AOG. The agent logs the specific signal weights that were active when the recommendation was generated and reinforces their contribution to future scoring by a small incremental factor on a rolling 90-day average. This is a slow, conservative reinforcement — AOG avoidance events are too infrequent to support aggressive model updates.

**Score calibration drift** is detected when the distribution of scores across the fleet begins to cluster at the extremes (many Critical items) or at the floor (most tails at 0–20 even during active maintenance periods). Drift in either direction triggers a recalibration audit: the system flags the pattern for a data scientist or system administrator to review the scoring weights rather than auto-adjusting, because miscalibration in a risk scoring system can have operational consequences that warrant human oversight.

All learning loop outputs feed the FVA and Accuracy Dashboard (Screen 4) — false negatives appear as AOG Coverage misses in the performance metrics, and true positives contribute to the AOG Risk Coverage metric defined in the key metrics table.

---

### Agent 3: S&OP Package Agent

#### Trigger

Activates on a scheduled basis, 48 hours before the S&OP review meeting date configured in the system calendar. The 48-hour window is intentional: it gives the agent enough time to complete a full synthesis run, allows the S&OP Leader to review and annotate the package before the meeting, and still reflects the most current demand and supply data.

The agent can also be triggered manually by any user with the S&OP Leader role from Screen 1 via a "Generate S&OP Package" button in the sidebar. Manual triggers are useful mid-cycle when an external shock (a major AD, a supplier disruption, a contract amendment) has materially changed the demand picture since the last scheduled package was generated. Manual triggers regenerate the full package — they do not append to the prior version.

The agent does not run for individual planning items — it is a cycle-level synthesis agent. It operates on the full dataset of approved recommendations, override records, actuals, and AOG risk scores for the closing planning cycle.

#### Reasoning Chain

**Step 1 — Compute actuals variance versus the approved consensus plan.**
The agent pulls the approved consensus demand plan for the planning cycle that is closing — the set of demand quantities that were approved (either as AI recommendations or planner overrides) during the review phase. It joins this against the actuals consumption records from the ERP for the same period and the same part numbers.

For each part number, variance is: approved forecast quantity minus actual consumption. A positive variance means the team over-forecasted; a negative variance means they under-forecasted. The agent calculates variance in two units simultaneously — unit variance and estimated inventory value variance (unit variance × standard cost per part).

Variances are then grouped along two dimensions: by part category (the ATA chapter grouping or whatever classification system the operator uses) and by demand event type (Scheduled Maintenance, AD Compliance, Unscheduled Removal, Contract-Driven).

Output: a variance table — part number, part category, demand event type, approved quantity, actual quantity, unit variance, value variance. Subtotals by category and event type.

**Step 2 — Classify the root cause of material variances.**
For each variance whose absolute value exceeds the materiality threshold (default: unit variance > 10% of the approved quantity, or value variance > $50,000; both thresholds are configurable per operator), the agent runs root cause attribution.

Root causes are classified into four mutually exclusive categories:

**Model error:** The AI-generated forecast before any override was farther from actuals than the override. The agent had the data it needed but weighted signals incorrectly. Evidence: the original AI recommendation is available in the audit trail; comparing it to actuals shows the override was closer.

**Override error:** The planner's override moved the forecast in the wrong direction relative to actuals. The AI recommendation would have been more accurate. Evidence: the override record in the audit trail shows the planner changed the AI value; actuals are closer to the pre-override AI value.

**External shock:** A material demand signal arrived after the planning cycle closed — a new AD issued after the freeze date, an unscheduled removal that had no prior signal, a fleet grounding due to an external event. The forecast at close-of-cycle was reasonable given available information; the variance was caused by events that could not have been predicted. Evidence: the system's event log shows the relevant signal arrived after the cycle freeze date.

**Data gap:** A relevant signal was not available in the system at planning time — a flight schedule not yet loaded, a supplier lead time not yet updated, a tail's modification status unknown. The forecast was limited by data availability, not model or human error. Evidence: the signal quality log shows a gap in the relevant data source during the cycle.

For cases where multiple root causes contributed, the agent assigns a primary root cause (the larger contributor) and notes secondary factors.

Output: a root cause attribution table, one row per material variance, with the classified root cause, the evidence basis, and the dollar value of the variance attributed to that cause.

**Step 3 — Summarize the top AOG risk items requiring decisions.**
The agent pulls the current AOG Risk Score for all tail numbers in Alert (66–85) or Critical (86–100) status from Agent 2's most recent scoring run. For each such tail, it pulls the associated demand recommendations — approved, pending, or overridden — and summarizes the action state: what has been done, what is still pending, and how much time remains before the procurement window closes.

The agent produces a ranked list of at most 5 AOG risk items requiring meeting attention, sorted by urgency score (Critical tails first, then by procurement window countdown). Items where a recommendation has already been approved and the supply action is in progress are excluded — they are resolved and do not require meeting discussion.

Output: a risk summary list — tail number, current AOG Risk Score, primary risk driver (the part and event creating the gap), action status (pending/approved/overridden), and days remaining to act.

**Step 4 — Calculate period FVA metrics.**
The agent computes the Forecast Value Add metrics for the closing cycle using the variance and attribution data from Steps 1 and 2:

AI forecast accuracy: average MAPE for AI-recommended values, measured before any planner override, against actuals. Computed for the full cycle and broken out by demand event type.

Override accuracy: average MAPE for planner-overridden values against actuals. Computed only for the subset of items where an override occurred.

Cases where AI outperformed override: percentage of overridden items where the AI pre-override recommendation was closer to actuals than the override value.

Override attribution rate: percentage of all overrides in the cycle that have a documented structured rationale. This is an input quality metric, not an accuracy metric.

Bias direction by category: for each demand event type, the net direction of forecast error — whether the team as a whole over-forecasted or under-forecasted in that category, and by how much on average.

Output: the FVA metrics table. These values populate Screen 4 (FVA and Accuracy Dashboard) for the closed cycle.

**Step 5 — Assess supply matching coverage.**
The agent cross-references the approved demand plan for the opening cycle (the plan being carried into the next review period) against confirmed supply positions — on-hand inventory, open POs with confirmed delivery dates, and any repositioning recommendations that have been approved.

For each demand item in the opening cycle plan, the coverage state is one of: fully covered (confirmed supply >= demand), partially covered (confirmed supply > 0 but < demand), or uncovered (no confirmed supply within the demand window). The agent calculates the total inventory value at risk from uncovered and partially-covered demand items.

Output: a supply coverage summary — percentage of opening cycle demand items by coverage state, total value at risk from uncovered items, and the top 5 uncovered demand items by value.

**Step 6 — Synthesize the S&OP package structure.**
The agent assembles all outputs from Steps 1–5 into a structured three-section S&OP package:

**Section 1 — Actuals Review:** What happened in the closing cycle and why. Includes the variance table (Step 1), the root cause attribution summary (Step 2), and the FVA metrics (Step 4). The narrative framing distinguishes between variances that indicate a process problem (Model error, Override error) and variances that were unavoidable (External shock, Data gap).

**Section 2 — Risk Review:** What needs a decision at this meeting. Includes the AOG risk item list (Step 3) and the uncovered demand items from supply matching (Step 5). Each item in this section has a recommended action and a deadline. Items requiring a decision at the meeting are flagged explicitly — the S&OP Leader should not have to infer which items are urgent.

**Section 3 — Forward Plan:** What the AI is recommending for the next cycle and where planner input is still needed. This section summarizes the opening cycle demand plan, lists items that are still in Pending or Requires Planner Input status, and identifies any items where Agent 1 or Agent 2 has generated a new recommendation since the last review cycle closed.

**Package classification:** The agent assigns a package status based on the outputs:

**Green** — if no material variances exceed threshold AND no items are in Critical AOG risk status AND supply coverage for the opening cycle is above 90%.

**Amber** — if one or more material variances exist but root causes are External shock or Data gap (not process failures), OR if one or more items are in Alert AOG status but no items are Critical.

**Red** — if one or more material variances are classified as Model error or Override error, OR if any item is in Critical AOG risk status, OR if supply coverage for the opening cycle is below 80%.

The package status (Green / Amber / Red) appears as a prominent badge on the package cover page and drives the tone of the headline summary (Step 6 output).

#### Decision Logic

**If no variances exceed the materiality threshold AND no items are Critical AOG risk status:**
Package status is Green. The agent generates the full package in the standard format. The Actuals Review section is brief — a single summary table with a note that no material variances occurred. The meeting agenda can focus on the Forward Plan.

**If variances exceed threshold AND root cause is External shock:**
Package status is at most Amber (may be Green if all other criteria are met). The Actuals Review section flags the variance for awareness but frames it explicitly as an external event, not a process failure. The FVA metrics for this cycle exclude External shock items from the accuracy calculation, with a footnote explaining the exclusion. The agent does not escalate this as a process review trigger.

**If variances exceed threshold AND root cause is Model error OR Override error:**
Package status is at least Amber. The Actuals Review section includes a process review flag — a highlighted callout box identifying the pattern (e.g., "3 of the 5 material variances in this cycle were Override errors in Unscheduled Removal demand. The FVA data suggests AI recommendations outperformed planner overrides by 34% in this category this cycle."). The flag does not assign blame — it surfaces a pattern for the team to discuss. The S&OP Leader can annotate the flag with a meeting decision before closing the package.

**If any item is in Critical AOG risk status:**
Package status is Red. The Critical item is placed at the very top of the Risk Review section with a full-width red alert banner. The recommended decision and the deadline are stated in plain language in the banner. The package cannot be closed by the S&OP Leader without explicitly recording a decision on each Critical item — whether accepted, modified, or rejected — to ensure accountability.

#### Human Handoff

The S&OP Leader opens the generated package from a link in their notification or from the S&OP queue in Screen 1. The package opens to a one-page executive summary with the following layout:

At the top, the package status badge (Green / Amber / Red) is the first element the S&OP Leader sees — larger than any other element on the page. Immediately below it, the package headline: a two-sentence plain-language summary of the most important things that happened and the most important decisions needed. Example: "This cycle closed with 3 material variances totaling $214K, driven by 2 external shocks and 1 override error in unscheduled removal demand. 2 tails are in AOG Alert status requiring procurement decisions before Apr 14."

Below the headline, four summary stat cards in a horizontal row: FVA headline number for the period (e.g., "AI outperformed overrides in 67% of cases"), count of AOG risk items requiring decisions, top variance amount and root cause category, and opening cycle demand coverage percentage.

Below the stat cards, three section tiles — one per section of the package. Each tile shows a section title, a one-line status, and a count of items requiring decisions within that section. Clicking a tile expands it inline or navigates to the full section view.

The package is not a PDF or a static export. It is a live document inside Partcast. Each item in the Risk Review and Forward Plan sections has an annotation field where the S&OP Leader can type a decision note, a meeting outcome, or an owner assignment. Items that require a decision show a "Record Decision" button that opens a structured input form (decision: Approve / Modify / Defer; owner if deferred; note). The package is marked Closed when the S&OP Leader confirms all required decisions have been recorded. Closing the package triggers the next planning cycle to open.

#### Learning Loop

After each S&OP meeting, the S&OP Leader marks the package as Closed and records the disposition of each recommended action in the Risk Review section: Approved as recommended, Modified (with the modified value or action), or Rejected (with a brief reason).

Three signal types are captured:

**Materiality threshold calibration:** If the S&OP Leader consistently dismisses variances that the agent flagged as material — marking them as "not meeting-worthy" in their annotations — the agent accumulates this feedback and surfaces a threshold adjustment recommendation to the system administrator: "In the last 4 cycles, $X–$Y variances have been consistently dismissed. Consider raising the materiality threshold from $50K to $75K." The threshold is not auto-adjusted; it requires an explicit configuration change.

**Root cause attribution accuracy:** When the S&OP Leader's recorded decision notes contradict the agent's root cause classification — for example, they note "this was a data gap, not an override error, because the contract amendment wasn't in the system" — these corrections are logged as root cause attribution errors. Accumulated corrections are reviewed by the data scientist responsible for the attribution model to identify systematic misclassification patterns.

**Package utility score:** At the time of closing, the S&OP Leader is presented with a single-question rating: "Was this package useful for running the meeting? Yes / Partially / No." If Partially or No, a free-text field captures what was missing or misleading. This qualitative signal is outside the quantitative feedback loop — it is reviewed by the product team to inform package format and content decisions over time.

---

## Navigation Flow

This section describes how the four screens connect to each other and what user actions trigger screen transitions. All transitions preserve the state of the originating screen (scroll position, active filters) so the planner can return to exactly where they left off.

### Primary Flow (The Demand Review Cycle)

The intended daily flow for a demand analyst is a left-to-right pipeline:

1. **Screen 1 → Screen 2:** The planner starts on the Demand Review Dashboard. They scan the Summary Strip to understand cycle status, then work through the Demand Review Queue from top to bottom. Clicking any row opens Screen 2 (Demand Recommendation Detail) for that part.

2. **Screen 2 → Screen 1 (via Approve):** The planner reviews the signal evidence and risk panel, then clicks Approve. The screen automatically advances to the next pending item in the queue (effectively re-entering Screen 2 for the next row). When all items are reviewed, the screen surfaces a cycle-complete state with a link back to Screen 1.

3. **Screen 2 → Screen 3 (via Override):** The planner clicks Override on Screen 2. Screen 3 slides in as an overlay panel on the right side of Screen 2. Screen 2 remains partially visible. After submitting the override on Screen 3, the panel dismisses and Screen 2 advances to the next item (same behavior as Approve).

4. **Screen 2 → Screen 1 (via Escalate):** The planner clicks Escalate to S&OP on Screen 2. A brief inline popover captures an optional note. After submission, the item status updates and Screen 2 advances to the next item. There is no separate screen for escalation — it is handled via the inline popover.

5. **Screen 2 → Screen 1 (via Back):** The planner clicks "← Back to Queue" in the part header and returns to Screen 1. The queue scroll position is preserved.

### Secondary Flow (Trust and Analytics)

6. **Screen 1 → Screen 4 (via FVA Scorecard):** The planner clicks "Full FVA Dashboard →" in the right sidebar FVA Scorecard panel on Screen 1. Screen 4 (FVA and Accuracy Dashboard) loads as a full-page view. A breadcrumb or back link at the top of Screen 4 returns to Screen 1.

7. **Screen 4 → Screen 2 (via Override Link):** In the Top Overrides panel on Screen 4, each override entry is a link. Clicking opens Screen 2 in a historical read-only mode for that part number, showing the forecast, signals, and history from the cycle in which the override occurred. A back link returns to Screen 4.

### Exception Flow

8. **Screen 1 (Exceptions tab) → Screen 2 (via Create Recommendation):** From the Exceptions tab on Screen 1, clicking "Create Recommendation" for an unresolved exception opens Screen 2 in draft mode for that part, pre-populated with the exception signal as the primary signal entry.

### Summary of Triggers

| Trigger | Origin Screen | Destination |
|---|---|---|
| Click any queue row | Screen 1 | Screen 2 |
| Click Approve | Screen 2 | Screen 2 (next item) or Screen 1 if queue empty |
| Click Override | Screen 2 | Screen 3 (inline panel) |
| Submit Override | Screen 3 | Screen 2 (next item) |
| Cancel Override | Screen 3 | Screen 2 (same item, full width restored) |
| Click Escalate to S&OP | Screen 2 | Screen 2 (same item, inline popover, then next item) |
| Click Back to Queue | Screen 2 | Screen 1 (scroll position preserved) |
| Click Full FVA Dashboard | Screen 1 (sidebar) | Screen 4 |
| Click override entry | Screen 4 | Screen 2 (historical read-only) |
| Click Back from FVA | Screen 4 | Screen 1 |
| Click Create Recommendation | Screen 1 (Exceptions tab) | Screen 2 (draft mode) |
| Click Flagged Exceptions chip | Screen 1 (Summary Strip) | Screen 1 (Exceptions tab active) |
| Click Open for Review chip | Screen 1 (Summary Strip) | Screen 1 (queue filtered to Pending + In Review) |
