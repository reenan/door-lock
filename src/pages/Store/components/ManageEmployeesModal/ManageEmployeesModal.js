import React from 'react'
import { List, Input, Select } from 'semantic-ui-react'

import { ManagementModalContainer } from '../'

import './ManageEmployeesModal.scss'

export default (props) => (
  <ManagementModalContainer
    {...props}

    modalData={{
      title: `Manage your employees`,
      description: `Here you can manage your employees and their roles, ensuring
        that no one will be getting into places they are not supposed to.`,
      info: `PS: Employees with empty names will be ignored.`,
      addText: 'Add new employee',
    }}

    itemStructure={{ name: '', role: '' }}
    ItemComponent={ManagementModalEmployeeItem}
    useDivider
  />

)

const ManagementModalEmployeeItem = ({
  id,
  item,
  nestedItems: roles,
  nestedItemsKeys: rolesKeys,
  handleTextInputChange,
  handleDropdownChange,
}) => (
  <div className='employee-list-item'>
    <List.Item>
      <div>
        <Input value={item.name} placeholder='Employee name' name='name'
            onChange={handleTextInputChange.bind(null, id)} />

        <Select
          onChange={handleDropdownChange.bind(null, id)}
          selectOnBlur={false}
          placeholder='Select a role'

          text={ roles[item.role] ? roles[item.role].name : 'Select a role' }
          value={ roles[item.role] ? item.role : null }

          options={rolesKeys.map(roleID => (
            { key: roleID, value: roleID, text: roles[roleID].name }
          ))}
        />
      </div>
    </List.Item>
  </div>
)
