<template>
  <div class="container flex column">
    <div class=""> {{ authMessage }}</div>
    <!-- <form name="login" >
      <input email placeholder="email" /> 
      <input password placeholder="password" /> 
    </form> -->
    <button v-if="!this.$store.state.auth" @click="login" class="button--green">Login</button>
    <button v-if="this.$store.state.auth" @click="logout" class="button--green">Logout</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    authMessage () {
      return !this.$store.state.auth ? 'You\'re currently logged out. Log in by tapping the Login button below' : 'You\'re logged in!'
    }
  },
  methods: {
    login (e) {
      this.$store.commit('setAuth', 1)
    },
    logout (e) {
      this.$store.commit('setAuth', 0)
    }
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
