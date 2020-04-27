<template>
  <v-app >
    <v-app-bar
      app
      color="primary"
      dark
      height="80"
    >
    <h1>Board</h1>
    </v-app-bar>
    <board />
  </v-app>
</template>

<script>
import Board from './views/Board';

export default {
  name: 'App',

  components: {
    Board
  },

  data: () => ({
    //
  }),
};
</script>
