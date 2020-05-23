import Vue from "vue";

const notification = {
  showSuccess(message) {
    Vue.toasted.success(message, {
      icon: "mdi-check-circle"
    });
  }
};

Vue.prototype.$notification = notification;

export default notification;
