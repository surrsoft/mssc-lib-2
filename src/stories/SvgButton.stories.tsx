import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { SvgButton } from '../MsscList/common/SvgButton/SvgButton';

const meta: Meta<typeof SvgButton> = {
  title: 'Example/SvgButton',
  component: SvgButton,
};

export default meta;

// ---

type Story = StoryObj<typeof SvgButton>;

export const Primary: Story = {
  render: () => <SvgButton />,
};