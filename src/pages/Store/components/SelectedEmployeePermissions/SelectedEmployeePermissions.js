import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Message } from 'semantic-ui-react'

import './SelectedEmployeePermissions.scss'
class SelectedEmployeePermissions extends Component {
  render() {
    const { selectedEmployee, roles, doors, doorsKeys } = this.props

    const roleName = (
      selectedEmployee && roles[selectedEmployee.role] ?
        roles[selectedEmployee.role].name : 'No role defined'
    )

    return (
      <div>
        {
          doorsKeys.length > 0 ?
            <div>
              <p>
                {
                  selectedEmployee ?
                    `You have selected ${selectedEmployee.name} (${roleName}), and these are his/hers permissions:` :
                    'Please, select an employee to continue.'
                }
              </p>

              {
                selectedEmployee ? (
                  <div className='door-permissions'>
                    {
                      doorsKeys.map((doorID) => (
                        <DoorPermission
                          key={doorID}
                          doorID={doorID}
                          employee={selectedEmployee}
                          roles={roles}
                          doors={doors}
                        />
                      ))
                    }
                  </div>
                ) : null
              }
            </div> :
            <Message warning>
              <Message.Header>Please, register at least one door before continuing.</Message.Header>
            </Message>
        }
      </div>
    )
  }
}

const DoorPermission = ({ employee, doorID, roles, doors }) => (
  <div key={doorID}>
    <p>
      {
        roles[employee.role] && roles[employee.role].permissions[doorID] ?
        <span className='warn green'>Allowed to open: </span> :
        <span className='warn red'>Not allowed to open: </span>
      }
      <span>{doors[doorID].name}</span>
    </p>
  </div>
)

SelectedEmployeePermissions.propTypes = {
  selectedEmployee: PropTypes.object,
  doorsKeys: PropTypes.array.isRequired,
  doors: PropTypes.object.isRequired,
  roles: PropTypes.object.isRequired,
}

export default SelectedEmployeePermissions
