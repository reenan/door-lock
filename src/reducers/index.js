import {
  REGISTER_STORE,
} from '../actions'

const initialState = {
  store: {}
}

function reducer (state = initialState, action) {
  switch (action.type) {
    case REGISTER_STORE:
      return {
        ...state,
        store: action.store,
      }
    default:
      return state
  }
}

export default reducer