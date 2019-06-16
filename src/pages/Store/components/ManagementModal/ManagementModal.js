import React from 'react'

import {
  Modal,
  Button,
  Transition,
  List,
  Dimmer,
  Loader,
  Divider,
} from 'semantic-ui-react'

import './ManagementModal.scss'
export default ({
  isOpen,
  close,
  loading,
  useDivider,
  modalData,
  nestedItems,
  nestedItemsKeys,
  virtualItems,
  virtualItemsKeys,
  ItemComponent,
  handleDropdownChange,
  handleCheckboxToggle,
  handleTextInputChange,
  removeItem,
  addNewItem,
  discardChanges,
  saveChanges,
}) => (
  <Modal size='small' open={isOpen} onClose={close} className='management-modal'
    closeOnDimmerClick={false} closeOnEscape={false}>

    <Modal.Header>{ modalData.title }</Modal.Header>
    <Modal.Content>
      <p>{ modalData.description }</p>
      <p>{ modalData.info }</p>

      <Transition.Group as={List} duration={200} verticalAlign='middle'
        className='item-list'>

        {
          virtualItemsKeys.map(id => (
            <div key={id}>
              <div className='item-wrapper'>
                <ItemComponent
                  id={id}
                  item={virtualItems[id]}
                  nestedItems={nestedItems}
                  nestedItemsKeys={nestedItemsKeys}
                  handleDropdownChange={handleDropdownChange}
                  handleTextInputChange={handleTextInputChange}
                  handleCheckboxToggle={handleCheckboxToggle}
                />
                <Button icon='remove' onClick={removeItem.bind(null, id)} />
              </div>
              { useDivider ?  <Divider /> : null }
            </div>
          ))
        }

        <List.Item>
          <List.Content floated='right'>
            <Button icon='plus' content={ modalData.addText } onClick={addNewItem} />
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
