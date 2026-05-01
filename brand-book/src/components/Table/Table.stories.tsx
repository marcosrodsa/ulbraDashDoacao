import type { Meta, StoryObj } from '@storybook/react';
import Table from './Table';

const meta = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    striped: {
      control: { type: 'boolean' },
      description: 'Apply striped row styling',
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const headers = ['Name', 'Email', 'Role', 'Status'];
const sampleData = [
  ['John Doe', 'john@example.com', 'Admin', 'Active'],
  ['Jane Smith', 'jane@example.com', 'Editor', 'Active'],
  ['Bob Johnson', 'bob@example.com', 'Viewer', 'Inactive'],
];

export const Default: Story = {
  args: {
    headers,
    data: sampleData,
    striped: false,
  },
};

export const Striped: Story = {
  args: {
    headers,
    data: sampleData,
    striped: true,
  },
};

export const WithData: Story = {
  args: {
    headers: ['ID', 'Product', 'Price', 'Quantity'],
    data: [
      ['1', 'Laptop', '$999', '5'],
      ['2', 'Monitor', '$299', '12'],
      ['3', 'Keyboard', '$79', '25'],
      ['4', 'Mouse', '$49', '30'],
      ['5', 'Headphones', '$199', '8'],
    ],
    striped: true,
  },
};
