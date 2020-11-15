

<template>
    <div v-if="message" class="site__message"><span>{{message}}</span><span class="site__message_close" @click="close">x</span></div>
</template>

<script>
export default {
    props: {
        message: {        
            type: String,
            required: false,
        }
    },
    methods: {
        close () { 
            this.$store.commit('SET_MESSAGE', null)
        }
    },
    watch: {
        message (value){
            if (value){
                setTimeout(() => {
                    this.$store.commit('SET_MESSAGE', null)
                }, 2000);
             }
        }
    }
}
</script>
<style>

.site__message {
    position: absolute;
    top: 0;
    left:0;
    width: 100%;
    padding: .5em 1em;
    text-align: center;
    background-color: #3b8070;

    z-index: 1000;
}
.site__message_close {
    display: block;
    position: absolute;
    padding: 1em;
    right: 0;
    top: 0;
    line-height: 0;
    height: 100%;
}
.site__message_close:hover {
    background-color: #35495e50;
    cursor: pointer;
}
</style>
