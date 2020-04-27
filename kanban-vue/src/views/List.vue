<template>
  <div class="list">
    <div class="header">
      <div>
        <v-text-field
          v-model="list.title"
          :disabled="enableChangeTitle"
          :solo="!enableChangeTitle"
          hide-details
          dense
        >
          <v-icon
            small
            slot="append-outer"
            style="pointer-events: auto;"
            @click="enableChangeTitle = !enableChangeTitle"
          >
            mdi-lock
          </v-icon>
        </v-text-field>
      </div>
      <v-btn icon @click="createCard">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </div>
    <ul>
      <VueDraggable group="board" @update="log" :list="cards" @change="onAdd">
        <Card v-for="card in cards" :key="card._id" :card="card" />
      </VueDraggable>
    </ul>
    <div class="add">
      <v-btn
        elevation="0"
        small
        v-if="!enableAddCard"
        @click="enableAddCard = !enableAddCard"
      >
        <v-icon>mdi-plus</v-icon>
        <span>Add card</span>
      </v-btn>
      <div class="add-card" v-else>
        <v-text-field
          v-model="newCardTitle"
          label="Type a title for this card..."
          solo
          hide-details
          dense
        ></v-text-field>
        <div class="add-card-buttons">
          <v-btn color="success" elevation="0" @click="createCard">Add</v-btn>
          <v-btn
            icon
            @click="
              enableAddCard = !enableAddCard;
              newCardTitle = '';
            "
          >
            <span>X</span>
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueDraggable from "vuedraggable";
import ClickOutside from "vue-click-outside";
import Card from "./Card";
import CardService from "../services/card.service";
export default {
  components: {
    VueDraggable,
    Card,
  },
  props: {
    list: {},
  },
  data() {
    return {
      cardsTemp: [],
      enableAddCard: false,
      newCardTitle: "",
      enableChangeTitle: true,
    };
  },
  computed: {
    cards: {
      get() {
        let cards = [];
        const list_id = this.list._id;
        this.$store.state.lists.map((list) => {
          if (list._id === list_id) {
            cards = list.cards;
          }
        });
        return cards;
      },
    },
  },
  methods: {
    async loadCards() {
      const { data } = await CardService.loadCards(this.list._id);
      this.cards = data;
    },
    async createCard() {
      if (this.newCardTitle.trim() === "") return;
      try {
        const user_id = "5ea31f7cfa7e4643ba57be81";
        const card = {
          list_id: this.list._id,
          title: this.newCardTitle,
        };
        console.log(card);
        const { data } = await CardService.createCard(card, user_id);
        this.cards.push(data);
        this.newCardTitle = "";
        this.enableAddCard = false;
      } catch (error) {
        console.log(error);
      }
    },
    log: function(event) {
      window.console.log(event);
    },
    onDrop(evt) {
      console.log(evt);
    },
    async onAdd(evt) {
      if (evt.added) {
        try {
          console.log(evt.added);
          const lists = this.$store.state.lists;
          const newCard = evt.added.element;
          let listChange = null;
          lists.map((listStored) => {
            if (listStored.cards.find((card) => card._id === newCard._id))
              listChange = listStored;
          });
          console.log(listChange);
          if (listChange) {
            newCard.list = listChange._id;
            await CardService.update(newCard);
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    clickOutside() {
      this.enableChangeTitle = false;
    },
  },
  directives: {
    ClickOutside,
  },
};
</script>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  padding: 0 15px;
  flex: 0 0 320px;
  background-color: #ebecf0;
  margin: 10px;
  border-radius: 8px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 42px;
}
h2 {
  font-weight: 500;
  font-size: 16px;
  padding: 0 10px;
}

ul {
  margin-top: 30px;
  padding: 0 !important;
}
.add {
  flex: 1;
}
.add-card {
  display: flex;
  flex-direction: column;
}
.add-card-buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 5px;
}
.add-card-buttons span {
  font-size: 20px;
  font-weight: bold;
}
</style>
