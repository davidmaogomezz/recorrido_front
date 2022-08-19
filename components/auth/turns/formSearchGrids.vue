<template>
  <div class="container">
    <b-card class="card-form" title="Buscar">
      <form @submit.prevent="handleSubmit" inline>
        <b-row>
          <b-col>
            <label for="role">Contracto:</label>
            <b-form-select v-model="search.contract_id" :options="contracts" value-field="id" text-field="name"></b-form-select>
            <div v-if="$v.search.contract_id.$invalid">
              <p class="message-error">{{ '* requerido' }}</p>
            </div>
          </b-col>
          <b-col>
            <label for="role">Semana:</label>
            <b-form-select v-model="search.week" :options="weeks" value-field="week" text-field="text"></b-form-select>
            <div v-if="$v.search.week.$invalid">
              <p class="message-error">{{ '* requerido' }}</p>
            </div>
          </b-col>
          <b-col>
            <b-button class="center-top" block variant="outline-primary" type="submit">Buscar</b-button>
          </b-col>
        </b-row>
      </form>
    </b-card>
  </div>
</template>

<script>
  import { required } from "vuelidate/lib/validators";
  export default {
    data() {
      return {
        search: {
          contract_id: null,
          week: null,
          year: null
        },
        weeks: [],
        userId: null
      }
    },
    validations: {
      search: {
        contract_id: {
          required
        },
        week: {
          required
        }
      }
    },
    computed: {
      contracts() {
        return this.$store.getters['contracts/getContracts']
      },
      role() {
        return this.$store.getters['role/getRole']
      }
    },
    methods: {
      fillWeeks() {
        const currentWeek = this.$moment().format('W')
        this.search.year = this.$moment().format('YYYY')
        let count = 0
        while (count < 6) {
          let week = parseInt(currentWeek) + count
          let elementDropdown = {
            text: `Semana ${week} ${this.search.year}`,
            week: week,
            year: this.search.year
          }
          this.weeks.push(elementDropdown)
          count++
        }
      },
      async getContracts() {
        const response = await this.$axios.$get('contracts')
        const contracts = response.contracts
        if (this.role == 'client') {
          const contractsClient = contracts.filter(contract => contract.requested_by_id == this.userId)
          this.$store.dispatch('contracts/storeContracts', contractsClient)
        } else {
          this.$store.dispatch('contracts/storeContracts', contracts)
        }
      },
      async handleSubmit() {
        this.$v.$touch()
        if (this.$v.$invalid) {
          return
        }
        this.$store.dispatch('turns/storeTurns', [])
        const request = await this.$axios.get('turns', { params: this.search })
        let turns = request.data.turns
        const rangeTime = request.data.range_time
        this.$store.dispatch('turns/setRangeTime', rangeTime)
        const turnsGroupByDateHour = turns.reduce((group, turn) => {
          const key = turn.date_hour.split('T')[0]
          if (!group[key]) {
            group[key] = []
          }
          group[key].push(turn)
          return group
        }, {})
        if (request.status == 200) this.$store.dispatch('turns/storeTurns', turnsGroupByDateHour)
      },
      getUserId() {
        this.userId = this.$cookies.get('user_id')
      }
    },
    mounted() {
      this.fillWeeks()
      this.getContracts()
      this.getUserId()
    }
  }
</script>

<style scoped>
  .message-error {
    font-size: 12px;
    color: red;
  }

  .card-form, .center-top {
    margin-top: 32px;
  }
</style>