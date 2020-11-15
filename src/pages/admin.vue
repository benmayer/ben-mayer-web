<template>
  <div class="container flex column">
      <table class="blogs__table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Status</th>
          <th>Created</th>
          <th>Changed</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="blog of blogs" :key="blog.id">
          <td>
            <nuxt-link :to="{ name: 'blog-id', params: { 'id': blog.id }}">{{ blog.id }}</nuxt-link>
          </td>
          <td>{{ blog.title }}</td>
          <td>{{ blog.published ? 'Published' : 'Draft' }}</td>
          <td>{{ blog.created | toDate }}</td>
          <td>{{ blog.changed | toDate }}</td>
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
.container {
  margin: 0 auto;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.blogs__table{
  width:100%;
  max-width: 960px;
}

thead > tr > th,
tbody > tr > td {
  border: 1px solid #a2a2a2;
}
</style>
