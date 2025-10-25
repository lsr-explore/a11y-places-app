# A11y Places Workshop - Session Context

This document contains context and state information from development sessions to help resume work and onboard contributors.

**Last Updated**: 2025-10-25

---

## Project Overview

An accessible places management application built with React, focusing on accessibility best practices and native mobile support.

## Technical Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Create React App
- **UI Library**: Material-UI v7
- **Routing**: React Router v7
- **Native Support**: Capacitor v7 (iOS/Android platforms not added yet)
- **Storage**: @capacitor/preferences for persistent data
- **Component Development**: Storybook v9.1.13
- **Linting**: Biome

## Working Directory

```
/Users/laurie/dev/a11y-places-workshop/dev/a11y-places-workshop/a11y-places-app
```

## Project Structure

```
src/
  pages/
    AddPlace.tsx          - Form component for add/edit place (with IconPicker)
    AddPlace.stories.tsx  - ✅ Working stories
    Places.tsx            - List component showing all places
    Places.stories.tsx    - ⚠️ Mock data not displaying
  components/
    IconPicker.tsx           - MUI icon selection dialog
    IconPicker.stories.tsx   - ✅ Working
    Breadcrumbs.tsx          - Navigation breadcrumbs
    Layout.tsx               - App layout wrapper
  utils/
    storage.ts            - Wrapper around Capacitor Preferences API
  types/
    Place.ts              - interface Place { id, name, places, icon }

.storybook/
  main.ts                 - Config with @storybook/addon-a11y added
```

## Current State

### Components
- **IconPicker**: Fully functional with Storybook stories working
- **AddPlace**: Form component with stories working properly
- **Places**: List view component exists, but mock data not displaying in stories
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

### Known Issues
- Places.stories.tsx: Mock data not displaying correctly in Storybook

## Development Commands

(Add your common commands here as you use them)

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
```

## Next Steps

- Fix Places.stories.tsx mock data display issue
- Add iOS/Android platforms to Capacitor
- Continue accessibility improvements
- Add more Storybook stories as components are built

---

## Notes for Future Sessions

- The app uses Capacitor Preferences API for storage (via utils/storage.ts)
- All components should follow MUI v7 patterns
- Storybook is configured with a11y addon for accessibility testing
- Focus on WCAG compliance throughout development
