import React from 'react'

import {
  Modal,
  Button,
  Dimmer,
  Loader,
} from 'semantic-ui-react'

export default ({
  isOpen,
  close,
  unregister,
  loading,
}) => (
  <Modal size='small' open={isOpen} onClose={close}>

    <Modal.Header>Unregister</Modal.Header>
    <Modal.Content>
      <p>
        Do you really want to unregister your store? This action is
        irreversible and all your data will be lost.
      </p>

      <Dimmer active={loading}>
        <Loader/>
      </Dimmer>

    </Modal.Content>

    <Modal.Actions>
      <Button content='Cancel' onClick={close} />
      <Button negative content='Unregister' onClick={unregister} />
    </Modal.Actions>

  </Modal>
)
