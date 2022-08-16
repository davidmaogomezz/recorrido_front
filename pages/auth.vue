<template>
  <div>
    <h1>Content auth</h1>
  </div>
</template>

<script>
  export default {
    layout: 'auth',
    middleware: ['protect'],
  }
</script>

<style scoped>

</style>