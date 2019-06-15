import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'semantic-ui-react'

class EmployeesList extends Component {
  render() {
    const { 
      employees,
      employeesKeys,
      selectedEmployee,
      selectEmployee,
      roles
    } = this.props

    return (
      <div className='employees'>
        {
          employeesKeys.map((employeeID) => (
            <div key={employeeID} className={employeeID === selectedEmployee ? 'selected' : ''}
              onClick={selectEmployee.bind(null, employeeID)}>
              <p>
                <Icon
                  className={`custom-icon ${employeeID === selectedEmployee ? 
                    'check-circle' : 'circle'}`} />
                {employees[employeeID].name} ({roles[employees[employeeID].role].name})
              </p>
            </div>
          ))
        }
      </div>
    )
  }
}

EmployeesList.propTypes = {
  employeesKeys: PropTypes.array.isRequired,
  employees: PropTypes.object.isRequired,
  roles: PropTypes.object.isRequired,
  selectEmployee: PropTypes.func.isRequired,
  selectedEmployee: PropTypes.string,
}

EmployeesList.defaultProps = {
  selectedEmployee: null,
}

export default EmployeesList
