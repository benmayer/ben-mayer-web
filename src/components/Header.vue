

<template>
    <header class="site__header mx-auto">
        <Logo />
        <h1 class="site__title">{{ title }}</h1>
        <Nav />
    </header>
</template>

<script>
export default {
    props: {
        title: {        
            type: String,
            required: true,
        }
    }
}
</script>

<style>

.site__nav {
    width: 100%;
    padding:1em;
}
</style>
