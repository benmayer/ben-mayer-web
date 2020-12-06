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

</style>
