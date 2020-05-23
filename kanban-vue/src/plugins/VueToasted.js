import Vue from 'vue';
import Toasted from 'vue-toasted'

Vue.use(Toasted, {
  position: "bottom-center",
  duration: 5000,
  keepOnHover: true,
  iconPack: "mdi",
  fullWidth: true,
  closeOnSwipe: true
});
