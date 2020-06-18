<template>
  <div>
    <Header />
    <v-content class="workboard">
      <v-container>
        <transition name="slide" mode="out-in">
          <router-view></router-view>
        </transition>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
    <loading></loading>
  </div>
</template>

<script>
import Header from "../components/Header";
import Loading from "../components/Loading";
export default {
  components: {
    Header,
    Loading
  }
};
</script>

<style scoped>
.workboard {
  height: 100vh;
}
@keyframes slide-in {
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateY(0px);
    opacity: 1;
  }
}
@keyframes slide-out {
  from {
    transform: translateY(0px);
    opacity: 1;
  }
  to {
    transform: translateY(-30px);
    opacity: 0;
  }
}

.slide-enter-actice {
  animation: slide-in .3s ease;
}

.slide-leave-active {
  animation: slide-out .3s ease;
}
</style>
