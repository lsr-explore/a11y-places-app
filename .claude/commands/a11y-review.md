---
description: Review code for WCAG 2.2 AA and ARIA 1.2 compliance
---

Review the specified code or component for **WCAG 2.2 Level AA** and **ARIA 1.2** compliance.

## Standards Reference
- **WCAG 2.2**: https://www.w3.org/TR/WCAG22/
- **ARIA 1.2**: https://www.w3.org/TR/wai-aria-1.2/
- **ARIA Authoring Practices**: https://www.w3.org/WAI/ARIA/apg/

## Review Checklist

Analyze the code and check for:

### 1. Semantic HTML Structure
- [ ] Use of appropriate HTML5 semantic elements (`<main>`, `<nav>`, `<header>`, `<footer>`, `<article>`, `<section>`)
- [ ] Proper heading hierarchy (h1 → h2 → h3, no skipped levels)
- [ ] Correct use of list elements (`<ul>`, `<ol>`, `<li>`)
- [ ] Semantic buttons (`<button>`) instead of divs with click handlers
- [ ] Links (`<a>`) for navigation, buttons for actions

### 2. ARIA Attributes and Roles
- [ ] ARIA only used when semantic HTML is insufficient (first rule of ARIA)
- [ ] Valid ARIA roles per ARIA 1.2 specification
- [ ] Proper use of `aria-label`, `aria-labelledby`, `aria-describedby`
- [ ] Correct `aria-live` regions for dynamic content announcements
- [ ] States and properties match component behavior (`aria-expanded`, `aria-checked`, etc.)
- [ ] No prohibited ARIA on semantic elements

### 3. Keyboard Navigation
- [ ] All interactive elements are keyboard accessible (Tab/Shift+Tab)
- [ ] Logical tab order matches visual order
- [ ] No positive tabindex values (0 or -1 only)
- [ ] Enter and Space keys work on appropriate elements
- [ ] Focus traps implemented correctly in modals/dialogs
- [ ] Escape key closes modals and returns focus appropriately

### 4. Focus Management
- [ ] Visible focus indicators on all interactive elements
- [ ] Focus indicators meet 3:1 contrast ratio (WCAG 2.4.11 / 2.4.13)
- [ ] Focus not obscured by sticky headers or other UI (WCAG 2.4.12)
- [ ] Focus restoration after navigation or dynamic content changes
- [ ] Skip links or landmarks provided for page navigation

### 5. Color Contrast
- [ ] Normal text (< 18pt): 4.5:1 minimum (WCAG 1.4.3)
- [ ] Large text (≥ 18pt or ≥ 14pt bold): 3:1 minimum (WCAG 1.4.3)
- [ ] UI components and graphical objects: 3:1 minimum (WCAG 1.4.11)
- [ ] Color not used as only means of conveying information (WCAG 1.4.1)

### 6. Target Sizes (WCAG 2.2)
- [ ] Interactive targets are at least 24×24 CSS pixels (WCAG 2.5.8)
- [ ] Sufficient spacing between adjacent targets
- [ ] Exception: inline links in text blocks

### 7. Form Labels and Error Handling
- [ ] Every input has an associated `<label>` or `aria-label`
- [ ] Required fields marked with `required` attribute and visual indicator
- [ ] Error messages use `aria-describedby` or `aria-errormessage`
- [ ] Error identification is specific and helpful (WCAG 3.3.1)
- [ ] Success/error messages announced via `role="alert"` or `aria-live`

### 8. Images and Media
- [ ] All images have appropriate alt text
- [ ] Decorative images use `alt=""` or `aria-hidden="true"`
- [ ] Complex images have extended descriptions
- [ ] Icons used without text have `aria-label`

### 9. Dynamic Content
- [ ] Loading states announced to screen readers
- [ ] Content updates use appropriate `aria-live` values (polite/assertive)
- [ ] Status messages comply with WCAG 4.1.3

## Output Format

Provide:
1. **Summary**: Overall accessibility compliance level
2. **Issues Found**: List each issue with:
   - Description of the problem
   - WCAG Success Criterion violated
   - ARIA specification reference (if applicable)
   - Severity (Critical / Serious / Moderate / Minor)
   - Recommended fix with code example
3. **Positive Findings**: Note what was done well
4. **Recommendations**: Suggest improvements or best practices

---

**After I use this command, I will specify which file(s) or component(s) to review.**
