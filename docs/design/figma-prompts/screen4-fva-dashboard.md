# Partcast — Screen 4: FVA and Accuracy Dashboard

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
