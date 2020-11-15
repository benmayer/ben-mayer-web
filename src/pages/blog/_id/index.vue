<template>
  <BlogDetails v-if="blog" :blog="blog" />
</template>
<script>

export default {
  name: 'BlogPage',
  // middleware: 'anonymous-access',
  data () {
    return {
      blog: null
    }
  },
  validate ({ params }) {
    // Must be a number
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
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
      this.$nuxt.error({ statusCode: 404, message: 'Blog not found' })
    }
  },
  head () {
    return {
      title: this.blog ? this.blog.title : 'loading... '
    }
  }
}
</script>
<style scoped>
</style>
