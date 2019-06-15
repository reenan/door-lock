import React from 'react'

import {
  Modal,
  Button,
  Transition,
  List,
  Input,
  Dimmer,
  Loader,
} from 'semantic-ui-react'

import './ManageDoorsModal.scss'
export default ({
  isOpen,
  close,
  loading,
  virtualDoorList,
  doorListKeys,
  handleDoorNameChange,
  removeDoor,
  addNewDoor,
  discardChanges,
  saveChanges,
}) => (
  <Modal size='tiny' open={isOpen} onClose={close} className='manage-doors-modal'
    closeOnDimmerClick={false} closeOnEscape={false}>

    <Modal.Header>Manage your doors</Modal.Header>
    <Modal.Content>
      <p>
        Here you can manage your doors by creating new ones
        and editing or deleting existing ones.
      </p>

      <p>PS: Doors with empty names will be ignored.</p>

      <Transition.Group as={List} duration={200} verticalAlign='middle' className='door-list'>
        {
          doorListKeys.map(doorID => (
            <div className='door-wrapper' key={doorID}>
              <List.Item>
                <Input value={virtualDoorList[doorID].name} placeholder='Door name'
                  onChange={handleDoorNameChange.bind(null, doorID)} />
                <Button icon='remove' onClick={removeDoor.bind(null, doorID)} />
              </List.Item>
            </div>
          ))
        }

        <List.Item>
          <List.Content floated='right'>
            <Button icon='plus' content='Add a new door' onClick={addNewDoor} />
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
