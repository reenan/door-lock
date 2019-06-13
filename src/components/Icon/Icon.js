import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Icon.scss'

class Icon extends Component {
  render() {
    const { icon, onClick, className, size } = this.props

    let style = {}

    if (size) {
      style.fontSize = size + 'px'
    }

    return (
      <span style={style} onClick={onClick} className={`icon ${icon} ${className}`} />
    )
  }
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.number,
}

Icon.defaultProps = {
  className: '',
  size: 0
}

export default Icon
