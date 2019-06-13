import React from 'react'
import Input from './Input'

import renderer from 'react-test-renderer'

it('renders without crashing', () => {
  const component = renderer.create(
    <Input onChange={() => {}} />
  )

  expect(component).toMatchSnapshot()
})

it('renders without crashing with value', () => {
  const component = renderer.create(
    <Input value='Mock' onChange={() => {}} />
  )

  expect(component).toMatchSnapshot()
})
