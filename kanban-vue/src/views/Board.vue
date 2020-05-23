<template>
  <div class="board">
    <div class="board-header">
      <div class="board-title">
        <h2>
          {{ board.title }}
        </h2>
        <div class="board-members">
          <span class="board-member">
            <img
              src="https://api.adorable.io/avatars/196/abott@adorable.png"
              alt=""
            />
          </span>
          <span class="board-member">
            <img
              src="https://api.adorable.io/avatars/196/abott@adorable.png"
              alt=""
            />
          </span>
          <span class="board-member">
            <img
              src="https://api.adorable.io/avatars/196/abott@adorable.png"
              alt=""
            />
          </span>
          <span class="board-member">
            <img
              src="https://api.adorable.io/avatars/196/abott@adorable.png"
              alt=""
            />
          </span>
        </div>
      </div>
    </div>
    <div class="lists">
      <main class="lists">
        <list v-for="list in lists" :key="list._id" :list="list" />
        <div class="add">
          <v-btn
            elevation="0"
            v-if="!enableAddList"
            @click="enableAddList = !enableAddList"
          >
            <v-icon>mdi-plus</v-icon>
            <span>Add List</span>
          </v-btn>
          <div class="add-list" v-else>
            <v-text-field
              v-model="newListTitle"
              label="Type a title for this list..."
              solo
              hide-details
              dense
            ></v-text-field>
            <div class="add-list-buttons">
              <v-btn color="success" elevation="0" @click="createList"
                >Add</v-btn
              >
              <v-btn icon @click="enableAddList = !enableAddList">
                <span>X</span>
              </v-btn>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import List from "./List";
import ListService from "../services/list.service";
import BoardService from "../services/board.service";
export default {
  components: {
    List,
  },
  data() {
    return {
      // lists: [],
      board: {},
      enableAddList: false,
      newListTitle: "",
    };
  },
  computed: {
    user: {
      get() {
        return this.$store.getters['user/getUser'];
      },
    },
    lists: {
      get() {
        return this.$store.getters['app/getLists'];
      },
      set(value) {
        console.log(value);
      },
    },
  },
  async mounted() {
    const id = this.$route.query.id;
    if (id === undefined) {
      this.$router.push({ name: "app.home" });
    }
    const { data } = await BoardService.findById(id);
    this.board = data;
    this.$store.dispatch("app/loadBoard", id);
  },
  methods: {
    async createList() {
      if (this.newListTitle.trim() === "") return;
      try {
        const list = {
          board_id: this.board._id,
          title: this.newListTitle,
        };
        const { data } = await ListService.createList(list, this.user._id);
        this.lists.push(data);
        this.newListTitle = "";
        this.enableAddList = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.board {
  /* flex flex-column overflow-hidden */
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: calc(100vh - 64px);
}
.board-header {
  /* flex items-center justify-between py-2 mx-2 */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  margin: 0 8px;
}
.board-title {
  display: flex;
  align-items: center;
}
.board-title h2 {
  /* text-2xl font-semibold text-gray-900 leading-tight */
  font-size: 1.5rem;
  font-weight: 600;
  color: rgba(26, 32, 44, 1);
  line-height: 1.25px;
}
.board-members {
  /* ml-6 flex items-center */
  margin-left: 24px;
  display: flex;
  align-items: center;
}
.board-member {
  /* -ml-2 rounded-full border-2 border-white */
  margin-left: -0.5rem;
  border-radius: 9999px;
}
.board-member img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ffffff;
}
.lists {
  flex: 1 1 0%;
  overflow: auto;
}
main {
  display: inline-flex;
  height: 100%;
  padding-bottom: 4px;
}
</style>
