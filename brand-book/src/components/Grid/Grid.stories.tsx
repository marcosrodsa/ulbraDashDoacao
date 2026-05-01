import type { Meta, StoryObj } from '@storybook/react';
import Grid from './Grid';

const meta = {
  title: 'Components/Grid',
  component: Grid,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: { type: 'number' },
      description: 'Number of columns',
    },
    gap: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Gap between grid items',
    },
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

const GridItem = ({ number }: { number: number }) => (
  <div style={{
    backgroundColor: '#0d3634',
    color: '#ffffff',
    padding: '2rem',
    borderRadius: '0.5rem',
    textAlign: 'center',
    minHeight: '150px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    fontWeight: 600,
  }}>
    Item {number}
  </div>
);

export const ThreeColumn: Story = {
  args: {
    columns: 4,
    gap: 'md',
  },
  render: (args: Story['args']) => (
    <Grid {...args}>
      <GridItem number={1} />
      <GridItem number={2} />
      <GridItem number={3} />
    </Grid>
  ),
};

export const TwoColumn: Story = {
  args: {
    columns: 6,
    gap: 'md',
  },
  render: (args: Story['args']) => (
    <Grid {...args}>
      <GridItem number={1} />
      <GridItem number={2} />
    </Grid>
  ),
};
