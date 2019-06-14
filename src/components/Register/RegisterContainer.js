import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { roles as ROLES, employees as EMPLOYEES } from './fakeStoreData'

import { registerStore } from '../../actions'
import Register from './Register'

class RegisterContainer extends Component {

  constructor(props) {
    super(props)

    this.state = {
      registerModalIsOpen: false,
      storeName: '',
    }
  }

  registerStore = () => {
    const { storeName } = this.state

    // Fake request to an API
    fetch(`${process.env.REACT_APP_API_BASE_URL}/store`, {
      method: 'POST',
      data: {
        storeName
      }
    }).then(response => {
      // TODO: Implement proper handling in case of status !== 201
      if (response.status === 201) {
        // Mount store using mocked data
        const store = { storeName, roles: ROLES, employees: EMPLOYEES, firstTime: true }

        // Persist store via redux
        this.props.dispatch(registerStore(store))

        // Redirect to store page
        this.props.history.push('/store')
      }
    }).catch(err => {
      // TODO: Implement proper handling for catch
      console.error(err)
    });
  }

  openRegisterModal = () => {
    this.setState({
      registerModalIsOpen: true
    })
  }

  closeRegisterModal = () => {
    this.setState({
      registerModalIsOpen: false
    })
  }

  handleStoreNameChange = (e) => {
    this.setState({
      storeName: e.target.value
    })
  }

  render() {
    const { registerModalIsOpen, storeName } = this.state
    const { store } = this.props

    return (
      store.name ?
        <Redirect to='/store' /> :
        <Register
          registerModalIsOpen={registerModalIsOpen}
          storeName={storeName}
          openRegisterModal={this.openRegisterModal}
          closeRegisterModal={this.closeRegisterModal}
          handleStoreNameChange={this.handleStoreNameChange}
          registerStore={this.registerStore}
        />
    )
  }
}

RegisterContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  store: PropTypes.object.isRequired
}

const stateToProps = ({ store }) => ({
  store
})

export default connect(stateToProps)(RegisterContainer)
