<template>
  <v-container>
    <v-content>
      <v-card width="500">
        <v-card-text>
          <h2>Kanban Login</h2>
        </v-card-text>
        <v-card-text>
          <v-text-field
            v-model="user.email"
            type="email"
            outlined
            label="Login"
            clearable
            hide-details
            class="my-2"
          ></v-text-field>
          <v-text-field
            v-model="user.password"
            outlined
            label="Password"
            clearable
            type="password"
            hide-details
            class="my-2"
          ></v-text-field>
          <v-btn color="primary" block large @click="authenticate">Login</v-btn>
        </v-card-text>
      </v-card>
    </v-content>
  </v-container>
</template>

<script>
import AuthService from '../services/auth.service';
export default {
  data() {
    return {
      user: {
        login: "",
        password: "",
      },
    };
  },
  methods: {
    async authenticate() {
      try {
        const { data } = await AuthService.authenticate(this.user);
        this.$store.dispatch('auth/login', data)
        this.$store.dispatch("user/setUser", data.user);
        this.$store.dispatch("user/setToken", data.token);
        this.$router.push({ name: 'app.home' });
      } catch(err) {
        console.log(err);
      }
    }
  }
};
</script>

<style></style>
