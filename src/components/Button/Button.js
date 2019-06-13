import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Icon } from '../'
import './Button.scss'

class Button extends Component {
  render() {
    const { className, style, onClick, icon, text, size } = this.props

    if (size) {
      style.width = size + 'px'
      style.height = size + 'px'
      style.lineHeight = size + 'px'
    }

    return (
      <div className={`button ${className}`} style={style} onClick={onClick}>
        {
          text ? <span>{text}</span> : null
        }
        {
          icon ? <Icon size={size} icon={icon} /> : null
        }
      </div>
    )
  }
}

Button.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
  onClick: PropTypes.func,
  style: PropTypes.object,
  icon: PropTypes.string,
  text: PropTypes.string,
}

Button.defaultProps = {
  className: '',
  size: null,
  icon: null,
  text: null,
  style: {},
}

export default Button
