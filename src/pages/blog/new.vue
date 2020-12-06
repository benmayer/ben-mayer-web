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
      title: 'New post',
      blog: {},
    }
  },
  head() {
    return {
      title: this.title,
    }
  }
}
</script>

<style scoped>
</style>
