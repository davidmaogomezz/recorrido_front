<template>
  <div>
    <formSearchGrids/>
  </div>
</template>

<script>
  import formSearchGrids from './formSearchGrids.vue'
  export default {
    layout: 'auth',
    middleware: ['protect'],
    components: {
      formSearchGrids
    }
  }
</script>

<style scoped>

</style>