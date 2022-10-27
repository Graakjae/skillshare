import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Input } from "./input";

export default {
  title: "Components/Input",
  component: Input,
  argTypes: {
    disabled: { control: "boolean" },
    disableMaxInputLenght: { control: "boolean" },
    searchIconLeft: { control: "boolean" },
    searchIconRight: { control: "boolean" },
    hideTextMessage: { control: "boolean" },
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  color: "default",
  label: "Input",
  textMessage: "Text message",
  placeholderInputText: "Input text",
  maxInputLenght: 300,
  disableMaxInputLenght: true,
  textAlignment: "start",
  hideTextMessage: true,
  disabled: false,
  inputIconLeft: false,
  searchIconRight: false,
  inputId: "",
  inputType: "",
};
