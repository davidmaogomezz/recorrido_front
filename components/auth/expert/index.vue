<template>
  <div>
    <h1>Component expert</h1>
    <p>Weeks {{JSON.stringify(weeks)}}</p>
    <p>Contracts {{JSON.stringify(contracts)}}</p>
  </div>
</template>

<script>
  export default {
    layout: 'auth',
    middleware: ['protect'],
    methods: {
      fillWeeks() {
        const currentWeek = this.$moment().format('W')
        const currentYear = this.$moment().format('YYYY')
        let count = 0
        while (count < 6) {
          let week = parseInt(currentWeek) + count
          let elementDropdown = {
            text: `Semana ${week} ${currentYear}`,
            week: week,
            year: currentYear
          }
          this.weeks.push(elementDropdown)
          count++
        }
      },
      async getContracts() {
        const response = await this.$axios.$get('contracts')
        this.contracts = response.contracts
      }
    },
    data() {
      return {
        weeks: [],
        contracts: []
      }
    },
    mounted() {
      this.fillWeeks()
      this.getContracts()
    }
  }
</script>

<style scoped>

</style>