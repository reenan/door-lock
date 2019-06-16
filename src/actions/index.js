import { roles as ROLES, employees as EMPLOYEES, doors as DOORS } from './fakeStoreData'

export const UPDATE_STORE = 'UPDATE_STORE'
export const REQUEST_MADE = 'REQUEST_MADE'
export const REGISTER_STORE = 'REGISTER_STORE'
export const UNREGISTER_STORE = 'UNREGISTER_STORE'

// Notify that a request will be made, then request a POST to the mock API
export function registerStore(storeName) {
  return async dispatch => {

    // Notify a request will be made
    dispatch(requestMade())

    // Handles request
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/store`, {
        method: 'POST',
        data: { storeName }
      })

      // TODO: Implement proper handling in case of status !== 201
      if (response.status === 201) {

        // Mount store using mocked data
        const store = { name: storeName, roles: ROLES, employees: EMPLOYEES, doors: DOORS }

        // Notify that we received return from the API
        dispatch(persistRegisterStore(store))
      }
    }

    // TODO: Implement proper error handling
    catch (err) {
      console.error(err)
    }
  }
}

// Notify that a request will be made, then request a PUT to the mock API
export function updateStore(store) {
  return async dispatch => {

    // Notify a request will be made
    dispatch(requestMade())

    // Handles request
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/store`, {
        method: 'PUT',
        data: { store }
      })

      // TODO: Implement proper handling in case of status !== 200
      if (response.status === 200) {

        // Notify that we received return from the API
        dispatch(persistUpdatedStore(store))
      }
    }

    // TODO: Implement proper error handling
    catch (err) {
      console.error(err)
    }
  }
}

// Notify that a request will be made, then request a DELETE to the mock API
export function unregisterStore(store) {
  return async dispatch => {

    // Notify a request will be made
    dispatch(requestMade())

    // Handles request
    try {

      // Since store does not have an ID here, will just add 'name' at the end to simulate REST pattern.
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/store/${store.name}`, {
        method: 'DELETE',
      })

      // TODO: Implement proper handling in case of status !== 204
      if (response.status === 204) {

        // Notify that we received return from the API
        dispatch(persistUnregisteredStore())
      }
    }

    // TODO: Implement proper error handling
    catch (err) {
      console.error(err)
    }
  }
}


// Notity that data will be requested from API
export function requestMade() {
  return {
    type: REQUEST_MADE,
  }
}

// Persist store after getting return from update from API
export function persistUpdatedStore(store) {
  return {
    type: UPDATE_STORE,
    store,
  }
}

// Persist store after getting data from API
export function persistRegisterStore(store) {
  return {
    type: REGISTER_STORE,
    store,
  }
}

// Remove store from storage
export function persistUnregisteredStore() {
  return {
    type: UNREGISTER_STORE,
  }
}
