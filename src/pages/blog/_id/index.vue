<template>
  <BlogDetails v-if="blog" :blog="blog" />
</template>
<script>

export default {
  name: 'BlogPost',
  // middleware: 'anonymous-access',
  data () {
    return {
      blog: {}
    }
  },
  validate ({params}) {
    console.log('params.id', params)
    return params.id !== undefined
  },
  async fetch() {
    const db = this.$fire.firestore
    try {
      const dbBlogQuery = await db.collection('blogs')
        .doc(this.$route.params.id)
        // .where('published', '==', true)
        .get()
      if (!dbBlogQuery.exists)
        return this.$nuxt.error({ statusCode: 404, message: 'Looks like you\'ve got the wrong page dude.' })
      
      console.log( (!this.$store.state.user && !dbBlogQuery.data().published))
      console.log( !(this.$store.state.user && dbBlogQuery.data().published))

      if (!dbBlogQuery.data().published) 
        return this.$nuxt.error({ statusCode: 403, message: 'Not for your eyes, aparently.' })

      this.blog = {
        id: dbBlogQuery.id,
        ...dbBlogQuery.data()
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      this.$nuxt.error({ statusCode: 500, message: 'No idea what\'s up. Maybe try again in a bit.'})
    }
  },
  async mounted () {

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
