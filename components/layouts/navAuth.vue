<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand class='home' @click.prevent="goToPage('/')">Monitoring as a Service</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item @click.prevent="logout()">Salir</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$router.push('/')
      this.$cookies.removeAll()
      this.$store.dispatch('role/setRole', null)
      this.$store.dispatch('contracts/storeContracts', [])
      this.$store.dispatch('turns/storeTurns', [])
      this.$store.dispatch('experts/storeExperts', [])
    }
  },
}
</script>

<style scoped>
  .home {
    cursor: pointer;
  }
</style>