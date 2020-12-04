<template>
  <div />
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'LogoutPage',
 computed: {
    // to avoid using this.$store.state.auth 
    ...mapState([
      'user',
      'message',
      'loading',
    ])
  },
  async fetch () {
    return this.$fire.auth.signOut()
    .then(() => {
        this.$store.commit('SET_MESSAGE', 'Logout succesful')
        this.$router.replace('/login')
        return null
    })
    .catch((e) => {
        this.$store.commit('SET_MESSAGE', e.message)
    })
  }
}
</script>
<style scoped>
</style>
