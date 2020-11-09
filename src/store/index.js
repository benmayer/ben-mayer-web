import nuxtConfig from "../nuxt.config"

export const state = () => ({
    user: null,
    loading: true,
})

export const mutations = {
  SET_LOADING: (state, payload) => {
    state.loading = payload
  },
  ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser, claims }) => {
    if (!authUser) {
      // claims = null
      // perform logout operations
    } else {
      const { uid, email, emailVerified } = authUser
      state.user = { uid, email, emailVerified }
    }
  }
}

export const actions = {
  onAuthStateChangedAction: (ctx, { authUser, claims }) => {
    ctx.commit('ON_AUTH_STATE_CHANGED_MUTATION', {state, authUser, claims})
    ctx.commit('SET_LOADING', false)
  }
}

export const getters =  {
  isLoggedIn: (state) => {
    try {
      return state.user.uid !== null
    } catch {
      return false
    }
  },
  isLoading: (state) => {
    return state.isLoading
  }
}