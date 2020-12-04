<template>
  <div class="flex flex-col m-auto text-center">
      <h1 class="site__title">{{ title }}</h1>
      <h1 class="site__subtitle">Coming soon</h1>
      <ul class="posts__feed flex flex-col max-w-3xl text-left"> 
        <li v-for="post of blogs" :key="post.id" class="posts__feed-item">
          <nuxt-link :to="{ name: 'blog-id', params: { 'id': post.id }}" class="flex">
            <div class="w-1/6 mr-4 bg-gray-600 bg-opacity-10">
              <img v-if="post.teaserImageUrl" :src="post.teaserImageUrl" />
            </div>
            <div class="">
              <h1 class="text-lg">{{post.title}}</h1>
              <div v-html="post.body.substring(0,50)+'..'" />
            </div>
          </nuxt-link>
          </li>
      </ul>
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
      .limit(this.batchSize)
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

.site__title {
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

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.posts__feed {

}
.posts__feed-item {

  background: rgba(144, 144, 144, 0.11);
  @apply .p-2 .mb-2;

}
</style>
