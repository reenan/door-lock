import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SelectedEmployeePermissions extends Component {
  render() {
    const { selectedEmployee, roles, doors, doorsKeys } = this.props

    return (
      <div className='selected-employee-permissions'>
        {
          doorsKeys.map((doorID) => (
            <div key={doorID} className='door-permissions'>
              {
                roles[selectedEmployee.role].permissions[doorID] ?
                <span className='warn green'>Allowed to open: </span> :
                <span className='warn red'>Not allowed to open: </span> 
              }
              <span>{doors[doorID].name}</span>
            </div>
          ))
        }
      </div>
    )
  }
}

SelectedEmployeePermissions.propTypes = {
  selectedEmployee: PropTypes.object.isRequired,
  doorsKeys: PropTypes.array.isRequired,
  doors: PropTypes.object.isRequired,
  roles: PropTypes.object.isRequired,
}

export default SelectedEmployeePermissions