import React from 'react'
import StoreContainer from './StoreContainer'

import { shallow } from 'enzyme'

it('renders without crashing', () => {
  const component = shallow(
    <StoreContainer.WrappedComponent
      dispatch={() => {}}
      store={{}}
    />
  )

  expect(component).toMatchSnapshot()

})
