import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AddPlace from './AddPlace';

const meta: Meta<typeof AddPlace> = {
  title: 'Pages/AddPlace',
  component: AddPlace,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/places/add']}>
        <Routes>
          <Route path="/places/add" element={<Story />} />
        </Routes>
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

export const NewPlace: Story = {
  name: 'Add New Place',
  parameters: {
    docs: {
      description: {
        story: 'Form for adding a new place with name, location description, and icon picker.',
      },
    },
  },
};

export const EditMode: Story = {
  name: 'Edit Existing Place',
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/places/edit/123']}>
        <Routes>
          <Route path="/places/edit/:id" element={<Story />} />
        </Routes>
      </MemoryRouter>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Form for editing an existing place (if place data exists in storage).',
      },
    },
  },
};
