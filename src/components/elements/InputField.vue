<template>
    <div class="flex flex-col mb-4">
        <label :for="name" class="label">{{ label }}</label>
        <input :id="name" :ref="name" v-model="model" type="text" :placeholder="label" class="input">
    </div>
</template>

<script>
export default {
    name: 'inputField',
    props: {
        label: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        model: {
            type: String,
            required: true
        },
    }
}
</script>

<style>
.label {
    @apply block w-full p-1;
    @apply text-sm uppercase font-bold;
}
.input {
    @apply block w-full p-2 ; 
    @apply border rounded border-gray-500 border-opacity-25;
    @apply bg-gray-600 bg-opacity-10;
}
</style>