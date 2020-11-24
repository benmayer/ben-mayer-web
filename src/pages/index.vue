<template>
  <div class="flex container items-center mx-auto text-center">
      <Header :title="title" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Ben Mayer'
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
