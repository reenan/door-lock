import React from 'react'
import RegisterContainer from './RegisterContainer'

import { shallow } from 'enzyme'

it('renders without crashing', () => {
  const component = shallow(
    <RegisterContainer />
  )

  expect(component).toMatchSnapshot();

})
