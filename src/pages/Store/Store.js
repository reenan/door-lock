import React from 'react'

import {
  EmployeesList,
  SelectedEmployeePermissions,
  ManageDoorsModal,
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
            <Button size='large' labelPosition='left' content='Roles' icon='lock' />
            <Button size='large' labelPosition='left' content='Employees' icon='users' />
          </div>
          
          <ManageDoorsModal loading={loading} isOpen={isOpenManageDoorsModal} save={saveDoorList}
            close={closeManageDoorsModal} doors={doors} />

          <Divider section />

          <Header inverted size='medium'>
            Select which employee you would like to use to try on the doors
          </Header>

          
          <EmployeesList employees={employees} employeesKeys={employeesKeys}
            selectedEmployee={selectedEmployee} selectEmployee={selectEmployee} roles={roles} />
          

          <p className='small'>
            { 
              selectedEmployee && employees[selectedEmployee] ?
                `You have selected ${employees[selectedEmployee].name} (${roles[employees[selectedEmployee].role].name}), and these are his/hers permissions:` :
                'Please, select an employee to continue.'
            }
          </p>
          
          {
            selectedEmployee && employees[selectedEmployee] ?
              <SelectedEmployeePermissions selectedEmployee={employees[selectedEmployee]}
                roles={roles} doors={doors} doorsKeys={doorsKeys} /> : null
          }

        </Container>
      </Segment>
    </div>
  )
}