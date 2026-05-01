import type { Meta, StoryObj } from '@storybook/react';
import Icon from './Icon';

const meta = {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: { type: 'text' },
      description: 'Icon name',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Icon size',
    },
    color: {
      control: { type: 'color' },
      description: 'Icon color',
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'star',
    size: 'md',
    color: '#0d3634',
  },
};

export const Large: Story = {
  args: {
    name: 'heart',
    size: 'lg',
    color: '#dc3545',
  },
};

export const Colored: Story = {
  args: {
    name: 'check',
    size: 'md',
    color: '#28a745',
  },
};
