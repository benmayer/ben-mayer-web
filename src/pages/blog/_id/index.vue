<template>
  <BlogDetails v-if="blog" :blog="blog" class="py-12"/>
</template>
<script>

export default {
  name: 'BlogPost',
  // middleware: 'anonymous-access',
  data () {
    return {
      title: 'Blog post',
      blog: {},
    }
  },
  head() {
    return {
      title: this.blog ? this.blog.title : null,
    }
  },
  validate ({params}) {
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
}
</script>
<style scoped>
.post__title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
</style>
