<template>
  <div>
    <h1>Content auth</h1>
    <button @click.prevent="logout">Salir</button>
  </div>
</template>

<script>
  export default {
    middleware: ['protect'],
    methods: {
      logout() {
        this.$router.push('/')
        this.$cookies.removeAll()
      }
    },
  }
</script>

<style scoped>

</style>