import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Segment, Header } from 'semantic-ui-react'

import './Log.scss'

class Log extends Component {

  getFormattedDate = (date) => {
    date = new Date(date)

    const day = date.getUTCDate()
    const month = date.getUTCMonth()
    const year = date.getUTCFullYear()
    const hour = date.getUTCHours()
    const minute = date.getUTCMinutes()

    return <span>{day}/{month}/{year} {hour}:{minute}</span>
  }

  getFormattedEmployee = (employeeID, roleID) => {
    const { employees, roles } = this.props

    let result = []

    if (employees[employeeID]) {
      result.push(<span key={0}>{employees[employeeID].name}</span>)
    } else {
      result.push(<span key={0} className='deleted'>Deleted Employee</span>)
    }

    if (roles[roleID]) {
      result.push(<span key={1}> ({roles[roleID].name})</span>)
    } else {
      result.push(<span key={1} className='deleted'> (Deleted Role)</span>)
    }

    return result
  }

  getFormattedDoor = (doorID) => {
    const { doors } = this.props

    if (doors[doorID]) {
      return <span>{doors[doorID].name}</span>
    } else {
      return <span className='deleted'>Deleted Door</span>
    }
  }

  getFormattedAcceptedRequest = (isAllowed) => {
    if (isAllowed) {
      return <span className='green'>accepted</span>
    } else {
      return <span className='red'>not accepted</span>
    }
  }

  getFormattedString = (requestID) => {
    const request = this.props.requests[requestID]

    const dateElement = this.getFormattedDate(request.date)
    const employeeElement = this.getFormattedEmployee(request.employee, request.role)
    const doorElement = this.getFormattedDoor(request.door)
    const allowedElement = this.getFormattedAcceptedRequest(request.allowed)

    return (
      <p>
        On {dateElement}, {employeeElement} requested to open {doorElement} and
        his/hers request was {allowedElement}
      </p>
    )
  }

  render() {
    const { requestsKeys } = this.props

    return (
      <div>
        <Header inverted size='small'>
          Here you can check all requests that were made to open your doors.
        </Header>
        <Segment tertiary className='logs-container'>
          {
            requestsKeys.length > 0 ?
              requestsKeys.map(requestID => (
                <div key={requestID}>
                  { this.getFormattedString(requestID) }
                </div>
              )) :
              <p>Looks like no request was made yet. Go and try one!</p>
          }
        </Segment>
      </div>
    )
  }
}

Log.propTypes = {
  requests: PropTypes.object.isRequired,
  doors: PropTypes.object.isRequired,
  roles: PropTypes.object.isRequired,
  employees: PropTypes.object.isRequired,
  requestsKeys: PropTypes.array.isRequired,
}

export default Log
