import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Timeago from './plugins/VueTimeago';
import './global.css';

import './filters/initials';

import './commons/utils';
import './plugins';
Vue.prototype.$blogName = 'LogRocket'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  Timeago,
  render: h => h(App)
}).$mount('#app')
