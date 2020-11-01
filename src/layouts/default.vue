<template>
    <div class="site__wrapper">
      <NuxtLink v-if="!$store.state.auth" class="button__login button--green" to="/login">Login </NuxtLink>
      <NuxtLink v-if="$store.state.auth" class="button__login button--green" to="/admin">Admin</NuxtLink>
      <Nuxt />
    </div>
</template>

<script>
export default {

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
  background: #040308e6;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.felx {
    display: flex;
    box-sizing: border-box;
}
.row {
    flex-direction: row;
}
.column {
    flex-direction: column;
}
.button__login{
  position: absolute;
  right:0;
  margin:1em;
}
</style>
