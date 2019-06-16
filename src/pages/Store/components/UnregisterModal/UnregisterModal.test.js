import React from 'react'
import EnzymeToJson from 'enzyme-to-json'
import { mount } from 'enzyme'

import UnregisterModal from './UnregisterModal'

it('renders without crashing', () => {
  const component = mount(
    <UnregisterModal
      isOpen={false}
      loading={false}
      unregister={() => {}}
      close={() => {}}
    />
  )

  expect(EnzymeToJson(component)).toMatchSnapshot()
})
