<template>
  <div class="Auth">
    <div class="Register" v-show="register">
    <button type="button" @click="loginToggle">Login</button><br><br> 
     <form class="form-inline create-user-form" @submit.prevent="createUser">
      <div class="form-group">
        <input type="text" class="form-control" v-model="name" name="name" placeholder="Name" />
        <input type="text" class="form-control" v-model="password" name="password" placeholder="Password" />
        <input type="text" class="form-control" v-model="email" name="email" placeholder="stuff@email.com" />
        <button type="submit" class="btn btn-primary" id="create-user-button">Create New User</button>
      </div>
    </form>
  </div>
  <div class="Login" v-show="login">
    <button type="button" @click="registerToggle">Register New User</button><br><br>  
    <form class="form-inline login-form" @submit.prevent="loginUser">
      <div class="form-group">
        <input type="text" class="form-control" v-model="email" name="email" placeholder="email@email.com" />
        <input type="text" class="form-control" v-model="password" name="password" placeholder="Password" />
        <button type="submit" class="btn btn-primary" id="login-user-button">Login</button>
      </div>
    </form>
  </div>


</div>
</template>


<script>
  export default {
    name: 'component',
    data() {
      return {
        name: '',
        email: '',
        password: '',
        login: true,
        register: false
      }
    },
    computed: {},
    methods: {
      createUser() {
        this.$root.$data.store.actions.createUser(this.email, this.name, this.password)
      },
      loginUser() {
        this.$root.$data.store.actions.loginUser(this.email, this.password)
      },
      loginToggle(){
        this.login = true;
        this.register = false
      },
      registerToggle(){
        this.login = false;
        this.register = true
      }
    },
    components: {}
  }

</script>


<style scoped>

</style>