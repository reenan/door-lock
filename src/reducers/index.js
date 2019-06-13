import {
  SAMPLE,
} from '../actions'

const initialState = {
  data: 'Initial'
}

function reducer (state = initialState, action) {
  switch (action.type) {
    case SAMPLE:
      return {
        ...state,
        data: action.data
      }
    default:
      return state
  }
}

export default reducer