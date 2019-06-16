import {
  REQUEST_MADE,
  UPDATE_STORE,
  REGISTER_STORE,
  UNREGISTER_STORE,
} from '../actions'

const initialState = {
  store: {},
  isFetching: false,
}

function reducer (state = initialState, action) {
  switch (action.type) {

    case REQUEST_MADE:
      return {
        ...state,
        isFetching: true,
      }

    case REGISTER_STORE:
      return {
        ...state,
        store: action.store,
        isFetching: false,
      }

    case UPDATE_STORE:
      state.store = action.store

      return {
        ...state,
        isFetching: false,
      }

    case UNREGISTER_STORE:
      state.store = action.store

      return initialState

    default:
      return state
  }
}

export default reducer
