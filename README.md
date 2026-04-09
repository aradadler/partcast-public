# Partcast

**AI-native demand planning for Aerospace MRO spare parts.**

---

## Artifacts

This repository contains the full product strategy, UX design specifications, wireframes, and presentation deck for Partcast. Everything is linked below.

**Product Strategy**
- [Full README — you are here](./README.md)
- [Glossary of MRO Planning Terms](./GLOSSARY.md)

**UX Design**
- [Wireframe Specification — all four screens + agentic workflow specs](./docs/design/wireframe-spec.md)
- [Agent Flow Diagrams — Mermaid flowcharts for all three agents](./docs/design/agent-flow-diagrams.md)
- [Figma Prompts — per-screen prompts used to generate wireframes](./docs/design/figma-prompts/)

**Wireframes**
- [Screen 1 — Demand Review Dashboard](./assets/wireframes/Screen1-Dashboard.png)
- [Screen 2 — Demand Recommendation Detail](./assets/wireframes/Screen2-Recommendation%20Detail.png)
- [Screen 3 — Override Entry Form](./assets/wireframes/Screen3-Override%20Form.png)
- [Screen 4 — FVA & Accuracy Dashboard (Part 1)](./assets/wireframes/Screen4-FVA%20Dashboard-part1.png)
- [Screen 4 — FVA & Accuracy Dashboard (Part 2)](./assets/wireframes/Screen4-FVA%20Dashboard-part2.png)
- [Screen 4 — FVA & Accuracy Dashboard (Part 3)](./assets/wireframes/Screen4-FVA%20Dashboard-part3.png)

**Slide Deck**
- [Partcast Strategy Deck — PDF](./slides/partcast-final.pdf)

---

## The Problem

The demand planning process in Aerospace MRO is broken at the root, not at the edges. The surface symptom is familiar: planners are reactive, inventory is chronically imbalanced, and AOG events arrive as surprises. The root cause is a structural mismatch between when demand information becomes visible and when the planning system acts on it.

MRO spare parts demand is not probabilistic in the way that consumer goods demand is. A large portion of it is forward-deterministic. When an aircraft is approaching a C-check, the parts required for that check are knowable weeks or months in advance — they are encoded in the maintenance program, in the tail-number's flight hours log, in the active airworthiness directives governing that airframe type. Flight schedules tell you which tails are flying which routes and at what utilization rates. AD compliance deadlines create hard replacement triggers on specific part numbers. Contract SLAs define which operators you are obligated to serve and with what turnaround time commitments. Supplier lead time feeds — when they exist — tell you how much runway you have to react.

Planners know this. They spend 60 to 70 percent of their demand review cycle manually pulling these signals from disparate systems — ERP exports, airline schedule feeds, FAA and EASA AD portals, supplier portals, and spreadsheets that have accumulated years of institutional knowledge — and reconciling them into a consensus forecast. By the time that forecast reaches the supply chain team, it is already stale. A new AD was issued. A tail had an unscheduled removal. A supplier moved a delivery date. No one updated the plan.

The process fails not because planners are bad at their jobs. It fails because the architecture of the tooling they use was designed around a consumption-history model of demand. SAP IBP, Kinaxis, and Oracle Demantra are powerful platforms built to sense and shape demand in industries where demand signals flow in through point-of-sale systems, distributor orders, or market data feeds. Their statistical models are designed to detect patterns in historical consumption and extrapolate forward. In aerospace MRO, that model is fundamentally wrong. A part that has not been consumed in 18 months is not a slow-mover — it may be a critical component on a fleet that just had a major check completed and will need another in 14 months. Incumbents cannot ingest a maintenance event calendar and translate it into a parts demand signal. They cannot differentiate between a part that failed unexpectedly and one that was scheduled for replacement. They cannot score AOG risk by tail number against current inventory positions. Their data model does not have a concept of airworthiness certification status as a demand modifier. These are not gaps that can be closed with configuration or with a new connector. They reflect a core architectural assumption — that demand is a statistical property of time series, not a structured output of known future events.

The result is that the most analytically tractable demand planning problem in manufacturing — one where a large share of future demand is actually known in advance — is being managed with tools that treat it as if it were unknowable.

---

## Why Aerospace MRO — and Why Now

Aerospace MRO is structurally distinct from every other vertical that demand planning software is built for. That distinctiveness is not incidental — it is the reason a purpose-built solution can win here where generalized platforms cannot.

Demand in MRO is event-driven, not probabilistic. A wing spar inspection does not happen because an operator decided to buy one — it happens because the aircraft hit a flight-hour threshold or because an AD mandated it. The demand trigger is an engineering event with a known time horizon and a specific parts list attached to it. This is categorically different from consumer or industrial demand, where you are forecasting the aggregate behavior of many independent buyers. In MRO, you can reason about individual demand events before they occur.

Inventory is serialized. A part number in aerospace MRO is not a fungible unit. Each part carries a serial number, a maintenance history, a certification status, and a paperwork chain that must be intact for it to be installed on an aircraft. You cannot substitute a part from a different batch without verifying its airworthiness documentation. This means that inventory pooling, substitution, and repositioning logic must account for the legal and regulatory status of each individual unit — a requirement that flat inventory management systems are not designed to handle.

The consequence function for a stockout is binary and catastrophic. In most supply chains, running out of stock degrades service levels — orders are delayed, customers are frustrated. In MRO, running out of a critical part grounds an aircraft. A grounded commercial aircraft costs an operator $150,000 or more per hour in lost revenue, crew costs, and passenger compensation. That consequence function changes the economics of every planning decision. The expected cost of a stockout is not the carrying cost of an incremental unit — it is a fraction of the probability of an AOG event times the cost of that event. Generalized demand planning tools optimize for service level in a symmetric way. MRO planning requires optimizing for AOG avoidance, which is a fundamentally different objective.

Supplier structure eliminates the usual safety valve. In most supply chains, when a forecast misses badly, you can expedite. You go to a distributor, you pay spot price, you solve the problem. In aerospace MRO, many critical parts are single-source: one OEM, 12 to 18 month lead times, no spot market, and in some cases export licensing requirements that add weeks to the procurement timeline. When you are out of the part, you are out. The cost of a forecast miss is not a premium freight charge — it is an aircraft on the ground for weeks.

The organizational structure of MRO adds a final layer of complexity. In many airline MRO relationships, the airline owns the demand — they know the flight schedule, the maintenance program, the tail-specific modification status — and the MRO provider owns the supply and has the contractual obligation to deliver. These are two organizations, often with different ERP systems, different planning cadences, and imperfect information sharing. The demand signal must cross an organizational boundary before it becomes a procurement decision. No generalized planning platform is designed around that information topology.

These five characteristics do not add complexity to a generalized planning problem. They define a categorically different planning problem. A tool built around consumption history can be stretched to approximate some of this. It cannot be built from the ground up to reason about maintenance event calendars, serialize inventory positions against airworthiness status, score AOG risk per tail number, and surface recommendations across an airline-MRO contractual boundary. That product does not exist yet.

The timing is also not accidental. The 2020 supply chain disruption exposed the fragility of MRO inventory strategies built around lean assumptions and reliable supplier performance. Lead times that were measured in weeks stretched to 18 months. Parts that had been reliably available went on allocation. The industry spent two years in reactive mode, and many operators are still rebuilding buffer stock they burned through. That experience created genuine urgency around planning visibility that did not exist before.

2025 tariff volatility has compounded the problem. Components sourced from international suppliers face cost uncertainty that makes procurement planning harder and makes the case for demand accuracy — knowing what you will actually need before you have to order it — more valuable than it has ever been.

The longer-term forcing function is the technician shortage. The industry is projected to need 700,000 additional MRO technicians by 2043 and will not come close to filling that gap. That constraint shifts the economics of MRO operations: every hour a technician spends waiting for a part that should have been on the shelf is an hour of productive capacity lost. Demand planning accuracy becomes a workforce productivity issue, not just a logistics issue.

Finally, the AI necessary to do this well now exists. Reasoning about heterogeneous, forward-looking signals — maintenance event calendars, AD compliance timelines, flight schedules, supplier lead time variability — and producing a coherent, explainable forecast recommendation is exactly the kind of multi-signal reasoning that agentic AI handles well. The maturity of large language models and the infrastructure around them in 2025 makes it feasible to build a planning agent that reads a new airworthiness directive, understands which part numbers it affects, identifies the tails in the fleet where compliance deadlines are approaching, and surfaces a demand adjustment recommendation with an explanation a planner can evaluate — all without a human doing that reconciliation manually.

---

## Who We Build For

**MRO Demand Analyst**

The demand analyst owns the forecast. In practice, they spend most of their week inside spreadsheets and ERP exports, pulling data from systems that were not designed to talk to each other, and trying to reconcile a flight schedule from the airline with a maintenance program database with a parts consumption history that may or may not reflect planned removals versus unscheduled failures. They have no reliable way to know whether last month's spike in a particular part number was a one-time event or a leading indicator of a systemic issue. When they submit their forecast to the S&OP process, they have limited visibility into how it will be used or whether their overrides were right.

Partcast gives the demand analyst an agent that continuously monitors all their signal sources and surfaces a pre-built forecast recommendation for each upcoming review cycle. The analyst comes into their Monday morning demand review with a draft forecast already generated, the top three signals driving each recommendation already surfaced, and any changes since the last cycle already flagged with an explanation. Their job shifts from data assembly to signal evaluation — reviewing the AI's reasoning, applying judgment about things the model cannot see (a new contract amendment that just landed, a conversation with the airline's maintenance director about an upcoming mod program), and approving or overriding with a documented rationale. The cycle time drops from ten days to two. The forecast they submit is better documented and more defensible than anything they could have produced manually.

**Supply Planner**

The supply planner receives the demand plan and translates it into inventory positioning and purchase order decisions. Their current frustration is timing: by the time the consensus forecast reaches them, some of the decisions it was designed to inform have already been made — or the window to act on supplier lead times has passed. They spend significant time in reactive mode, expediting parts after AOG events occur rather than positioning inventory in advance of them. They also have no way to score their current inventory position against forward AOG risk — they can see what they have on hand, but they cannot easily see which tails are at risk given current stock levels.

Partcast's Demand-Supply Matching Engine gives the supply planner a live view of AOG risk by tail number, scored against the current inventory position and pending demand plan. When the demand analyst approves a forecast update, the supply planner immediately sees the downstream implication — which positions are now undersupplied, which repositioning moves are recommended, and what the trade-off is between fulfilling from an existing pool versus initiating a new procurement. The agent flags exceptions and proposed actions; the planner reviews and approves. Reactive firefighting does not disappear, but it becomes a smaller fraction of the job.

**S&OP Leader**

The S&OP leader runs the consensus planning process — the meeting series that aligns commercial, maintenance, and supply chain on a shared plan. In most MRO organizations today, that process is a reconciliation exercise: the first hour of the S&OP meeting is spent figuring out what the current plan actually is and why it changed from last month. There is rarely a single source of truth. The S&OP leader spends their energy managing disagreements about whose numbers are right rather than making forward-looking allocation decisions.

Partcast becomes the S&OP meeting's operating system. The AI-generated demand package — with FVA history, bias analytics, override attribution, and scenario comparisons — arrives before the meeting starts. The agenda can focus on exceptions, trade-offs, and decisions rather than on reconciling data. The S&OP leader can see, for the first time, whether their planning process is actually creating value or whether the human overrides are systematically making the forecast worse. That visibility changes both the quality of the meeting and the accountability structure around it.

**VP MRO Operations**

The VP of MRO Operations is accountable for aircraft readiness and for delivering against the operator's maintenance contract commitments. Their current problem is a visibility gap: they learn about AOG risk when an aircraft is already grounded, not 30 or 60 days before. The leading indicators that would give them early warning — the tail approaching its C-check with a critical part not yet on order, the AD with a compliance deadline inside the supplier lead time window — are buried in systems their team is not synthesizing in real time.

Partcast gives the VP a live AOG risk dashboard: a ranked view of tails by risk level, with the specific demand and inventory factors driving each score. When a risk crosses a defined threshold, the agent escalates it. The VP is no longer dependent on their planning team to surface problems — they can see the forward planning position directly, question specific assumptions, and make resource allocation decisions before the AOG event occurs rather than after.

---

## How Partcast Works

Partcast is organized into four layers, each building on the output of the one above it. The architecture is designed around a fundamental constraint: some of the demand signals it needs to reason about are clean and structured, while others are messy and inconsistent. The system has to handle both without pretending they are equivalent.

**Signal Ingestion Layer**

Data flows into Partcast from six primary source types: flight schedules (typically structured feeds from the airline's operations system), tail-number maintenance event calendars (from the airline's maintenance tracking system or the MRO's own planning system), airworthiness directives (from FAA and EASA regulatory feeds), contract SLAs (semi-structured documents defining the service commitments between the airline and the MRO provider), supplier lead time feeds (often unreliable, inconsistently formatted, and requiring normalization), and historical consumption data from the ERP.

The ingestion layer treats these signal types differently by design. Flight schedules and ADs are highly structured — they have defined schemas, reliable update cadences, and authoritative sources. The ingestion pipeline for these is deterministic: parse, validate, normalize, and load. Supplier lead time data is a different problem. It arrives as emails, PDF attachments, spreadsheet exports, and portal scrapes with inconsistent formats and often uncertain accuracy. For these signals, the ingestion layer uses a combination of document parsing, confidence scoring on extracted data, and a flagging mechanism that routes low-confidence extractions to a planner review queue rather than silently propagating bad data downstream. Contract SLA amendments fall into the same category — they require structured extraction from semi-structured documents, and any change to a contract term that affects demand or supply commitments should surface for human review before it enters the planning model.

```
┌─────────────────────────────────────────────────────┐
│                  Signal Ingestion Layer              │
│  Flight schedules · Tail-number maintenance events  │
│  Airworthiness directives · Contract SLAs           │
│  Supplier lead time feeds · Historical consumption  │
└────────────────────┬────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────┐
│              Demand Intelligence Engine              │
│  Event-driven demand prediction (per tail number)   │
│  ML demand sensing + external signal enrichment     │
│  Confidence intervals · FVA tracking · Bias analytics│
└────────────────────┬────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────┐
│           Collaborative Planning UX (AI-assisted)   │
│  Forecast recommendation + explanation              │
│  Planner approve / override / escalate workflow     │
│  Full audit trail · Override rationale capture      │
└────────────────────┬────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────┐
│            Demand-Supply Matching Engine             │
│  Serialized inventory matching                      │
│  Repositioning recommendations + trade-off surface  │
│  AOG risk scoring per tail number                   │
└─────────────────────────────────────────────────────┘
```

**Demand Intelligence Engine**

This is where the core forecasting logic lives. The engine maintains a demand model per part number per tail number — not an aggregate statistical model over historical consumption, but an event-driven model that reasons forward from the maintenance event calendar. For a given tail, the engine knows its current flight hours, its next scheduled check interval, the parts associated with that check type, the AD compliance deadlines affecting that airframe, and the flight schedule driving its utilization rate. From this it constructs a demand probability distribution: a structured estimate of when each part is likely to be needed, with a confidence interval that reflects the uncertainty in the inputs.

AI is used in two specific places in this layer. The first is signal enrichment: the engine uses an LLM to parse AD documents and extract the affected part numbers, compliance timelines, and replacement quantities into structured records that can be joined against the tail-number inventory position. This is labor that currently falls on planners manually. The second is anomaly detection: an ML model monitors actual consumption against the event-driven forecast baseline, flags deviations that suggest unplanned removals or emerging failure patterns, and routes them for planner review. The deterministic logic — the event-driven demand calculation itself, the part-to-check type mapping, the lead time arithmetic — is not AI. It is structured calculation over structured data. This distinction matters: the model's outputs are auditable not because we can explain a neural network, but because the core demand logic is rules-based and can be shown step by step.

**Collaborative Planning UX**

The UX is the demand analyst's primary workspace. When the analyst opens their demand review, they see a queue of forecast recommendations organized by urgency — parts with upcoming demand events inside the supplier lead time window are surfaced first. For each recommendation, the UI shows the AI's proposed quantity, the confidence interval expressed as an inventory risk range rather than a percentage, the top signals that drove the recommendation (tail N1234 is approaching its 12,000-hour C-check; the active AD on part PN-7890 has a compliance deadline in 45 days; supplier lead time on this part is 90 days), and the history of previous recommendations and overrides for this part.

The analyst can approve the recommendation, adjust the quantity, or escalate it for S&OP review. Any override requires a rationale — a short structured tag (demand event moved, supplier commitment received, contract amendment pending) plus an optional note. That rationale is not bureaucratic overhead. It is the primary input to the FVA and override attribution analysis that tells the organization over time whether human judgment is adding value or removing it.

**Demand-Supply Matching Engine**

Once a demand plan is approved, it flows into the matching engine, which compares it against the current serialized inventory position. This layer is deterministic: given the demand plan and the inventory, it identifies gaps, scores them by AOG risk (probability of grounding times cost consequence), and generates a ranked list of recommended actions — reorder, reposition from another location, flag for expedite. Where trade-offs exist — for example, repositioning a unit solves one tail's risk but increases another's — the engine surfaces both options with the downstream risk implication of each. The planner approves the recommended action, the decision is logged, and the attribution record is updated.

---

## Product Roadmap

**Phase 1: Signal Foundation (Months 0–6)**

Phase 1 establishes the data infrastructure and delivers the demand review workflow as a usable product. ERP historical consumption data and structured flight schedule feeds are ingested and normalized. A deterministic event-driven baseline forecast is generated per part number per tail — not yet ML-enhanced, but already more accurate than a statistical model trained on consumption history, because it is anchored to the maintenance event calendar rather than to past actuals. The demand review UX is live: analysts see AI-generated recommendations with signal explanations, approve or override with documented rationale, and the full audit trail is captured. Phase 1 does not require a data science team and does not require the customer to trust a black box. The moat being established here is behavioral: the override rationale data that planners enter in Phase 1 becomes the training signal that makes the Phase 2 ML model customer-specific.

**Phase 2: AI Sensing (Months 6–12)**

Phase 2 layers ML demand sensing on top of the deterministic baseline. The model is trained on the Phase 1 override and actuals data — it learns the systematic ways in which the event-driven baseline over- or under-predicts demand for specific part types, specific fleet configurations, and specific operators. Confidence intervals appear in the UX and are expressed as operational ranges rather than statistical percentages: "Based on current signals, demand for this part number in the next 90 days is likely between 4 and 7 units. Holding fewer than 4 creates meaningful AOG risk on tail N1234." FVA analytics are live — the analyst can see whether the AI forecast or their overrides have been more accurate over the past six months, by part category and by demand event type. Bias tracking flags systematic patterns: parts where the forecast is consistently late, part categories where the model is persistently high or low. The planning team now has, for the first time, a measurement framework for the quality of their forecasting process.

**Phase 3: Supply Matching (Months 12–18)**

Phase 3 closes the loop between demand and supply. The Demand-Supply Matching Engine is live: approved demand plans flow immediately into inventory matching, AOG risk is scored by tail number, and repositioning recommendations surface with trade-off analysis. The S&OP package — the document that the planning team brings into the consensus meeting — is generated automatically: a summary of the current demand position, the top AOG risks, the recommended supply actions, and the performance metrics from the past cycle. The S&OP meeting transforms from a data reconciliation exercise into a decision-making forum. The moat being established in this phase is workflow: the meeting rhythm is now organized around Partcast's output, and the switching cost rises substantially.

**Phase 4: Agentic Planning (Months 18–24)**

Phase 4 makes the forecasting process genuinely autonomous for the routine cases. An agentic forecast layer monitors signals continuously, identifies changes that require a plan update, and takes autonomous action — adjusting forecasts, generating repositioning requests, filing escalations — within bounds that the operator defines. Exception-based planning becomes the default: the analyst's attention is reserved for the cases where the agent is uncertain, where the recommended action falls outside its authorized scope, or where the planner has indicated that human judgment is required. The planner supervision UX gives the analyst and S&OP leader full visibility into what the agent did automatically, what it escalated, and why. The organization is no longer running a planning cycle — it is supervising a planning agent.

---

## Why This Becomes a Great Business

The initial customer is specific: a mid-to-large MRO provider or airline-affiliated MRO operation managing a fleet of 50 or more aircraft, running SAP or Oracle as their ERP, with a planning team that has invested in process but is constrained by tooling. These are organizations sophisticated enough to understand forecast accuracy as a metric and frustrated enough with their current process to consider a purpose-built alternative. They are also large enough to generate the data volume that makes the ML layer valuable quickly.

The entry point is the demand review workflow. This is the right wedge because it is the planning team's most painful daily activity, it delivers measurable value in Phase 1 without requiring AI trust, and it does not require replacing the ERP. Partcast sits alongside the existing system, augments the analyst's workflow, and proves its value in the first 90 days through FVA and cycle time metrics. A product that requires a 24-month implementation before it shows ROI will not close deals in this market. Phase 1 is designed to deliver standalone value.

The expansion motion follows two axes. Horizontal expansion means moving from the demand analyst to the supply planner and S&OP leader within the same account — each persona has a distinct workflow that Partcast augments, and the value of the platform increases as more of the planning process runs through it. Vertical expansion means moving from the MRO provider to the airline itself: once Partcast has the MRO provider's demand data and the airline's maintenance program data, there is a compelling case for giving the airline's own planning team a connected view of their MRO provider's forward demand position. That cross-organizational data product is something no ERP-centric tool can credibly offer.

The two durable moats are data and workflow. The data moat is the override attribution dataset — the accumulated record of every forecast the model generated, every override the planner made, and every actual outcome. After 18 months of production use with a customer operating a fleet of 100 aircraft, Partcast has a planning feedback dataset specific to serialized aerospace maintenance demand that no competitor can replicate without the same customer relationships. A new entrant cannot buy their way into this asset — it has to be earned through production use. The workflow moat is the S&OP dependency: when an organization has organized its consensus planning meeting around the Partcast-generated package, the switching cost is not replacing software — it is rebuilding the meeting, retraining the team, and explaining to leadership why they are losing the FVA visibility they have come to rely on.

The key tradeoffs the team will face are real. On ML models: building in-house gives control and customization but requires data science investment that may be premature in Phase 1; buying from a time-series forecasting vendor is faster but risks the core model being undifferentiated. The right answer is to keep Phase 1 deterministic and defer the ML decision until Phase 1 actuals data clarifies what the model actually needs to learn. On depth versus breadth: it will be tempting to expand the ICP quickly when early customers ask for coverage of additional fleet types or additional ERP integrations; the discipline required is to go deep with the first two or three customers before broadening the surface area. On autonomy versus planner trust: moving too fast toward autonomous action before the FVA track record is established is the fastest way to lose a customer. The agentic features in Phase 4 should be activated incrementally, with the planner in control of the scope of autonomous action at each step.

---

## On AI Trust

Every VP of MRO Operations who has been burned by a previous AI initiative has the same experience: the model gave a wrong answer with high confidence, something went wrong, and the credibility of AI-assisted planning in that organization reset to zero. Partcast is designed with that failure mode explicitly in mind.

The first principle of Partcast's explainability framework is showing the model's work, not just its answer. When the AI recommends increasing the demand forecast for part PN-7890 by 3 units in the next 90-day window, the planner sees the specific signals that drove that recommendation: tail N1234 is approaching its 12,000-hour airframe check at current utilization rate, the maintenance program specifies a replacement of this part at that check type, and the supplier's most recent confirmed lead time on this part number is 75 days. That is not a probability score — it is a chain of reasoning the planner can evaluate against what they know. If the planner knows that tail N1234 was just sold to another operator, they override the recommendation with that context, and the model updates. The recommendation is not a black box output; it is a structured argument the planner can agree or disagree with.

The second principle is making confidence intervals tangible as operational trade-offs rather than statistical abstractions. A confidence interval expressed as "82% probability" is not actionable for a planner deciding whether to authorize a purchase order. A confidence interval expressed as "holding 4 units gives you coverage for the expected demand case; holding 6 units covers the scenario where tail N5678's check accelerates due to unscheduled utilization; holding 2 units leaves you exposed if any AD compliance event triggers before the next scheduled order window" is a decision the planner can make. Partcast converts statistical uncertainty into inventory risk language that maps directly to the operational choices available.

The third principle is building trust through a visible track record. From the first week of production use, Partcast's FVA dashboard shows the AI forecast accuracy against the planner-overridden forecast accuracy, by part category and by demand event type. The planner can see, six months in, that the AI was more accurate in 73% of AD-driven demand events but that they have consistently made better calls on unscheduled removal demand where they have access to fleet-level reliability data that is not yet in the system. That visibility does two things: it shows the AI earning trust where it has earned it, and it gives the planner a clear signal about what context they should be providing to the system.

The mindset shift Partcast is selling is not that AI replaces your planners. It is that AI makes your planners measurably better — and for the first time, gives you visibility into where planning value is actually created or lost. A planner who has been in this role for ten years has deep expertise that a model cannot replicate. Partcast's goal is to free that expertise from manual data reconciliation so it can be applied to the decisions that actually require it.

---

## Key Metrics


| Metric                    | Definition                                                                                                     | Baseline Today                            | Target at 12 Months                              |
| ------------------------- | -------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ------------------------------------------------ |
| Forecast Value Add (FVA)  | % of cases where AI forecast is more accurate than the planner-overridden forecast, measured at actuals        | Unmeasured — no attribution system exists | AI outperforms human override in >15% more cases |
| AOG Risk Coverage         | % of AOG events that were preceded by a Partcast early warning flag within the prior 30-day window             | 0% — no proactive risk scoring in place   | >80%                                             |
| Demand Review Cycle Time  | Calendar days from signal update to approved consensus plan                                                    | ~10 days                                  | <2 days                                          |
| Override Attribution Rate | % of planner overrides with a documented structured rationale                                                  | <10% — most overrides undocumented        | >90%                                             |
| Planner Adoption Rate     | % of demand analysts using the AI-generated forecast as their starting point rather than building from scratch | 0% — tool does not exist                  | >80% at 6 months post-launch                     |


---

