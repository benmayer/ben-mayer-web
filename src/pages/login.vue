<template>
  <div class="container flex column">
    <form v-if="!user" name="login" v-on:submit="login">
      <input placeholder="email" v-model="credentials.email"/> 
      <input type="password" placeholder="password" v-model="credentials.password"/>
      <button class="button--green">Login</button>
    </form>
    <p v-if="user"> Hello {{user.email}}</p>
    <NuxtLink v-if="user" class="button--green" to="/admin">Admin</NuxtLink>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  middleware: 'anonymous-access',
  data () {
    return {
      credentials: {},
    }
  },
  fetch ({ store }) {

  },
  computed: {
    // to avoid using this.$store.state.auth 
    ...mapState([
      'user',
      'message',
      'loading',
    ])
  },
  methods: {
    async login (e) {
      e.preventDefault()
      this.$store.commit('SET_LOADING', true)
      try {
        await this.$fire.auth.signInWithEmailAndPassword(
          this.credentials.email,
          this.credentials.password
        ).then((e) => {
          const message = e.message ? e.message : 'Success! You\'re logged in.'
          this.$store.commit('SET_LOADING', false)
          this.$store.commit('SET_MESSAGE', message)
          this.credentials = {}
          // this.$router.replace('/admin')
        })
      } catch (e) {
        this.$store.commit('SET_LOADING', false)
        this.$store.commit('SET_MESSAGE', e.message)
      }
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
