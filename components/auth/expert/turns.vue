<template>
  <div class="container">
    <template v-if="Object.keys(turns).length > 0">
      <b-card class="card-form" :title="Object.keys(turns) | formatRangeTime">
        <div class="day" v-for="day in Object.keys(turns)">
          <div class="day-name">
            <p>
              {{ day | formatDate }}
            </p>
          </div>
          <table role="table" aria-busy="false" aria-colcount="2" class="table b-table table-striped table-hover table-turns">
            <tbody>
              <tr role="row" v-for="turn in turns[day]">
                {{turn.date_hour | formatDateHour }}
              </tr>
            </tbody>
          </table>
        </div>
      </b-card>
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
        return moment(value).format('LT')
      },
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
</style>