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
      isOpenRegisterModal: false,
      storeName: '',
      loading: false,
    }
  }

  registerStore = () => {
    const { storeName } = this.state

    this.props.dispatch(registerStore(storeName)).then(() => {
      this.props.history.push('/store')
    })
  }

  openRegisterModal = () => {
    this.setState({
      isOpenRegisterModal: true
    })
  }

  closeRegisterModal = () => {
    this.setState({
      isOpenRegisterModal: false
    })
  }

  handleStoreNameChange = (e) => {
    this.setState({
      storeName: e.target.value
    })
  }

  render() {
    const { isOpenRegisterModal, storeName } = this.state
    const { store, isFetching } = this.props

    return (
      store.name ?
        <Redirect to='/store' /> :
        <Register
          loading={isFetching}
          isOpenRegisterModal={isOpenRegisterModal}
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

const stateToProps = ({ store, isFetching }) => ({
  store,
  isFetching,
})

export default connect(stateToProps)(RegisterContainer)
