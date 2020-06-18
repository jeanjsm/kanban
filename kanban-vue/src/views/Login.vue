<template>
  <v-layout fill-height align-center>
    <div class="login ma-auto">
      <v-card width="500">
        <v-card-title class="">
          <h2>Kanban Login</h2>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="user.email"
            type="email"
            outlined
            label="Login"
            placeholder="Enter email"
            dense
          ></v-text-field>
          <v-text-field
            v-model="user.password"
            outlined
            label="Password"
            placeholder="Enter password"
            type="password"
            dense
          ></v-text-field>
          <v-btn color="primary" block @click="authenticate">Login</v-btn>
          <v-divider class="my-4"></v-divider>
          <v-btn disabled text small>Forget Login</v-btn>
        </v-card-text>
      </v-card>
    </div>
  </v-layout>
</template>

<script>
import AuthService from "../services/auth.service";
export default {
  data() {
    return {
      user: {
        login: "",
        password: ""
      }
    };
  },
  mounted() {
    this.$store.commit("user/clear");
    this.$store.commit("auth/clear");
  },
  methods: {
    async authenticate() {
      await AuthService.authenticate(this.user)
        .then(response => {
          this.$store.dispatch("auth/login", response.data);
          this.$store.dispatch("user/setUser", response.data.user);
          this.$store.dispatch("user/setToken", response.data.token);
          this.$router.push({ name: "app.home" });
        })
        .catch(err => {
          this.$notification.showError(err.response.data.error);
        });
    }
  }
};
</script>

<style scoped>
.login-container {
}
.login {
}
</style>
