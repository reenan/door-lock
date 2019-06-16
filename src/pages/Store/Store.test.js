import React from 'react'
import Store from './Store'

import EnzymeToJson from 'enzyme-to-json'
import { mount } from 'enzyme'

it('renders without crashing', () => {
  const component = mount(
    <Store
      name=''
      employees={{}}
      roles={{}}
      doors={{}}
      loading={false}
      selectedEmployee={null}
      selectEmployee={() => {}}
      openDoorRequests={{}}

      unregisterModalProps={{
        isOpen: false,
        unregister: () => {},
        open: () => {},
        close: () => {},
      }}
      doorModalProps={{
        isOpen: false,
        save: () => {},
        open: () => {},
        close: () => {},
      }}
      roleModalProps={{
        isOpen: false,
        save: () => {},
        open: () => {},
        close: () => {},
      }}
      employeeModalProps={{
        isOpen: false,
        save: () => {},
        open: () => {},
        close: () => {},
      }}
    />
  )

  expect(EnzymeToJson(component)).toMatchSnapshot()
})

it('renders without crashing with employees', () => {
  const component = mount(
    <Store
      name=''
      employees={{
         mock: {
           name: 'Mocked',
           role: null,
         }
      }}
      roles={{}}
      doors={{}}
      loading={false}
      selectedEmployee={null}
      selectEmployee={() => {}}
      openDoorRequests={{}}

      unregisterModalProps={{
        isOpen: false,
        unregister: () => {},
        open: () => {},
        close: () => {},
      }}
      doorModalProps={{
        isOpen: false,
        save: () => {},
        open: () => {},
        close: () => {},
      }}
      roleModalProps={{
        isOpen: false,
        save: () => {},
        open: () => {},
        close: () => {},
      }}
      employeeModalProps={{
        isOpen: false,
        save: () => {},
        open: () => {},
        close: () => {},
      }}
    />
  )

  expect(EnzymeToJson(component)).toMatchSnapshot()
})
