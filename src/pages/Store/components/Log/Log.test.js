import React from 'react'
import EnzymeToJson from 'enzyme-to-json'
import { mount } from 'enzyme'

import Log from './Log'

it('renders without crashing', () => {
  const component = mount(
    <Log
      requests={{}}
      doors={{}}
      roles={{}}
      employees={{}}
      requestsKeys={[]}
    />
  )

  expect(EnzymeToJson(component)).toMatchSnapshot()
})


it('renders without crashing with request and saved data', () => {
  const mockDate = new Date('11/12/1994')
  
  const component = mount(
    <Log
      requests={{
        mock: {
          date: mockDate,
          employee: 'mockEmployee',
          role: 'mockRole',
          door: 'mockDoor',
          allowed: true,
        }
      }}
      doors={{
        mockDoor: { name: 'Mock Door' }
      }}
      roles={{
        mockRole: { name: 'Mock Role' }
      }}
      employees={{
        mockEmployee: { name: 'Mock Employee' }
      }}
      requestsKeys={['mock']}
    />
  )

  expect(EnzymeToJson(component)).toMatchSnapshot()
})

it('renders without crashing with request and deleted data', () => {
  const mockDate = new Date('11/12/1994')

  const component = mount(
    <Log
      requests={{
        mock: {
          date: mockDate,
          employee: 'mockEmployee',
          role: 'mockRole',
          door: 'mockDoor',
          allowed: false,
        }
      }}
      doors={{}}
      roles={{}}
      employees={{}}
      requestsKeys={['mock']}
    />
  )

  expect(EnzymeToJson(component)).toMatchSnapshot()
})
