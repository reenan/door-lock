import React from 'react'
import DoorContainer from './DoorContainer'

import { shallow } from 'enzyme'

afterEach(() => {
  jest.clearAllMocks()
})

it('should be able to open a door then close it', () => {
  jest.useFakeTimers()
  const component = shallow(
    <DoorContainer.WrappedComponent
      dispatch={() => {}}
      store={{
        employees: {},
        roles: {},
        doors: {},
      }}
      doorID='mock'
    />
  )

  component.instance().openDoor()
  expect(component.state('isOpen')).toBe(true)

  jest.runAllTimers()
  expect(component.state('isOpen')).toBe(false)
})

it('should be able to block a door then unblock it', () => {
  jest.useFakeTimers()
  const component = shallow(
    <DoorContainer.WrappedComponent
      dispatch={() => {}}
      store={{
        employees: {},
        roles: {},
        doors: {},
      }}
      doorID='mock'
    />
  )

  component.instance().blockDoor()
  expect(component.state('isBlocked')).toBe(true)

  jest.runAllTimers()
  expect(component.state('isBlocked')).toBe(false)
})

it('should be able to handle a door click and resolve', () => {
  const mockFetchPromise = Promise.resolve({
    status: 200
  })

  jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise)

  const dispatchMock = jest.fn()
  const mockThen = jest.fn()
  dispatchMock.mockReturnValue({
    then: (fn) => {
      mockThen()
      fn()
    }
  })

  const component = shallow(
    <DoorContainer.WrappedComponent
      dispatch={dispatchMock}
      store={{
        employees: {},
        roles: {},
        doors: {},
      }}
      doorID='mock'
    />
  )

  component.instance().handleDoorClick()
  expect(dispatchMock).toHaveBeenCalled()
  expect(mockThen).toHaveBeenCalled()

})
