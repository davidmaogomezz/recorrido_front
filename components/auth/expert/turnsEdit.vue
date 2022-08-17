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
                <b-checkbox :disabled="disbledForDate(turn.date_hour)" v-model="selected" :value="{ id: turn.id, user_id: expert.id }"></b-checkbox>
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
        let startHour = parseInt(value.split('T')[1].split(':')[0])
        return `${startHour}:00 - ${startHour + 1}:00`
      }
    },
    methods: {
      async getExperts() {
        const request = await this.$axios.get('users', { params: { role: 'expert' } })
        if (request.status == 200) this.$store.dispatch('experts/storeExperts', request.data.users)
      },
      async handlerDifference(newValue, oldValue) {
        let params = null
        let makeRequest = false
        if (newValue.length > oldValue.length) {
          params = newValue.filter(x => !oldValue.includes(x))[0]
          if (params) {
            params['operation'] = 'add'
            makeRequest = true
          }
        } else {
          params = oldValue.filter(x => !newValue.includes(x))[0]
          if (params) {
            params['operation'] = 'remove'
            makeRequest = true
          }
        }
        if (makeRequest) {
          const request = await this.$axios.put(`turns/${params.id}`, params)
          if (request.status == 200) {
            const turn = request.data.turn
            this.$store.dispatch('turns/updateTurn', turn)
          }
        }
      },
      disbledForDate(date_hour) {
        let day_turns = new Date(date_hour)
        day_turns.setHours( day_turns.getHours() + 5 );
        let current_day = new Date()
        return (current_day - day_turns) > 900000
      },
      setCheck(turn, expert) {
        if (turn.availables) {
          const arrayAvailables = turn.availables.split(",")
          console.log(arrayAvailables.includes(expert.id.toString()));
          return arrayAvailables.includes(expert.id.toString())
        } else {
          return false
        }
      },
      populateSelectected() {
        for (const day in this.turns) {
          for (const turn of this.turns[day]) {
            if (turn.availables) {
              const arrayAvailables = turn.availables.split(",")
              for (const expert of this.experts) {
                if (arrayAvailables.includes(expert.id.toString())) {
                  this.selected.push({ id: turn.id, user_id: expert.id  })
                }
              }
            }
          }
        }
      }
    },
    mounted () {
      this.getExperts();
      this.populateSelectected()
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