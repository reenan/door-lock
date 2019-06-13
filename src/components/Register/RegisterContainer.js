import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { createStore } from '../../actions'
import './Register.scss'

class RegisterContainer extends Component {

  createStore = () => {
    this.props.dispatch(createStore())
  }
  render() {
    const { store } = this.props;

    return (
      store.name ?
        <Redirect to='/store' /> :
        <div>
          <p onClick={this.createStore}>RegisterContainer</p>
        </div>
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