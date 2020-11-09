<template>
  <div class="container flex column">
    <div class=""> {{ authMessage }}</div>
    <form name="login" v-on:submit="createUser" >
      <input type="email" placeholder="email" v-model="user.email"/> 
      <input type="password" placeholder="password" v-model="user.password"/>
      <button v-if="!this.$store.state.simpleAuth" class="button--green">Login</button>
    </form>
    <button v-if="this.$store.state.simpleAuth" @click="logout" class="button--green">Logout</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        email: null,
        password: null
      },
      authMessage: 'You\'re logged out!'
    }
  },
  methods: {
    login (e) {
      this.$store.commit('simpleAuth', 1)
    },
    logout (e) {
      this.$store.commit('simpleAuth', 0)
    },
    async createUser(e) {
      e.preventDefault()
      try {
        await this.$fire.auth.createUserWithEmailAndPassword(
          this.user.email,
          this.user.password
        ).then( () => {
          this.authMessage = 'You\'re logged in'
        }) 
      } catch (e) {
        console.log(e)
      }
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
