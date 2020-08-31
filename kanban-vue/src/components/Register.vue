<template>
  <ValidationObserver
    ref="obs"
    v-slot="{ invalid, validated }"
  >
    <form autocomplete="off" @submit.prevent="register">
      <v-text-field
        v-model="user.name"
        label="Nome"
        outlined
        dense
        required
      ></v-text-field>
      <ValidationProvider rules="required|email" v-slot="{ errors }">
        <v-text-field
          v-model="user.email"
          label="Email"
          type="email"
          autocomplete="chrome-off"
          :error-messages="errors"
          outlined
          dense
          required
        ></v-text-field>
      </ValidationProvider>
      <ValidationProvider rules="required" v-slot="{ errors }">
        <v-text-field
          v-model="user.password"
          type="password"
          label="Senha"
          :error-messages="errors"
          outlined
          dense
          required
        ></v-text-field>
      </ValidationProvider>
      <ValidationProvider rules="required" v-slot="{ errors }">
        <v-text-field
          v-model="password2nd"
          type="password"
          label="Digite a senha novamente"
          :error-messages="errors"
          outlined
          dense
          required
        ></v-text-field>
      </ValidationProvider>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn type="submit" color="success" class="mx-auto" block :disabled="invalid || !validated">Cadastrar</v-btn>
      </v-card-actions>
    </form>
  </ValidationObserver>
</template>

<script>
import AuthService from "../services/auth.service";
import { ValidationProvider, ValidationObserver } from "vee-validate";
export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      user: {},
      password2nd: ""
    };
  },
  methods: {
    async register() {
      try {
        await AuthService.register(this.user);
        this.$notification.showSuccess("Cadastro concluído com sucesso!");
        this.$router.push("/login");
      } catch (err) {
        this.$notification.showError(err);
      }
    }
  }
};
</script>

<style></style>
