import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { SvgButtonStyledStory } from './SvgButton/SvgButton/SvgButtonStyledStory';

const meta: Meta<typeof SvgButtonStyledStory> = {
  title: 'Example/SvgButtonStyledStory',
  component: SvgButtonStyledStory,
};

export default meta;

// ---

type Story = StoryObj<typeof SvgButtonStyledStory>;

export const Primary: Story = {
  render: (args) => {
    return <SvgButtonStyledStory {...args} />;
  },
  args: {
    whPx: {
      control: {
        type: 'number',
        default: 32
      }
    }
  }
};