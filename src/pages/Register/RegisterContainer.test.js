import React from 'react'
import RegisterContainer from './RegisterContainer'

import configureStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import * as actions from '../../actions'

const middlewares = [thunkMiddleware, createLogger()]
const mockStore = configureStore(middlewares)

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
  expect(component.state('isOpenRegisterModal')).toBe(true)

  component.instance().closeRegisterModal()
  expect(component.state('isOpenRegisterModal')).toBe(false)
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

it('should call request made action after calling registerStore', () => {
  const mockFetchPromise = Promise.resolve({
    status: 201
  })

  jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise)

  const expectedActions = [
    { type: actions.REQUEST_MADE },
  ]

  const store = mockStore({ store: {}})

  const component = shallow(
    <RegisterContainer.WrappedComponent
      dispatch={store.dispatch}
      store={{}}
      history={{
        push: () => {}
      }}
    />
  )
  component.instance().registerStore()
  expect(store.getActions()).toEqual(expectedActions)
})
