import React from 'react'

import {
  EmployeesList,
  SelectedEmployeePermissions,
  ManageDoorsModalContainer,
  ManageRolesModalContainer,
  ManageEmployeesModalContainer,
} from './components'

import {
  Button,
  Container,
  Header,
  Segment,
  Divider,
  Icon,
} from 'semantic-ui-react'

import './Store.scss'

export default ({
  name,
  employees,
  roles,
  doors,
  selectedEmployee,
  selectEmployee,
  loading,

  saveDoorList,
  openManageDoorsModal,
  closeManageDoorsModal,
  isOpenManageDoorsModal,

  saveRoleList,
  openManageRolesModal,
  closeManageRolesModal,
  isOpenManageRolesModal,

  isOpenManageEmployeesModal,
  saveEmployeeList,
  openManageEmployeesModal,
  closeManageEmployeesModal,
}) => {
  const employeesKeys = Object.keys(employees)
  const doorsKeys = Object.keys(doors)

  return (
    <div className='store'>
      <Segment inverted vertical>
      
        <Container className='wrap-store' text>
          <Header as='h1' size='huge' inverted>
            Hello, {name}
          </Header>

          <Header as='h3' inverted size='medium' className='no-space-top'>
            Welcome to your secure doors environment
          </Header>

          <Header inverted sub>
            Customize your store using the buttons below:
          </Header>

          <div className='customize-buttons'>
            <Button size='large' icon labelPosition='left' onClick={openManageDoorsModal}>
              <Icon className='custom-icon door-closed' />
              Doors
            </Button>  

            <Button size='large' labelPosition='left' content='Roles' icon='lock'
              onClick={openManageRolesModal} />

            <Button size='large' labelPosition='left' content='Employees' icon='users'
              onClick={openManageEmployeesModal} />
          </div>
          
          <ManageDoorsModalContainer loading={loading} isOpen={isOpenManageDoorsModal}
            save={saveDoorList} close={closeManageDoorsModal} doors={doors} />

          <ManageRolesModalContainer loading={loading} isOpen={isOpenManageRolesModal}
            save={saveRoleList} close={closeManageRolesModal} roles={roles} doors={doors} />

          <ManageEmployeesModalContainer loading={loading} isOpen={isOpenManageEmployeesModal}
            save={saveEmployeeList} close={closeManageEmployeesModal} roles={roles} employees={employees} />

          <Divider section />

          <Header inverted size='medium'>
            Select which employee you would like to use to try on the doors
          </Header>

          
          <EmployeesList employees={employees} employeesKeys={employeesKeys}
            selectedEmployee={selectedEmployee} selectEmployee={selectEmployee} roles={roles} />
          
          <SelectedEmployeePermissions selectedEmployee={employees[selectedEmployee]}
            roles={roles} doors={doors} doorsKeys={doorsKeys} />

        </Container>
      </Segment>
    </div>
  )
}