import React from 'react'
import './Register.scss'

import { Icon, Modal, Input, Button } from '../'

export default ({
  registerModalIsOpen,
  storeName,
  openRegisterModal,
  closeRegisterModal,
  handleStoreNameChange,
  registerStore,
}) => (
  <div className='register'>
    <div className='hero' />

    <div className='content'>
      <div className='top'>
        <p className='big'>Hello,</p>
        <p className='medium'>Welcome to the <span>Door Lock</span> application.</p>
        <p className='small'>
        Your store's security matters, that is why we are here to help you ensure
        that no one without permissions will be opening your doors.
        </p>

      </div>

      <div className='bottom'>
        <p className='call'>It seems like you have not defined your store yet, how about starting now?</p>

        <div className='register-button' onClick={openRegisterModal}>
          <Icon size={22} icon='lock-open' />
          <Icon size={22} icon='lock' />
          <span>Protect my store</span>
        </div>
      </div>
    </div>

    <Modal open={registerModalIsOpen} close={closeRegisterModal}>
      <p className='medium'>Awesome! You just did the first step.</p>

      <Input value={storeName} onChange={handleStoreNameChange}
        label="What is your store's name?" required />

        <Button icon='angle-right' text='Register' onClick={registerStore}
          className={storeName.length > 0 ? '' : 'disabled'} />

    </Modal>
  </div>
)
