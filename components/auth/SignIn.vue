<template>
  <div class="container sign-in">
    <h1 class="title-sign-in">Iniciar sesión</h1>
    <label for="email">Email</label>
    <b-form-input class="input-auth" v-model="login.email" type="email"/>
    <label for="password">Password</label>
    <b-form-input class="input-auth" v-model="login.password" type="password"/>
    <b-button @click.prevent="userLogin" block variant="outline-primary">Ingresar</b-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        login: {
          email: 'admin@example.com',
          password: 'password'
        }
      }
    },
    methods: {
      async userLogin() {
        try {
          const request = await this.$axios.post('users/sign_in', { user: this.login })
          if (request.status == 200) {
            const headers = request.headers
            this.$cookies.set('auth', true, {})
            this.$cookies.set('accessToken', headers['access-token'], {})
            this.$cookies.set('client', headers['client'], {})
            this.$cookies.set('uid', headers['uid'], {})
            this.$cookies.set('role', request.data.user.role, {})
            this.$router.push('/auth')
          }
        } catch (error) {
          console.log(`error -> ${error}`)
        }
      }
    },
  }
</script>

<style scoped>
  .sign-in {
    margin-top: 20px;
  }

  .input-auth {
    margin-bottom: 10px;
  }
  .title-sign-in {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>