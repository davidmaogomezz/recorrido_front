export const state = () => ({
  contracts: []
})

export const mutations = {
  STORE_CONTRACTS (state, contracts) {
    state.contracts = contracts
  }
}

export const actions = {
  storeContracts({commit}, contracts) {
    commit('STORE_CONTRACTS', contracts)
  }
}

export const getters = {
  getContracts(state) {
    return state.contracts
  }
}