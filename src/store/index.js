import nuxtConfig from "../nuxt.config"

export const state = () => {
  return {
    user: null,
    loading: false,
    message: null,
    status: null  
  }
}

export const mutations = {
  SET_LOADING: (state, payload) => {
    state.loading = payload
  },
  SET_STATUS: (state, payload) => {
    state.auth = payload
  },
  SET_MESSAGE: (state, message) => {
    state.message = message
  },
  ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser, claims }) => {
    if (!authUser) {
      state.user = null
    } else{
      const { uid, email, emailVerified } = authUser
      state.user = { uid, email, emailVerified }
    }
  }
}

export const actions = {
    // Store action called nuxtServerInit:
  async nuxtServerInit({ dispatch, commit }, { req, res }) {
    if (res && res.locals && res.locals.user) {
      const { allClaims: claims, idToken: token, ...authUser } = res.locals.user
      commit('ON_AUTH_STATE_CHANGED_MUTATION', { authUser, claims})
    }
  },
  async onAuthStateChangedAction({ dispatch, commit }, { authUser, claims }) {
    if (!authUser) {
      commit('SET_STATUS', null)
    }else {
      commit('SET_STATUS', "success")
    }
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
  },
  getUser: (state) => {
    return state.user
  } 
}
