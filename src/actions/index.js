export const CREATE_STORE = 'CREATE_STORE'

export function createStore () {
  return {
    type: CREATE_STORE,
    storeName: 'Teste',
  }
}
