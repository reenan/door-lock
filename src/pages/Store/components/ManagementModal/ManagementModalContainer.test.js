import React from 'react'
import ManagementModalContainer from './ManagementModalContainer'
import { shallow } from 'enzyme'

import EnzymeToJson from 'enzyme-to-json'
import { mount } from 'enzyme'

const MockComponent = () => (
  <div>
    Hello Test
  </div>
)

it('renders without crashing', () => {
  const component = mount(
    <ManagementModalContainer isOpen={false} items={{}} nestedItems={{}}
      loading={false} save={() => {}} close={() => {}} itemStructure={{ name: '' }}
      useDivider ItemComponent={MockComponent}
      modalData={{
        title: `Mock`,
        description: `Write Tests`,
        info: `Its important.`,
        addText: 'Add new test',
      }}
    />
  )

  expect(EnzymeToJson(component)).toMatchSnapshot()
})

it('renders without crashing when open', () => {
  const component = mount(
    <ManagementModalContainer isOpen={true} items={{}} nestedItems={{}}
      loading={false} save={() => {}} close={() => {}} itemStructure={{ name: '' }}
      useDivider ItemComponent={MockComponent}
      modalData={{
        title: `Mock`,
        description: `Write Tests`,
        info: `Its important.`,
        addText: 'Add new test',
      }}
    />
  )

  expect(EnzymeToJson(component)).toMatchSnapshot()
})

it('should be able to add new item and remove it', () => {
  const component = shallow(
    <ManagementModalContainer isOpen={false} items={{}} nestedItems={{}}
      loading={false} save={() => {}} close={() => {}} itemStructure={{ name: '' }}
      useDivider ItemComponent={MockComponent}
      modalData={{
        title: `Mock`,
        description: `Write Tests`,
        info: `Its important.`,
        addText: 'Add new test',
      }}
    />
  )

  component.instance().addNewItem()

  const virtualItemsState = component.state('virtualItems')
  const virtualItemsKey = Object.keys(virtualItemsState)

  expect(virtualItemsKey.length).toBe(1)

  const itemID = virtualItemsKey[0]
  component.instance().removeItem(itemID)

  const newVirtualItemsState = component.state('virtualItems')
  const newVirtualItemsKey = Object.keys(newVirtualItemsState)

  expect(newVirtualItemsKey.length).toBe(0)
})

it('should be able to handle input changes', () => {
  const component = shallow(
    <ManagementModalContainer isOpen={false} items={{}} nestedItems={{}}
      loading={false} save={() => {}} close={() => {}}
      itemStructure={{
        name: '',
        nested: {
          toggle: false
        },
        role: null
      }}
      useDivider ItemComponent={MockComponent}
      modalData={{
        title: `Mock`,
        description: `Write Tests`,
        info: `Its important.`,
        addText: 'Add new test',
      }}
    />
  )

  component.instance().addNewItem()

  const virtualItemsState = component.state('virtualItems')
  const virtualItemsKey = Object.keys(virtualItemsState)

  const itemID = virtualItemsKey[0]

  component.instance().handleTextInputChange(itemID, {
    target: { name: 'name', value: 'mock value' }
  })
  component.instance().handleCheckboxToggle(itemID, 'toggle', 'nested')
  component.instance().handleDropdownChange(itemID, null, { value: 'mock-dropdown' })

  expect(virtualItemsState[itemID].name).toBe('mock value')
  expect(virtualItemsState[itemID].nested.toggle).toBe(true)
  expect(virtualItemsState[itemID].role).toBe('mock-dropdown')
})

it('should be able to discard changes and reset list', () => {
  const component = shallow(
    <ManagementModalContainer isOpen={false} items={{}} nestedItems={{}}
      loading={false} save={() => {}} close={() => {}}
      itemStructure={{ name: '' }}
      useDivider ItemComponent={MockComponent}
      modalData={{
        title: `Mock`,
        description: `Write Tests`,
        info: `Its important.`,
        addText: 'Add new test',
      }}
    />
  )

  component.instance().addNewItem()

  const virtualItemsState = component.state('virtualItems')
  const virtualItemsKey = Object.keys(virtualItemsState)

  const itemID = virtualItemsKey[0]
  expect(component.state('virtualItems')[itemID]).not.toBe(undefined)

  component.instance().discardChanges()
  expect(component.state('virtualItems')[itemID]).toBe(undefined)
})

it('should call props.save on saveChanges', () => {
  const saveMock = jest.fn()
  saveMock.mockReturnValue({
    then: (fn) => {
      fn()
    }
  })

  const component = shallow(
    <ManagementModalContainer isOpen={false}
      items={{
        mock: {
          name: 'mocked'
        }
      }}
      nestedItems={{}}
      loading={false} save={saveMock} close={() => {}}
      itemStructure={{ name: '' }}
      useDivider ItemComponent={MockComponent}
      modalData={{
        title: `Mock`,
        description: `Write Tests`,
        info: `Its important.`,
        addText: 'Add new test',
      }}
    />
  )

  component.instance().addNewItem()
  component.instance().saveChanges()

  expect(saveMock).toHaveBeenCalled()
})
