import type { Meta, StoryObj } from '@storybook/react';
import Container from './Container';

const meta = {
  title: 'Components/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    maxWidth: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'Container max-width',
    },
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    maxWidth: 'xl',
    children: (
      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '2rem',
        borderRadius: '0.5rem',
        textAlign: 'center',
      }}>
        <h2>Container Content</h2>
        <p>This content is centered with max-width of 1140px and responsive padding.</p>
      </div>
    ),
  },
};
