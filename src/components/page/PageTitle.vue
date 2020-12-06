<template>
    <h1 class="title">{{ pageTitle }}</h1>
</template>
<script>
export default {
  name: 'PageTitle',
  props: {
    pageTitle: {
      type: String,
      required: true
    },
  }
}
</script>
<style>
.title {
    @apply block; 
    @apply font-display font-light tracking-wide; 
    color: #35495e;
}
</style>