import type { Meta, StoryObj } from '@storybook/react';
import Alert from './Alert';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['success', 'danger', 'warning', 'info'],
      description: 'Alert variant/type',
    },
    dismissible: {
      control: { type: 'boolean' },
      description: 'Show dismiss button',
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    variant: 'success',
    dismissible: false,
    children: 'Success! Your changes have been saved.',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    dismissible: true,
    children: 'Error! Something went wrong. Please try again.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    dismissible: true,
    children: 'Warning! This action cannot be undone.',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    dismissible: false,
    children: 'Info: Please complete your profile to unlock all features.',
  },
};
