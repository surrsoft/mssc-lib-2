import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import MsscListFCC from '../../MsscList/MsscListFCC';
import { airSource } from './source/source';
import { listStructBuilder } from './listStructBuilder/listStructBuilder';
import { elemStructBuilder } from './elemStructBuilder';

//👇 Этот экспорт по умолчанию определяет, куда попадет ваша история в списке историй
export default {
  /* 👇 title опционален.
  * См. https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * чтобы узнать как генерировать  to learn how to generate automatic titles
  */
  title: 'MsscListFCC',
  component: MsscListFCC,
} as ComponentMeta<typeof MsscListFCC>;

//👇 Мы создаём “template” того как args мапится на рендеринг
const Template: ComponentStory<typeof MsscListFCC> = (args) => <MsscListFCC {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = {
  source: airSource,
  listElemStruct: elemStructBuilder,
  children: listStructBuilder
};
