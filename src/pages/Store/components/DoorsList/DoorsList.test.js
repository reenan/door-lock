import React from 'react'
import DoorsList from './DoorsList'

import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

const mockStore = configureStore()

import renderer from 'react-test-renderer'

it('renders without crashing', () => {
  const store = mockStore({
    store: {
      roles: {},
      doors:{},
      employees: {},
    }
  })

  const component = renderer.create(
      <Provider store={store}>
        <DoorsList
          employees={{}}
          selectedEmployee={null}
          doors={{}}
          roles={{}}
        />
      </Provider>
  )

  expect(component).toMatchSnapshot()
})

it('renders without crashing with no employee selected', () => {
  const store = mockStore({
    store: {
      roles: {},
      doors:{ mockDoor: { name: 'Mock Door' } },
      employees: { employee: { name: 'Mock Employee', role: 'mockRole' } }
    }
  })

  const component = renderer.create(
      <Provider store={store}>
        <DoorsList
          employees={{ employee: { name: 'Mock Employee', role: 'mockRole' } }}
          selectedEmployee={null}
          doors={{ mockDoor: { name: 'Mock Door' } }}
          roles={{}}
        />
      </Provider>
  )

  expect(component).toMatchSnapshot()
})

it('renders without crashing with values', () => {
  const store = mockStore({
    store: {
      roles: {},
      doors:{ mockDoor: { name: 'Mock Door' } },
      employees: { employee: { name: 'Mock Employee', role: 'mockRole' } }
    }
  })

  const component = renderer.create(
      <Provider store={store}>
        <DoorsList
          employees={{ employee: { name: 'Mock Employee', role: 'mockRole' } }}
          selectedEmployee='employee'
          doors={{ mockDoor: { name: 'Mock Door' } }}
          roles={{ mockRole: { permissions: { mockDoor: false } } }}
        />
      </Provider>
  )

  expect(component).toMatchSnapshot()
})

it('renders without crashing with values and permission', () => {
  const store = mockStore({
    store: {
      roles: { mockRole: { name: 'Mock Role', permissions: { mockDoor: true } } },
      doors:{ mockDoor: { name: 'Mock Door' } },
      employees: { employee: { name: 'Mock Employee', role: 'mockRole' } }
    }
  })

  const component = renderer.create(
      <Provider store={store}>
        <DoorsList
          employees={{ employee: { name: 'mock', role: 'mockRole' } }}
          selectedEmployee='employee'
          doors={{ mockDoor: { name: 'Mock Door' } }}
          roles={{ mockRole: { name: 'Mock Role', permissions: { mockDoor: true } } }}
        />
      </Provider>
  )

  expect(component).toMatchSnapshot()
})
