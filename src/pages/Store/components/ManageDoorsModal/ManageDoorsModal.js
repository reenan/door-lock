import React, { Component } from 'react'
import PropTypes from 'prop-types'
import uuid4 from 'uuid4'

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
class ManageDoorsModal extends Component {
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
      <Modal size='tiny' open={isOpen} onClose={close} className='manage-doors-modal'>
    
        <Modal.Header>Manage your doors</Modal.Header>
        <Modal.Content>
          <p>Here you can manage your doors by creating new ones
            and editing or deleting existing ones.</p>

          <p>PS: Doors with empty names will be ignored.</p>
  
          <Transition.Group as={List} duration={200} verticalAlign='middle' className='door-list'>
            {
              doorListKeys.map(doorID => (
                <div className='door-wrapper' key={doorID}>
                  <List.Item>
                    <Input value={virtualDoorList[doorID].name} placeholder='Door name'
                      onChange={this.handleDoorNameChange.bind(null, doorID)} />
                    <Button icon='remove' onClick={this.removeDoor.bind(null, doorID)} />
                  </List.Item>
                </div>
              ))
            }

            <List.Item>
              <List.Content floated='right'>
                <Button icon='plus' content='Add a new door' onClick={this.addNewDoor} />
              </List.Content>
            </List.Item>
          </Transition.Group>

          <Dimmer active={loading} >
            <Loader/>
          </Dimmer>

        </Modal.Content>
        
        <Modal.Actions>
          <Button content='Discard' onClick={this.discardChanges} />
          <Button positive content='Save' onClick={this.saveChanges} />
        </Modal.Actions>
    
      </Modal>
    )
  }
}

ManageDoorsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  doors: PropTypes.object.isRequired,
  loading: PropTypes.bool,
}

ManageDoorsModal.defaultProps = {
  loading: false,
}

export default ManageDoorsModal
