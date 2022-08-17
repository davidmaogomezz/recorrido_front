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
                <b-checkbox :disabled="disbledForDate(day)" v-model="selected" :label="`check-box-${expert.id}`" :value="{ turn_id: turn.id, user_id: expert.id}"></b-checkbox>
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
    data() {
      return {
        selected: []
      }
    },
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
      },
      handlerDifference(newValue, oldValue) {
        if (newValue.length > oldValue.length) { // add
          console.log(`add ${JSON.stringify(newValue.filter(x => !oldValue.includes(x)))}`)
          // TO DO request edit availability
        } else { // remove
          console.log(`remove ${JSON.stringify(oldValue.filter(x => !newValue.includes(x)))}`)
          // TO DO request edit availability
        }
      },
      disbledForDate(day) {
        let day_turns = new Date(day.split('/').reverse().join().replace(/,/g, '/'))
        let current_day = new Date()
        day_turns = moment(day_turns).format('LL')
        current_day = moment(current_day).format('LL')
        if (day_turns < current_day) console.log(`${day_turns} < ${current_day} - ${day_turns < current_day}`);
        return day_turns < current_day
      }
    },
    mounted () {
      this.getExperts();
    },
    watch: {
      selected: {
        deep: true,
        handler: function (newValue, oldValue) {
          this.handlerDifference(newValue, oldValue)
        }
      }
    }

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