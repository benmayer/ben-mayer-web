

<template>
    <header class="header sticky top-0 justify-between shadow-sm border-b border-gray-500 border-opacity-25 z-50 ld-mode" >
        <Logo />
        <Nav />
    </header>
</template>

<script>
export default {
    // props: {
    //     title: {        
    //         type: String,
    //         required: true,
    //     }
    // }
}
</script>

<style>
.header {
    @apply flex  items-center w-full p-2;
}
</style>
