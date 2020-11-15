<template>
  <div class="container flex column">

    
    <form name="login" v-on:submit="login">
      <input placeholder="email" v-model="credentials.email"/> 
      <input type="password" placeholder="password" v-model="credentials.password"/>
      <button class="button--green">Login</button>
    </form>
    <p v-if="isLoading">loading</p>
    <p v-if="isLoggedIn"> Hello {{getUser.email}}</p>
    <p v-if="message">{{ message }}</p>
    <button v-if="isLoggedIn" class="button--green" @click="logout">logout</button>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  data () {
    return {
      credentials: {},
      message: null,
    }
  },
  fetch ({ store }) {

  },
  computed: {
    // to avoid using this.$store.state.auth 
    ...mapGetters([
      'isLoading',
      'isLoggedIn',
      'getUser',
    ])
  },
  methods: {
    async login (e) {
      e.preventDefault()
      this.$store.commit('SET_LOADING', true)
      this.message = ""
      try {
        await this.$fire.auth.signInWithEmailAndPassword(
          this.credentials.email,
          this.credentials.password
        ).then((e) => {
          this.$store.commit('SET_LOADING', false) 
          this.credentials = {}
          this.message = e.message ? e.message : 'Success! You\'re logged in.'
        })
      } catch (e) {
        console.log("catch", e)
        this.message = e.message 
        this.$store.commit('SET_LOADING', false) 
      }
    },
    async logout (e) {
      this.$store.commit('SET_LOADING', true)
      await this.$fire.auth.signOut()
      .then(() => {
        this.$store.commit('SET_LOADING', false) 
        this.message = 'Logout succesful'
      }).catch((e) => {
        this.message = e.message
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
