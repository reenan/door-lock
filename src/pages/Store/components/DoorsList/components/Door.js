import React from 'react'

import { Icon, Dimmer, Loader } from 'semantic-ui-react'

import './Door.scss'

export default ({
  className,
  loading,
  roles,
  doors,
  doorID,
  employee,
  handleDoorClick,
}) => (
  <div className={className} onClick={handleDoorClick}>
    <p>
      {
        employee && roles[employee.role] && roles[employee.role].permissions[doorID] ?
        <span className='warn green'>Allowed to open: </span> :
        <span className='warn red'>Not allowed to open: </span>
      }
      <span>{doors[doorID].name}</span>
    </p>

    <div className='icons'>
      <Icon size='massive' className='custom-icon door-closed' />
      <Icon size='massive' className='custom-icon door-open' />

      <Icon size='large' name='unlock' />
      <Icon size='large' name='lock' />
    </div>

    <Dimmer active={loading}>
      <Loader />
    </Dimmer>
  </div>
)
