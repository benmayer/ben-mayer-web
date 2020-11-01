<template>
    <div class="site__wrapper">
      <NuxtLink v-if="!$store.state.auth" class="button__login button--green" to="/">Home</NuxtLink>
      <button v-if="$store.state.auth" @click="logout" class="button__login button--green">Logout</button>
      <Nuxt />
    </div>
</template>

<script>
export default {
  middleware: 'authenticated-access',
  methods: {
    logout (e) {
      this.$store.commit('setAuth', 0)
    }
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
