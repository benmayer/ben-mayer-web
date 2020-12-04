<template>
  <div class="flex flex-col m-auto text-center">
      <h1 class="site__title">{{ title }}</h1>
      <span>-</span>
      <p>Here I share things I've learnt and thoughts I've thought.</p>
      <div class="posts__feed flex flex-col max-w-3xl text-left"> 
        <ul class="text-left my-8"> 
          <li v-for="post of blogs" :key="post.id" class="posts__feed-item shadow hover:shadow-sm">
            <nuxt-link :to="{ name: 'blog-id', params: { 'id': post.id }}" class="flex">
              <div class="w-1/4 mr-2 bg-gray-600 bg-opacity-10 bg-cover bg-center" :style="{backgroundImage: `url('${post.teaserImageUrl}')`}">
              </div>
              <div class="w-3/4 p-4">
                <h1 class="text-2xl font-display font-light mb-2">{{post.title}}</h1>
                <div v-html="post.body.substring(0,225)+'..'" />
              </div>
            </nuxt-link>
            </li>
        </ul>
      </div>
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
  head() {
    return {
      title: this.title,
    }
  }
}
</script>

<style>
</style>
