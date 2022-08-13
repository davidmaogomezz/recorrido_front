<template>
  <div class="container sign-up">
    <h1 class="title-sign-up">Registrarme</h1>
    <p v-if="message != ''">{{ message }}</p>
    <label for="first_name">First name</label>
    <b-form-input name="first_name" class="input-auth" v-model="register.first_name" type="text" />
    <label for="last_name">last_name</label>
    <b-form-input name="last_name" class="input-auth" v-model="register.last_name" type="text" />
    <label for="user_name">UserName</label>
    <b-form-input name="user_name" class="input-auth" v-model="register.username" type="text" />
    <label for="email">Email</label>
    <b-form-input name="email" class="input-auth" v-model="register.email" type="email" />
    <label for="role">Rol:</label>
    <b-form-select v-model="register.role" :options="optionsRole"></b-form-select>
    <label for="password">Password</label>
    <b-form-input name="password" class="input-auth" v-model="register.password" type="password" />
    <b-button @click.prevent="userRegister" block variant="outline-primary">Ingresar</b-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        register: {
          first_name: 'David',
          last_name: 'Gómez',
          username: 'davidmao',
          email: 'admin@example.com',
          password: 'password',
          role: 0
        },
        message: '',
        optionsRole: [
          {
            text: 'Administrador',
            value: 0
          },
          {
            text: 'Experto',
            value: 1
          },
          {
            text: 'Cliente',
            value: 2
          }
        ]
      }
    },
    methods: {
      async userRegister() {
        try {
          const request = await this.$axios.post('users', { user: this.register })
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
          this.message = error
        }
      }
    },
  }
</script>

<style scoped>
  .sign-up {
    margin-top: 20px;
  }

  .input-auth {
    margin-bottom: 10px;
  }
  .title-sign-up {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>