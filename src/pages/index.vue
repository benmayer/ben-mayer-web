<template>
  <div class="flex flex-col mx-auto text-center">
      <h1 class="site__title">Hi, I'm Ben.</h1>
      <div class="site__intro max-w-3xl my-8 mx-auto ">
        <span>—</span>
        <p>
          Product Manager, bass player and love climbing, currently in Berlin. This is a collection of things I've learnt and thoughts I've thought.
        </p>
        <p class="mt-4"><NuxtLink to="/about" class="inline-block font-bold">My journey</NuxtLink></p>
      </div>
      <div class="posts__feed flex flex-col max-w-3xl m-auto">
        <ul class="text-left my-8"> 
          <li v-for="post of blogs" :key="post.id" class="posts__feed-item shadow hover:shadow-sm">
            <NuxtLink :to="{ name: 'blog-id', params: { 'id': post.id }}" class="flex">
              <div class="w-1/4 mr-2 bg-gray-600 bg-opacity-10 bg-cover bg-center" :style="{backgroundImage: `url('${post.teaserImageUrl}')`}">
              </div>
              <div class="w-3/4 p-4">
                <h1 class="text-2xl font-display font-light mb-2">{{post.title}}</h1>
                <div>{{post.description}}</div>
              </div>
            </NuxtLink>
            </li>
        </ul>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'home',
  data () {
    return {
      title: 'Things I\'ve learnt, thoughts I\'ve thought',
      blogs: [],
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
      'user',
      'message',
      'loading',
    ])
  },
  async fetch () {
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
        this.blogs.push({
          id: entry.id,
          ...entry.data()
        })
      })
    } catch(e){
      this.$store.commit('SET_LOADING', false)
      this.$store.commit('SET_MESSAGE', e.message)
    }
      
  },
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
