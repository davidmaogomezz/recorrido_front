<template>
  <div>
    <formSearchGrids/>
    <turns/>
  </div>
</template>

<script>
  import formSearchGrids from './formSearchGrids.vue'
  import turns from './turns.vue'
  export default {
    layout: 'auth',
    middleware: ['protect'],
    components: {
      formSearchGrids,
      turns
    }
  }
</script>

<style scoped>

</style>