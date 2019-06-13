import React from 'react'
import Icon from './Icon'

import renderer from 'react-test-renderer'

it('renders without crashing', () => {
  const component = renderer.create(
    <Icon icon='Mock' />
  )

  expect(component).toMatchSnapshot();
})

it('renders without crashing with size', () => {
  const component = renderer.create(
    <Icon size={11} icon='Mock' />
  )

  expect(component).toMatchSnapshot();
})
