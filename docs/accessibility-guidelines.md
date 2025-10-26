# What is Web Accessibility

Web Accessibility means that websites and related tools can be used universally by everyone.  This includes people with disabilities such as
- Auditory
- Cognitive
- Neurological
- Physical
- Speech
- Visual

Designing and developing with accessibility in mind helps people who might experience temporary disabilities (e.g. broken arm, lost glasses) or situational limitations (e.g. bright sunlight).

People with disabilities navigate the web using a variety of assistive devices, a few of which are.
Screen reader - text to speech
Zoom/Magnification
Keyboard only navigation

See the W3 site for videos for perspectives on Web Accessibility and how people with disabilities use the web - <https://www.w3.org/WAI/people/>

Accessibility = Usability + Assistive Technology Compatibility + WCAG/Aria Compliance

When delivering accessible experiences, just being compliant with the  

Example 1: image
Creating the alt tag for the image, keep in mind what is important to keep the user’s goal in mind

Src: Pexels - Photographer: Stephen Noulton - A red kite flying in the sky with its wings spread
 https://www.pexels.com/photo/a-red-kite-flying-in-the-sky-with-its-wings-spread-16845928/

Assistive Technology Compatible: <img src=”...”, alt=”a bird flying” />
Usability + Assistive Technology Compatible: <img src=”...” alt=”Close-up of a red kite soaring gracefully with wings spread wide against a clear background.” />
Pexels Site - Free and Stock Photo provide additional context
<img src=”...” alt=”Free Close-up of a red kite soaring gracefully with wings spread wide against a clear background. Stock Photo” />

Example 2: Address table
While it is semantically correct to only display the Edit button, it is not very usable and violates WCAG guidelines.

Name




Usability + Assistive Technology Compatibility + WCAG/Aria Compliance
Chiho Murakami
Edit
<Button>Edit</Button>
<Button aria-label=”Edit Chiho Murakami>
    Edit
</Button>
John Wagner
Edit
<Button>Edit</Button>
<Button aria-label=”Edit John Wagner>
    Edit
</Button>



WCAG and ARIA
Web Content Accessibility Guidelines (WCAG)  are a set of principles and rules that is published by the W3C and has been adopted as an ISO standard.  It is the primary evaluation criteria for web sites.  The current version is 2.2

WCAG is based on four core principles:
https://www.w3.org/WAI/WCAG22/quickref/

Each Principle is expanded through a set of Guidelines which are categorized into three levels of conformance - A, AA, and AAA.  Most sites target AA
Perceivable: Content must be presentable to users in ways they can perceive (e.g., through text alternatives for images, captions for videos). 
Operable: User interface components and navigation must be operable (e.g., through keyboard access, sufficient time to complete tasks). 
Understandable: Information and the operation of the user interface must be understandable (e.g., through clear language, predictable behavior). 
Robust: Content must be robust enough to be interpreted reliably by a wide variety of user agents, including assistive technologies.

Accessible Rich Internet Applications (ARIA) are a set of html attributes that can be added to HTML to communicate additional role, states, and properties.  Examples are checked for a checkbox. 

## 🧩 Accessibility Practice Checklist

_A quick reference for developers to build and test accessible features._

---

### 1. Keyboard Navigation

- [ ] All functionality can be reached using **Tab**, **Shift+Tab**, **Enter**, and **Space**.
- [ ] There is a **visible focus indicator** on interactive elements.
- [ ] The tab order follows the **visual and logical order** of the page.
- [ ] A **“Skip to main content”** link is available.

---

### 2. Screen Readers

- [ ] Test with at least one screen reader:
  - macOS/iOS → VoiceOver
  - Windows → NVDA or JAWS
  - Android → TalkBack
- [ ] Confirm all buttons, links, and inputs have **accessible names** (`aria-label`, `<label>`, or inner text).
- [ ] Headings are used hierarchically (`h1`, `h2`, `h3`).
- [ ] Landmarks (`<main>`, `<nav>`, `<header>`, `<footer>`) are present.

---

### 3. Forms and Feedback

- [ ] Each input has a visible and programmatic **label**.
- [ ] Error messages identify the problem and **link to the field** (e.g., `aria-describedby`).
- [ ] Status updates (success, error) use a **live region** (`role="alert"` or `aria-live="polite"`).

---

### 4. Color and Contrast

- [ ] Text contrast meets **4.5 : 1** (WCAG 1.4.3).
- [ ] Non-text UI elements meet **3 : 1** (WCAG 1.4.11).
- [ ] Color is never the **only means** of conveying information.
- [ ] Test with **Contrast Finder** or **Figma Contrast Checker**.

---

### 5. Testing and Automation

- [ ] Run `eslint-plugin-jsx-a11y` regularly.
- [ ] Add a **jest-axe** test to catch accessibility regressions.
- [ ] Use **Playwright + axe** for automated end-to-end scans.
- [ ] Check components in **Storybook a11y** panel before merging.

---

### 6. Continuous Learning

- [ ] Review [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/).
- [ ] Review [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/).
- [ ] Share one new accessibility insight during sprint retros or demos.

---

## Resources

### Fundamentals

- W3C - Introduction to Web Accessibility - https://www.w3.org/WAI/fundamentals/accessibility-intro/
- W3C - User Stories - https://www.w3.org/WAI/people-use-web/user-stories/
- W3C - How to Meet WCAG (Quick Reference) - https://www.w3.org/WAI/WCAG22/quickref/
- Intopia - WCAG 2.2 Map - https://intopia.digital/wp-content/uploads/2023/12/Intopia-WCAG-2.2-Map-Landscape-version.pdf
- W3C - Aria Authoring Practices Guide (APG) - https://www.w3.org/WAI/ARIA/apg/
- W3C - ARIA - https://www.w3.org/TR/wai-aria/


### Keyboard Navigation and Screen Reader

- Web Aim Keyboard Accessibility - https://webaim.org/techniques/keyboard/
- Deque Screen Reader keyboard Shortcuts and Gestures: https://dequeuniversity.com/screenreaders/

### Legal and ISO Standard

- ADA - https://www.ada.gov/resources/2024-03-08-web-rule/
- W3C ISO Standard Announcement - https://www.w3.org/WAI/news/2025-10-21/wcag22-iso/

### Design 

- W3C - Resources for Designers - https://www.w3.org/WAI/roles/designers/
- WebAIM - Web Accessibility for Designers - https://webaim.org/resources/designers/
- Contrast Finder - https://app.contrast-finder.org/?lang=en
- Microsoft Inclusive 101 Guidebook - https://inclusive.microsoft.design/tools-and-activities/Inclusive101Guidebook.pdf


### Developer and Testing Resources

- Web AIM Wave
- Axe devTools
- Jest-axe
- Storybook - accessibility addon
- @axe-core/playwright
- Eslint-plugin-jsx-a11y
- Biome



