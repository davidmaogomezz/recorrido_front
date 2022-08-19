<template>
  <div class="container sign-in">
    <h1 class="title-sign-in">Iniciar sesión</h1>
    <form @submit.prevent="handleSubmit">
      <label for="email">Email</label>
      <b-form-input class="input-auth" v-model="user.email" type="email" />
      <div v-if="$v.user.email.$invalid">
        <p class="message-error">{{ 'email requerido' }}</p>
      </div>
      <label for="password">Password</label>
      <b-form-input class="input-auth" v-model="user.password" type="password" />
      <div v-if="$v.user.password.$invalid">
        <p class="message-error">{{ `password requerido, mínimo ${$v.user.password.$params.minLength.min} caracteres` }}</p>
      </div>
      <b-button block variant="outline-primary" type="submit">Ingresar</b-button>
    </form>
  </div>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      user: {
        email: 'admin@mail.com',
        password: '12345678'
      },
      submitted: false
    }
  },
  validations: {
    user: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(8)
      }
    }
  },
  methods: {
    async handleSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      try {
        const request = await this.$axios.post('users/sign_in', { user: this.user })
        if (request.status == 200) {
          const headers = request.headers
          this.$cookies.set('auth', true, {})
          this.$cookies.set('accessToken', headers['access-token'], {})
          this.$cookies.set('client', headers['client'], {})
          this.$cookies.set('uid', headers['uid'], {})
          this.$cookies.set('role', request.data.user.role, {})
          this.$cookies.set('user_id', request.data.user.id, {})
          this.$cookies.set('first_name', request.data.user.first_name, {})
          this.$cookies.set('last_name', request.data.user.last_name, {})
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

.message-error {
  font-size: 12px;
  color: red;
}
</style>