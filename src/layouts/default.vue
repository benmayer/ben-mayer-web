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
  computed: {
    ...mapState([
      'user',
      'message',
      'loading',
    ])
  }
}
</script>

<style>
html {
  @apply font-sans;
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

.ld-mode, html {
  @apply text-gray-900 bg-gray-100;
}
@media (prefers-color-scheme: dark) {
  .ld-mode, html {
    @apply text-gray-100 bg-gray-900;
  }
}

p > a {
  color: #3b8070;
}

.button--green {
  display: inline-block;
  border-radius: 2px;
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
  border-radius: 2px;
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
