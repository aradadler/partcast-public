# Partcast — Screen 2: Demand Recommendation Detail

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
