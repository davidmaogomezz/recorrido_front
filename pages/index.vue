<template>
  <div class="">
    <instructions />
    <onLine />
  </div>
</template>

<script>
import instructions from '../components/instructions.vue';
import onLine from '~/components/onLine.vue'

export default {
  layout: 'public',
  middleware: ['unprotect'],
  components: {
    instructions,
    onLine
  },
}
</script>
