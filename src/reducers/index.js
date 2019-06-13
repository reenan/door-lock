import {
  CREATE_STORE,
} from '../actions'

const initialState = {
  store: {}
}

function reducer (state = initialState, action) {
  switch (action.type) {
    case CREATE_STORE:
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