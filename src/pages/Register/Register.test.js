import React from 'react'
import Register from './Register'

import EnzymeToJson from 'enzyme-to-json'
import { mount } from 'enzyme'

it('renders without crashing', () => {
  const component = mount(
    <Register
      registerModalIsOpen={false}
      storeName=''
      openRegisterModal={() => {}}
      closeRegisterModal={() => {}}
      handleStoreNameChange={() => {}}
    />
  )

  expect(EnzymeToJson(component)).toMatchSnapshot()
})

it('renders without crashing, modal open', () => {
  const component = mount(
    <Register
      registerModalIsOpen={true}
      storeName='Mock'
      openRegisterModal={() => {}}
      closeRegisterModal={() => {}}
      handleStoreNameChange={() => {}}
    />
  )

  expect(EnzymeToJson(component)).toMatchSnapshot()
})
