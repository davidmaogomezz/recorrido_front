<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand class='home' @click.prevent="goToPage('/')">Monitoring as a Service</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item v-for="item in itemsNavigation" :key="item.id" @click.prevent="goToPage(item.href)">{{ item.text }}</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  data() {
    return {
      itemsNavigation: [
        {
          id: 1,
          text: 'Iniciar sesión',
          href: '/sign-in'
        },
        {
          id: 2,
          text: 'Registrarme',
          href: '/sign-up'
        }
      ]
    }
  },
  methods: {
    goToPage(page) {
      this.$router.push(page)
    }
  }
}
</script>

<style scoped>
  .home {
    cursor: pointer;
  }
</style>