export const state = () => ({
  experts: []
})

export const mutations = {
  STORE_EXPERTS (state, experts) {
    state.experts = experts
  }
}

export const actions = {
  storeExperts({commit}, experts) {
    commit('STORE_EXPERTS', experts)
  }
}

export const getters = {
  getExperts(state) {
    return state.experts
  }
}