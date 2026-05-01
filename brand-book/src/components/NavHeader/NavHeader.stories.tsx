import type { Meta, StoryObj } from '@storybook/react';
import NavHeader from './NavHeader';

const meta = {
  title: 'Components/NavHeader',
  component: NavHeader,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    brand: {
      control: { type: 'text' },
      description: 'Brand text',
    },
  },
} satisfies Meta<typeof NavHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

const navItems = [
  { label: 'Home', href: '#', active: true },
  { label: 'About', href: '#' },
  { label: 'Services', href: '#' },
  { label: 'Contact', href: '#' },
];

export const Desktop: Story = {
  args: {
    brand: 'ULBRA',
    items: navItems,
  },
};

export const Mobile: Story = {
  args: {
    brand: 'ULBRA',
    items: navItems,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
