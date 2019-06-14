import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Store from './Store'

class StoreContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedEmployee: null
    }
  }

  selectEmployee = (employeeID) => {
    this.setState({
      selectedEmployee: employeeID
    })
  }

  render() {
    const { selectedEmployee } = this.state
    const { store } = this.props;
    const { name, employees, roles } = store

    return (
      !store.name ?
        <Redirect to='/' /> :
        <Store
          name={name}
          employees={employees}
          roles={roles}
          selectedEmployee={selectedEmployee}
          selectEmployee={this.selectEmployee}
        />
    )
  }
}

StoreContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  store: PropTypes.object.isRequired,
}

const stateToProps = ({ store }) => ({
  store
})

export default connect(stateToProps)(StoreContainer)