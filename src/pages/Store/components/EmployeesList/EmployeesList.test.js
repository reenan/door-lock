import React from 'react'
import EmployeesList from './EmployeesList'

import renderer from 'react-test-renderer'

it('renders without crashing', () => {
  const component = renderer.create(
    <EmployeesList
      employeesKeys={[]}
      employees={{}}
      roles={{}}
      selectEmployee={() => {}}
      selectedEmployee={null}
    />
  )

  expect(component).toMatchSnapshot()
})

it('renders without crashing with employees', () => {
  const component = renderer.create(
    <EmployeesList
      employeesKeys={['mock']}
      employees={{
        mock: {
          name: 'Mock',
          role: 'mock'
        }
      }}
      roles={{
        mock: {
          name: 'Mock'
        }
      }}
      selectEmployee={() => {}}
      selectedEmployee={null}
    />
  )

  expect(component).toMatchSnapshot()
})

it('renders without crashing with employees and selected employee', () => {
  const component = renderer.create(
    <EmployeesList
      employeesKeys={['mock']}
      employees={{
        mock: {
          name: 'Mock',
          role: 'mock'
        }
      }}
      roles={{
        mock: {
          name: 'Mock'
        }
      }}
      selectEmployee={() => {}}
      selectedEmployee='mock'
    />
  )

  expect(component).toMatchSnapshot()
})
