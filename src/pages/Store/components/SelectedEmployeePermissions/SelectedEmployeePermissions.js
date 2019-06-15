import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './SelectedEmployeePermissions.scss'
class SelectedEmployeePermissions extends Component {
  render() {
    const { selectedEmployee, roles, doors, doorsKeys } = this.props

    const roleName = (
      selectedEmployee && selectedEmployee.role ?
        roles[selectedEmployee.role].name : 'No role defined'
    )

    return (
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
            <div className='selected-employee-permissions'>
              {
                doorsKeys.map((doorID) => (
                  <EmployeePermissions
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
      </div>
    )
  }
}

const EmployeePermissions = ({ employee, doorID, roles, doors }) => (
  <div key={doorID} className='door-permissions'>
    {
      employee.role && roles[employee.role].permissions[doorID] ?
      <span className='warn green'>Allowed to open: </span> :
      <span className='warn red'>Not allowed to open: </span>
    }
    <span>{doors[doorID].name}</span>
  </div>
)

SelectedEmployeePermissions.propTypes = {
  selectedEmployee: PropTypes.object,
  doorsKeys: PropTypes.array.isRequired,
  doors: PropTypes.object.isRequired,
  roles: PropTypes.object.isRequired,
}

export default SelectedEmployeePermissions
