import type { Meta, StoryObj } from '@storybook/react';
import HeroSection from './HeroSection';

const meta = {
  title: 'Components/HeroSection',
  component: HeroSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    headline: {
      control: { type: 'text' },
      description: 'Main headline',
    },
    subheading: {
      control: { type: 'text' },
      description: 'Subheading text',
    },
    ctaLabel: {
      control: { type: 'text' },
      description: 'CTA button label',
    },
    ctaHref: {
      control: { type: 'text' },
      description: 'CTA button link',
    },
    image: {
      control: { type: 'text' },
      description: 'Background image URL',
    },
  },
} satisfies Meta<typeof HeroSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    headline: 'Welcome to ULBRA',
    subheading: 'Discover our modern design system and components',
    ctaLabel: 'Get Started',
    ctaHref: '#',
  },
};

export const WithImage: Story = {
  args: {
    headline: 'Transform Your Vision',
    subheading: 'Build beautiful experiences with our design system',
    ctaLabel: 'Explore More',
    ctaHref: '#',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop',
  },
};
