import React from 'react'

import {
  Modal,
  Button,
  Transition,
  List,
  Input,
  Dimmer,
  Loader,
  Divider,
  Dropdown,
} from 'semantic-ui-react'

import './ManageEmployeesModal.scss'
export default ({
  isOpen,
  close,
  loading,
  roles,
  roleListKeys,
  virtualEmployeeList,
  employeeListKeys,
  handleEmployeeRoleChange,
  handleEmployeeNameChange,
  removeEmployee,
  addNewEmployee,
  discardChanges,
  saveChanges,
}) => (
  <Modal size='tiny' open={isOpen} onClose={close} className='manage-employees-modal'
    closeOnDimmerClick={false} closeOnEscape={false}>

    <Modal.Header>Manage your employees</Modal.Header>
    <Modal.Content>
      <p>
        Here you can manage your employees and their roles, ensuring that no one will be
        getting into places they are not supposed to.
      </p>

      <p>PS: Employees with empty names will be ignored.</p>

      <Transition.Group as={List} duration={200} verticalAlign='middle' className='employee-list'>
        {
          employeeListKeys.map(employeeID => (
            <div className='employee-wrapper' key={employeeID}>
              <List.Item>

              <Input value={virtualEmployeeList[employeeID].name} placeholder='Employee name'
                  onChange={handleEmployeeNameChange.bind(null, employeeID)} />

                <Dropdown
                  
                  onChange={handleEmployeeRoleChange.bind(null, employeeID)}

                  selectOnBlur={false}
                  
                  text={
                    roles[virtualEmployeeList[employeeID].role] ?
                    roles[virtualEmployeeList[employeeID].role].name : 'Select a role'
                  }

                  value={
                    roles[virtualEmployeeList[employeeID].role] ?
                    virtualEmployeeList[employeeID].role : null
                  }

                  placeholder='Select a role'

                  options={
                    roleListKeys.map(roleID => (
                    { key: roleID, value: roleID, text: roles[roleID].name }
                  ))
                } />

                <Button icon='remove' onClick={removeEmployee.bind(null, employeeID)} />

              </List.Item>

              <Divider />
            </div>
          ))
        }

        <List.Item>
          <List.Content floated='right'>
            <Button icon='plus' content='Add a new employee' onClick={addNewEmployee} />
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
