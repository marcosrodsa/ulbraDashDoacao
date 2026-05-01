import type { Meta, StoryObj } from '@storybook/react';
import FormGroup from './FormGroup';
import Input from '../Input/Input';

const meta = {
  title: 'Components/FormGroup',
  component: FormGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Label text',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Mark field as required',
    },
    error: {
      control: { type: 'boolean' },
      description: 'Show error state',
    },
    errorMessage: {
      control: { type: 'text' },
      description: 'Error message to display',
    },
  },
} satisfies Meta<typeof FormGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Email Address',
    required: false,
    error: false,
  },
  render: (args) => (
    <FormGroup {...args}>
      <Input type="email" placeholder="Enter your email" />
    </FormGroup>
  ),
};

export const WithError: Story = {
  args: {
    label: 'Email Address',
    required: true,
    error: true,
    errorMessage: 'Please enter a valid email address',
  },
  render: (args) => (
    <FormGroup {...args}>
      <Input type="email" placeholder="Enter your email" />
    </FormGroup>
  ),
};
