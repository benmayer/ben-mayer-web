<template>
  <div class="flex w-full m-auto py-20">
    <form name="register" class="login__form" @submit.prevent>
      <input placeholder="name" v-model="user.displayName" class="login__form-input input__name"/> 
      <input placeholder="email" v-model="user.email" class="login__form-input input__email"/> 
      <input type="password" placeholder="password" v-model="user.password" class="login__form-input input__password"/>
      <button class="button--green login__form-button" type="submit" @click="createUser">Create User</button>
    </form>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data () {
    return {
      user: {
        displayName: null,
        email: null,
        password: null
      },
    }
  },
  methods: {
    async createUser(e) {
      try {
        await this.$fire.auth.createUserWithEmailAndPassword(
          this.user.email,
          this.user.password
        ).then( ({user}) => {
          if(user){
            user.updateProfile({
              displayName: this.user.displayName
            })
          }
          this.user.displayName=""
          this.user.email=""
          this.user.password=""
          this.$store.commit('SET_MESSAGE', `User ${user.email} created`)
        }) 
      } catch (e) {
        this.$store.commit('SET_MESSAGE', e.message)
        console.error(e)
      }
    }
  }
}
</script>

<style>
.login__form{ 
  @apply flex flex-col;
  @apply w-full max-w-xs m-auto ;
  @apply p-2;
  background: #a7a7a71c;
}
.login__form-input{
  padding: 1em;
  margin-bottom: .5em;
  background: white;
  border: 1px solid #efefef;
  @apply text-gray-700;
}
.login__form-button{
    margin-top: 1em;
    background: white;
    font-weight: 600;
}
</style>
