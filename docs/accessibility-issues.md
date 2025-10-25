# Accessibility Issues in Inaccessible Pages

This document identifies the accessibility issues present in the inaccessible versions of the Places and AddPlace pages. These issues serve as "before" examples for the accessibility workshop.

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

### Additional Issue #4: No Error Announcement
**Location**: Form validation
**Problem**: While visual error messages appear, there's no ARIA live region to announce errors to screen reader users.
**Impact**: Screen reader users may submit the form multiple times without realizing validation errors occurred.
**WCAG**: 3.3.1 Error Identification (Level A), 4.1.3 Status Messages (Level AA)
**Fix**: Add an ARIA live region to announce validation errors when they occur.

### Additional Issue #5: Unclear Required Field Indicator
**Location**: Name and Places fields
**Problem**: The asterisk alone is not sufficient to programmatically convey that fields are required.
**Impact**:
- Screen readers may not announce the required state
- Users may not realize fields are required until submission
**WCAG**: 3.3.2 Labels or Instructions (Level A)
**Fix**: Ensure `required` attribute is present and consider using `aria-required="true"` explicitly.

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
