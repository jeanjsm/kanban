<template>
  <v-layout fill-height align-center>
    <div class="login ma-auto">
      <v-card width="500">
        <v-card-title class="">
          <h2>Quadros</h2>
        </v-card-title>
        <v-card-text>
          <v-tabs fixed-tabs>
            <v-tab>Login</v-tab>
            <v-tab>Cadastro</v-tab>

            <v-tab-item class="mt-6">
              <login></login>
            </v-tab-item>
            <v-tab-item class="mt-6">
              <register></register>
            </v-tab-item>
          </v-tabs>
        </v-card-text>
      </v-card>
    </div>
  </v-layout>
</template>

<script>
export default {
  components: {
    Login: () => import("../components/Login"),
    Register: () => import("../components/Register")
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.tabs {
}
</style>
