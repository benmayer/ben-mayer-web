<template>
    <div class="flex flex-col mb-4">
        <label :for="name" class="label">{{ label }}</label>
        <input 
            class="input"
            type="text"
            :id="name"
            :ref="name" 
            :placeholder="label"
            :value="value"
            :disabled="disabled"
            @input="inputEvent"
            @change="onChange"
        >
    </div>
</template>

<script>
export default {
    name: 'inputField',
    props: {
        label: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        value: {
            type: String,
            required: false,
        },
        input: {
            type: Function,
            required: false,
        },
        disabled: {
            type: Boolean,
            required: false,
        },
    },
    methods: {
        inputEvent (e) {
            this.$emit('input', e.target.value)
        },
        onChange (e) {
            this.$emit('change', this.value, e)
        },
    },
    data () {
        return {

        }
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