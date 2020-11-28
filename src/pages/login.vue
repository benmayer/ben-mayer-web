<template>
  <div class="flex m-auto">
    <form v-if="!user" name="login" class="login__form flex column mx-auto" @submit.prevent>
      <input placeholder="email" v-model="credentials.email" class="login__form-input input__email"/> 
      <input type="password" placeholder="password" v-model="credentials.password" class="login__form-input input__password"/>
      <button class="button--green login__form-button" type="submit" @click="login">Login</button>
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
  // fetch ({ store }) {

  // },
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
        ).then((e) => {
          const message = e.message ? e.message : 'Success! You\'re logged in.'
          this.$store.commit('SET_LOADING', false)
          this.$store.commit('SET_MESSAGE', message)
          this.credentials = {}
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
  max-width: 300px;
  width: 100%;
  padding: 1em;
  background: #a7a7a71c;
}
.login__form-input{
  padding: 1em;
  margin-bottom: .5em;
  background: white;
  border: 1px solid #efefef;
}
.login__form-button{
    margin-top: 1em;
    background: white;
    font-weight: 600;
}
</style>
