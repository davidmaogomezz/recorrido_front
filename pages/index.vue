<template>
  <div class="">
    <descriptioRolesVue />
    <onLine />
  </div>
</template>

<script>
import descriptioRolesVue from '../components/descriptioRoles.vue';
import onLine from '~/components/onLine.vue'

export default {
  layout: 'public',
  middleware: ['unprotect'],
  components: {
    descriptioRolesVue,
    onLine
  },
}
</script>
