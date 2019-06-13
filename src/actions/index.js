export const REGISTER_STORE = 'REGISTER_STORE'

export function registerStore() {
  return {
    type: REGISTER_STORE,
    storeName: 'Teste',
  }
}
