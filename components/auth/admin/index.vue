<template>
  <div>
    <h1>Component admin</h1>
  </div>
</template>

<script>
  export default {
    layout: 'auth',
    middleware: ['protect'],
    data() {
      return {
      }
    }
  }
</script>

<style scoped>

</style>