export const REGISTER_STORE = 'REGISTER_STORE'

export function registerStore(store) {
  return {
    type: REGISTER_STORE,
    store,
  }
}
