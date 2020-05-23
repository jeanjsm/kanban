function state() {
  return {
    user: {},
    token: "",
  };
}

const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setToken(state, token) {
    state.token = token;
  },
};

const actions = {
  setUser({ commit }, user) {
    commit("setUser", user);
  },
  setToken({ commit }, token) {
    commit("setToken", token);
  },
};

const getters = {
  getUser: (state) => {
    return state.user;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
