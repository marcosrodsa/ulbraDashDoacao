import type { Meta, StoryObj } from '@storybook/react';
import Section from './Section';

const meta = {
  title: 'Components/Section',
  component: Section,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: { type: 'color' },
      description: 'Background color',
    },
    padding: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'Padding preset',
    },
  },
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    backgroundColor: '#ffffff',
    padding: 'md',
    children: (
      <div style={{ textAlign: 'center' }}>
        <h2>Section Title</h2>
        <p>This is a full-width section component with configurable padding and background.</p>
      </div>
    ),
  },
};

export const WithBackground: Story = {
  args: {
    backgroundColor: '#f1f3f5',
    padding: 'lg',
    children: (
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ color: '#0d3634' }}>Featured Section</h2>
        <p style={{ color: '#495057' }}>This section has a light gray background to stand out.</p>
      </div>
    ),
  },
};
