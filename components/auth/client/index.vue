<template>
  <div>
    <index/>
  </div>
</template>

<script>
  import index from './../turns/index.vue'
  export default {
    layout: 'auth',
    middleware: ['protect'],
    components: {
      index
    }
  }
</script>

<style scoped>

</style>