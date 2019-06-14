import React from 'react'
import RegisterContainer from './RegisterContainer'

import { shallow } from 'enzyme'

afterEach(() => {    
  jest.clearAllMocks()
})

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

it('should call dispatch and history.push function on store registration', (done) => {
  const mockDispatch = jest.fn()
  const mockPush = jest.fn()

  const component = shallow(
    <RegisterContainer.WrappedComponent
      dispatch={mockDispatch}
      store={{}}
      history={{
        push: mockPush
      }}
    />
  )

  const mockFetchPromise = Promise.resolve({
    status: 201,
  });
  
  jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise)

  component.instance().registerStore()

  // Wait a little before checking if stubed functions
  // were called after promise resolve
  setTimeout(() => {
    expect(mockDispatch).toHaveBeenCalled()
    expect(mockPush).toHaveBeenCalled()
    done()
  }, 100)
})

it('should not call dispatch and history.push function on bad store registration', (done) => {
  const mockDispatch = jest.fn()
  const mockPush = jest.fn()

  const component = shallow(
    <RegisterContainer.WrappedComponent
      dispatch={mockDispatch}
      store={{}}
      history={{
        push: mockPush
      }}
    />
  )

  const mockFetchPromise = Promise.resolve({
    status: 500,
  })

  jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise)

  component.instance().registerStore()

  // Wait a little before checking if stubed functions
  // were called after promise resolve
  setTimeout(() => {
    expect(mockDispatch).not.toHaveBeenCalled()
    expect(mockPush).not.toHaveBeenCalled()
    done()
  }, 100)
})
