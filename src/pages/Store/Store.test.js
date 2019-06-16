import React from 'react'
import Store from './Store'

import { shallow } from 'enzyme'

it('renders without crashing', () => {
  const component = shallow(
    <Store
      name=''
      employees={{}}
      roles={{}}
      doors={{}}
      loading={false}
      selectedEmployee={null}
      selectEmployee={() => {}}

      unregisterModalProps={{}}
      doorModalProps={{}}
      roleModalProps={{}}
      employeeModalProps={{}}
    />
  )

  expect(component).toMatchSnapshot()
})

it('renders without crashing with employees', () => {
  const component = shallow(
    <Store
      name=''
      employees={{
        mock: {
          name: 'Mocked'
        }
      }}
      roles={{}}
      doors={{}}
      loading={false}
      selectedEmployee={null}
      selectEmployee={() => {}}

      unregisterModalProps={{}}
      doorModalProps={{}}
      roleModalProps={{}}
      employeeModalProps={{}}
    />
  )

  expect(component).toMatchSnapshot()
})
