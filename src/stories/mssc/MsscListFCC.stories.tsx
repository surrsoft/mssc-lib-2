import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import MsscListFCC from '../../MsscList/MsscListFCC';
import { airSource } from './sourceAir/sourceAir';
import { listStructBuilder } from './listStructBuilder/listStructBuilder';
import { elemStructBuilder } from './elemStructBuilder';
import { sortDataSTA } from './sort';
import { airTagsFieldNameArr } from './sourceAir/airTagsFieldNameArr';
import { jsonSource } from './sourceJson/jsonSource';
import { jsonTagsFieldNameArr } from './sourceJson/jsonTagsFieldNameArr';
import { MsscListAreaHeightModeEnum } from '../../MsscList/types/enums/MsscListAreaHeightModeEnum';
import { MsscListAreaHeightCls } from '../../MsscList/msscUtils/MsscListAreaHeightCls';

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

export const StoryAirSource = Template.bind({});

StoryAirSource.args = {
  source: airSource,
  listElemStruct: elemStructBuilder,
  children: listStructBuilder,
  sortData: sortDataSTA,
  tagsFieldNameArr: airTagsFieldNameArr,
  listAreaHeight: {mode: MsscListAreaHeightModeEnum.STICKY_DOWN, value: 150} as MsscListAreaHeightCls
};

export const StoryArraySource = Template.bind({});

StoryArraySource.args = {
  source: jsonSource,
  listElemStruct: elemStructBuilder,
  children: listStructBuilder,
  sortData: sortDataSTA,
  tagsFieldNameArr: jsonTagsFieldNameArr,
  listAreaHeight: {mode: MsscListAreaHeightModeEnum.STICKY_DOWN, value: 150} as MsscListAreaHeightCls
};
