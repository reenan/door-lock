import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Message } from 'semantic-ui-react'

import DoorContainer from './components/DoorContainer'

import './DoorsList.scss'
class DoorsList extends Component {
  render() {
    const {
      roles,
      doors,
      employees,
      selectedEmployee,
    } = this.props

    const doorsKeys = Object.keys(doors)
    const employee = employees[selectedEmployee]

    const roleName = (
      employee && roles[employee.role] ?
        roles[employee.role].name : 'No role defined'
    )

    return (
      <div>
        {
          doorsKeys.length > 0 ?
            <div>
              <p>
                {
                  employee ?
                    `You have selected ${employee.name} (${roleName}),
                      and these are his/hers permissions:` :
                    'Please, select an employee to continue.'
                }
              </p>

              {
                employee ? (
                  <div>
                    <p>
                      You can click on the doors to open them.
                    </p>
                    <div className='doors'>
                      {
                        doorsKeys.map((doorID) => (
                          <DoorContainer
                            key={doorID}
                            doorID={doorID}
                            selectedEmployee={selectedEmployee}
                          />
                        ))
                      }
                    </div>
                  </div>
                ) : null
              }
            </div> :
            <Message warning>
              <Message.Header>
                Please, register at least one door before continuing.
              </Message.Header>
            </Message>
        }
      </div>
    )
  }
}

DoorsList.propTypes = {
  roles: PropTypes.object.isRequired,
  doors: PropTypes.object.isRequired,
  employees: PropTypes.object.isRequired,
  selectedEmployee: PropTypes.string,
}

DoorsList.defaultProps = {
  selectedEmployee: null
}

export default DoorsList
