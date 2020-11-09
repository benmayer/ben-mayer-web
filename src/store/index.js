import nuxtConfig from "../nuxt.config"

export const state = () => {
  return {
    auth: false,
    user: null,
    loading: false,
    message: null    
  }
}

export const mutations = {
  SET_LOADING: (state, payload) => {
    state.loading = payload
  },
  SET_AUTH: (state, payload) => {
    state.auth = payload
  },
  ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser, claims }) => {
    if (!authUser) {
      state.user = null
    } else{
      const { uid, email, emailVerified } = authUser
      state.user = { uid, email, emailVerified }
    }
    console.log(state)
  }
}

export const actions = {
  onAuthStateChangedAction: (ctx, { authUser, claims }) => {
    if (!authUser) {
      ctx.commit('SET_AUTH', false)
    }else {
      ctx.commit('SET_AUTH', true)

    }
  }
}

export const getters =  {
  // TODO: how to use these ?? 
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