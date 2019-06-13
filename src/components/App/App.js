import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'

import Routes from '../../routes.js'
import './App.scss'

import { store, persistor } from '../../store'

export default () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <div className='app'>
          <Routes />
        </div>
      </BrowserRouter>
    </PersistGate>
  </Provider>
)
