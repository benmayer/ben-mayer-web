<template>
  <div class="flex flex-col w-full max-w-3xl mx-auto px-4 text-center py-20">
      <PageTitle :pageTitle="'Hi, I\'m Ben.'" class="text-5xl md:text-8xl"/>
      <div class="site__intro w-full  my-8 mx-auto ">
        <span>—</span>
        <p>
          Product Manager, bass player and love climbing, currently in Berlin. This is a collection of things I've learnt and thoughts I've thought.
        </p>
        <p class="mt-4"><NuxtLink to="/about" class="inline-block font-bold">My journey</NuxtLink></p>
      </div>
      <BlogFeed :blogs="blogs" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'home',
  data () {
    return {
      title: 'Things I\'ve learnt, thoughts I\'ve thought',
      batchSize: 10
    }
  },
  head() {
    return {
      title: this.title,
    }
  },
  computed: {
    // to avoid using this.$store.state 
    ...mapState([
      'blogs',
      'user',
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
        .limit(this.batchSize)
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
