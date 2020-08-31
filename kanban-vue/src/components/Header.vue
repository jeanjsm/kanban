<template>
  <v-app-bar app height="54" color="primary" elevation="2" dark>
    <v-toolbar-title class="headline text-uppercase header-title">
      <v-btn icon @click="goHome">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <div>
        <span>Kanban</span>
        <span class="font-weight-light">Board</span>
      </div>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon dark v-on="on">
            <v-avatar size="36" color="teal">
              <span class="white--text">{{ user | initials }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ user.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list>
            <v-list-item @click="showProfile">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Perfil</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Sair</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    user: {
      get() {
        return this.$store.state.user.user;
      }
    }
  },
  methods: {
    goHome() {
      this.$router.push("/");
    },
    showProfile() {
      this.$router.push("/profile/");
    },
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    }
  }
};
</script>

<style>
.header {
  display: flex;
  flex: 1;
  justify-content: space-between;
}
.header-title {
  display: flex;
  align-items: center;
}
</style>
