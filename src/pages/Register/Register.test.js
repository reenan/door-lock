import React from 'react'
import Register from './Register'

import { shallow } from 'enzyme'

it('renders without crashing', () => {
  const component = shallow(
    <Register
      registerModalIsOpen={false}
      storeName=''
      openRegisterModal={() => {}}
      closeRegisterModal={() => {}}
      handleStoreNameChange={() => {}}
    />
  )

  expect(component).toMatchSnapshot()
})

it('renders without crashing, modal open', () => {
  const component = shallow(
    <Register
      registerModalIsOpen={true}
      storeName='Mock'
      openRegisterModal={() => {}}
      closeRegisterModal={() => {}}
      handleStoreNameChange={() => {}}
    />
  )

  expect(component).toMatchSnapshot()
})
