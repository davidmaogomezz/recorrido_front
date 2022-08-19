<template>
  <div>
    <component :is="role" />
  </div>
</template>

<script>
  import admin from "~/components/auth/admin/index.vue"
  import expert from "~/components/auth/expert/index.vue"
  import client from "~/components/auth/client/index.vue"
  export default {
    layout: 'auth',
    middleware: ['protect'],
    data() {
      return {
        role: ''
      }
    },
    mounted() {
      this.role = this.$cookies.get('role')
      this.$store.dispatch('role/setRole', this.role)
    },
    components: {
      admin,
      expert,
      client
    }
  }
</script>

<style scoped>

</style>