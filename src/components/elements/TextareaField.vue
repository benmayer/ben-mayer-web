<template>
    <div class="flex flex-col mb-4">
        <label :for="name" class="label">{{ label }}</label>
        <textarea :id="name" :ref="name" v-model="model" type="text" :placeholder="label" class="input" />
    </div>
</template>

<script>
export default {
    name: 'textareaField',
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
<style >

</style>