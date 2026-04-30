import type { Preview } from '@storybook/react';
import '../src/styles/global.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      autodocs: true,
    },
  },
  decorators: [
    (Story) => (
      <div style={{ fontFamily: 'Inter, sans-serif' }}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
