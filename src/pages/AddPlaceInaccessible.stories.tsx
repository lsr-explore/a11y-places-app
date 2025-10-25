import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AddPlaceInaccessible from './AddPlaceInaccessible';

const meta: Meta<typeof AddPlaceInaccessible> = {
  title: 'Pages/AddPlaceInaccessible',
  component: AddPlaceInaccessible,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/places-inaccessible/add']}>
        <Routes>
          <Route path="/places-inaccessible/add" element={<Story />} />
        </Routes>
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
This is an intentionally inaccessible version of the AddPlace component for workshop demonstration purposes.

## Accessibility Issues Present

This version contains the following accessibility problems that should be detected by Storybook's a11y addon:

1. **Missing form field description**: The explanation "Fields marked with an asterisk (*) are required" has been removed,
   leaving no programmatic way for screen reader users to understand the meaning of the asterisk.

2. **Missing aria-label on IconButton**: The icon button that displays the currently selected icon has no accessible label,
   so screen reader users won't know what the button does or what icon is currently selected.

## Expected A11y Violations

When you view this component in Storybook with the Accessibility addon enabled, you should see violations for:
- Form labels and instructions
- Button accessible names
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const NewPlace: Story = {
  name: 'Add New Place (Inaccessible)',
  parameters: {
    docs: {
      description: {
        story: 'Form for adding a new place - **with accessibility issues**. Check the Accessibility panel in Storybook to see the violations.',
      },
    },
  },
};

export const EditMode: Story = {
  name: 'Edit Existing Place (Inaccessible)',
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/places-inaccessible/edit/123']}>
        <Routes>
          <Route path="/places-inaccessible/edit/:id" element={<Story />} />
        </Routes>
      </MemoryRouter>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Form for editing an existing place (if place data exists in storage) - **with accessibility issues**. Check the Accessibility panel in Storybook to see the violations.',
      },
    },
  },
};
