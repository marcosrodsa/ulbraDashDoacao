import type { Meta, StoryObj } from '@storybook/react';
import Card from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Card Title',
    children: 'This is the card content. It can contain any type of content you want.',
  },
};

export const WithImage: Story = {
  args: {
    image: {
      src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=400&fit=crop',
      alt: 'Sample card image',
    },
    title: 'Card with Image',
    children: 'This card has an image at the top. The image maintains a 3:2 aspect ratio.',
  },
};

export const WithFooter: Story = {
  args: {
    title: 'Card with Footer',
    children: 'Main card content goes here.',
    footer: 'Footer information or actions can be placed here.',
  },
};

export const Full: Story = {
  args: {
    image: {
      src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=400&fit=crop',
      alt: 'Sample card image',
    },
    title: 'Complete Card',
    children: 'This is a complete card with all features. It includes an image, title, content, and footer.',
    footer: 'Card Footer - Created on April 30, 2026',
  },
};
