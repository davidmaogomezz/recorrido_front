export const state = () => ({
  role: null
})

export const mutations = {
  SET_ROLE (state, role) {
    state.role = role
  }
}

export const actions = {
  setRole({commit}, role) {
    commit('SET_ROLE', role)
  }
}

export const getters = {
  getRole(state) {
    return state.role
  }
}