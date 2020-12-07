<template>
    <nav class="nav flex">
        <NuxtLink class="p-2" to="/about">About</NuxtLink>
        <NuxtLink class="p-2" to="/blog">Blog</NuxtLink>
        <div v-if="user" class="flex">
            <span class="p-2">|</span>
            <NuxtLink v-if="user " class="p-2" to="/admin">Admin</NuxtLink>
        </div>
        <div v-if="user" class="flex">
            <span class="p-2">|</span>
            <NuxtLink v-if="user" class="p-2" to="/logout">Logout</NuxtLink>
        </div>
    </nav>
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed: {
    // to avoid using this.$store.state.auth 
    ...mapState([
      'user',
      'message',
      'loading',
    ])
  },
}
</script>

<style>

</style>
