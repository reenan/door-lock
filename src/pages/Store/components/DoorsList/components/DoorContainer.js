import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import uuid4 from 'uuid4'

import { openDoor as openDoorAction } from '../../../../../actions'
import Door from './Door'

class DoorContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      isBlocked: false,
      loading: false,
    }
  }

  requestOpenDoor = () => {
    const {
      doorID,
      store,
      selectedEmployee,
      dispatch
    } = this.props

    const requestID = uuid4()
    const requestDate = new Date()

    return new Promise(resolve => {
      dispatch(
        openDoorAction(store, requestID, doorID, selectedEmployee, requestDate))
          .then(() => resolve(this.props.openDoorRequests[requestID]))
    })
  }

  openDoor = () => {
    clearInterval(this.removeOpenNotification)

    this.setState({
      isOpen: true
    }, () => {
      this.removeOpenNotification = setTimeout(() => {
        if (this.state.isOpen) {
          this.setState({
            isOpen: false
          })
        }
      }, 1000)
    })
  }

  blockDoor = () => {
    clearInterval(this.removeBlockNotification)

    this.setState({
      isBlocked: true
    }, () => {
      this.removeBlockNotification = setTimeout(() => {
        if (this.state.isBlocked) {
          this.setState({
            isBlocked: false
          })
        }
      }, 1000)
    })
  }

  handleDoorClick = () => {
    this.setState({
      loading: true
    }, async () => {
      const requestData = await this.requestOpenDoor()

      this.setState({
        loading: false
      })

      if (requestData.allowed) {
        this.openDoor()
      } else {
        this.blockDoor()
      }
    })
  }

  render() {
    const { isOpen, isBlocked, loading } = this.state
    const { store, doorID, selectedEmployee } = this.props
    const { roles, doors, employees } = store

    let className = 'door'

    className += isOpen ? ' open' : ''
    className += isBlocked ? ' blocked' : ''
    className += loading ? ' loading' : ''

    return (
      <Door
        className={className}
        loading={loading}
        roles={roles}
        doors={doors}
        doorID={doorID}
        employee={employees[selectedEmployee]}
        handleDoorClick={this.handleDoorClick}
      />
    )
  }
}

DoorContainer.propTypes = {
  doorID: PropTypes.string.isRequired,
  selectedEmployee: PropTypes.string,
}

DoorContainer.defaultProps = {
  selectedEmployee: null
}

const stateToProps = ({ store, openDoorRequests }) => ({
  store,
  openDoorRequests,
})

export default connect(stateToProps)(DoorContainer)
