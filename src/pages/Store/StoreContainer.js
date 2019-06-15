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

  render() {
    const { selectedEmployee, isOpenManageDoorsModal } = this.state
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