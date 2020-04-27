<template>
  <div class="board">
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
          <v-btn color="success" elevation="0" @click="createList">Add</v-btn>
          <v-btn icon @click="enableAddList = !enableAddList">
            <span>X</span>
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import List from "./List";
import ListService from "../services/list.service";
import CardService from "../services/card.service";
export default {
  components: {
    List,
  },
  props: {
    board: {}
  },
  data() {
    return {
      // lists: [],
      enableAddList: false,
      newListTitle: "",
    };
  },
  computed: {
    lists: {
      get() {
        return this.$store.state.lists;
      },
      set(value) {
        console.log(value);
      }
    }
  },
  async mounted() {
    this.board = {};
    this.board._id = "5ea31fac6d6ae943e86c75e5";
    this.$store.dispatch("loadBoard", this.board);
    // await this.loadLists();
    // this.lists.map(list => this.$store.commit("addList", list));
  },
  methods: {
    async loadLists() {
      const { data } = await ListService.findListsByBoard(this.board._id);
      this.lists = data;
      data.map(async list => {
        const { data: cards } = await CardService.loadCards(list._id);
        this.$store.commit("addCardsToList", { list_id: list._id, cards});
      })
    },
    async createList() {
      if (this.newListTitle.trim() === "") return;
      try {
        const user_id = "5ea31f7cfa7e4643ba57be81";
        const list = {
          board_id: this.board._id,
          title: this.newListTitle
        };
        const { data } = await ListService.createList(list, user_id);
        this.lists.push(data);
        this.newListTitle = '';
        this.enableAddList = false;
      } catch(error) {
        console.log(error)
      }
    },
  },
};
</script>

<style scoped>
.board {
  display: flex;
  padding: 80px 0 0 0;
  height: 100%;
}
.add {
  flex: 0 0 320px;
  margin-top: 10px;
}
.add-list {
  display: flex;
  flex-direction: column;
}
.add-list-buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 5px;
}
.add-list-buttons span {
  font-size: 20px;
  font-weight: bold;
}
</style>
