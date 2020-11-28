<template>
  <div class="flex flex-col container items-center mx-auto text-center">
      <h1 class="site__title">{{ title }}</h1>
      <ul class="flex column text-left"> 
        <li v-for="post of blogs" :key="post.id" class="mb-2">
          <nuxt-link :to="{ name: 'blog-id', params: { 'id': post.id }}">
            <h1>{{post.title}}</h1>
            <div v-html="post.body.substring(0,50)+'..'"/>
          </nuxt-link>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Ben Mayer',
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
      // .orderBy('created', 'desc')
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
</style>
