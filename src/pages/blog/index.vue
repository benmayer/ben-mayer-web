<template>
  <div class="flex flex-col w-full m-auto px-4 text-center">
      <PageTitle :pageTitle="title" class="text-5xl md:text-8xl"/>
      <span>-</span>
      <p>Things I've learnt and thoughts I've thought.</p>
      <BlogFeed :blogs="blogs" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Blog',
      blogs: [],
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
  async mounted () {
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
        this.blogs.push({
          id: entry.id,
          ...entry.data()
        })
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
