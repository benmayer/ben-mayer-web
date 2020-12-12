<template>
  <div class="flex w-full m-auto px-4 py-20">
    <form v-if="!user" name="login" class="login__form" @submit.prevent>
      <input placeholder="email" v-model="credentials.email" class="login__form-input input__email"/> 
      <input type="password" placeholder="password" v-model="credentials.password" class="login__form-input input__password"/>
      <button class="button--green login__form-button" type="submit" @click="login">Login</button>
    </form>
    <div v-if="user" class="flex flex-col m-auto text-center">
      <h1 class="site__title"> Hello {{user.displayName}}</h1>
      <p>If the redirect doesn't work, click here:</p>
      <p><NuxtLink class="font-bold mt-2" to="/admin">Admin</NuxtLink> </p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'login',
  middleware: 'anonymous-access',
  data () {
    return {
      title: 'Login',
      credentials: {},
    }
  },
  head() {
    return {
      title: this.title,
    }
  },
  watch: {
    user (value) {
      if (value) {
        this.$router.push({
          path: '/admin'
        })
      }
    }
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
      this.$store.commit('SET_LOADING', true)
      try {
        await this.$fire.auth.signInWithEmailAndPassword(
          this.credentials.email,
          this.credentials.password
        ).then((user) => {
          this.$store.commit('SET_LOADING', false)
          this.$store.commit('SET_MESSAGE', 'Success! You\'re logged in.')
          this.credentials = {}
          this.$fire.analytics.setUserId(user.uid)
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

.login__form{ 
  @apply flex flex-col;
  @apply w-full max-w-xs m-auto ;
  @apply p-2;
  background: #a7a7a71c;
}
.login__form-input{
  padding: 1em;
  margin-bottom: .5em;
  background: white;
  border: 1px solid #efefef;
  @apply text-gray-700;
}
.login__form-button{
    margin-top: 1em;
    background: white;
    font-weight: 600;
}
</style>
