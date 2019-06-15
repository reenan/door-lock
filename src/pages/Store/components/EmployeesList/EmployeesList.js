import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'semantic-ui-react'

import './EmployeesList.scss'
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
            <Employee
              key={employeeID}
              employeeID={employeeID}
              selected={employeeID === selectedEmployee}
              employees={employees}
              roles={roles}
              selectEmployee={selectEmployee}
            />
          ))
        }
      </div>
    )
  }
}

const Employee = ({ employeeID, selected, selectEmployee, employees, roles }) => (
  <div key={employeeID} className={ selected ? 'selected' : ''}
    onClick={selectEmployee.bind(null, employeeID)}>
    <p>
      <Icon className={`custom-icon ${selected ? 'check-circle' : 'circle'}`} />
      <span>{employees[employeeID].name}</span>
      
      <span>
        ({
          employees[employeeID].role ?
          roles[employees[employeeID].role].name : 'No role defined'
        })
      </span>

    </p>
  </div>
)

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
