<template>
  <div>
    <h1>Component expert</h1>
    <p>Weeks {{JSON.stringify(weeks)}}</p>
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
            value: week
          }
          this.weeks.push(elementDropdown)
          count++
        }
      }
    },
    data() {
      return {
        weeks: []
      }
    },
    mounted() {
      this.fillWeeks()
    }
  }
</script>

<style scoped>

</style>