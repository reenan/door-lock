import React, { Component } from 'react'
import PropTypes from 'prop-types'
import uuid4 from 'uuid4'

import ManageRolesModal from './ManageRolesModal'

class ManageRolesModalContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      virtualRoleList: Object.assign({}, this.props.roles)
    }
  }

  addNewRole = () => {
    let { virtualRoleList } = this.state
    const newRoleID = uuid4()

    virtualRoleList[newRoleID] = {
      name: '',
      permissions: {}
    }

    this.setState({ virtualRoleList })
  }

  handleRoleNameChange = (roleID, event) => {
    let { virtualRoleList } = this.state
    virtualRoleList[roleID].name = event.target.value

    this.setState({ virtualRoleList })
  }

  toggleRoleDoorPermissionChange = (roleID, doorID) => {
    let { virtualRoleList } = this.state

    virtualRoleList[roleID].permissions[doorID] = !virtualRoleList[roleID].permissions[doorID]

    this.setState({ virtualRoleList })
  }

  removeRole = (roleID) => {
    let { virtualRoleList } = this.state
    delete virtualRoleList[roleID]

    this.setState({ virtualRoleList })
  }

  discardChanges = () => {
    this.setState({
      virtualRoleList: Object.assign({}, this.props.roles)
    }, this.props.close)
  }

  saveChanges = () => {
    let { virtualRoleList } = this.state

    // Remove roles with empty name from the list
    let cleanedRoleList = Object.keys(virtualRoleList).reduce((cleanedList, roleID) => {
      if (virtualRoleList[roleID].name !== '') {
        cleanedList[roleID] = virtualRoleList[roleID]
      }

      return cleanedList
    }, {})

    // Update inner state then propagate changes
    this.setState({ virtualRoleList: cleanedRoleList }, () => {
      this.props.save(this.state.virtualRoleList).then(() => {
        this.props.close()
      })
    })
  }

  render() {
    const { isOpen, close, loading, doors } = this.props
    const { virtualRoleList } = this.state

    const roleListKeys = Object.keys(virtualRoleList)
    const doorListKeys = Object.keys(doors)

    return (
      <ManageRolesModal
        isOpen={isOpen}
        close={close}
        loading={loading}
        doors={doors}
        doorListKeys={doorListKeys}
        virtualRoleList={virtualRoleList}
        roleListKeys={roleListKeys}
        handleRoleNameChange={this.handleRoleNameChange}
        toggleRoleDoorPermissionChange={this.toggleRoleDoorPermissionChange}
        removeRole={this.removeRole}
        addNewRole={this.addNewRole}
        discardChanges={this.discardChanges}
        saveChanges={this.saveChanges}
      />
    )
  }
}

ManageRolesModalContainer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  roles: PropTypes.object.isRequired,
  doors: PropTypes.object.isRequired,
  loading: PropTypes.bool,
}

ManageRolesModalContainer.defaultProps = {
  loading: false,
}

export default ManageRolesModalContainer
