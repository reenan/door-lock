import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { updateStore } from '../../actions'

import Store from './Store'

class StoreContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedEmployee: null,
      isOpenManageDoorsModal: false,
      isOpenManageRolesModal: false,
      isOpenManageEmployeesModal: true,
    }
  }

  selectEmployee = (employeeID) => {
    this.setState({
      selectedEmployee: employeeID
    })
  }

  openManageDoorsModal = () => {
    this.setState({
      isOpenManageDoorsModal: true
    })
  }

  closeManageDoorsModal = () => {
    this.setState({
      isOpenManageDoorsModal: false
    })
  }

  saveDoorList = (doors) => {
    let updatedStore = Object.assign({}, this.props.store)
    updatedStore.doors = doors

    return this.props.dispatch(updateStore(updatedStore))
  }

  openManageRolesModal = () => {
    this.setState({
      isOpenManageRolesModal: true
    })
  }

  closeManageRolesModal = () => {
    this.setState({
      isOpenManageRolesModal: false
    })
  }

  saveRoleList = (roles) => {
    let updatedStore = Object.assign({}, this.props.store)
    updatedStore.roles = roles

    let updatedRolesKeys = Object.keys(updatedStore.roles)
    
    // Remove deleted roles from employees
    for (let employeeID in updatedStore.employees) {
      if (updatedRolesKeys.indexOf(updatedStore.employees[employeeID].role) === -1) {
        updatedStore.employees[employeeID].role = null
      }
    }

    return this.props.dispatch(updateStore(updatedStore))
  }

  openManageEmployeesModal = () => {
    this.setState({
      isOpenManageEmployeesModal: true
    })
  }

  closeManageEmployeesModal = () => {
    this.setState({
      isOpenManageEmployeesModal: false
    })
  }

  saveEmployeeList = (employees) => {
    let updatedStore = Object.assign({}, this.props.store)
    updatedStore.employees = employees

    return this.props.dispatch(updateStore(updatedStore))
  }

  render() {
    const {
      selectedEmployee,
      isOpenManageDoorsModal,
      isOpenManageRolesModal,
      isOpenManageEmployeesModal,
    } = this.state
    
    const { store, isFetching } = this.props
    const { name, doors, employees, roles } = store

    return (
      !store.name ?
        <Redirect to='/' /> :
        <Store
          name={name}
          employees={employees}
          roles={roles}
          doors={doors}
          loading={isFetching}
          selectedEmployee={selectedEmployee}
          
          isOpenManageDoorsModal={isOpenManageDoorsModal}
          saveDoorList={this.saveDoorList}
          openManageDoorsModal={this.openManageDoorsModal}
          closeManageDoorsModal={this.closeManageDoorsModal}

          isOpenManageRolesModal={isOpenManageRolesModal}
          saveRoleList={this.saveRoleList}
          openManageRolesModal={this.openManageRolesModal}
          closeManageRolesModal={this.closeManageRolesModal}

          isOpenManageEmployeesModal={isOpenManageEmployeesModal}
          saveEmployeeList={this.saveEmployeeList}
          openManageEmployeesModal={this.openManageEmployeesModal}
          closeManageEmployeesModal={this.closeManageEmployeesModal}

          selectEmployee={this.selectEmployee}
        />
    )
  }
}

StoreContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  store: PropTypes.object.isRequired,
}

const stateToProps = ({ store, isFetching }) => ({
  store,
  isFetching,
})

export default connect(stateToProps)(StoreContainer)