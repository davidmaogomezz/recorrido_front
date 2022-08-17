<template>
  <div class="container">
    <template v-if="Object.keys(turns).length > 0">
      <div class="day" v-for="day in Object.keys(turns)">
        <table role="table" aria-busy="false" aria-colcount="2" class="table b-table table-turns">
          <thead role="rowgroup" class="">
            <tr role="row">
              <th class="cell-center column-turns-edit">{{ day | formatDate }}</th>
              <th class="cell-center" role="columnheader" scope="col" aria-colindex="1" v-for="expert in experts">
                {{expert.first_name}}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr role="row" v-for="turn in turns[day]">
              <td class="cell-center">{{turn.date_hour | formatDateHour }}</td>
              <td class="cell-center" v-for="expert in experts">

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
        return `${moment(value).format('LT')} - ${moment(value).format('LT')}`
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