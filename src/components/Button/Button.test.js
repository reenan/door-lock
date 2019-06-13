import React from 'react'
import Button from './Button'

import renderer from 'react-test-renderer'

it('renders without crashing', () => {
  const component = renderer.create(
    <Button />
  )

  expect(component).toMatchSnapshot()
})

it('renders without crashing with size', () => {
  const component = renderer.create(
    <Button size={11} />
  )

  expect(component).toMatchSnapshot()
})

it('renders without crashing with text and icon', () => {
  const component = renderer.create(
    <Button text='Mock' icon='Mock' />
  )

  expect(component).toMatchSnapshot()
})

