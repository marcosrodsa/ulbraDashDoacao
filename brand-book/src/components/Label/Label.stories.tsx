import type { Meta, StoryObj } from '@storybook/react';
import Label from './Label';

const meta = {
  title: 'Components/Label',
  component: Label,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    required: {
      control: { type: 'boolean' },
      description: 'Show required indicator',
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Form Field Label',
    htmlFor: 'example-input',
  },
};

export const Required: Story = {
  args: {
    children: 'Required Field',
    required: true,
    htmlFor: 'required-input',
  },
};
