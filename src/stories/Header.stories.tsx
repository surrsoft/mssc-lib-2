// noinspection JSUnusedGlobalSymbols

import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { Header } from "./Header";

const exp: ComponentMeta<typeof Header> = {
  title: "Example/Header",
  component: Header,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
};

export default exp;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {
    name: "Jane Doe",
  },
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
