import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'

import * as serviceWorker from './serviceWorker'

import Routes from './routes.js'
import { store, persistor } from './store'

import 'semantic-ui-css/semantic.min.css'
import './index.scss'
import './resources/custom-icons.scss'

const App = () => (
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

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
