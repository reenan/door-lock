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
        store: {
          name: action.storeName,
        },
      }
    default:
      return state
  }
}

export default reducer