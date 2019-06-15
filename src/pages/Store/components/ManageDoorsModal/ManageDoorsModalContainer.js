import React, { Component } from 'react'
import PropTypes from 'prop-types'
import uuid4 from 'uuid4'

import ManageDoorsModal from './ManageDoorsModal'

class ManageDoorsModalContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      virtualDoorList: Object.assign({}, this.props.doors)
    }
  }

  addNewDoor = () => {
    let { virtualDoorList } = this.state
    const newDoorID = uuid4()

    virtualDoorList[newDoorID] = { name: '' }

    this.setState({ virtualDoorList })
  }

  handleDoorNameChange = (doorID, event) => {
    let { virtualDoorList } = this.state
    virtualDoorList[doorID].name = event.target.value

    this.setState({ virtualDoorList })
  }

  removeDoor = (doorID) => {
    let { virtualDoorList } = this.state
    delete virtualDoorList[doorID]

    this.setState({ virtualDoorList })
  }

  discardChanges = () => {
    this.setState({
      virtualDoorList: Object.assign({}, this.props.doors)
    }, this.props.close)
  }

  saveChanges = () => {
    let { virtualDoorList } = this.state

    // Remove doors with empty name from the list
    let cleanedDoorList = Object.keys(virtualDoorList).reduce((cleanedList, doorID) => {
      if (virtualDoorList[doorID].name !== '') {
        cleanedList[doorID] = virtualDoorList[doorID]
      }

      return cleanedList
    }, {})

    // Update inner state then propagate changes
    this.setState({ virtualDoorList: cleanedDoorList }, () => {
      this.props.save(this.state.virtualDoorList).then(() => {
        this.props.close()
      })
    })
  }

  render() {
    const { isOpen, close, loading } = this.props
    const { virtualDoorList } = this.state

    const doorListKeys = Object.keys(virtualDoorList)

    return (
      <ManageDoorsModal
        isOpen={isOpen}
        close={close}
        loading={loading}
        virtualDoorList={virtualDoorList}
        doorListKeys={doorListKeys}
        handleDoorNameChange={this.handleDoorNameChange}
        removeDoor={this.removeDoor}
        addNewDoor={this.addNewDoor}
        discardChanges={this.discardChanges}
        saveChanges={this.saveChanges}
      />
    )
  }
}

ManageDoorsModalContainer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  doors: PropTypes.object.isRequired,
  loading: PropTypes.bool,
}

ManageDoorsModalContainer.defaultProps = {
  loading: false,
}

export default ManageDoorsModalContainer
