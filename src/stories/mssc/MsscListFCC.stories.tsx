// noinspection JSUnusedGlobalSymbols

import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import MsscListFCC from "../../MsscList/MsscListFCC";
import { MsscListAreaHeightCls } from "../../MsscList/msscUtils/MsscListAreaHeightCls";
import { MsscListAreaHeightModeEnum } from "../../MsscList/types/enums/MsscListAreaHeightModeEnum";
import { elemStructBuilder } from "./elemStructBuilder";
import { listStructBuilder } from "./listStructBuilder/listStructBuilder";
import { sortDataSTA } from "./sort";
import { airTagsFieldNameArr } from "./sourceAir/airTagsFieldNameArr";
import { airSource } from "./sourceAir/sourceAir";
import { jsonSource } from "./sourceJson/jsonSource";
import { jsonTagsFieldNameArr } from "./sourceJson/jsonTagsFieldNameArr";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// --- ---

const queryClient = new QueryClient()

const exp: ComponentMeta<typeof MsscListFCC> = {
  /* title опционален.
   * См. https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * чтобы узнать как генерировать автоматические titles
   */
  title: "MsscListFCC",
  component: MsscListFCC,
};

// Этот экспорт по умолчанию определяет, куда попадет ваша история в списке историй
export default exp;

// 👇 Мы создаём “template” того как args мапится на рендеринг
const Template: ComponentStory<typeof MsscListFCC> = (args) => (
  <QueryClientProvider client={queryClient}>
    <MsscListFCC {...args} />
  </QueryClientProvider>
);

export const StoryAirSource = Template.bind({});

const listAreaHeight: MsscListAreaHeightCls = {
  mode: MsscListAreaHeightModeEnum.STICKY_DOWN,
  value: 150,
};

StoryAirSource.args = {
  source: airSource,
  listElemStruct: elemStructBuilder,
  children: listStructBuilder,
  sortData: sortDataSTA,
  tagsFieldNameArr: airTagsFieldNameArr,
  listAreaHeight,
};

// --- ---

export const StoryArraySource = Template.bind({});

const listAreaHeightB: MsscListAreaHeightCls = {
  mode: MsscListAreaHeightModeEnum.STICKY_DOWN,
  value: 150,
};

StoryArraySource.args = {
  source: jsonSource,
  listElemStruct: elemStructBuilder,
  children: listStructBuilder,
  sortData: sortDataSTA,
  tagsFieldNameArr: jsonTagsFieldNameArr,
  listAreaHeight: listAreaHeightB,
};
