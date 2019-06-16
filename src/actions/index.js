import { roles as ROLES, employees as EMPLOYEES, doors as DOORS } from './fakeStoreData'

export const UPDATE_STORE = 'UPDATE_STORE'
export const REQUEST_MADE = 'REQUEST_MADE'
export const REGISTER_STORE = 'REGISTER_STORE'
export const UNREGISTER_STORE = 'UNREGISTER_STORE'
export const OPEN_DOOR_RESULT = 'OPEN_DOOR_RESULT'

// Notify that a request will be made, then request a POST to the mock API
export function registerStore(storeName) {
  return async dispatch => {

    // Notify a request will be made
    dispatch(requestMade())

    // Handles request
    try {
      const URL = `${process.env.REACT_APP_API_BASE_URL}/store`

      // Ignoring response from fetch
      /* const response = */ await fetch(URL, {
        method: 'POST',
        data: { storeName }
      })

      // Mount store using mocked data
      const store = { name: storeName, roles: ROLES, employees: EMPLOYEES, doors: DOORS }
      dispatch(persistRegisterStore(store))
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
      const URL = `${process.env.REACT_APP_API_BASE_URL}/store`

      // Ignoring response from fetch
      /* const response = */ await fetch(URL, {
        method: 'PUT',
        data: { store }
      })

      dispatch(persistUpdatedStore(store))
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
      const URL = `${process.env.REACT_APP_API_BASE_URL}/store/${store.name}`

      // Ignoring response from fetch
      /* const response = */ await fetch(URL, {
        method: 'DELETE',
      })

      dispatch(persistUnregisteredStore())
    }

    // TODO: Implement proper error handling
    catch (err) {
      console.error(err)
    }
  }
}

// Notify that a request will be made, then request a GET to the mock API
export function openDoor(store, requestID, door, employee, date) {
  return async dispatch => {

    // Notify a request will be made
    dispatch(requestMade())

    // Handles request
    try {

      // Fake API server does not accept parametrized URL for GET
      /*
        const URL = `${process.env.REACT_APP_API_BASE_URL}
        /store/${store.name}
        /employee/${employee}
        /open-door/${door}`
      */

      // Adding a little delay to request as well
      const URL = `${process.env.REACT_APP_API_BASE_URL}/open-door?delay=1`

      // Ignoring response from fetch
      /* const response = */ await fetch(URL, {
        method: 'GET',
      })

      // Using local data instead of API to assert permission
      const role = store.employees[employee].role
      const allowed = (
        store.roles[role] &&
        store.roles[role].permissions[door] ? true : false
      )

      const requestData = {
        door,
        employee,
        role,
        allowed,
        date,
      }

      // Notify that we received return from the API
      dispatch(receivedOpenDoorRequestReturn(requestID, requestData))
    }

    // TODO: Implement proper error handling
    catch (err) {
      console.error(err)
    }
  }
}

// Register a request to open door was made and save its return
export function receivedOpenDoorRequestReturn(requestID, request) {
  return {
    type: OPEN_DOOR_RESULT,
    requestID,
    request,
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
