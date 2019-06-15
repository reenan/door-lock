import React, { Component } from 'react'
import PropTypes from 'prop-types'
import uuid4 from 'uuid4'

import ManageEmployeesModal from './ManageEmployeesModal'

class ManageEmployeesModalContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      virtualEmployeeList: Object.assign({}, this.props.employees)
    }
  }

  addNewEmployee = () => {
    let { virtualEmployeeList } = this.state
    const newEmployeeID = uuid4()

    virtualEmployeeList[newEmployeeID] = {
      name: '',
      role: ''
    }

    this.setState({ virtualEmployeeList })
  }

  handleEmployeeNameChange = (employeeID, event) => {
    let { virtualEmployeeList } = this.state
    virtualEmployeeList[employeeID].name = event.target.value

    this.setState({ virtualEmployeeList })
  }

  handleEmployeeRoleChange = (employeeID, _event, { value }) => {
    let { virtualEmployeeList } = this.state
    virtualEmployeeList[employeeID].role = value

    this.setState({ virtualEmployeeList })
  }

  removeEmployee = (employeeID) => {
    let { virtualEmployeeList } = this.state
    delete virtualEmployeeList[employeeID]

    this.setState({ virtualEmployeeList })
  }

  discardChanges = () => {
    this.setState({
      virtualEmployeeList: Object.assign({}, this.props.employees)
    }, this.props.close)
  }

  saveChanges = () => {
    let { virtualEmployeeList } = this.state

    // Remove employees with empty name from the list
    let cleanedEmployeeList = Object.keys(virtualEmployeeList).reduce((cleanedList, employeeID) => {
      if (virtualEmployeeList[employeeID].name !== '') {
        cleanedList[employeeID] = virtualEmployeeList[employeeID]
      }

      return cleanedList
    }, {})

    // Update inner state then propagate changes
    this.setState({ virtualEmployeeList: cleanedEmployeeList }, () => {
      this.props.save(this.state.virtualEmployeeList).then(() => {
        this.props.close()
      })
    })
  }

  render() {
    let { isOpen, close, loading, roles } = this.props
    const { virtualEmployeeList } = this.state

    const employeeListKeys = Object.keys(virtualEmployeeList)
    const roleListKeys = Object.keys(roles)

    return (
      <ManageEmployeesModal
        isOpen={isOpen}
        close={close}
        loading={loading}
        roles={roles}
        roleListKeys={roleListKeys}
        virtualEmployeeList={virtualEmployeeList}
        employeeListKeys={employeeListKeys}
        handleEmployeeRoleChange={this.handleEmployeeRoleChange}
        handleEmployeeNameChange={this.handleEmployeeNameChange}
        removeEmployee={this.removeEmployee}
        addNewEmployee={this.addNewEmployee}
        discardChanges={this.discardChanges}
        saveChanges={this.saveChanges}
      />
    )
  }
}

ManageEmployeesModalContainer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  employees: PropTypes.object.isRequired,
  roles: PropTypes.object.isRequired,
  loading: PropTypes.bool,
}

ManageEmployeesModalContainer.defaultProps = {
  loading: false,
}

export default ManageEmployeesModalContainer
