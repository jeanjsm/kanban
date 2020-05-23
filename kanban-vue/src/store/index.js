import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import app from './modules/app';
import auth from './modules/auth';
import user from './modules/user';

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  plugins: [createPersistedState()],
  
  modules: {
    app,
    auth,
    user
  },
  strict: debug
})
