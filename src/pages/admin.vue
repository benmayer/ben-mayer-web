<template>
  <div class="container flex flex-col w-full m-auto px-4 py-20">
      <nuxt-link to="/blog/new" class="block mb-5 no-underline font-bold uppercase text-sm float-right">
      Create new article
    </nuxt-link>
      <table class="table-auto border-collapse w-full mx-auto ">
        <thead>
          <tr>
            <th class="p-2">Post ID</th>
            <th class="p-2">Title</th>
            <th class="p-2">Status</th>
            <th class="p-2">Last Updated</th>
            <th class="p-2">Created</th>
          </tr>
        </thead>
      <tbody v-if="!loading">
        <tr v-for="blog in blogs" :key="blog.id">
          <td class="p-2">
            <nuxt-link :to="{ name: 'blog-id-edit', params: { 'id': blog.id }}">{{ blog.id }}</nuxt-link>
          </td>
          <td class="p-2">{{ blog.title }}</td>
          <td class="p-2">{{ blog.published ? 'Published' : 'Draft' }}</td>
          <td class="p-2">{{ blog.changed | date }}</td>
          <td class="p-2">{{ blog.created | date }}</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td class="p-2"><span class="skeleton w-5/6"></span></td>
          <td class="p-2"><span class="skeleton w-5/6"></span></td>
          <td class="p-2"><span class="skeleton w-4/6"></span></td>
          <td class="p-2"><span class="skeleton w-4/6"></span></td>
          <td class="p-2"><span class="skeleton w-4/6"></span></td>
        </tr>
        <tr>
          <td class="p-2"><span class="skeleton w-4/6"></span></td>
          <td class="p-2"><span class="skeleton w-3/6"></span></td>
          <td class="p-2"><span class="skeleton w-1/2"></span></td>
          <td class="p-2"><span class="skeleton w-4/6"></span></td>
          <td class="p-2"><span class="skeleton w-4/6"></span></td>
        </tr>
      </tbody>

    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
export default {
  layout: 'admin',
  name: 'admin',
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
  filters: {
    date: (value) => {
      if (!value) return
      return moment.unix(value.seconds).format('Do MMM YY, h:mma')
    }
  },
  computed: {
    // to avoid using this.$store.state 
    ...mapState([
      'message',
      'loading',
    ])
  },
  async mounted () {
    // check if local instance of state is already populated
    // if not, fetch them from firebase
    // if (JSON.stringify(this.blogs) !== '{}') return

    this.$store.commit('SET_LOADING', true)
    try {
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
      this.$store.commit('SET_LOADING', false)
    } catch(e){
      this.$store.commit('SET_LOADING', false)
      this.$store.commit('SET_MESSAGE', e.message)
    }
  }
}
</script>

<style>

thead > tr > th,
tbody > tr > td {
  border: 1px solid #a2a2a2;
}

.skeleton {
  @apply inline-block h-6 rounded bg-gray-500;
}
</style>
