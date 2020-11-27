<template>
  <div class="flex container items-center mx-auto text-center">
      <nuxt-link to="/blog/new" class="block mb-5 no-underline font-bold uppercase text-sm float-right">
      Create new article
    </nuxt-link>
      <table class="table-auto border-collapse w-full mx-auto ">
        <thead>
          <tr>
            <th class="p-2">ID</th>
            <th class="p-2">Title</th>
            <th class="p-2">Status</th>
            <th class="p-2">Created</th>
            <th class="p-2">Changed</th>
          </tr>
        </thead>
      <tbody>
        <tr v-for="blog of blogs" :key="blog.id">
          <td class="p-2">
            <nuxt-link :to="{ name: 'blog-id', params: { 'id': blog.id }}">{{ blog.id }}</nuxt-link>
          </td>
          <td class="p-2">{{ blog.title }}</td>
          <td class="p-2">{{ blog.published ? 'Published' : 'Draft' }}</td>
          <td class="p-2">{{ blog.created | toDate }}</td>
          <td class="p-2">{{ blog.changed | toDate }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      title: 'Admin',
      blogs: [],
    }
  },
  head() {
    return {
      title: this.title,
    }
  },
  async mounted () {
    const db = this.$fire.firestore
    const dbQueryBlogs = await db
      .collection('blogs')
      .orderBy('created', 'desc')
      .get()
    dbQueryBlogs.forEach( (entry) => {
      this.blogs.push({
        id: entry.id,
        ...entry.data()
      })
    })
  }
}
</script>

<style>

thead > tr > th,
tbody > tr > td {
  border: 1px solid #a2a2a2;
}
</style>
