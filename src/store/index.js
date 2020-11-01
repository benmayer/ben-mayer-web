export const state = () => {
  return {
    auth: 0
  }
}

export const mutations = {
  setAuth (state, auth) {
    state.auth = auth
  },
  resetAuth (state) {
    state.auth = 0
  }
}