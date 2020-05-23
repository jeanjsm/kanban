import Vue from 'vue';
import Timeago from 'vue-timeago';

Vue.use(Timeago, {
  name: 'Timeago', // Component name, `Timeago` by default
  locale: 'pt-BR'
});

export default Timeago;