<template>
  <div class="dashboard">
    <v-container class="grey lighten-5">
      <v-row class="mb-6">
        <v-col v-for="board in boards" :key="board._id" :md="3" :sm="6">
          <v-card class="pa-6 board" @click="enter(board)">{{
            board.title
          }}</v-card>
        </v-col>
        <v-col :md="3" :sm="6">
          <v-card
            class="pa-6 board"
            @click="showCreateBoard = !showCreateBoard"
          >
            <span class="black--text">
              <v-icon color="black" dense>mdi-plus</v-icon>
              Criar novo quadro</span
            >
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="showCreateBoard" width="500">
      <v-card elevation="0">
        <v-card-title></v-card-title>
        <v-card-text>
          <v-text-field
            v-model="board.title"
            label="Título do quadro"
            outlined
            dense
            autofocus
          ></v-text-field>
          <div class="d-flex">
            <v-btn
              class="mr-1"
              color="success"
              elevation="0"
              @click="createBoard"
              >Criar quadro</v-btn
            >
            <v-btn
              class="ml-1"
              text
              elevation="0"
              @click="showCreateBoard = !showCreateBoard"
              >Cancelar</v-btn
            >
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      // boards: [],
      showCreateBoard: false,
      board: {}
    };
  },
  computed: {
    boards: {
      get() {
        return this.$store.getters["app/getBoards"];
      },
      set() {}
    },
    user: {
      get() {
        return this.$store.getters["user/getUser"];
      }
    }
  },
  async mounted() {
    await this.loadBoards();
  },
  methods: {
    async createBoard() {
      try {
        await this.$store.dispatch("app/createBoard", {
          board: this.board,
          user_id: this.user._id
        });
        this.showCreateBoard = !this.showCreateBoard;
      } catch (err) {
        if (err.response && err.response.data) {
          this.$notification.showError(err.response.data);
        } else this.$notification.showError(err);
      }
    },
    async loadBoards() {
      this.$store.dispatch("app/loadBoards", this.user._id);
    },
    enter(board) {
      this.$router.push({ name: "app.board", query: { id: board._id } });
    }
  }
};
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.board {
  /* col-4 p-5 m-2 bg-white rounded-md shadow */
  background: #fff;
  border-radius: 0.375rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}
</style>
