<template>
  <div class="">
    <v-app-bar height="64" color="primary" dark elevation="2" app>
      <div class="header">
        <h1>Dashboard</h1>
        <div>
          <v-btn icon @click="logout">
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </div>
      </div>
    </v-app-bar>
    <v-content class="workboard">
      <router-view></router-view>
    </v-content>
    <v-footer app></v-footer>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
.workboard {
  height: 100vh;
}
.header {
  display: flex;
  flex: 1;
  justify-content: space-between;
}
</style>
