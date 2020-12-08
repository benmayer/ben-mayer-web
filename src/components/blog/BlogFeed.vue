<template>
    <div class="feed flex flex-col w-full max-w-xl m-auto">
        <ul v-if="!loading" class="text-left my-8">
          <li v-for="post of blogs" :key="post.id" class="feed-item shadow hover:shadow-sm">
            <NuxtLink :to="{ name: 'blog-id', params: { 'id': post.id }}" class="flex flex-col items-stretch sm:h-48 h-auto sm:flex-row">
              <div class="w-full sm:w-1/4 sm:h-auto h-60 mr-2 bg-gray-600 bg-opacity-10 bg-cover bg-center" :style="{backgroundImage: `url('${post.teaserImageUrl}')`}">
              </div>
              <div class="sm:w-3/4 p-4">
                <h1 class="text-2xl font-display font-light mb-2">{{post.title}}</h1>
                <div>{{post.description}}</div>
              </div>
            </NuxtLink>
            </li>
        </ul>
        <ul v-else class="w-full text-left my-8">
          <li class="feed-item flex flex-col sm:flex-row items-stretch sm:h-45 h-auto shadow hover:shadow-sm">
              <div class="w-full sm:w-1/4 sm:h-auto h-60 mr-2 bg-gray-600 bg-opacity-10 bg-cover bg-center"></div>
               <div class="sm:w-3/4 py-6 px-4 ">
                    <div class="w-1/2 h-6 mb-6 rounded bg-gray-500"></div>
                    <div class="w-5/6 h-4 my-2 rounded bg-gray-500"></div>
                    <div class=" w-3/6 h-4 my-2 rounded bg-gray-500"></div>
                    <div class=" w-4/6 h-4 my-2 rounded bg-gray-500"></div>
               </div>
          </li>
        </ul>
      </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'BlogFeed',
    props: {
        blogs: {
        type: Array,
        required: true
        },
    },
    computed: {
    ...mapState([
      'user',
      'message',
      'loading',
    ])
  },
}
</script>

<style scoped>
.feed-item {
  @apply mb-2 rounded overflow-hidden;
  background: rgba(197 195 214 / 15%);

}
.feed-item:hover{
  transform: translateY(1px);
}
</style>