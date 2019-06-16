import React from 'react'

import {
  ManageDoorsModal,
  ManageRolesModal,
  ManageEmployeesModal,
  UnregisterModal,
  EmployeesList,
  DoorsList,
} from './components'

import {
  Button,
  Container,
  Header,
  Segment,
  Divider,
  Icon,
  Message,
} from 'semantic-ui-react'

import './Store.scss'

export default ({
  name,
  employees,
  roles,
  doors,
  loading,
  selectedEmployee,
  selectEmployee,

  unregisterModalProps,
  doorModalProps,
  roleModalProps,
  employeeModalProps,
}) => {
  const employeesKeys = Object.keys(employees)

  return (
    <div className='store'>
      <Segment inverted vertical>

        <Container className='wrap-store'>
          <Header as='h1' size='huge' inverted>
            Hello, {name}
          </Header>

          <Header as='h3' inverted size='medium' className='no-space-top'>
            Welcome to your secure doors environment.
          </Header>

          <Header inverted size='tiny'>
            Customize your store using the buttons below:
          </Header>

          <div className='customize-buttons'>
            <Button size='large' icon labelPosition='left' onClick={doorModalProps.open}>
              <Icon className='custom-icon door-closed' />
              Doors
            </Button>

            <Button size='large' labelPosition='left' content='Roles' icon='lock'
              onClick={roleModalProps.open} />

            <Button size='large' labelPosition='left' content='Employees' icon='users'
              onClick={employeeModalProps.open} />
          </div>

          <Header inverted size='tiny'>
            If you want, you can unregister your store by
            <span onClick={unregisterModalProps.open}
              className='unregister warn red'> clicking here</span>.
          </Header>

          <UnregisterModal isOpen={unregisterModalProps.isOpen}
            close={unregisterModalProps.close} loading={loading}
            unregister={unregisterModalProps.unregister}
          />

          <ManageDoorsModal isOpen={doorModalProps.isOpen} items={doors}
            loading={loading} save={doorModalProps.save}
            close={doorModalProps.close} />

          <ManageRolesModal isOpen={roleModalProps.isOpen} items={roles}
            loading={loading} save={roleModalProps.save} close={roleModalProps.close}
            nestedItems={doors} />

          <ManageEmployeesModal isOpen={employeeModalProps.isOpen} items={employees}
            loading={loading} save={employeeModalProps.save}
            close={employeeModalProps.close} nestedItems={roles} />

          <Divider section />

          {
            employeesKeys.length > 0 ?
              <div>
                <Header inverted size='medium'>
                  Select which employee you would like to use to try on the doors
                </Header>

                <EmployeesList employees={employees} employeesKeys={employeesKeys}
                  selectedEmployee={selectedEmployee} selectEmployee={selectEmployee}
                  roles={roles} />

                <DoorsList roles={roles} doors={doors} employees={employees}
                  selectedEmployee={selectedEmployee} />

              </div> :
              <Message warning>
                <Message.Header>
                  Please, register at least one employee before continuing.
                </Message.Header>
              </Message>
          }

        </Container>
      </Segment>
    </div>
  )
}
