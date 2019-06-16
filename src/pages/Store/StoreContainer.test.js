import React from 'react'
import StoreContainer from './StoreContainer'

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
    <StoreContainer.WrappedComponent
      dispatch={() => {}}
      store={{}}
    />
  )

  expect(component).toMatchSnapshot()
})


it('renders without crashing with store', () => {
  const component = shallow(
    <StoreContainer.WrappedComponent
      dispatch={() => {}}
      store={{
        name: 'Mock'
      }}
    />
  )

  expect(component).toMatchSnapshot()
})

it('should be able to select an employee', () => {
  const component = shallow(
    <StoreContainer.WrappedComponent
      dispatch={() => {}}
      store={{}}
    />
  )

  component.instance().selectEmployee('mock')
  expect(component.state('selectedEmployee')).toBe('mock')
})

it('should be able to open then close all modals', () => {
  const component = shallow(
    <StoreContainer.WrappedComponent
      dispatch={() => {}}
      store={{}}
    />
  )

  component.instance().openManageDoorsModal()
  expect(component.state('isOpenManageDoorsModal')).toBe(true)

  component.instance().closeManageDoorsModal()
  expect(component.state('isOpenManageDoorsModal')).toBe(false)

  component.instance().openManageRolesModal()
  expect(component.state('isOpenManageRolesModal')).toBe(true)

  component.instance().closeManageRolesModal()
  expect(component.state('isOpenManageRolesModal')).toBe(false)

  component.instance().openManageEmployeesModal()
  expect(component.state('isOpenManageEmployeesModal')).toBe(true)

  component.instance().closeManageEmployeesModal()
  expect(component.state('isOpenManageEmployeesModal')).toBe(false)

  component.instance().openUnregistrationModal()
  expect(component.state('isOpenUnregistrationModal')).toBe(true)

  component.instance().closeUnregistrationModal()
  expect(component.state('isOpenUnregistrationModal')).toBe(false)
})

it('should call request made action after calling saveRoleList', () => {
  const mockFetchPromise = Promise.resolve({
    status: 200
  })

  jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise)

  const expectedActions = [
    { type: actions.REQUEST_MADE },
  ]

  const store = mockStore({ store: {}})

  const component = shallow(
    <StoreContainer.WrappedComponent
      dispatch={store.dispatch}
      store={{}}
      history={{
        push: () => {}
      }}
    />
  )

  component.instance().saveRoleList({})
  expect(store.getActions()).toEqual(expectedActions)
})

it('should call request made action after calling saveDoorList', () => {
  const mockFetchPromise = Promise.resolve({
    status: 200
  })

  jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise)

  const expectedActions = [
    { type: actions.REQUEST_MADE },
  ]

  const store = mockStore({ store: {}})

  const component = shallow(
    <StoreContainer.WrappedComponent
      dispatch={store.dispatch}
      store={{}}
      history={{
        push: () => {}
      }}
    />
  )

  component.instance().saveDoorList({})
  expect(store.getActions()).toEqual(expectedActions)
})

it('should call request made action after calling saveEmployeeList', () => {
  const mockFetchPromise = Promise.resolve({
    status: 200
  })

  jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise)

  const expectedActions = [
    { type: actions.REQUEST_MADE },
  ]

  const store = mockStore({ store: {}})

  const component = shallow(
    <StoreContainer.WrappedComponent
      dispatch={store.dispatch}
      store={{}}
      history={{
        push: () => {}
      }}
    />
  )

  component.instance().saveEmployeeList({})
  expect(store.getActions()).toEqual(expectedActions)
})

it('should call request made action after calling unregisterStore', () => {
  const mockFetchPromise = Promise.resolve({
    status: 204
  })

  jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise)

  const expectedActions = [
    { type: actions.REQUEST_MADE },
  ]

  const store = mockStore({ store: {}})

  const component = shallow(
    <StoreContainer.WrappedComponent
      dispatch={store.dispatch}
      store={{}}
      history={{
        push: () => {}
      }}
    />
  )

  component.instance().unregisterStore({})
  expect(store.getActions()).toEqual(expectedActions)
})
