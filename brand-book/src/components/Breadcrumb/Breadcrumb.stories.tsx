import type { Meta, StoryObj } from '@storybook/react';
import Breadcrumb from './Breadcrumb';

const meta = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { text: 'Home', href: '/' },
      { text: 'Products', href: '/products' },
      { text: 'Electronics', href: '/products/electronics' },
    ],
  },
};

export const Current: Story = {
  args: {
    items: [
      { text: 'Home', href: '/' },
      { text: 'Products', href: '/products' },
      { text: 'Electronics', href: '/products/electronics' },
      { text: 'Laptops', href: '/products/electronics/laptops', current: true },
    ],
  },
};
