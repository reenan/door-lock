import {
  REQUEST_MADE,
  UPDATE_STORE,
  REGISTER_STORE,
  UNREGISTER_STORE,
  OPEN_DOOR_RESULT,
} from '../actions'


const initialState = {
  store: {},
  openDoorRequests: {},
  loading: false,
}

function reducer (state = initialState, action) {
  switch (action.type) {

    case REQUEST_MADE:
      return {
        ...state,
        loading: true,
      }

    case REGISTER_STORE:
      return {
        ...state,
        store: action.store,
        loading: false,
      }

    case UPDATE_STORE:
      state.store = action.store

      return {
        ...state,
        loading: false,
      }

    case UNREGISTER_STORE:
      return initialState

    case OPEN_DOOR_RESULT:
      const openDoorRequests = Object.assign({}, state.openDoorRequests)
      openDoorRequests[action.requestID] = action.request

      return {
        ...state,
        openDoorRequests,
        loading: false,
      }

    default:
      return state
  }
}

export default reducer
