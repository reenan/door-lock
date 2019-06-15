import React from 'react'
import SelectedEmployeePermissions from './SelectedEmployeePermissions'

import renderer from 'react-test-renderer'

it('renders without crashing', () => {
  const component = renderer.create(
    <SelectedEmployeePermissions
      selectedEmployee={{}}
      doorsKeys={[]}
      doors={{}}
      roles={{}}
    />
  )

  expect(component).toMatchSnapshot()
})

it('renders without crashing with values', () => {
  const component = renderer.create(
    <SelectedEmployeePermissions
      selectedEmployee={{ role: 'mock' }}
      doorsKeys={['mock']}
      doors={{ mock: { name: 'Mock' } }}
      roles={{ mock: { permissions: { mock: false } } }}
    />
  )

  expect(component).toMatchSnapshot()
})

it('renders without crashing with values and permission', () => {
  const component = renderer.create(
    <SelectedEmployeePermissions
      selectedEmployee={{ role: 'mock' }}
      doorsKeys={['mock']}
      doors={{ mock: { name: 'Mock' } }}
      roles={{ mock: { permissions: { mock: true } } }}
    />
  )

  expect(component).toMatchSnapshot()
})
