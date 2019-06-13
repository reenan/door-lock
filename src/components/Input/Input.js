import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Input.scss'

class Input extends Component {
  render() {
    const { type, label, required, value, className, maxLength, onChange } = this.props

    return (
      <div className={`input ${className}`}>
        <input type={type} required={required} defaultValue={value}
          maxLength={maxLength} onChange={onChange} />

        <label>{label}</label>
      </div>
    )
  }
}

Input.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string,
  label: PropTypes.string,
  maxLength: PropTypes.number,
  onChange: PropTypes.func.isRequired,
}

Input.defaultProps = {
  className: '',
  type: 'text',
  required: false,
  value: null,
  label: null,
  maxLength: null,
}

export default Input
