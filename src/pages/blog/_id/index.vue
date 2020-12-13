<template>
  <BlogDetails v-if="post" :post="post" class="py-20"/>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'BlogPost',
  // middleware: 'anonymous-access',
  data () {
    return {
      title: 'Blog post',
      post: null,
    }
  },
  head() {
    return {
      title: this.post ? this.post.title : null,
    }
  },
  validate ({params}) {
    return params.id !== undefined
  },
  computed: {
    // to avoid using this.$store.state.auth 
    ...mapState([
      'blogs',
      'message',
      'loading',
    ])
  },
  async fetch() {
    
    // check if local instance of state is already populated with blog post requested
    // if not, fetch it from firebase
    if (this.blogs[this.$route.params.id]) {
      return this.post = this.blogs[this.$route.params.id]
    }
    this.$store.commit('SET_LOADING', true)
    try {
      const db = this.$fire.firestore
      const dbBlogQuery = await db.collection('blogs')
        .doc(this.$route.params.id)
        // .where('published', '==', true)
        .get()

      if (!dbBlogQuery.exists)
        this.$store.commit('SET_LOADING', false)
        return this.$nuxt.error({ statusCode: 404, message: 'Looks like you\'ve got the wrong page dude.' })

      if (!dbBlogQuery.data().published)
        this.$store.commit('SET_LOADING', false)
        return this.$nuxt.error({ statusCode: 403, message: 'Not for your eyes, aparently.' })

      this.post = {
        id: dbBlogQuery.id,
        ...dbBlogQuery.data()
      }
      this.$store.commit("SET_POSTS", this.post)
      this.$store.commit('SET_LOADING', false)
    } catch (e) {
      this.$store.commit('SET_LOADING', false)
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
