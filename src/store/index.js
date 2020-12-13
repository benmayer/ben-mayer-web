import nuxtConfig from "../nuxt.config"

export const state = () => {
  return {
    user: null,
    loading: true,
    message: null,
    status: null,
    blogs: {},  
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
  SET_POSTS: (state, payload) => {
    state.blogs[payload.id] = payload
  },
  DELETE_POSTS: (state, payload) => {
    if (state.blogs[payload.id]){
      delete state.blogs[payload.id]
    }
  },
  ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser, claims }) => {
    if (!authUser) {
      state.user = null
    } else{
      const { uid, email, displayName} = authUser
      state.user = { uid, email, displayName }
    }
  },

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
  },
  getBlogs: (state) => {
    return state.blogs
  }
}
