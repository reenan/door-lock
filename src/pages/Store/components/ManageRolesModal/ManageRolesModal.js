import React from 'react'

import {
  Modal,
  Button,
  Transition,
  List,
  Input,
  Dimmer,
  Loader,
  Checkbox,
  Divider,
} from 'semantic-ui-react'

import './ManageRolesModal.scss'
export default ({
  isOpen,
  close,
  loading,
  doors,
  doorListKeys,
  virtualRoleList,
  roleListKeys,
  handleRoleNameChange,
  toggleRoleDoorPermissionChange,
  removeRole,
  addNewRole,
  discardChanges,
  saveChanges,
}) => (
  <Modal size='tiny' open={isOpen} onClose={close} className='manage-roles-modal'
    closeOnDimmerClick={false} closeOnEscape={false}>

    <Modal.Header>Manage your roles</Modal.Header>
    <Modal.Content>
      <p>
        Here you can manage your roles and their permissions, ensuring only authorised people
        will able to open your roles with one click.
      </p>

      <p>PS: Roles with empty names will be ignored.</p>

      <Transition.Group as={List} duration={200} verticalAlign='middle' className='role-list'>
        {
          roleListKeys.map(roleID => (
            <div className='role-wrapper' key={roleID}>
              <List.Item>
                <Input value={virtualRoleList[roleID].name} placeholder='Role name'
                  onChange={handleRoleNameChange.bind(null, roleID)} />
                <Button icon='remove' onClick={removeRole.bind(null, roleID)} />
                <List.List className='roles-permission-door-list'>
                  {
                    doorListKeys.map(doorID => (
                      <List.Item key={doorID} onClick={toggleRoleDoorPermissionChange.bind(null, roleID, doorID)}>
                        <p>
                          <span>{doors[doorID].name}:</span>
                          {
                            virtualRoleList[roleID].permissions[doorID] ?
                            <span className='warn green'>Allowed to open</span> :
                            <span className='warn red'>Not allowed to open</span>
                          }
                        </p>

                        <Checkbox toggle
                          checked={virtualRoleList[roleID].permissions[doorID]} />

                      </List.Item>
                    ))
                  }
                </List.List>
              </List.Item>

              <Divider />
            </div>
          ))
        }

        <List.Item>
          <List.Content floated='right'>
            <Button icon='plus' content='Add a new role' onClick={addNewRole} />
          </List.Content>
        </List.Item>
      </Transition.Group>

      <Dimmer active={loading} >
        <Loader/>
      </Dimmer>

    </Modal.Content>

    <Modal.Actions>
      <Button content='Discard' onClick={discardChanges} />
      <Button positive content='Save' onClick={saveChanges} />
    </Modal.Actions>

  </Modal>
)
