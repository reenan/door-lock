import React from 'react'
import { List, Input } from 'semantic-ui-react'

import { ManagementModalContainer } from '../'

export default (props) => (
  <ManagementModalContainer
    {...props}

    modalData={{
      title: `Manage your doors`,
      description: `Here you can manage your doors by creating new
        ones and editing or deleting existing ones.`,
      info: `PS: Doors with empty names will be ignored.`,
      addText: 'Add new door',
    }}

    itemStructure={{ name: '' }}
    ItemComponent={ManagementModalDoorItem}
  />

)

const ManagementModalDoorItem = ({ id, item, handleTextInputChange }) => (
  <div>
    <List.Item>
      <Input value={item.name} placeholder='Door name' name='name'
        onChange={handleTextInputChange.bind(null, id)} />
    </List.Item>
  </div>
)
