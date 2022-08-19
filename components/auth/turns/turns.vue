<template>
  <div class="container">
    <template v-if="Object.keys(turns).length > 0">
      <b-card class="card-form" :title="Object.keys(turns) | formatRangeTime">
        <b-button v-if="role !== 'client'" class="button-toggle-turn" variant="success" @click.prevent="toggleComponent()">{{textButton}}</b-button>
        <component :is="component"/>
      </b-card>
    </template>
  </div>
</template>

<script>
  import turnsShow from './turnsShow.vue'
  import turnsEdit from './turnsEdit.vue'
  import moment from 'moment'
  import 'moment/locale/es'
  moment.locale('es')
  export default {
    layout: 'auth',
    middleware: ['protect'],
    data() {
      return {
        component: 'turnsShow',
        textButton: 'Editar disponibilidad'
      }
    },
    methods: {
      toggleComponent() {
        if (this.component == 'turnsShow') {
          this.component = 'turnsEdit'
          this.textButton = 'Ver turnos'
        } else {
          this.component = 'turnsShow'
          this.textButton = 'Editar disponibilidad'
        }
      }
    },
    computed: {
      turns() {
        return this.$store.getters['turns/getTurns']
      },
      role() {
        return this.$store.getters['role/getRole']
      }
    },
    filters: {
      formatRangeTime: function (value) {
        const keys = Object.keys(value)
        const startRange = value[keys[0]]
        const endRange = value[keys[keys.length - 1]]
        if (startRange !== undefined && endRange !== undefined) {
          const startRangeFormat = moment(startRange.split('/').reverse().join().replace(/,/g, '')).format('dddd DD MMMM')
          const endRangeFormat = moment(endRange.split('/').reverse().join().replace(/,/g, '')).format('dddd DD MMMM')
          return `${startRangeFormat} - ${endRangeFormat}`
        } else {
          return
        }
      }
    },
    components: {
      turnsShow,
      turnsEdit
    }
  }
</script>

<style scoped>
  .card-form {
    margin-top: 32px;
  }
  .button-toggle-turn {
    margin-bottom: 16px;
    position: absolute;
    right: 16px;
    top: 16px;
  }
</style>