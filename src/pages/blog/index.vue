<template>
  <div class="flex flex-col w-full max-w-3xl m-auto px-4 text-center">
      <PageTitle :pageTitle="title" class="text-5xl md:text-8xl"/>
      <span>-</span>
      <p>Things I've learnt and thoughts I've thought.</p>
      <BlogFeed :blogs="blogs" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      title: 'Blog',
      eof: false,
      lastDoc: null,
      batchSize: 10
    }
  },
  head() {
    return {
      title: this.title,
    }
  },
  computed: {
    // to avoid using this.$store.state.auth 
    ...mapState([
      'blogs',
      'message',
      'loading',
    ])
  },
  async mounted () {
    
    // check if local instance of state is already populated
    // if not, fetch them from firebase
    if (JSON.stringify(this.blogs) !== '{}') return
    
    this.$store.commit('SET_LOADING', true)
    try {
      const db = this.$fire.firestore
      const dbQueryBlogs = await db
        .collection('blogs')
        .where('published', '==', true)
        .orderBy('created', 'desc')
        // .limit(this.batchSize)
        .get()

      dbQueryBlogs.forEach( (entry) => {
        this.$store.commit("SET_POSTS", {
          id: entry.id,
          ...entry.data()
        });
      })
      this.$store.commit('SET_LOADING', false)
    } catch(e){
      this.$store.commit('SET_LOADING', false)
      this.$store.commit('SET_MESSAGE', e.message)
    }
  },
}
</script>

<style>
</style>
