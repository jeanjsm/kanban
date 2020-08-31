<template>
  <div class="list">
    <div class="list-header">
      <h2>{{ list.title }}</h2>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" elevation="0" icon small>
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-btn>
        </template>
        <v-card elevation="0">
          <v-list dense>
            <v-list-item @click="enableAddCard = !enableAddcard">
              <v-list-item-avatar>
                <v-icon>mdi-plus</v-icon>
              </v-list-item-avatar>
              Adicionar cartão
            </v-list-item>
            <v-list-item  @click="enableChangeTitle = !enableChangeTitle">
              <v-list-item-avatar>
                <v-icon>mdi-pencil</v-icon>
              </v-list-item-avatar>
              Alterar Título da Coluna
            </v-list-item>
            <v-list-item @click="removeList">
              <v-list-item-avatar>
                <v-icon>mdi-delete</v-icon>
              </v-list-item-avatar>
              Remover coluna
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </div>
    <div class="items">
      <ul>
        <VueDraggable group="board" v-model="cards">
          <CardNew v-for="card in cards" :key="card._id" :card="card" />
        </VueDraggable>
        <v-btn
          class="button-add-card"
          v-if="!enableAddCard"
          text
          block
          color="primary"
          @click="enableAddCard = !enableAddCard"
          >Adicionar Cartão</v-btn
        >
        <div id="addCard">
          <div class="add-card" v-if="enableAddCard">
            <v-text-field
              v-model="newCardTitle"
              label="Insira um título"
              outlined
              hide-details
              autofocus
              dense
              v-on:keyup.enter="createCard"
            />
            <div>
              <v-btn color="success" small class="ma-1" @click="createCard"
                >Add</v-btn
              >
              <v-btn
                color="error"
                small
                class="ma-1"
                outlined
                @click="enableAddCard = !enableAddCard"
                >Cancel</v-btn
              >
            </div>
          </div>
        </div>
      </ul>
    </div>
    <v-dialog width="450" v-model="enableChangeTitle">
      <v-card>
        <v-card-title>Alterar Título da Coluna</v-card-title>
        <v-card-text>
          <v-text-field
            outlined
            dense
            hide-details
            label="Título da coluna"
            v-model="list.title"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="success" large @click="updateListTitle">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// import _ from 'lodash';
import VueDraggable from "vuedraggable";
import CardNew from "./CardNew";
import ClickOutside from "vue-click-outside";
// import InputEdit from "../components/InputEdit";
import CardService from "../services/card.service";
import ListService from '../services/list.service';
export default {
  components: {
    VueDraggable,
    CardNew
    // InputEdit,
  },
  props: {
    list: {}
  },
  data() {
    return {
      cardsTemp: [],
      enableAddCard: false,
      newCardTitle: "",
      enableChangeTitle: false,
    };
  },
  computed: {
    user: {
      get() {
        return this.$store.state.user.user;
      }
    },
    lists: {
      get() {
        return this.$store.getters["app/getLists"];
      }
    },
    cards: {
      get() {
        let cardList = [];
        const list_id = this.list._id;
        this.$store.state.app.lists.map(list => {
          if (list._id === list_id) {
            cardList = list.cards;
          }
        });
        return cardList;
      },
      set(value) {
        this.$store.dispatch("app/updateCardList", {
          list_id: this.list._id,
          cards: value
        });
      }
    }
  },
  watch: {
    enableAddCard(value) {
      if (value === true) {
        const container = this.$el.querySelector("#addCard");
        this.scrollToView(container);
      }
    }
  },
  methods: {
    scrollToView(container) {
      setTimeout(function() {
        container.scrollIntoView();
      }, 10);
    },
    async createCard() {
      if (this.newCardTitle.trim() === "") return;
      try {
        const user_id = this.user._id;
        const card = {
          list_id: this.list._id,
          title: this.newCardTitle
        };
        await CardService.createCard(card, user_id);
        this.$store.dispatch("app/loadCards", this.list._id);
        this.newCardTitle = "";
        this.enableAddCard = false;
      } catch (error) {
        console.log(error.response);
      }
    },
    async updateListTitle() {
      await ListService.updateListTitle(this.list._id, this.list.title, this.user._id);
      this.enableChangeTitle = false;
    },
    removeList() {
      console.log('removing')
    },
    clickOutside() {
      this.enableChangeTitle = false;
    }
  },
  directives: {
    ClickOutside
  }
};
</script>

<style scoped>
.list {
  /* mr-3 flex-shrink-0 flex flex-col w-2/4 bg-gray-100 rounded-md */
  margin-left: 12px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  width: 400px;
  /* background-color: #eef0f1; */
  border-radius: 0.375rem;
}
.list h2 {
  /* flex-shrink-0 pt-3 pb-2 px-3 text-sm font-medium text-gray-700 */
  flex-shrink: 0;
  padding: 12px 12px 8px 12px;
  font-size: 20px;
  font-weight: 600;
  color: rgba(74, 85, 104, 1) "";
}
.list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 4px;
}
.list .items {
  flex: 1 1 0%;
  min-height: 0;
  overflow-y: auto;
}
.list .items ul {
  padding: 0 12px 12px 12px;
}
.list .button-add-card {
  width: 250px;
  bottom: 0;
}
.list .add-card {
  display: block;
  padding: 12px;
  flex-shrink: 0;
  background-color: #ffffff;
  border-radius: 0.375rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}
</style>
