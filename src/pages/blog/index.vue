<template>
  <div class="flex flex-col m-auto text-center">
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
  async fetch () {
    // this.$store.commit('SET_LOADING', true)
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

      // this.$store.commit('SET_LOADING', false)
  },
}
</script>

<style>
</style>
