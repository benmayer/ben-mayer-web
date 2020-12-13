<template>
    <div class="flex flex-col mb-4">
        <label :for="name" class="label">{{ label }}</label>
        <textarea 
            class="input"
            type="text"
            :id="name" 
            :ref="name" 
            :placeholder="label"
            :value="value"
            :disabled="disabled"
            @input="inputEvent"
            @change="onChange"  

        />
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
        value: {
            type: String,
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
}
</script>
<style >

</style>