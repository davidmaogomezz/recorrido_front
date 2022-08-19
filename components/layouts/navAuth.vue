<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand class='home' @click.prevent="goToPage('/')">Monitoring as a Service, {{greeting}}</b-navbar-brand>
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
  data() {
    return {
      greeting: ''
    }
  },
  methods: {
    logout() {
      this.$router.push('/')
      this.$cookies.removeAll()
      this.$store.dispatch('role/setRole', null)
      this.$store.dispatch('contracts/storeContracts', [])
      this.$store.dispatch('turns/storeTurns', [])
      this.$store.dispatch('experts/storeExperts', [])
    },
    makeWelcomeGreeting() {
      let firstName = this.$cookies.get('first_name')
      let lastName = this.$cookies.get('last_name')
      let role = this.$cookies.get('role')
      this.greeting = `Bienvenido ${firstName} ${lastName} (${role})`
    }
  },
  mounted () {
    this.makeWelcomeGreeting();
  },
}
</script>

<style scoped>
  .home {
    cursor: pointer;
  }
</style>