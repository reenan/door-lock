import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Modal.scss'

class Modal extends Component {
	clickOnOverlay = () => {
		if (this.props.closeWithClickOnOverlay) {
			this.props.close()
		}
	}

	render() {
		const { open, children, className } = this.props

		return (
			open ?
				<div className={`${className} modal open`}>
					<div onClick={this.clickOnOverlay} className={`overlay`} />
					<div className='modal-inner'>
						<div className='modal-content-area'>
							{children}
						</div>
					</div>
				</div> : null
		)
	}
}

Modal.propTypes = {
	closeWithClickOnOverlay: PropTypes.bool,
	open: PropTypes.bool,
	close: PropTypes.func,
	className: PropTypes.string,
}

Modal.defaultProps = {
	closeWithClickOnOverlay: true,
	open: false,
	className: '',
	close: () => {},
}

export default Modal
