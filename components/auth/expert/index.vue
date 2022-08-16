<template>
  <div>
    <h1>Component expert</h1>
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