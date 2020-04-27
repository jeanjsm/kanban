<template>
  <v-container>
    <v-container>
      <v-row>
        <v-btn
          v-for="board in boards"
          :key="board._id"
          @click="loadLists(board._id)"
          >{{ board.title }}</v-btn
        >
      </v-row>
      <v-row>
        <v-col v-for="list in completeList" :key="list._id">
          <v-card>
            <v-card-title>{{ list.title }}</v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item v-for="card in list.cards" :key="card._id">
                  <v-list-item-title>
                    {{ card.title }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <v-card>
      <v-card-text>
        <v-form>
          <v-text-field dense label="Descrição"></v-text-field>
          <v-autocomplete dense label="Aplicação"></v-autocomplete>
          <v-autocomplete dense label="Cliente"></v-autocomplete>
          <v-file-input dense label="Anexo"></v-file-input>
          <v-autocomplete dense label="Aguardando"></v-autocomplete>
          <v-textarea dense label="Observação"></v-textarea>
          <v-switch dense label="Status"></v-switch>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="success">Salvar</v-btn>
        <v-btn color="error" text>Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
// import Draggable from "vuedraggable";
import BoardService from "../services/board.service";
import ListService from "../services/list.service";
import CardService from "../services/card.service";
export default {
  components: {
    // Draggable,
  },
  data() {
    return {
      boards: [],
      boardSelected: undefined,
      todo: [],
      doing: [],
      lists: [],
      completeList: [],
      headers: [
        { text: "Usuário", value: "id_na_usuario" },
        { text: "Aplicativo", value: "aplicativo" },
        { text: "Clientes", value: "clientes" },
        { text: "Gestões", value: "gestoes" },
        { text: "Descrição", value: "descricao" },
      ],
    };
  },
  computed: {
  },
  async mounted() {
    await this.loadBoards();
  },
  methods: {
    async loadBoards() {
      const { data } = await BoardService.loadBoards(2);
      this.boards = data;
    },
    async loadLists(board_id) {
      const { data } = await ListService.findListsByBoard(board_id);
      this.lists = data;
      console.log('antes')
      this.loadCards();
      console.log('depois')
    },
    async loadCards() {
      this.lists.map(list => {
        let tempList = list;
        CardService.loadCards(list._id).then(response => {
          tempList.cards = response.data;
          this.completeList.push(tempList);
        })
      })
      console.log(this.completeList);
    }
  },
};
</script>

<style scoped>
.list {
  min-width: 300px;
  max-width: 500px;
}
</style>
