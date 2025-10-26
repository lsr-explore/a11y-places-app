# Navigation Guide for A11y Places Workshop

## Application Menu Structure

The application menu has been organized to clearly separate accessible and inaccessible versions for workshop demonstration purposes.

### Menu Organization

```
A11y Places Workshop
├── Home
│
├── Accessible Versions
│   └── Places (Accessible)
│       ├── Add Place
│       └── Edit Place
│
└── Inaccessible Versions (For Workshop)
    └── Places (Inaccessible)
        ├── Add Place
        └── Edit Place
```

### Routes

**Accessible Versions:**

- `/places` - Places list page (accessible)
- `/places/add` - Add new place form (accessible)
- `/places/edit/:id` - Edit place form (accessible)

**Inaccessible Versions:**

- `/places-inaccessible` - Places list page (inaccessible demo)
- `/places-inaccessible/add` - Add new place form (inaccessible demo)
- `/places-inaccessible/edit/:id` - Edit place form (inaccessible demo)

### Visual Indicators

All pages now display a clear status indicator at the top:

**Accessible Pages:**

- Display: `✓ Accessibility Enabled` (green text)
- Shows participants what good accessibility looks like

**Inaccessible Pages:**

- Display: `⚠ Accessibility Issues Present (For Workshop Demo)` (red text)
- Warns users that this version contains intentional accessibility issues

### Menu Icons

- **Home**: Home icon
- **Accessible Versions**: Wheelchair/Accessible icon (♿)
- **Inaccessible Versions**: Block/Warning icon (⚠)

## Using in Workshops

### Recommended Flow

1. **Start with Inaccessible Version**
   - Navigate to "Places (Inaccessible)" from the menu
   - Have participants test with keyboard navigation
   - Test with screen readers
   - Document issues they find

2. **Compare with Accessible Version**
   - Navigate to "Places (Accessible)" from the menu
   - Test the same workflows
   - Compare the experience
   - Identify the improvements

3. **Code Comparison**
   - Show side-by-side code comparison
   - Discuss specific fixes (see `docs/accessibility-issues.md`)
   - Review WCAG criteria addressed

### Testing Instructions:

#### Keyboard Testing:

- Use Tab/Shift+Tab to navigate
- Verify all interactive elements are reachable
- Check tab order matches visual order
- Test Enter/Space on buttons

#### Screen Reader Testing:

- NVDA (Windows) / VoiceOver (Mac) / JAWS (Windows)
- Listen for proper announcements
- Check ARIA labels and descriptions
- Verify success messages are announced

#### Automated Testing:

- Use browser DevTools accessibility audit
- Run axe or Lighthouse
- Check Storybook accessibility addon results

## Implementation Notes

### Files Modified:

- `src/components/Layout.tsx` - Updated menu with accessible/inaccessible sections
- `src/App.tsx` - Added routes for inaccessible versions
- `src/pages/Places.tsx` - Added accessibility status indicator
- `src/pages/PlacesInaccessible.tsx` - Added status indicator and updated navigation
- `src/pages/AddPlace.tsx` - Added accessibility status indicator
- `src/pages/AddPlaceInaccessible.tsx` - Added status indicator and updated navigation

### Files Created:

- `src/pages/PlacesInaccessible.tsx` - Demo page with accessibility issues
- `src/pages/AddPlaceInaccessible.tsx` - Demo form with accessibility issues
- `docs/accessibility-issues.md` - Complete documentation of all issues
- `docs/navigation-guide.md` - This file

## Breadcrumb Navigation

Breadcrumbs on all pages now clearly indicate which version you're viewing:

**Accessible:**
```
Home > Places (Accessible)
Home > Places (Accessible) > Add Place
Home > Places (Accessible) > Edit Place
```

**Inaccessible:**
```
Home > Places (Inaccessible)
Home > Places (Inaccessible) > Add Place
Home > Places (Inaccessible) > Edit Place
```

This makes it impossible to get confused about which version you're viewing during the workshop.
