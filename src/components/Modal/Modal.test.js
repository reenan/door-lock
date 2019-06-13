import React from 'react'
import Modal from './Modal'

import renderer from 'react-test-renderer'

it('renders without crashing', () => {
  const component = renderer.create(
    <Modal />
  )

  expect(component).toMatchSnapshot()
})

it('renders without crashing with open', () => {
  const component = renderer.create(
    <Modal open />
  )

  expect(component).toMatchSnapshot()
})

it('show call close prop when clicked on overlay', () => {
  const closeMock = jest.fn()

  const component = renderer.create(
    <Modal open close={closeMock} />
  )

  component.getInstance().clickOnOverlay()
  expect(closeMock).toHaveBeenCalled()
})

it('show not call close prop when clicked on overlay and closeWithClickonOverlay as false', () => {
  const closeMock = jest.fn()

  const component = renderer.create(
    <Modal open closeWithClickOnOverlay={false} close={closeMock} />
  )

  component.getInstance().clickOnOverlay()
  expect(closeMock).not.toHaveBeenCalled()
})
