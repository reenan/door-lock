import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

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
    this.props.dispatch(registerStore())
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
