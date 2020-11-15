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
    console.log('ON_AUTH_STATE_CHANGED_MUTATION', state)
  }
}

export const actions = {
    // Store action called nuxtServerInit:
  async nuxtServerInit({ dispatch, commit }, { req, res }) {
    console.log('nuxtServerInit', res.locals)

    if (req.headers.cookie) {
      console.log('cookie', req.headers.cookie)
    }
    if (res && res.locals && res.locals.user) {
      const { allClaims: claims, idToken: token, ...authUser } = res.locals.user
      console.log('setting auth user:', authUser)
      commit('ON_AUTH_STATE_CHANGED_MUTATION', { authUser, claims})
    }
  },
  async onAuthStateChangedAction({ dispatch, commit }, { authUser, claims }) {
    console.log('onAuthStateChangedAction', authUser)
    if (!authUser) {
      commit('SET_AUTH', false)
    }else {
      commit('SET_AUTH', true)
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
  },
  getUser: (state) => {
    return state.user
  } 
}
