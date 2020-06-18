<template>
  <div class="board">
    <div class="board-header">
      <div class="d-flex align-center">
        <v-btn color="blue darken-2" outlined text :to="{ name: 'app.home' }">
          <v-icon>mdi-arrow-left</v-icon>
          <span class="font-weight-bold">Voltar</span>
        </v-btn>
        <h2 class="font-italic font-weight-medium ml-2">
          {{ board.title }}
        </h2>

        <div class="board-members">
          <span v-for="user in boardUsers" :key="user._id" class="board-member">
            <Avatar :user="user" />
          </span>
          <!-- <span class="board-member">
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
          </span> -->
          <span class="board-member">
            <v-btn
              color="primary"
              dark
              small
              icon
              @click="enableAddMember = !enableAddMember"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </span>
          <span class="d-flex items-center" v-if="enableAddMember">
            <v-autocomplete
              v-model="selectedUser"
              :items="users"
              :search-input.sync="searchableUser"
              item-text="name"
              dense
              no-filter
              outlined
              return-object
              hide-details
            >
              <template v-slot:item="data">
                {{ data.item.name }} - ( {{ data.item.email }} )
              </template>
              <template v-slot:no-data>
                <span class="d-flex justify-center">Não há dados</span>
              </template>
            </v-autocomplete>
            <v-btn class="mt-1" depressed>Adicionar</v-btn>
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
          <div id="addList">
            <div class="add-list" v-if="enableAddList">
              <v-text-field
                v-model="newListTitle"
                label="Type a title for this list..."
                outlined
                hide-details
                dense
                autofocus
              ></v-text-field>
              <div>
                <v-btn
                  color="success"
                  small
                  elevation="0"
                  class="ma-1"
                  @click="createList"
                  >Add</v-btn
                >
                <v-btn
                  color="error"
                  small
                  class="ma-1"
                  outlined
                  @click="enableAddList = !enableAddList"
                >
                  <span>Cancel</span>
                </v-btn>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import List from "./List";
import ListService from "../services/list.service";
import BoardService from "../services/board.service";
import AuthService from "../services/auth.service";
import Avatar from "../components/Avatar";
export default {
  components: {
    List,
    Avatar
  },
  data() {
    return {
      // lists: [],
      board: {},
      enableAddList: false,
      newListTitle: "",
      enableAddMember: false,
      boardUsers: [],
      users: [],
      selectedUser: {},
      searchableUser: null
    };
  },
  computed: {
    userAutocomplete(user) {
      return user.name;
    },
    user: {
      get() {
        return this.$store.getters["user/getUser"];
      }
    },
    lists: {
      get() {
        return this.$store.getters["app/getLists"];
      },
      set(value) {
        console.log(value);
      }
    }
  },
  watch: {
    enableAddList(value) {
      if (value === true) {
        const container = this.$el.querySelector("#addList");
        this.scrollToView(container);
      }
    },
    searchableUser(query) {
      this.findUser(query);
    },
    selectedUser(item) {
      console.log(item);
    }
  },
  async mounted() {
    const id = this.$route.query.id;
    if (id === undefined) {
      this.$router.push({ name: "app.home" });
    }
    const { data } = await BoardService.findById(id);
    this.board = data;
    this.$store.dispatch("app/loadBoard", id);
    this.loadBoardUsers();
    this.findUser();
  },
  methods: {
    scrollToView(container) {
      setTimeout(function() {
        container.scrollIntoView();
      }, 10);
    },
    async createList() {
      if (this.newListTitle.trim() === "") return;
      try {
        const list = {
          board_id: this.board._id,
          title: this.newListTitle
        };
        const { data } = await ListService.createList(list, this.user._id);
        // this.lists.push(data);
        this.$store.dispatch("app/addList", data);
        this.newListTitle = "";
        this.enableAddList = false;
      } catch (error) {
        console.log(error);
      }
    },
    async loadBoardUsers() {
      const { data } = await BoardService.loadMembers(this.board._id);
      this.boardUsers = data;
    },
    findUser: _.debounce(async function findUser(query) {
      const { data } = await AuthService.findUser(query);
      this.users = data;
    }),
    async addMember() {
      try {
        await BoardService.addMember(this.board._id, this.selectedUser._id);
        this.$notification.showSuccess("Membro adicionado com sucesso!");
      } catch (err) {
        this.$notification.showError(err);
      }
    }
  }
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
  /* font-size: 1.5rem;
  font-weight: 600;
  color: rgba(26, 32, 44, 1);
  line-height: 1.25px; */
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
  top: 4px;
}
.board-member img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ffffff;
  margin-top: 6px;
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
.add-list {
  display: block;
  padding: 12px;
  flex-shrink: 0;
  background-color: #ffffff;
  border-radius: 0.375rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  width: 370px;
}
</style>
