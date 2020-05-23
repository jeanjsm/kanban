<template>
  <div class="dashboard">
    <div
      class="boards"
      v-for="board in boards"
      :key="board._id"
      @click="enter(board)"
    >
      <div>
        <p class="text-md font-bold text-gray-900">{{ board.title }}</p>
      </div>
    </div>
    <!-- <v-btn @click="createBoard">Add Board</v-btn> -->
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      // boards: [],
    };
  },
  computed: {
    boards: {
      get() {
        return this.$store.getters['app/getBoards'];
      },
      set() {},
    },
    user: {
      get() {
        return this.$store.getters['user/getUser'];
      },
    },
  },
  async mounted() {
    await this.loadBoards();
  },
  methods: {
    createBoard() {
      const board = {
        title: "Siscont",
      };
      this.$store.dispatch("createBoard", board);
    },
    async loadBoards() {
      this.$store.dispatch("app/loadBoards", this.user._id);
    },
    enter(board) {
      this.$router.push({ name: "app.board", query: { id: board._id } });
    },
  },
};
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-wrap: wrap;
}
.boards {
/* col-4 p-5 m-2 bg-white rounded-md shadow */
  columns: 3;
  padding: 20px;
  margin: 8px;
  background: #fff;
  border-radius: 0.375rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}
/* .boards {
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  justify-items: center;
}
.card {
  flex: 0 0 280px;
  height: 150px;
  margin: 5px;
  border-radius: 4px;
  box-shadow: 0 1px 4px 0 rgba(192, 208, 230, 0.8);
  cursor: pointer;
}
.card .card-body {
  margin: 20px 0 0 20px;
  font-size: 18px;
  font-weight: bold;
} */
</style>
