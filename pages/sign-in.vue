<template>
  <div>
    <SignIn />
  </div>
</template>

<script>
  import SignIn from './../components/auth/SignIn.vue'
  export default {
    layout: 'public',
    middleware: ['unprotect'],
    methods: {
      goToPage(page) {
        this.$router.push(page)
      }
    },
    components: {
      SignIn,
    },
  }
</script>

<style scoped>

</style>