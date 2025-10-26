# Accessibility Evaluation – Issue Ticket Generation Prompt (WCAG 2.2 + ARIA 1.2)

Version: 1.1 – October 2025
Assistive Tech: macOS VoiceOver + Keyboard
Scope: Single page evaluation
Notes: Columns marked [Out of Scope] are for tracking only; no generative output required.

## How to use this

- Update to match the format of the output that you want
- Paste into 


I am conducting an Accessibility Evaluation of a web page and need help filling out structured issue details for each finding.
Each finding will be entered into a spreadsheet or issue tracker with the following columns.
 Please provide content for each field using only W3C sources as the reference of truth.

Columns

- Field
- Description
- Title -  A short summary of the issue (e.g., “Carousel lacks navigation controls”).
Category
- High-level WCAG category (e.g., Perceivable – Non-text Content, Operable – Keyboard, Understandable – Predictable, Robust – Compatible).
- Description
- Objective description of what was observed, including page element, behavior, and context. Avoid user opinions; describe facts.
- Fix Recommendation - Specific, actionable guidance on how to remediate the issue. Include both HTML and ARIA best practices when applicable.
- Primary WCAG SC (combined)
- Identify one primary WCAG 2.2 Success Criterion most directly related to the issue. Use the following for the format and keep the line breaks (keep within one cell) as we are relying on those for a derived column:
  - Principle: title (number)
  - Guideline: Number title
  - SC: Number title (Level conformance level A, AA, or AAA)

Example:

- Principle: Operable (2)
- Guideline: 2.2 Enough Time
- SC: 2.2.2 Pause, Stop, Hide (Level A)

- Additional WCAG SC - List any other relevant WCAG 2.2 criteria in the same format. Present as separate list items. 

Example
- Principle: Operable (2)
- Guideline: 2.1 Keyboard Accessible
- SC: 2.1.1 Keyboard (Level A)

- Principle: Understandable (3)
- Guideline: 3.2 Predictable
- SC: 3.2.1 On Focus (Level A)


ARIA Recommendation

- Include relevant WAI-ARIA 1.2 section name, number, and category (e.g., Roles, States and Properties, Keyboard/Focus). Reference specific attributes (e.g., aria-label, aria-controls, aria-live).
- Severity
- Assign one of: Critical, Serious, Moderate, Minor, or Best Practice. Use definitions below.
- Impact on Users - Describe the practical effect on users (e.g., “Screen reader users cannot perceive changing content,” or “Keyboard users cannot pause carousel”). Include which user groups are impacted.


The following additional columns exist in the spreadsheet but are [out of scope] for generative content: Do not generate content for these fields.  You also do not need to include placeholder columns as these columns are at the end of the table.

- Primary WCAG SC Level - [Out of Scope] - This is a derived column based on the Primary WCAG SC Level 
- Primary WCAG Principle - [Out of Scope] - This is a derived column based on the Primary WCAG SC Level 
- Steps to Reproduce - [Out of Scope]
- Tool used to identify - [Out of Scope]
- Code Snippet (Element/Selector) - [Out of Scope]
- Findings artifacts link images, videos - [Out of Scope]
- Page - [Out of Scope]
- Component - [Out of Scope]

Severity Definitions

Critical
- Prevents users with disabilities from completing core tasks or accessing critical content. No workaround.
- Example impact - Missing form labels prevent submission, focus trapped in modal, keyboard navigation impossible.

Serious

- Significantly impairs task completion or causes disorientation. Workaround possible but difficult.
- Example impact - Carousel auto-rotates without pause, color contrast failure on primary navigation, heading structure missing.

Moderate

- Causes noticeable difficulty or confusion but users can recover or work around with extra effort.- Example impact - Focus indicator low contrast, small touch targets, minor reading order issues.

Minor

- Low impact on task completion; affects comfort, speed, or consistency.
- Example impact - Decorative icon missing aria-hidden, small inconsistency in heading levels.

Best Practice

- Not a WCAG violation but recommended improvement for usability or future-proofing.
- Example impact - Redundant link text, verbose alt text, missing ARIA landmarks on simple pages.

Authoritative References

- Use only W3C publications (Do not rely on non-W3C interpretations or third-party summaries.)
- WCAG 2.2 Guidelines (12 Dec 2024): <https://www.w3.org/TR/WCAG22/>
- WCAG 2.2 Quick Reference: <https://www.w3.org/WAI/WCAG22/quickref/>
_ WAI-ARIA 1.2 (6 Jun 2023): <https://www.w3.org/TR/wai-aria-1.2/>
_ ARIA Authoring Practices Guide (APG): <https://www.w3.org/WAI/ARIA/apg/>

Output Format
Return each finding as a Markdown table with one row per issue using the column headers above.
 Cite W3C sections precisely using their numbering (e.g., “ARIA 1.2 §5.4.4”).
 Do not paraphrase success criterion titles; use W3C wording verbatim.


Title
Category
Description
Fix Recommendation
Primary WCAG SC
Additional WCAG SC
ARIA Recommendation
Severity
Impact on Users
Top carousel is missing controls
Operable – Enough Time
The top-of-page carousel automatically rotates slides without visible buttons or pause control. Users cannot manually operate or stop it.
Provide visible Previous, Next, and Pause buttons. Ensure each control is keyboard focusable and labelled with aria-label. Use aria-live="off" or a manual “pause” mechanism.
Principle: Operable (2)Guideline: 2.2 Enough TimeSC: 2.2.2 Pause, Stop, Hide (Level A)
Principle: Operable (2)Guideline: 2.1 Keyboard AccessibleSC: 2.1.1 Keyboard (Level A)Principle: Understandable (3)Guideline: 3.2 PredictableSC: 3.2.1 On Focus (Level A)
ARIA 1.2 §5.4.4 Roles: carousel, button, aria-controls, aria-label, aria-live region for announcements.
Serious
Screen reader and keyboard users cannot pause or control movement, causing motion sensitivity, distraction, and loss of content visibility.

