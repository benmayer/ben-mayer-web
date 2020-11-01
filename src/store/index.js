export const state = () => {
  return {
    simpleAuth: 0
  }
}

export const mutations = {
  simpleAuth (state, auth) {
    state.simpleAuth = auth
  },
  ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser, claims }) => {
    const { uid, email, emailVerified } = authUser
    state.user = { uid, email, emailVerified }
  }
}

export const actions = {
  onAuthStateChangedAction: (ctx, { authUser, claims }) => {
    if (!authUser) {
      // claims = null
      // Perform logout operations
    } else {
      // Do something with the authUser and the claims object...
    }
  }
}