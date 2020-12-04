
<template>
    <div v-if="message" class="site__message-wrapper">
        <div class="site__message flex">
            <span>{{message}}</span><span class="site__message_close" @click="close">x</span>
        </div>
    </div>
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
                }, 3000);
             }
        }
    }
}
</script>
<style>

.site__message-wrapper {
    position: absolute;
    top: 0;
    left:0;
    width: 100%;
    padding: .5em 1em;

    z-index: 1000;
}
.site__message {
    max-width: 600px;
    width: 100%;
    padding:1em;
    margin: auto;
    background-color: #3b8070;
    justify-content: space-between;
    align-items: center;
    border-radius: 3px;
    box-shadow: 0 1px 4px rgba(0,0,0,.12), 0 0 6px rgba(0,0,0,.04);
}
.site__message_close {
    padding: 1em;
    line-height: 0;
    width: 0;
    height: 0;
    text-align: center;
}
.site__message_close:hover {
    cursor: pointer;
}

</style>
