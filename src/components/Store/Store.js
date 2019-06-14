import React from 'react'
import './Store.scss'

import { Icon, Modal, Input, Button } from '../'

export default ({
  name,
  employees,
  roles,
  selectedEmployee,
  selectEmployee,
}) => (
  <div className='store'>
    <div className='hero' />

    <div className='content'>
      <div className='top'>
        <p className='big'>Hello {name},</p>
        <p className='medium'>Welcome to your secure doors environment.</p>
      </div>

      <div className='bottom'>
        <p className='medium'>Currently you have {employees.length} employees registered.</p>
        <p className='small'>Select which employee you would like use to try on the doors:</p>

        <div className='employees'>
          {
            Object.keys(employees).map((employeeID) => (
              <div key={employeeID} onClick={selectEmployee.bind(null, employeeID)}>
                <p>
                  Name: {employees[employeeID].name}
                </p>
                <p>
                  Role: {roles[employees[employeeID].role].name}
                </p>
                <p>
                  Front Door: <Icon icon={roles[employees[employeeID].role].permissions.frontDoor ? 'check' : 'close' } />
                </p>
                <p>
                  Storage Room: <Icon icon={roles[employees[employeeID].role].permissions.storageRoom ? 'check' : 'close'} />
                </p>
              </div>
            ))
          }
        </div>

        <p className='small'>
          { selectedEmployee ?
            `You have selected ${employees[selectedEmployee].name} (${roles[employees[selectedEmployee].role].name})` :
            'Please, select an employee to continue.'
          }
        </p>
      </div>
    </div>
  </div>
)
