import React from 'react'
import EnzymeToJson from 'enzyme-to-json'
import { mount } from 'enzyme'

import ManageRolesModal from './ManageRolesModal'

it('renders without crashing', () => {
  const component = mount(
    <ManageRolesModal
      isOpen={false}
      items={{}}
      nestedItems={{}}
      loading={false}
      save={() => {}}
      close={() => {}}
    />
  )

  expect(EnzymeToJson(component)).toMatchSnapshot()
})

it('renders without crashing when open with permissions', () => {
  const component = mount(
    <ManageRolesModal
      isOpen={true}
      items={{
        mock: {
          name: 'Role',
          permissions: {
            mockDoor: true
          }
        }
      }}
      nestedItems={{
        mockDoor: {
          name: 'Door'
        }
      }}
      loading={false}
      save={() => {}}
      close={() => {}}
    />
  )

  expect(EnzymeToJson(component)).toMatchSnapshot()
})

it('renders without crashing when open without permissions', () => {
  const component = mount(
    <ManageRolesModal
      isOpen={true}
      items={{
        mock: {
          name: 'Role',
          permissions: {
            mockDoor: false
          }
        }
      }}
      nestedItems={{
        mockDoor: {
          name: 'Door'
        }
      }}
      loading={false}
      save={() => {}}
      close={() => {}}
    />
  )

  expect(EnzymeToJson(component)).toMatchSnapshot()
})
