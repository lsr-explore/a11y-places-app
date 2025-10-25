import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Preferences } from '@capacitor/preferences';
import type { Place } from '../types/Place';
import { StorageAPI, StorageContext } from '../utils/storageApi';
import PlacesInaccessible from './PlacesInaccessible';

// Sample places data for stories
const mockPlaces: Place[] = [
  {
    id: '1',
    name: 'Central Park',
    places: '843-acre public park in Manhattan, New York City',
    icon: 'Park',
  },
  {
    id: '2',
    name: 'The Coffee House',
    places: '123 Main Street, Downtown',
    icon: 'LocalCafe',
  },
  {
    id: '3',
    name: 'City Library',
    places: '456 Library Ave, near the town square',
    icon: 'LocalLibrary',
  },
  {
    id: '4',
    name: 'Sunset Beach',
    places: 'Beautiful beach with stunning sunset views',
    icon: 'BeachAccess',
  },
];

// Decorator to mock storage with empty data
const WithEmptyStorage = (Story: any) => {
  // Set up mock immediately before rendering
  Preferences.get = async () => Promise.resolve({ value: '[]' });
  return <Story />;
};

function mockApi(seed: Place[] = []): StorageAPI {
  let data = [...seed];
  return {
    getPlaces: async () => Promise.resolve([...data]),
    deletePlace: async (id) => {
      data = data.filter((p) => p.id !== id);
    },
  };
}

const withMockPlaces = (api: StorageAPI) => (Story: any) => (
  <StorageContext.Provider value={api}>
    <Story />
  </StorageContext.Provider>
);

const meta: Meta<typeof PlacesInaccessible> = {
  title: 'Pages/PlacesInaccessible',
  component: PlacesInaccessible,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
This is an intentionally inaccessible version of the Places component for workshop demonstration purposes.

## Accessibility Issues Present

This version contains the following accessibility problems that should be detected by Storybook's a11y addon:

1. **Non-semantic delete button**: The delete button is implemented as a \`<div>\` with an onClick handler instead of a proper
   \`<button>\` element. This makes it:
   - Not keyboard accessible (can't be reached with Tab key)
   - Not announced properly to screen readers
   - Missing proper button semantics and ARIA roles

2. **Poor keyboard navigation flow**: The Edit buttons are rendered after the list in the DOM but positioned with CSS to appear
   inline with each list item. This creates confusing tab order where users must tab through all places first, then circle back
   to edit each one.

3. **Suboptimal UX**: The "Add Place" button is positioned below the list instead of at the top where users expect it.

## Expected A11y Violations

When you view this component in Storybook with the Accessibility addon enabled, you should see violations for:
- Interactive elements that are not keyboard accessible
- Missing button roles/semantics
- Elements with click handlers that aren't accessible
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptyList: Story = {
  name: 'Empty Places List (Inaccessible)',
  decorators: [WithEmptyStorage],
  parameters: {
    docs: {
      description: {
        story: 'The places list when no places have been added yet - **with accessibility issues**. Even the empty state has some UX issues.',
      },
    },
  },
};

export const WithPlaces: Story = {
  name: 'Places List with Items (Inaccessible)',
  decorators: [withMockPlaces(mockApi(mockPlaces))],
  parameters: {
    docs: {
      description: {
        story: `
The places list displaying saved places - **with serious accessibility issues**.

Try using keyboard navigation (Tab key) to see how the focus order is broken. The delete buttons cannot be reached with the keyboard at all!

Check the Accessibility panel in Storybook to see the violations.
        `,
      },
    },
  },
};
