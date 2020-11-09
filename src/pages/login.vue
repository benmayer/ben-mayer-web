<template>
  <div class="container flex column">
    <form name="login" v-on:submit="login">
      <input placeholder="email" v-model="credentials.email"/> 
      <input type="password" placeholder="password" v-model="credentials.password"/>
      <button class="button--green">Login</button>
    </form>
    <p v-if="this.$store.state.loading">loading</p>
    <p v-if="error">{{ error }}</p>
    <button class="button--green" @click="logout">logout</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      credentials: {
      },
      error: false 
    }
  },
  methods: {
    async login (e) {
      e.preventDefault()
      this.$store.commit('SET_LOADING', true)
      try {
        await this.$fire.auth.signInWithEmailAndPassword(
          this.credentials.email,
          this.credentials.password
        )
        this.$store.commit('SET_LOADING', false) 
      } catch (e) {
        this.error = e.message 
        this.$store.commit('SET_LOADING', false) 
      }
    },
    async logout (e) {
      this.$store.commit('SET_LOADING', true)
      await this.$fire.auth.signOut()
      .then(() => {
        this.$store.commit('SET_LOADING', false) 
      }).catch((error) => {
        this.error = e.message
      })
    },
  }

}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.site__title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
</style>
