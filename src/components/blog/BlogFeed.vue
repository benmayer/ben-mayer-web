<template>
    <div class="feed flex flex-col max-w-3xl m-auto">
        <ul class="text-left my-8 mx-2"> 
          <li v-for="post of blogs" :key="post.id" class="posts__feed-item shadow hover:shadow-sm">
            <NuxtLink :to="{ name: 'blog-id', params: { 'id': post.id }}" class="flex flex-col sm:flex-row">
              <div class="w-full h-60 sm:h-40  sm:w-1/4 mr-2 bg-gray-600 bg-opacity-10 bg-cover bg-center" :style="{backgroundImage: `url('${post.teaserImageUrl}')`}">
              </div>
              <div class="sm:w-3/4 p-4">
                <h1 class="text-2xl font-display font-light mb-2">{{post.title}}</h1>
                <div>{{post.description}}</div>
              </div>
            </NuxtLink>
            </li>
        </ul>
      </div>
</template>

<script>
export default {
    name: 'BlogFeed',
    props: {
        blogs: {
        type: Array,
        required: true
        },
    } 
}
</script>