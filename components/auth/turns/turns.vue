<template>
  <div class="container">
    <template v-if="Object.keys(turns).length > 0">
      <b-card class="card-form" :title="formatRangeTime()">
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
      },
      formatRangeTime: function () {
        let dateStart = new Date(rangeTimeSplit[0].split(' ')[0])
        let dateEnd = new Date(rangeTimeSplit[1].split(' ')[0])
        dateStart.setHours( dateStart.getHours() + 5 );
        dateEnd.setHours( dateEnd.getHours() + 5 );
        return `${moment(dateStart).format('dddd DD MMMM')} - ${moment(dateEnd).format('dddd DD MMMM')}`
      }
    },
    computed: {
      turns() {
        return this.$store.getters['turns/getTurns']
      },
      rangeTime() {
        return this.$store.getters['turns/getRangeTime']
      },
      role() {
        return this.$store.getters['role/getRole']
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