<template>
  <BlogForm v-if="isLoaded" v-model="blog" />
</template>
<script>
export default {
  name: 'BlogEditPost',
  middleware: 'authenticated-access',
  layout: 'admin',
  data () {
    return {
      title: 'Edit post',
      blog: {},
      id: '',
      isLoaded: false
    }
  },
  head() {
    return {
      title: this.title,
    }
  },
  validate ({ params }) {
    return params.id !== undefined
  },
  async mounted () {
    const db = this.$fire.firestore

    try {
      const documentSnapshot = await db.collection('blogs')
        .doc(this.$route.params.id)
        .get()

      if (!documentSnapshot.exists) {
        this.$nuxt.error({ statusCode: 404, message: 'Blog not found' })
        return
      }

      this.blog = {
        id: documentSnapshot.id,
        ...documentSnapshot.data()
      }

      this.isLoaded = true
    } catch (e) {
      this.$nuxt.error({ statusCode: 404, message: 'Blog not found' })
    }
  }
}
</script>
<style scoped>
</style>
