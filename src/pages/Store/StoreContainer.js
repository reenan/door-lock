import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { updateStore, unregisterStore } from '../../actions'

import Store from './Store'

class StoreContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedEmployee: null,
      isOpenManageDoorsModal: false,
      isOpenManageRolesModal: false,
      isOpenManageEmployeesModal: false,
      isOpenUnregistrationModal: false,
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

  openUnregistrationModal = () => {
    this.setState({
      isOpenUnregistrationModal: true
    })
  }

  closeUnregistrationModal = () => {
    this.setState({
      isOpenUnregistrationModal: false
    })
  }

  unregisterStore = () => {
    this.props.dispatch(unregisterStore(this.props.store))
  }

  render() {
    const {
      selectedEmployee,
      isOpenManageDoorsModal,
      isOpenManageRolesModal,
      isOpenManageEmployeesModal,
      isOpenUnregistrationModal,
    } = this.state

    const { store, loading } = this.props
    const { name, doors, employees, roles } = store

    const doorModalProps = {
      isOpen: isOpenManageDoorsModal,
      save: this.saveDoorList,
      open: this.openManageDoorsModal,
      close: this.closeManageDoorsModal,
    }

    const roleModalProps = {
      isOpen: isOpenManageRolesModal,
      save: this.saveRoleList,
      open: this.openManageRolesModal,
      close: this.closeManageRolesModal,
    }

    const employeeModalProps = {
      isOpen: isOpenManageEmployeesModal,
      save: this.saveEmployeeList,
      open: this.openManageEmployeesModal,
      close: this.closeManageEmployeesModal,
    }

    const unregisterModalProps = {
      isOpen: isOpenUnregistrationModal,
      unregister: this.unregisterStore,
      open: this.openUnregistrationModal,
      close: this.closeUnregistrationModal,
    }

    return (
      !store.name ?
        <Redirect to='/' /> :
        <Store
          name={name}
          employees={employees}
          roles={roles}
          doors={doors}
          loading={loading}
          selectedEmployee={selectedEmployee}
          selectEmployee={this.selectEmployee}

          unregisterModalProps={unregisterModalProps}
          doorModalProps={doorModalProps}
          roleModalProps={roleModalProps}
          employeeModalProps={employeeModalProps}
        />
    )
  }
}

StoreContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  store: PropTypes.object.isRequired,
}

const stateToProps = ({ store, loading, openDoorRequests }) => ({
  store,
  loading,
  openDoorRequests,
})

export default connect(stateToProps)(StoreContainer)
