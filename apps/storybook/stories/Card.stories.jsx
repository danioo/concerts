import React from 'react';
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import { Card } from 'ui';

const config = {
  title: 'UI/Card',
  component: Card,
};

export default config

const Template = (args) => <Card {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: "Card title",
  category: "Category",
  content: "Card content",
  place: "Example place",
  date: "2023-02-22",
  onSale: false
};
Primary.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await userEvent.click(canvas.getByRole('button'))
}