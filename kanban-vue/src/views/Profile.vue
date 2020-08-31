<template>
  <v-container>
    <v-card>
      <v-card-title>
        <span class="title">Seus dados</span>
      </v-card-title>
      <v-card-text>
        <div class="profile-header">
          <v-avatar class="mb-4" height="64" width="64">
            <v-img
              src="https://avatars3.githubusercontent.com/u/8325834?s=460&v=4"
            />
          </v-avatar>
          <v-text-field
            v-model="profile.email"
            outlined
            label="Email"
            placeholder="Digite seu email"
            disabled
            hide-details
            dense
          ></v-text-field>
        </div>
        <v-text-field
          v-model="profile.name"
          outlined
          label="Nome"
          placeholder="Digite seu nome"
        ></v-text-field>
        <v-text-field
          v-model="profile.username"
          outlined
          label="Username"
          placeholder="Digite seu username"
        ></v-text-field>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="success" large @click="updateProfile"
          >Salvar Alterações</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import _ from "lodash";
import AuthService from '../services/auth.service';
export default {
  data() {
    return {
      profile: {}
    };
  },
  computed: {
    user: {
      get() {
        return this.$store.getters["user/getUser"];
      }
    }
  },
  mounted() {
    this.profile = _.clone(this.user);
  },
  methods: {
    async updateProfile() {
      await AuthService.updateUser(this.profile);
      this.$notification.showSuccess('Alterado com sucesso!');
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.profile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
