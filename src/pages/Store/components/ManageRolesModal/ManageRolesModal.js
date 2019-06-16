import React from 'react'
import { List, Input, Checkbox } from 'semantic-ui-react'

import { ManagementModalContainer } from '../'

import './ManageRolesModal.scss'

export default (props) => (
  <ManagementModalContainer
    {...props}

    modalData={{
      title: `Manage your roles`,
      description: `Here you can manage your roles and their permissions, ensuring
        only authorised people will able to open your roles with one click.`,
      info: `PS: Roles with empty names will be ignored.`,
      addText: 'Add new role',
    }}

    itemStructure={{ name: '', permissions: {} }}
    ItemComponent={ManagementModalRoleItem}
    useDivider
  />

)

const ManagementModalRoleItem = ({
  id,
  item,
  nestedItems: doors,
  nestedItemsKeys: doorsKeys,
  handleTextInputChange,
  handleCheckboxToggle,
}) => (
  <div>
    <List.Item>
      <Input value={item.name} placeholder='Role name' name='name'
        onChange={handleTextInputChange.bind(null, id)} />

      <List.List className='roles-permission-door-list'>
        {
          doorsKeys.map(doorID => (
            <List.Item key={doorID}
              onClick={handleCheckboxToggle.bind(null, id, doorID, 'permissions')}>

              <div>
                <p>
                  {
                    item.permissions[doorID] ?
                    <span className='warn green'>Allowed: </span> :
                    <span className='warn red'>Not allowed: </span>
                  }
                  <span>{doors[doorID].name}</span>
                </p>

                <Checkbox toggle
                  checked={item.permissions[doorID]} />
              </div>
            </List.Item>
          ))
        }
      </List.List>
    </List.Item>
  </div>
)
