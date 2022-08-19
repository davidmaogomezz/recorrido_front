export const state = () => ({
  turns: [],
  range_time: ''
})

export const mutations = {
  STORE_TURNS (state, turns) {
    state.turns = turns
  },
  UPDATE_TURNS (state, turn) {
    const date_hour_split = turn.date_hour.split('-')
    const day = date_hour_split[2].split('T')[0]
    const date = `${date_hour_split[0]}-${date_hour_split[1]}-${day}`
    let turns = state.turns[date]
    if (turns) {
      turns = turns.filter(t => t.id !== turn.id)
      turns.push(turn)
      turns.sort((a, b) => a.id - b.id)
      state.turns[date] = turns
    }
  },
  SET_RANGE_TIME (state, range_time) {
    state.range_time = range_time
  }
}

export const actions = {
  storeTurns({commit}, turns) {
    commit('STORE_TURNS', turns)
  },
  updateTurn({commit}, turn) {
    commit('UPDATE_TURNS', turn)
  },
  setRangeTime({commit}, range_time) {
    commit('SET_RANGE_TIME', range_time)
  }
}

export const getters = {
  getTurns(state) {
    return state.turns
  },
  getRangeTime(state) {
    return state.range_time
  }
}