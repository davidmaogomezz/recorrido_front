<template>
  <div>
    <SignUp />
  </div>
</template>

<script>
  import SignUp from './../components/auth/SignUp.vue'
  export default {
    middleware: ['unprotect'],
    methods: {
      goToPage(page) {
        this.$router.push(page)
      }
    },
    components: {
      SignUp,
    },
  }
</script>

<style scoped>

</style>