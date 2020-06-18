import Vue from "vue";

const notification = {
  showSuccess(message) {
    Vue.toasted.success(message, {
      icon: "mdi-check-circle"
    });
  },
  showError(message) {
    Vue.toasted.error(message, {
      icon: "mdi-alert-circle"
    });
  }
};

Vue.prototype.$notification = notification;

export default notification;
