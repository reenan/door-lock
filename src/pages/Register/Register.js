import React from 'react'
import {
  Button,
  Container,
  Header,
  Segment,
  Step,
  Icon,
  Modal,
  Input,
  Loader,
  Dimmer,
} from 'semantic-ui-react'

import './Register.scss'

export default ({
  isOpenRegisterModal,
  storeName,
  loading,
  openRegisterModal,
  closeRegisterModal,
  handleStoreNameChange,
  registerStore,
}) => (
  <div className='register'>
    <Segment inverted textAlign='center' vertical>
      <Container text>
        <Header as='h1' size='huge' inverted>
          Welcome to The Cloud Lock
        </Header>

        <Header as='h4' inverted className='call'>
          Protect your store's doors with assured security and open them with one click!
        </Header>

        <Header.Subheader>
          Your store's security matters, that is why we are here to help you ensure that no one
          without permissions will be opening your doors.
        </Header.Subheader>
      </Container>

      <Step.Group className='step-group' stackable='tablet'>
        <Step>
          <Icon name='star' />
          <Step.Content>
            <Step.Title>Register your store</Step.Title>
            <Step.Description>
              Simply enter your store's name and we handle the rest.
            </Step.Description>
          </Step.Content>
        </Step>
        <Step>
          <Icon name='id badge' />
          <Step.Content>
            <Step.Title>Customize</Step.Title>
            <Step.Description>
              Tell us what are your doors, your employees, their roles and authorisations.
            </Step.Description>
          </Step.Content>
        </Step>
        <Step>
          <Icon name='lock' />
          <Step.Content>
            <Step.Title>That's it!</Step.Title>
            <Step.Description>
              Your store is secured and your employees can open doors with one click.
            </Step.Description>
          </Step.Content>
        </Step>
      </Step.Group>

       <Container text>
        <Header as='h4' inverted className='call'>
          It looks like you've not registered your store yet, how about starting it now?
        </Header>

        <Button animated size='huge' onClick={openRegisterModal}>
          <Button.Content visible>Protect my store</Button.Content>
          <Button.Content hidden>
            <Icon name='lock' />
          </Button.Content>
        </Button>
      </Container>

    </Segment>

    <Modal size='tiny' open={isOpenRegisterModal} onClose={closeRegisterModal}>

      <Modal.Header>Register your store</Modal.Header>
      <Modal.Content>
        <p>Awesome! You just did the first step.</p>
        <p>Now, please, could you tell us what is your store's name?</p>

        <Input placeholder='Store Name'
          value={storeName} onChange={handleStoreNameChange} />

        <Dimmer active={loading} >
          <Loader/>
        </Dimmer>

      </Modal.Content>
      <Modal.Actions>
        <Button positive disabled={storeName.length === 0}  icon='angle right'
          labelPosition='right' content='Register' onClick={registerStore} />
      </Modal.Actions>

    </Modal>
  </div>
)
