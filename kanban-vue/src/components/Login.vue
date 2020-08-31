<template>
  <form autocomplete="off" class="login">
    <v-text-field
      v-model="user.email"
      type="email"
      outlined
      label="Login"
      placeholder="Digite aqui o seu email"
      dense
    ></v-text-field>
    <v-text-field
      v-model="user.password"
      outlined
      label="Password"
      placeholder="Digite a sua senha"
      type="password"
      autocomplete="new-password"
      dense
    ></v-text-field>
    <v-btn color="primary" block @click="authenticate">Login</v-btn>
    <v-divider class="my-4"></v-divider>
    <v-btn disabled text small>Esqueci a senha</v-btn>
  </form>
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
.login {
  margin-top: 10px;
}
</style>
