<template>
  <BlogForm v-model="blog" />
</template>

<script>

export default {
  name: 'BlogNewPost',
  middleware: 'authenticated-access',
  layout: 'admin',
  data () {
    return {
      blog: {}
    }
  }
}
</script>

<style scoped>
</style>
