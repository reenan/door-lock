import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import reducer from '../reducers'

// Define date persistance config
const persistConfig = {
  key: 'root',
  storage,
}

// Create reducer with persist config
const persistedReducer = persistReducer(persistConfig, reducer)

// Define store middlewares
const middleware = [createLogger()]

// Create store with persistedReducer and middlewares
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  persistedReducer,
  composeEnhancers(
    applyMiddleware(...middleware)
  )
)

// Create persistor based on store
const persistor = persistStore(store)

export { store, persistor }