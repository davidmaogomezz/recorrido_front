<template>
  <div>
    <SignUp />
  </div>
</template>

<script>
  import SignUp from './../components/auth/SignUp.vue'
  export default {
    layout: 'public',
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