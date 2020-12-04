<template>
  <div class="flex flex-col mx-auto text-center">
      <h1 class="site__title">Hi, I'm Ben.</h1>
      <div class="site__intro my-8">
        <span>—</span>
        <p>
          Product Manager, bass player and love climbing. Here I share things I've learnt and thoughts I've thought.
        </p>
        <p class="mt-4"><nuxtLink to="/about" class="font-bold ">My journey</nuxtLink></p>
      </div>
      <div class="posts__feed flex flex-col max-w-3xl ">
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
  @apply font-display font-light;
  display: block;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
.posts__feed-item {
  @apply mb-2 rounded overflow-hidden;
  background: rgba(197 195 214 / 15%);

}

.posts__feed-item:hover{
  transform: translateY(1px);
}
</style>
