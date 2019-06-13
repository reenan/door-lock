import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import './Store.scss'

class StoreContainer extends Component {
  render() {
    const { store } = this.props;

    return (
      !store.name ?
        <Redirect to='/' /> :
        <div>
          <p onClick={this.createStore}>RegisterContainer</p>
        </div>
    )
  }
}

StoreContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  store: PropTypes.object.isRequired
}

const stateToProps = ({ store }) => ({
  store
})

export default connect(stateToProps)(StoreContainer)