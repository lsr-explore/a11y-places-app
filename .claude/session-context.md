# A11y Places Workshop - Session Context

This document contains context and state information from development sessions to help resume work and onboard contributors.

**Last Updated**: 2025-10-25

---

## Project Overview

An accessible places management application built with React, focusing on accessibility best practices and native mobile support. This is a workshop project for teaching accessibility principles.

## Technical Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Create React App
- **UI Library**: Material-UI v7
- **Routing**: React Router v7
- **Native Support**: Capacitor v7 (iOS/Android platforms not added yet)
- **Storage**: @capacitor/preferences for persistent data
- **Component Development**: Storybook v9.1.13
- **Testing**: Playwright for component testing
- **Linting**: Biome

## Project Structure

```
src/
  pages/
    AddPlace.tsx          - Form component for add/edit place (with IconPicker)
    AddPlace.stories.tsx  - Working stories with multiple scenarios
    Places.tsx            - List component showing all places
    Places.stories.tsx    - Working stories with mock data and Playwright tests
  components/
    IconPicker.tsx           - MUI icon selection dialog
    IconPicker.stories.tsx   - Working stories
    Breadcrumbs.tsx          - Navigation breadcrumbs
    Layout.tsx               - App layout wrapper
  utils/
    storage.ts            - Wrapper around Capacitor Preferences API
  types/
    Place.ts              - interface Place { id, name, places, icon }

.storybook/
  main.ts                 - Config with @storybook/addon-a11y added
  preview.tsx             - Global decorators, including MSW mock setup
```

## Current State

### Components Status

- **IconPicker**: Fully functional with working Storybook stories
- **AddPlace**: Form component with comprehensive stories
- **Places**: List view component with Playwright tests
- **Breadcrumbs**: Navigation component implemented
- **Layout**: App wrapper component

### Data Model

```typescript
interface Place {
  id: string;
  name: string;
  places: string;  // Address/location
  icon: string;    // Material-UI icon name
}
```

### Mocking Strategy

- MSW (Mock Service Worker) is set up in Storybook for API mocking
- Storage module is mocked for Storybook: `../utils/storage.ts` -> `./storage.mock.ts`
- React Router is mocked for Storybook using `reactRouterParameters`

### Known Issues & Recent Work

- Recently added intentionally inaccessible examples for workshop demonstrations
- Introduced a color contrast issue (commit: db5f4b7) for teaching purposes
- Playwright component tests integrated with Storybook

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm start

# Run Storybook
pnpm run storybook

# Build for production
pnpm run build

# Run linter
pnpm run lint

# Run Playwright tests
npx playwright test
```

## Workshop Focus

This application intentionally includes accessibility issues for teaching purposes. The main goals are:

- Demonstrate WCAG compliance best practices
- Show common accessibility pitfalls and how to fix them
- Provide hands-on examples with real components
- Use Storybook's a11y addon for testing and learning

## Next Steps

- Add more accessibility examples (both good and bad) for workshop
- Add iOS/Android platforms to Capacitor
- Continue accessibility improvements and demonstrations
- Expand Playwright test coverage
- Add more workshop scenarios

---

## Development Notes

- The app uses Capacitor Preferences API for storage (via utils/storage.ts)
- All components should follow MUI v7 patterns
- Storybook is configured with a11y addon for accessibility testing
- Focus on WCAG compliance throughout development
- Some accessibility issues are intentional for workshop teaching purposes

## Accessibility Standards (REQUIRED)

All frontend UI code MUST adhere to:
- **W3C WCAG 2.2 Level AA**: <https://www.w3.org/TR/WCAG22/>
- **WAI-ARIA 1.2**: <https://www.w3.org/TR/wai-aria-1.2/>

When creating or modifying components:

- Reference these standards as source of truth
- Consider WCAG 2.2 new success criteria:
  - 2.4.11 Focus Appearance (Enhanced)
  - 2.4.12 Focus Not Obscured (Minimum)
  - 2.5.7 Dragging Movements
  - 2.5.8 Target Size (Minimum)
  - 3.2.6 Consistent Help
  - 3.3.7 Redundant Entry
  - 3.3.8 Accessible Authentication (Minimum)
  - 3.3.9 Accessible Authentication (Enhanced)
- Use semantic HTML first, ARIA when necessary
- Test with jest-axe and Playwright axe-core
