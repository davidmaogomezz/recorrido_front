<template>
  <div>
    <navAuth/>
    <Nuxt/>
  </div>
</template>

<script>
import navAuth from '../components/layouts/navAuth.vue';
export default {
  components: {
    navAuth,
  }
}
</script>

<style  scoped>
</style>