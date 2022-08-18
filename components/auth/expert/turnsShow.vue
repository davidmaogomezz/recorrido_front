<template>
  <div class="container">
    <template v-if="Object.keys(turns).length > 0">
      <div class="day" v-for="day in Object.keys(turns)">
        <table role="table" aria-busy="false" aria-colcount="2" class="table b-table table-turns">
          <thead role="rowgroup" class="">
            <tr role="row">
              <th class="cell-center column-turns-edit">{{ day | formatDate }}</th>
              <th>Experto</th>
            </tr>
          </thead>
          <tbody>
            <tr role="row" v-for="turn in turns[day]">
              <td class="cell-center">{{turn.date_hour | formatDateHour }}</td>
              <td>
                <template v-if="turn.user_name">
                  {{turn.user_name}}
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template>

<script>
  import moment from 'moment'
  import 'moment/locale/es'
  moment.locale('es')
  export default {
    layout: 'auth',
    middleware: ['protect'],
    computed: {
      turns() {
        return this.$store.getters['turns/getTurns']
      },
      experts() {
        return this.$store.getters['experts/getExperts']
      }
    },
    filters: {
      formatDate: function (value) {
        const date_split = value.split('/')
        return moment(`${date_split.reverse().join().replace(/,/g, '')}`).format('dddd DD MMMM')
      },
      formatDateHour: function (value) {
        let startHour = parseInt(value.split('T')[1].split(':')[0])
        return `${startHour}:00 - ${startHour + 1}:00`
      }
    },
    methods: {
      async getExperts() {
        const request = await this.$axios.get('users', { params: { role: 'expert' } })
        if (request.status == 200) this.$store.dispatch('experts/storeExperts', request.data.users)
      }
    },
    mounted () {
      this.getExperts();
    },

  }
</script>

<style scoped>
  .card-form, .center-top {
    margin-top: 32px;
  }
  .column-turns-edit {
    word-wrap: break-word;
    max-width: 64px;
  }
  .day {
    margin-bottom: 32px;
  }
  .cell-center {
    text-align: center;
  }
</style>