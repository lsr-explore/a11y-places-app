# Accessibility Issues in Inaccessible Pages

This document identifies the accessibility issues present in the inaccessible versions of the Places and AddPlace pages. These issues serve as "before" examples for the accessibility workshop.

The following standards were used to evaluate and document these issues:

- **W3C WCAG 2.2 Level AA**: https://www.w3.org/TR/WCAG22/
- **WAI-ARIA 1.2**: https://www.w3.org/TR/wai-aria-1.2/

## PlacesInaccessible.tsx

### Issue #1: Missing ARIA Relationships (aria-describedby)

**Location**: Edit and Delete buttons
**Problem**: The edit and delete buttons do not have `aria-describedby` attributes linking them to the place name they operate on.
**Impact**: Screen reader users cannot easily determine which place will be edited or deleted when focusing on these buttons.
**WCAG**: 1.3.1 Info and Relationships (Level A)
**Fix**: Add `aria-describedby={place-name-${place.id}}` to associate buttons with the place name.

### Issue #2: Missing Success Feedback (Snackbar)

**Location**: After add/edit/delete operations
**Problem**: No snackbar notification is shown to confirm successful operations.
**Impact**: Users (especially screen reader users) don't receive confirmation that their action succeeded.
**WCAG**: 4.1.3 Status Messages (Level AA)
**Fix**: Implement a snackbar with appropriate ARIA live region to announce success messages.

### Issue #3: Non-Keyboard Accessible Delete Button

**Location**: Delete button for each place
**Problem**: The delete button is implemented as a `<div>` with an `onClick` handler instead of a proper button element.
**Impact**:

- Keyboard users cannot reach or activate the delete button
- Screen readers don't identify it as an interactive element
- No focus indicator is shown
- Cannot be activated with Enter or Space keys
**WCAG**: 2.1.1 Keyboard (Level A)
**Fix**: Use a proper `<button>` or `<IconButton>` element with appropriate ARIA labels.

### Issue #4: Illogical Reading/Tab Order - Add Button

**Location**: "Add Place" button
**Problem**: The "Add Place" button is positioned below the list of places instead of at the top where users would expect it.
**Impact**:

- Users must navigate through all existing places before finding the add button
- Counter-intuitive for users trying to quickly add a new place
- Violates expected UI patterns
**WCAG**: 2.4.3 Focus Order (Level A)
**Fix**: Position the "Add Place" button at the top of the page or in a logical location that matches visual hierarchy.

### Issue #5: Visual Order Does Not Match DOM Order - Edit Buttons

**Location**: Edit buttons for each place
**Problem**: Edit buttons are rendered in the DOM after the entire list but positioned with CSS (absolute positioning) to appear inline with each list item.
**Impact**:

- Keyboard navigation is confusing: users tab through all list items first, then tab back to the edit buttons
- Visual order doesn't match tab order, violating user expectations
- Screen reader users experience a disconnect between visual layout and document structure
**WCAG**: 1.3.2 Meaningful Sequence (Level A), 2.4.3 Focus Order (Level A)
**Fix**: Place edit buttons in the DOM in the same order they appear visually (inline with each list item).

### Issue #6: Missing Focus Management on Navigation Return

**Location**: Navigation state management
**Problem**: When returning from Add/Edit pages, focus is not restored to the previously focused element.
**Impact**:

- Keyboard and screen reader users lose their place in the interface
- Must re-navigate from the top of the page to find where they were
- Poor user experience, especially with long lists
**WCAG**: 2.4.3 Focus Order (Level A)
**Fix**: Store focus location before navigation and restore it on return.

### Additional Issue #7: Missing Accessible Label on Delete Button

**Location**: Delete button (div element)
**Problem**: The delete icon has no text label or aria-label.
**Impact**: Screen reader users cannot determine what the button does.
**WCAG**: 4.1.2 Name, Role, Value (Level A)
**Fix**: Add `aria-label="Delete [place name]"` to the delete button.

---

## AddPlaceInaccessible.tsx

### Issue #1: Missing Required Field Description

**Location**: Top of form
**Problem**: The explanatory text "Fields marked with an asterisk (*) are required" has been removed.
**Impact**:

- Users may not understand what the asterisk symbol means
- Particularly problematic for screen reader users who may not perceive the visual asterisk
- Does not programmatically convey which fields are required
**WCAG**: 3.3.2 Labels or Instructions (Level A)
**Fix**: Add descriptive text explaining the asterisk convention or use proper ARIA attributes.

### Issue #2: Missing Accessible Label on Icon Button

**Location**: Icon display button
**Problem**: The IconButton that displays the current icon lacks an `aria-label`.
**Impact**:

- Screen reader users cannot determine what the button does
- No context about the current icon selection
**WCAG**: 4.1.2 Name, Role, Value (Level A)
**Fix**: Add `aria-label="Current icon: ${icon}. Click to change icon"` to provide context.

### Issue #3: Missing Focus Management on Return

**Location**: Cancel button navigation
**Problem**: The cancel button doesn't pass focus restoration state when returning to the Places page.
**Impact**: Users lose their place when canceling and must re-navigate from the top.
**WCAG**: 2.4.3 Focus Order (Level A)
**Fix**: Pass `returnFocusTo` state when navigating back.

### Additional Issue #4: Modal Dialog Without Focus Trap (IconPickerInaccessible)

**Location**: Icon picker dialog
**Problem**: The dialog does not trap focus within itself (`disableEnforceFocus` and `disableAutoFocus` are enabled).
**Impact**:
- Keyboard users can tab out of the dialog to elements behind it
- Creates confusion as the page behind the dialog is still interactive
- Violates modal dialog pattern expectations
- Users may lose track of where they are in the interface
**WCAG**: 2.4.3 Focus Order (Level A)
**ARIA**: Dialog Pattern requires focus management
**Fix**: Remove `disableEnforceFocus` and `disableAutoFocus` to properly trap focus within the dialog.

### Additional Issue #5: Disabled Escape Key to Close Dialog (IconPickerInaccessible)

**Location**: Icon picker dialog
**Problem**: The dialog has `disableEscapeKeyDown` enabled, preventing keyboard users from closing it with the Escape key.
**Impact**:
- Keyboard users cannot use the expected Escape key to dismiss the dialog
- Forces users to find and click the close button or Cancel button
- Violates common keyboard interaction patterns
- Frustrating user experience for keyboard and screen reader users
**WCAG**: 2.1.1 Keyboard (Level A)
**ARIA**: Dialog Pattern expects Escape key to close
**Fix**: Remove `disableEscapeKeyDown` to allow Escape key dismissal.

### Additional Issue #6: No Error Announcement

**Location**: Form validation
**Problem**: While visual error messages appear, there's no ARIA live region to announce errors to screen reader users.
**Impact**: Screen reader users may submit the form multiple times without realizing validation errors occurred.
**WCAG**: 3.3.1 Error Identification (Level A), 4.1.3 Status Messages (Level AA)
**Fix**: Add an ARIA live region to announce validation errors when they occur.

### Additional Issue #7: Unclear Required Field Indicator

**Location**: Name and Places fields
**Problem**: The asterisk alone is not sufficient to programmatically convey that fields are required.
**Impact**:

- Screen readers may not announce the required state
- Users may not realize fields are required until submission
**WCAG**: 3.3.2 Labels or Instructions (Level A)
**Fix**: Ensure `required` attribute is present and consider using `aria-required="true"` explicitly.

### Additional Issue #8: Poor Keyboard UX with Apply/Cancel Pattern (IconPickerInaccessible)

**Location**: Icon picker dialog - Apply/Cancel buttons
**Problem**: The dialog requires users to click an icon to select it temporarily, then tab through all remaining icon buttons to reach the Apply button at the bottom of the dialog.
**Impact**:

- Keyboard users must tab through potentially dozens of icon buttons before reaching the Apply button
- Creates excessive and unnecessary tab stops
- Frustrating keyboard navigation experience
- Makes a simple selection task unnecessarily complex for keyboard users
- Violates principle of efficient keyboard interaction
**WCAG**: 2.1.1 Keyboard (Level A) - While technically keyboard accessible, the implementation creates an unnecessarily burdensome keyboard experience
**Contrast with Accessible Version**: The accessible IconPicker uses instant selection - clicking an icon immediately selects it and closes the dialog, eliminating unnecessary tab stops and providing a much better keyboard experience. Screen reader-only instructions inform users of this behavior.
**Fix**: Remove Apply/Cancel buttons and implement instant selection where clicking an icon immediately selects it and closes the dialog. Add screen reader instructions to inform users of the instant selection behavior.

### Additional Issue #9: Close Button Nested Inside Heading (IconPickerInaccessible)

**Location**: Icon picker dialog - Close button in DialogTitle
**Problem**: The close button (IconButton with X icon) is nested inside the DialogTitle heading element (H2), making it part of the heading structure.
**Impact**:

- Screen reader users navigating by headings encounter the button as part of the heading content, disrupting heading navigation
- The button may not receive proper focus in the expected tab order
- Semantically incorrect - interactive elements should not be nested inside heading elements
- Users with dyslexia who rely on screen readers while also using visual cues may be confused by the incorrect structure
- Violates proper heading semantics and document structure
**WCAG**: 1.3.1 Info and Relationships (Level A), 4.1.2 Name, Role, Value (Level A)
**ARIA**: Headings should contain only text content, not interactive elements
**Contrast with Accessible Version**: The accessible IconPicker positions the close button as a sibling to the DialogTitle (not nested inside it), using CSS positioning to visually place it in the top-right corner while maintaining proper semantic structure.
**Fix**: Move the close button outside of the DialogTitle element and use CSS absolute positioning to place it visually in the top-right corner of the dialog.

### Additional Issue #10: Disabled Auto Focus on Dialog (IconPickerInaccessible)

**Location**: Icon picker dialog - Dialog component configuration
**Problem**: The dialog has `disableAutoFocus` enabled, which prevents Material-UI's Dialog component from managing focus automatically when the dialog opens.
**Impact**:

- Screen reader users' virtual cursor may remain outside the dialog context when it opens
- Focus doesn't move into the dialog naturally following ARIA dialog pattern
- Screen reader navigation may not work properly until user manually tabs into the dialog
- Users may need to use special navigation commands (like VO+Shift+Down on VoiceOver) to enter the dialog content
- Creates a confusing experience where the dialog appears but isn't properly focused
- Violates ARIA authoring practices for modal dialogs
**WCAG**: 2.4.3 Focus Order (Level A)
**ARIA**: Dialog (Modal) Pattern requires focus to move inside the dialog when it opens
**Contrast with Accessible Version**: The accessible IconPicker relies on Material-UI Dialog's default focus management (does NOT disable autofocus), which automatically handles focus placement according to the ARIA dialog pattern. This ensures screen readers can navigate through all dialog content starting from the title, including the dialog heading, currently selected icon information, screen reader instructions, and search field.
**Fix**: Remove `disableAutoFocus` prop from the Dialog component to allow proper focus management. Let the Dialog component handle focus automatically according to the ARIA dialog pattern.

### Additional Issue #11: Missing Set Size and Position Information (IconPickerInaccessible)

**Location**: Icon picker dialog - Icon button grid
**Problem**: The icon buttons do not include `aria-setsize` and `aria-posinset` attributes to indicate their position within the set of available icons.
**Impact**:

- Screen reader users have no context about how many icons are available to choose from
- Users cannot tell their position when navigating through the icons (e.g., "item 5 of 28")
- Difficult to estimate how long it will take to browse through all options
- Especially problematic when search filters reduce the number of visible icons - users don't know if there are 3 or 30 icons
- Creates a disorienting experience when trying to explore available options
- Users may give up searching thinking there are too many icons, or keep searching thinking there are more
**WCAG**: 4.1.2 Name, Role, Value (Level A)
**ARIA**: Set size and position provide important context for screen reader users navigating collections
**Contrast with Accessible Version**: The accessible IconPicker includes:
- `role="group"` on the icon container with `aria-label` announcing total count (e.g., "28 icons available")
- `aria-setsize={filteredIcons.length}` on each icon button indicating total number in the set
- `aria-posinset={index + 1}` on each icon button indicating current position (1-based)
- This allows screen readers to announce: "Restaurant icon, 2 of 28" giving users complete context
- Count updates dynamically when search filter is applied
**Fix**: Add `role="group"` and `aria-label` to the icon grid container, and add `aria-setsize` and `aria-posinset` attributes to each icon button to provide positional context.

---

## How to Use These Examples

### For Workshop Facilitators:

1. Start by demonstrating the **inaccessible versions** (PlacesInaccessible.tsx and AddPlaceInaccessible.tsx)
2. Have participants test with:
   - Keyboard-only navigation (Tab, Shift+Tab, Enter, Space)
   - Screen readers (NVDA, JAWS, VoiceOver)
   - Browser accessibility dev tools
   - Automated testing tools (axe, Lighthouse)
3. Guide participants to discover and document the issues listed above
4. Show the **accessible versions** (Places.tsx and AddPlace.tsx) and compare the differences
5. Discuss the code changes and techniques used to fix each issue

### Testing Procedures:

- **Keyboard Navigation**: Use only Tab, Shift+Tab, Enter, and Space keys to navigate and interact
- **Screen Reader**: Enable screen reader and navigate with eyes closed if possible
- **Focus Indicators**: Ensure all interactive elements show clear focus indicators
- **Tab Order**: Verify tab order matches visual order and logical flow
- **Announcements**: Listen for appropriate announcements of dynamic changes and status messages

### WCAG Success Criteria Reference:

- **Level A**: Minimum level of conformance (must meet)
- **Level AA**: Recommended level for most websites (should meet)
- **Level AAA**: Enhanced level (nice to have)

All issues identified in this document affect Level A or AA criteria and should be addressed in production applications.
