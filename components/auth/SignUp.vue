<template>
  <div class="container sign-up">
    <h1 class="title-sign-up">Registrarme</h1>
    <p v-if="message != ''">{{ message }}</p>
    <form @submit.prevent="handleSubmit">
      <label for="first_name">First name</label>
      <b-form-input name="first_name" class="input-auth" v-model="user.first_name" type="text" />
      <div v-if="$v.user.first_name.$invalid">
        <p class="message-error">{{ '* requerido' }}</p>
      </div>
      <label for="last_name">last_name</label>
      <b-form-input name="last_name" class="input-auth" v-model="user.last_name" type="text" />
      <div v-if="$v.user.last_name.$invalid">
        <p class="message-error">{{ '* requerido' }}</p>
      </div>
      <label for="user_name">Username</label>
      <b-form-input name="user_name" class="input-auth" v-model="user.username" type="text" />
      <div v-if="$v.user.username.$invalid">
        <p class="message-error">{{ '* requerido' }}</p>
      </div>
      <label for="email">Email</label>
      <b-form-input name="email" class="input-auth" v-model="user.email" type="email" />
      <div v-if="$v.user.email.$invalid">
        <p class="message-error">{{ 'email requerido' }}</p>
      </div>
      <label for="role">Rol:</label>
      <b-form-select v-model="user.role" :options="optionsRole"></b-form-select>
      <div v-if="$v.user.role.$invalid">
        <p class="message-error">{{ '* requerido' }}</p>
      </div>
      <label for="password">Password</label>
      <b-form-input name="password" class="input-auth" v-model="user.password" type="password" />
      <div v-if="$v.user.password.$invalid">
        <p class="message-error">{{ `Campo password requerido, minimo ${$v.user.password.$params.minLength.min} caracteres` }}</p>
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
          first_name: 'David',
          last_name: 'Gómez',
          username: 'davidmao',
          email: 'admin@mail.com',
          password: '12345678',
          role: 0,
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
    validations: {
      user: {
        first_name: {
          required
        },
        last_name: {
          required
        },
        username: {
          required
        },
        email: {
          required,
          email
        },
        password: {
          required,
          minLength: minLength(8)
        },
        role: {
          required
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
          const request = await this.$axios.post('users', { user: this.user })
          if (request.status == 200) {
            const headers = request.headers
            this.$cookies.set('auth', true, {})
            this.$cookies.set('accessToken', headers['access-token'], {})
            this.$cookies.set('client', headers['client'], {})
            this.$cookies.set('uid', headers['uid'], {})
            this.$cookies.set('role', request.data.user.role, {})
            this.$cookies.set('user_id', request.data.user.id, {})
            this.$cookies.set('user', request.data.user, {})
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

  .message-error {
    font-size: 12px;
    color: red;
  }
</style>