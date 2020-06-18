<template>
  <v-app-bar app height="54" color="primary" elevation="2" dark>
    <v-toolbar-title class="headline text-uppercase mr-4">
      <span>Kanban</span>
      <span class="font-weight-light">Board</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon dark v-on="on">
            <Avatar :user="user" />
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
import Avatar from "../components/Avatar";
export default {
  components: {
    Avatar
  },
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
</style>
