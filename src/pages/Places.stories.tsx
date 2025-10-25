import { Preferences } from '@capacitor/preferences';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import type { Place } from '../types/Place';
import { StorageAPI, StorageContext } from '../utils/storageApi';
import Places from './Places';

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

const meta: Meta<typeof Places> = {
  title: 'Pages/Places',
  component: Places,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptyList: Story = {
  name: 'Empty Places List',
  decorators: [WithEmptyStorage],
  parameters: {
    docs: {
      description: {
        story:
          'The places list when no places have been added yet. Shows a helpful message prompting the user to add their first place.',
      },
    },
  },
};

export const WithPlaces: Story = {
  name: 'Places List with Items',
  decorators: [withMockPlaces(mockApi(mockPlaces))],
  parameters: {
    docs: {
      description: {
        story:
          'The places list displaying saved places. Each place shows its name, location, icon, and actions for editing or deleting.',
      },
    },
  },
};

export const WithSuccessMessage: Story = {
  name: 'With Success Notification',
  decorators: [
    withMockPlaces(mockApi(mockPlaces)),
    (Story) => (
      <MemoryRouter
        initialEntries={[
          {
            pathname: '/places',
            state: {
              successMessage: 'Place added successfully',
              restoreFocusTo: 'add-button',
            },
          },
        ]}
      >
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'The places list showing a success notification after adding or editing a place.',
      },
    },
  },
};
