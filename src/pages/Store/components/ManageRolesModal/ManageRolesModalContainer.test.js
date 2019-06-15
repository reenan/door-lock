import React from 'react'
import ManageRolesModalContainer from './ManageRolesModalContainer'

import renderer from 'react-test-renderer'

it('renders without crashing', () => {
  const component = renderer.create(
    <ManageRolesModalContainer
      isOpen={false}
      close={() => {}}
      save={() => {}}
      roles={{ mockRole: { name: 'MockRole', permissions: {} } }}
      doors={{ mockDoor: { name: 'MockDoor' } }}
      loading={false}
    />
  )

  expect(component).toMatchSnapshot()
})/* 

it('should be able to add new door', () => {
  const component = renderer.create(
    <ManageRolesModalContainer
      isOpen={false}
      close={() => {}}
      save={() => {}}
      doors={{ mock: { name: 'Mock' } }}
      loading={false}
    />
  )

  const instance = component.getInstance()
  instance.addNewDoor()

  expect(Object.keys(instance.state.virtualDoorList).length).toBe(2)
})

it('should be able to change a doors name', () => {
  const component = renderer.create(
    <ManageRolesModalContainer
      isOpen={false}
      close={() => {}}
      save={() => {}}
      doors={{ mock: { name: 'Mock' } }}
      loading={false}
    />
  )

  const instance = component.getInstance()
  instance.handleDoorNameChange('mock', { target: { value: 'new Mock' }})

  expect(instance.state.virtualDoorList['mock'].name).toBe('new Mock')
})

it('should be able to delete a door', () => {
  const component = renderer.create(
    <ManageRolesModalContainer
      isOpen={false}
      close={() => {}}
      save={() => {}}
      doors={{ mock: { name: 'Mock' } }}
      loading={false}
    />
  )

  const instance = component.getInstance()
  instance.removeDoor('mock')

  expect(Object.keys(instance.state.virtualDoorList).length).toBe(0)
})

it('should be able to reset list with discard changes', () => {
  const component = renderer.create(
    <ManageRolesModalContainer
      isOpen={false}
      close={() => {}}
      save={() => {}}
      doors={{ mock: { name: 'Mock' } }}
      loading={false}
    />
  )

  const instance = component.getInstance()
  instance.addNewDoor()
  expect(Object.keys(instance.state.virtualDoorList).length).toBe(2)

  instance.discardChanges()
  expect(Object.keys(instance.state.virtualDoorList).length).toBe(1)
})

it('should call prop save and close on saveChanges', () => {
  const saveMock = jest.fn()
  const closeMock = jest.fn()
  
  saveMock.mockReturnValue({
    then: (fn) => {
      fn()
    }
  })

  const component = renderer.create(
    <ManageRolesModalContainer
      isOpen={false}
      close={closeMock}
      save={saveMock}
      doors={{ mock: { name: 'Mock' }, mock2: { name: ''} }}
      loading={false}
    />
  )

  const instance = component.getInstance()
  instance.saveChanges()

  expect(saveMock).toHaveBeenCalled()
  expect(closeMock).toHaveBeenCalled()
})
 */
