import React from 'react'
import EnzymeToJson from 'enzyme-to-json'
import { mount } from 'enzyme'

import ManageEmployeesModal from './ManageEmployeesModal'

it('renders without crashing', () => {
  const component = mount(
    <ManageEmployeesModal
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

it('renders without crashing when open with role', () => {
  const component = mount(
    <ManageEmployeesModal
      isOpen={true}
      items={{
        mock: {
          name: 'Employee',
          role: 'mockRole'
        }
      }}
      nestedItems={{
        mockRole: {
          name: 'Role'
        }
      }}
      loading={false}
      save={() => {}}
      close={() => {}}
    />
  )

  expect(EnzymeToJson(component)).toMatchSnapshot()
})

it('renders without crashing when open without role', () => {
  const component = mount(
    <ManageEmployeesModal
      isOpen={true}
      items={{
        mock: {
          name: 'Employee',
          role: null
        }
      }}
      nestedItems={{
        mockRole: {
          name: 'Role'
        }
      }}
      loading={false}
      save={() => {}}
      close={() => {}}
    />
  )

  expect(EnzymeToJson(component)).toMatchSnapshot()
})
