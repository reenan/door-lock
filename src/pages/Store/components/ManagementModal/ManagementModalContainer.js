import React, { Component } from 'react'
import PropTypes from 'prop-types'
import uuid4 from 'uuid4'

import ManagementModal from './ManagementModal'

class ManagementModalContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // Create a copy from list removing reference to use inside modal
      virtualItems: JSON.parse(JSON.stringify(this.props.items))
    }
  }

  // Generically adds a new item to the list
  addNewItem = () => {
    const { virtualItems } = this.state
    const newUUID = uuid4()

    // Add new item based on passed structure
    const { itemStructure } = this.props
    virtualItems[newUUID] = Object.assign({}, itemStructure)

    this.setState({ virtualItems })
  }

  // Generic handles text input modification on item attribute
  handleTextInputChange = (id, event) => {
    const { virtualItems } = this.state
    const { name, value } = event.target

    virtualItems[id][name] = value

    this.setState({ virtualItems })
  }

  // Generic handles checkbox toggle on item attribute
  // Logic "hard-coded" for checkboxes regarding nested data
  handleCheckboxToggle = (id, nestedID, attribute) => {
    const { virtualItems } = this.state

    virtualItems[id][attribute][nestedID] = !virtualItems[id][attribute][nestedID]

    this.setState({ virtualItems })
  }

  // Logic hard-coded to change element ROLE attr
  // TODO: remove hard-coded ROLE attr
  handleDropdownChange = (id, _event, { value }) => {
    let { virtualItems } = this.state
    virtualItems[id].role = value

    this.setState({ virtualItems })
  }

  // Generically removes an item from the list
  removeItem = (id) => {
    const { virtualItems } = this.state
    delete virtualItems[id]

    this.setState({ virtualItems })
  }

  // Discard changes made into the modal
  discardChanges = () => {

    this.setState({
      virtualItems: JSON.parse(JSON.stringify(this.props.items))
    }, this.props.close)

  }

  // Save modal changes on data
  saveChanges = () => {
    const { virtualItems } = this.state

    // Remove items that does not have a name
    const cleanedItemList = Object.keys(virtualItems).reduce((cleanList, id) => {
      if (virtualItems[id].name !== '') {
        cleanList[id] = virtualItems[id]
      }

      return cleanList
    }, {})

    // Update state then propagate changes
    this.setState({ virtualItems: cleanedItemList }, () => {

      // Remove reference to list before passing list to redux
      this.props.save(JSON.parse(JSON.stringify(cleanedItemList))).then(() => {
        this.props.close()
      })
    })
  }

  render() {
    const {
      isOpen,
      close,
      loading,
      modalData,
      useDivider,
      nestedItems,
      ItemComponent
    } = this.props

    const { virtualItems } = this.state
    const virtualItemsKeys = Object.keys(virtualItems)
    const nestedItemsKeys = Object.keys(nestedItems)

    return (
      <ManagementModal
        isOpen={isOpen}
        close={close}
        loading={loading}
        useDivider={useDivider}
        modalData={modalData}
        nestedItems={nestedItems}
        nestedItemsKeys={nestedItemsKeys}
        virtualItems={virtualItems}
        virtualItemsKeys={virtualItemsKeys}
        ItemComponent={ItemComponent}
        handleDropdownChange={this.handleDropdownChange}
        handleCheckboxToggle={this.handleCheckboxToggle}
        handleTextInputChange={this.handleTextInputChange}
        removeItem={this.removeItem}
        addNewItem={this.addNewItem}
        discardChanges={this.discardChanges}
        saveChanges={this.saveChanges}
      />
    )
  }
}

ManagementModalContainer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  items: PropTypes.object.isRequired,
  nestedItems: PropTypes.object,
  itemStructure: PropTypes.object.isRequired,
  modalData: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  useDivider: PropTypes.bool,
}

ManagementModalContainer.defaultProps = {
  loading: false,
  useDivider: false,
  nestedItems: {},
}

export default ManagementModalContainer
