import React from 'react'
import EnzymeToJson from 'enzyme-to-json'
import { mount } from 'enzyme'

import ManageDoorsModal from './ManageDoorsModal'

it('renders without crashing', () => {
  const component = mount(
    <ManageDoorsModal
      isOpen={false}
      items={{}}
      loading={false}
      save={() => {}}
      close={() => {}}
    />
  )

  expect(EnzymeToJson(component)).toMatchSnapshot()
})

it('renders without crashing when open', () => {
  const component = mount(
    <ManageDoorsModal
      isOpen={true}
      items={{
        name: 'Mock'
      }}
      loading={false}
      save={() => {}}
      close={() => {}}
    />
  )

  expect(EnzymeToJson(component)).toMatchSnapshot()
})
