# Partcast — Screen 3: Override Entry Form

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
