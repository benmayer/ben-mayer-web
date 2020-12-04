<template>
    <nav class="site__nav flex">
        <!-- <NuxtLink class="m-2" to="/about">About</NuxtLink> -->
        <NuxtLink class="m-2" to="/blog">Blog</NuxtLink>
        <div v-if="user" class="flex">
            <span class="m-2">|</span>
            <NuxtLink v-if="user " class="m-2" to="/admin">Admin</NuxtLink>
        </div>
        <div v-if="user" class="flex">
            <span class="m-2">|</span>
            <NuxtLink v-if="user" class="m-2" to="/logout">Logout</NuxtLink>
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
