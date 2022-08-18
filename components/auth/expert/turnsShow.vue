<template>
  <div class="container">
    <template v-if="Object.keys(turns).length > 0">
      <table role="table" aria-colcount="2" class="table b-table table-count">
        <tbody>
          <tr role="row" v-for="item in assignments">
            <th class="colum-expert" :bgcolor="item.expert.color">
              {{item.expert.first_name}} {{item.expert.last_name}}
            </th>
            <th class="colum-count">
              {{item.count}}
            </th>
          </tr>
          <tr>
            <th>Sin asignar</th>
            <th>{{unassigned}}</th>
          </tr>
        </tbody>
      </table>
      <div class="day" v-for="day in Object.keys(turns)">
        <table role="table" aria-busy="false" aria-colcount="2" class="table b-table table-turns">
          <thead role="rowgroup" class="">
            <tr bgcolor="#F6F4C0" role="row">
              <th class="cell-left column-turns-edit">{{ day | formatDate }}</th>
              <th>Experto</th>
            </tr>
          </thead>
          <tbody>
            <tr role="row" v-for="turn in turns[day]">
              <template v-if="turn.user_name">
                <td bgcolor="#A3D963" class="cell-left">{{turn.date_hour | formatDateHour }}</td>
                <td :bgcolor="turn.user_color" v-if="turn.user_id != null">
                  <template>
                    {{turn.user_name}}
                  </template>
                </td>
              </template>
              <template v-else>
                <td bgcolor="#DEA49C" class="cell-left">{{turn.date_hour | formatDateHour }}</td>
                <td class="cell-warning">
                  <img src="https://res.cloudinary.com/job-run/image/upload/v1660831329/warning_xatxes.png" alt="warning">
                </td>
              </template>
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
    data () {
      return {
        unassigned: 0,
        assignments: [],
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
      counterAssignments() {
        console.log(`experts -> ${this.experts}`);
        console.log(`turns -> ${Object.keys(this.turns)}`);
        if (this.experts.length > 0 && Object.keys(this.turns).length > 0) {
          this.experts.forEach(expert => {
            let objectAssignment = { expert: expert, count: 0 }
            let count = 0
            Object.keys(this.turns).forEach(date => {
              this.turns[date].forEach(turn => {
                if (turn.user_id == expert.id) {
                  count++
                } else if (turn.user_id == null) {
                  this.unassigned++
                }
              })
            })
            objectAssignment.count = count
            this.assignments.push(objectAssignment)
          })
        }
      },
    },
    watch: {
      experts() {
        this.counterAssignments()
      },
      turns() {
        this.counterAssignments()
      }
    },
    mounted () {
      this.getExperts()
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
  .cell-left {
    text-align: left;
  }
  .cell-warning {
    text-align: center;
  }
  .table-count {
    margin-top: 32px;
    margin-bottom: 32px;
    max-width: 512px
  }
  .colum-expert {
    max-width: 16px;
  }
  .colum-count {
    max-width: 8px;
  }
</style>