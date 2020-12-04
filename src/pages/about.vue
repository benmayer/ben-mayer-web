<template>
  <div class="flex m-auto">
    <h1 class="site__title">{{ title }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'About'
    }
  },
  head() {
    return {
      title: this.title,
    }
  }
}
</script>

<style>

.links {
  padding-top: 15px;
}
</style>
