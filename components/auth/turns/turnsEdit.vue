<template>
  <div class="container">
    <template v-if="Object.keys(turns).length > 0">
      <div class="day" v-for="day in Object.keys(turns)">
        <table role="table" aria-busy="false" aria-colcount="2" class="table b-table table-turns">
          <thead role="rowgroup" class="">
            <tr role="row">
              <th bgcolor="#F6F4C0" class="cell-center column-turns-edit">{{ day | formatDate }}</th>
              <th :bgcolor="expert.color" class="cell-center" role="columnheader" scope="col" aria-colindex="1" v-for="expert in experts">
                {{expert.first_name}}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr role="row" v-for="turn in turns[day]">
              <td :bgcolor="colorHourEdit(turn)" class="cell-center">{{turn.date_hour | formatDateHour }}</td>
              <td :bgcolor="expertSelected(expert, turn)" class="cell-center" v-for="expert in experts">
                <b-checkbox :disabled="disbledForDate(turn) || disabledNotBelong(expert)" v-model="selected" :value="{ id: turn.id, user_id: expert.id }"></b-checkbox>
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
        selected: [],
        userId: null
      }
    },
    computed: {
      turns() {
        return this.$store.getters['turns/getTurns']
      },
      experts() {
        return this.$store.getters['experts/getExperts']
      },
      role() {
        return this.$store.getters['role/getRole']
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
      colorHourEdit(turn) {
        if (turn.availables == null) {
          return '#DEA49C'
        } else {
          return '#A3D963'
        }
      },
      async getExperts() {
        const request = await this.$axios.get('users', { params: { role: 'expert' } })
        if (request.status == 200) this.$store.dispatch('experts/storeExperts', request.data.users)
      },
      async handlerDifference(newValue, oldValue) {
        let params = null
        let operation = null
        if (newValue.length > oldValue.length) {
          params = newValue.filter(x => !oldValue.includes(x))[0]
          if (params) {
            operation = 'add'
          }
        } else {
          params = oldValue.filter(x => !newValue.includes(x))[0]
          console.log(`params ${JSON.stringify(params)}`);
          if (params) {
            operation = 'remove'
          }
        }
        if (operation !== null) {
          const request = await this.$axios.put(`turns/${params.id}`, { object_turn: params, operation: operation})
          if (request.status == 200) {
            const turn = request.data.turn
            this.$store.dispatch('turns/updateTurn', turn)
          }
        }
      },
      disbledForDate(turn) {
        let date_hour = turn.date_hour
        let day_turns = new Date(date_hour)
        day_turns.setHours( day_turns.getHours() + 5 );
        let current_day = new Date()
        return ((current_day - day_turns) > 900000) || (turn.user_id !== null)
      },
      disabledNotBelong(expert) {
        if (this.role == 'admin') {
          return false
        } else {
          return expert.id !== this.userId
        }
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
      },
      expertSelected(expert, turn) {
        if (turn.user_id == expert.id) {
          return '#D3F1AF'
        } else {
          return '#FFFFFF'
        }
      },
      getUserId() {
        this.userId = this.$cookies.get('user_id')
      }
    },
    mounted () {
      this.getExperts()
      this.populateSelectected()
      this.getUserId()
    },
    watch: {
      selected(newValue, oldValue) {
        this.handlerDifference(newValue, oldValue)
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