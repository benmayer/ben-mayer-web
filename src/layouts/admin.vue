<template>
    <div class="flex flex-col h-screen">
      <Message :message="message" />
      <Header class="mx-auto"/>
      <Nuxt />
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  middleware: 'authenticated-access',
  computed: {
    ...mapState([
      'user',
      'message',
      'loading',
    ])
  },
  watch: {
    user (value) {
      if (!value) {
        this.$router.push({
          path: '/login'
        })
      }
    }
  },
  methods: {
    // async logout (e) {
    //   this.$store.commit('SET_LOADING', true)
    //   await this.$fire.auth.signOut()
    //   .then(() => {
    //     this.$store.commit('SET_LOADING', false) 
    //     this.$store.commit('SET_MESSAGE', 'Logout succesful')
    //   }).catch((e) => {
    //     this.$store.commit('SET_MESSAGE', e.message)
    //   })
    // },
    }
}
</script>

<style>
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
