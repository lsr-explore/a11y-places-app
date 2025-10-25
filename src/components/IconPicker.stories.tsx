import type { Meta, StoryObj } from '@storybook/react';
import IconPicker from './IconPicker';

const meta: Meta<typeof IconPicker> = {
  title: 'Components/IconPicker',
  component: IconPicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onClose: () => {},
    onSelect: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    open: true,
    selectedIcon: 'Place',
  },
};

export const WithSelectedIcon: Story = {
  args: {
    open: true,
    selectedIcon: 'Restaurant',
  },
};

export const Closed: Story = {
  args: {
    open: false,
  },
};
