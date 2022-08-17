export const state = () => ({
  turns: []
})

export const mutations = {
  STORE_TURNS (state, turns) {
    state.turns = turns
  }
}

export const actions = {
  storeTurns({commit}, turns) {
    commit('STORE_TURNS', turns)
  }
}

export const getters = {
  getTurns(state) {
    return state.turns
  }
}