import React from 'react'
import RegisterContainer from './RegisterContainer'

import { shallow } from 'enzyme'

it('renders without crashing', () => {
  const component = shallow(
    <RegisterContainer.WrappedComponent
      dispatch={() => {}}
      store={{}}
    />
  )

  expect(component).toMatchSnapshot()
})

it('renders without crashing with store', () => {
  const component = shallow(
    <RegisterContainer.WrappedComponent
      dispatch={() => {}}
      store={{
        name: 'Mock'
      }}
    />
  )

  expect(component).toMatchSnapshot()
})

it('should be able to open then close a modal', () => {
  const component = shallow(
    <RegisterContainer.WrappedComponent
      dispatch={() => {}}
      store={{}}
    />
  )

  component.instance().openRegisterModal()
  expect(component.state('registerModalIsOpen')).toBe(true)

  component.instance().closeRegisterModal()
  expect(component.state('registerModalIsOpen')).toBe(false)
})

it('should be able to update storeName state', () => {
  const component = shallow(
    <RegisterContainer.WrappedComponent
      dispatch={() => {}}
      store={{}}
    />
  )

  component.instance().handleStoreNameChange({
    target: {
      value: 'Mock'
    }
  })

  expect(component.state('storeName')).toBe('Mock')
})

it('should call dispatch function on store registration', () => {
  const mockDispatch = jest.fn()

  const component = shallow(
    <RegisterContainer.WrappedComponent
      dispatch={mockDispatch}
      store={{}}
    />
  )

  component.instance().registerStore()
  expect(mockDispatch).toHaveBeenCalled()
})