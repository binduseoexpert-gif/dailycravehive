// app/admin/new-post/templates.ts
// Body skeletons for the three DailyCraveHive post formats.
// Placeholders like {{TOOL}}, {{A}}, {{B}} get replaced by the form.

export const REVIEW_TEMPLATE = `This **{{TOOL}} review** covers everything you need to know before subscribing in 2026. [Hook — why this review matters right now, what changed in the market.] We spent [X weeks] testing {{TOOL}} across real projects to find out.

## What Is {{TOOL}}? — Quick Overview

[What the tool is, who makes it, who it's for, what makes it different.]

## {{TOOL}} Pricing 2026 — What You'll Actually Pay

[One line intro about pricing.]

<table>
<thead>
<tr>
<th>Plan</th>
<th>Monthly Price</th>
<th>Annual Price</th>
<th>Key Features</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Plan 1</strong></td>
<td>$XX/month</td>
<td>$XX/month</td>
<td>Features…</td>
</tr>
<tr>
<td><strong>Plan 2</strong></td>
<td>$XX/month</td>
<td>$XX/month</td>
<td>Features…</td>
</tr>
</tbody>
</table>

> **IMPORTANT NOTE ON PRICING**
>
> [Trial info, hidden costs, add-ons, annual discount.]

[Honest take: is it expensive vs competitors?]

## {{TOOL}} Features That Actually Matter

### [Feature 1 — the standout]

[What it does + what happened when you tested it.]

### [Feature 2]

[Description + testing experience.]

### [Feature 3]

[Description + testing experience.]

## {{TOOL}} Review — Real-World Testing Results

<table>
<thead>
<tr>
<th>Task</th>
<th>Quality (1-10)</th>
<th>Speed</th>
<th>Editing Needed</th>
</tr>
</thead>
<tbody>
<tr>
<td>[Task 1]</td>
<td>X/10</td>
<td>~X minutes</td>
<td>[Light/Moderate/Heavy — why]</td>
</tr>
<tr>
<td>[Task 2]</td>
<td>X/10</td>
<td>~X minutes</td>
<td>[Notes]</td>
</tr>
</tbody>
</table>

[Summary of where it excels and where it falls short.]

## {{TOOL}} vs Alternatives — 2026 Comparison

<table>
<thead>
<tr>
<th>Feature</th>
<th>{{TOOL}}</th>
<th>Alternative 1</th>
<th>Alternative 2</th>
</tr>
</thead>
<tbody>
<tr>
<td>Price</td>
<td>From $XX/mo</td>
<td>$XX/mo</td>
<td>$XX/mo</td>
</tr>
<tr>
<td>Best For</td>
<td>…</td>
<td>…</td>
<td>…</td>
</tr>
</tbody>
</table>

[Who gets better value where.]

## Who Should Use {{TOOL}} in 2026?

<div class="worth-it-box">
### ✅ {{TOOL}} Is Worth It If You Are…

**[Audience 1]** [why it fits them].

**[Audience 2]** [why it fits them].

</div>

<div className="not-worth-box">
### ❌ {{TOOL}} Is NOT Worth It If You Are…

**[Audience 1].** [Better alternative + why.]

**[Audience 2].** [Better alternative + why.]

</div>

## {{TOOL}} Pros and Cons — The Full Picture

<div class="pros-cons-grid">
<div class="worth-it-box">

### ✅ What We Liked

- [Pro 1]
- [Pro 2]
- [Pro 3]

</div>

<div class="not-worth-box">

### ❌ What We Didn't Like

- [Con 1]
- [Con 2]
- [Con 3]

</div>

</div>

## {{TOOL}} Review — Our Final Verdict

<div class="verdict-box">

🏆 **Final Score: X.X / 10**

[Main verdict paragraph.]

**However, it's not for everyone.** [Who should skip it.]

**The bottom line:** [One actionable recommendation.]

</div>

## Frequently Asked Questions

<div>

<details class="faq-item">
<summary>[Question 1]?</summary>
<p>[Answer.]</p>
</details>

<details class="faq-item">
<summary>[Question 2]?</summary>
<p>[Answer.]</p>
</details>

<details class="faq-item">
<summary>[Question 3]?</summary>
<p>[Answer.]</p>
</details>

</div>`;

export const BEST_OF_TEMPLATE = `[Intro — why this category matters in 2026, how many tools you tested, your promise: no paid rankings.]

## Our Top 3 Picks at a Glance

Short on time? Here are the three tools that consistently outperformed the rest across all our testing criteria.

## How We Tested These [Category] Tools

[Testing methodology intro.]

**[Test 1]:** [What you tested and why.]

**[Test 2]:** [What you tested and why.]

**[Test 3]:** [What you tested and why.]

[Scoring criteria explanation.]

## The [N] Best [Category] Tools in 2026

<div className="tool-card">
<span className="tool-badge">Best Overall</span>
<div className="tool-score">X.X<span>/10</span></div>

### 1. [Tool Name] — [One-Line Positioning]

<div className="tool-meta">Pricing: From $XX/month | Free Trial: [details]</div>

[Paragraph 1 — what makes this tool stand out.]

[Paragraph 2 — testing experience, standout feature in **bold**.]

<div className="tool-pros">
<span className="tool-label">Pros:</span> [Pro 1], [pro 2], [pro 3].
</div>

<div className="tool-cons">
<span className="tool-label">Cons:</span> [Con 1], [con 2], [con 3].
</div>

<div className="tool-best-for">
<span className="tool-label">Best for:</span> [Ideal audience in one sentence.]
</div>

</div>

---

<div className="tool-card">
<span className="tool-badge">[Badge e.g. Best Free Option]</span>
<div className="tool-score">X.X<span>/10</span></div>

### 2. [Tool Name] — [One-Line Positioning]

<div className="tool-meta">Pricing: Free / $XX/month | Free Tier: Yes</div>

[Paragraph 1.]

[Paragraph 2.]

<div className="tool-pros">
<span className="tool-label">Pros:</span> [Pros.]
</div>

<div className="tool-cons">
<span className="tool-label">Cons:</span> [Cons.]
</div>

<div className="tool-best-for">
<span className="tool-label">Best for:</span> [Audience.]
</div>

</div>

<!-- ☝️ Har naye tool ke liye upar wala tool-card block copy karke --- separator ke saath repeat karo -->

## Full Comparison: Features, Pricing and Scores

<table>
<thead>
<tr>
<th>Tool</th>
<th>Score</th>
<th>Price</th>
<th>Best For</th>
<th>Free?</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>[Tool 1]</strong></td>
<td>X.X/10</td>
<td>$XX/mo</td>
<td>[Use case]</td>
<td>[Yes/Trial/No]</td>
</tr>
<tr>
<td><strong>[Tool 2]</strong></td>
<td>X.X/10</td>
<td>$XX/mo</td>
<td>[Use case]</td>
<td>[Yes/Trial/No]</td>
</tr>
</tbody>
</table>

## Which [Category] Tool Should You Choose?

**[Persona 1] →** [Tool]. [One-line reason.]

**[Persona 2] →** [Tool]. [One-line reason.]

**[Persona 3] →** [Tool]. [One-line reason.]

## Our Final Verdict

[Verdict paragraphs — the winner depends on use case.]

<div className="verdict-box">

🏆 **Our Simple Recommendation**

[Start with X, upgrade to Y when Z.]

</div>

## Frequently Asked Questions

<details className="faq-item">
<summary>[Question 1]?</summary>
<p>[Answer.]</p>
</details>

<details className="faq-item">
<summary>[Question 2]?</summary>
<p>[Answer.]</p>
</details>

<details className="faq-item">
<summary>[Question 3]?</summary>
<p>[Answer.]</p>
</details>`;

export const COMPARISON_TEMPLATE = `[Hook — the dilemma. Why {{A}} vs {{B}} matters in 2026.] This {{A}} vs {{B}} comparison breaks down exactly where each one wins, where it loses, and which one deserves your money.

## {{A}} vs {{B}} — Quick Comparison Table

Before diving into details, here's a snapshot of how these two tools stack up.

<table>
<thead>
<tr>
<th>Feature</th>
<th>{{A}}</th>
<th>{{B}}</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Developer</strong></td>
<td>…</td>
<td>…</td>
</tr>
<tr>
<td><strong>Paid Price</strong></td>
<td>$XX/mo</td>
<td>$XX/mo</td>
</tr>
<tr>
<td><strong>Best For</strong></td>
<td>…</td>
<td>…</td>
</tr>
<tr>
<td><strong>Free Plan</strong></td>
<td>…</td>
<td>…</td>
</tr>
</tbody>
</table>

## What Is {{A}} in 2026?

[2-3 paragraphs — background, latest updates, pricing tiers.]

## What Is {{B}} in 2026?

[2-3 paragraphs — background, latest updates, pricing tiers.]

## {{A}} vs {{B}} — [Core Area] Tested

[Intro — how you tested both on identical tasks.]

### [Test 1 Name]

**Prompt/Setup:** "[What you gave both tools.]"

**{{A}}'s output** [observations].

**{{B}}'s output** [observations].

> **Winner: [X]** — [one-line reason.]

### [Test 2 Name]

[Observations for both.]

> **Winner: [X]** — [one-line reason.]

### [Test 3 Name]

[Observations for both.]

> **Winner: [X]** — [one-line reason.]

<div className="verdict-box">

**[Core Area] Verdict**

[Who wins overall in this area and why it matters.]

</div>

## {{A}} vs {{B}} — Features Beyond [Core Area]

<table>
<thead>
<tr>
<th>Feature</th>
<th>{{A}}</th>
<th>{{B}}</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>[Feature 1]</strong></td>
<td>…</td>
<td>…</td>
</tr>
<tr>
<td><strong>[Feature 2]</strong></td>
<td>…</td>
<td>…</td>
</tr>
</tbody>
</table>

**{{A}} wins on [strength].** [Explanation.]

**{{B}} wins on [strength].** [Explanation.]

## {{A}} vs {{B}} — Pricing Breakdown (2026)

<table>
<thead>
<tr>
<th>Plan</th>
<th>{{A}}</th>
<th>{{B}}</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Free</strong></td>
<td>…</td>
<td>…</td>
</tr>
<tr>
<td><strong>Standard Paid</strong></td>
<td>…</td>
<td>…</td>
</tr>
<tr>
<td><strong>Power User</strong></td>
<td>…</td>
<td>…</td>
</tr>
</tbody>
</table>

[Value comparison paragraph.]

## {{A}} vs {{B}} — Who Should Choose What?

<div className="pros-cons-grid">
<div className="worth-it-box">

**Choose {{A}} If You…**

**[Reason 1].** [Explanation.]

**[Reason 2].** [Explanation.]

</div>
<div className="not-worth-box">

**Choose {{B}} If You…**

**[Reason 1].** [Explanation.]

**[Reason 2].** [Explanation.]

</div>
</div>

## {{A}} vs {{B}} — Our Final Verdict

<div className="verdict-box">

🏆 **The Honest Answer**

[No single winner — depends on use case. Then:]

**For [use case 1] →** {{A}}. [Reason.]

**For [use case 2] →** {{B}}. [Reason.]

**For zero budget →** [Free-tier strategy.]

</div>

## Frequently Asked Questions

<details className="faq-item">
<summary>Is {{A}} better than {{B}} for [use case]?</summary>
<p>[Answer.]</p>
</details>

<details className="faq-item">
<summary>{{A}} vs {{B}} — which is cheaper?</summary>
<p>[Answer.]</p>
</details>

<details className="faq-item">
<summary>Can I use {{A}} and {{B}} together?</summary>
<p>[Answer.]</p>
</details>`;

export const BLOG_TEMPLATE = `[Hook — reader ka problem ya curiosity. Is post me kya milega, ek-do line me promise.]

## [Section 1 — Main Topic Setup]

[Context aur background. Reader ko kyun care karna chahiye.]

## [Section 2 — Core Point / Step 1]

[Main content. Zaroorat ho to **bold** key phrases, examples, ya list:]

- [Point 1]
- [Point 2]
- [Point 3]

## [Section 3 — Core Point / Step 2]

[Content. Data compare karna ho to table use karo:]

<table>
<thead>
<tr>
<th>[Column 1]</th>
<th>[Column 2]</th>
<th>[Column 3]</th>
</tr>
</thead>
<tbody>
<tr>
<td>…</td>
<td>…</td>
<td>…</td>
</tr>
</tbody>
</table>

## [Section 4 — Core Point / Step 3]

[Content. Koi important tip highlight karni ho to blockquote:]

> **Pro Tip:** [Tip yahan.]

## Key Takeaways

<div className="verdict-box">

🏆 **[Summary Heading]**

[2-3 line me post ka nichod — reader ko kya karna chahiye.]

</div>

## Frequently Asked Questions

<details className="faq-item">
<summary>[Question 1]?</summary>
<p>[Answer.]</p>
</details>

<details className="faq-item">
<summary>[Question 2]?</summary>
<p>[Answer.]</p>
</details>

<details className="faq-item">
<summary>[Question 3]?</summary>
<p>[Answer.]</p>
</details>`;