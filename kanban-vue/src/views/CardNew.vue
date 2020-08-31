<template>
  <div class="card" @click="loadCard">
    <div class="d-flex justify-space-between">
      <div class="subtitle-2 font-weight-bold text-uppercase">
        {{ card.title }}
      </div>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" elevation="0" icon small>
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-btn>
        </template>
        <v-card elevation="0">
          <v-list dense>
            <v-list-item @click="showChangeTitle = !showChangeTitle">
              <v-list-item-avatar>
                <v-icon>mdi-pencil</v-icon>
              </v-list-item-avatar>
              Alterar Título
            </v-list-item>
            <v-list-item @click="checkRemove">
              <v-list-item-avatar>
                <v-icon>mdi-delete</v-icon>
              </v-list-item-avatar>
              Remover cartão
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </div>

    <div class="member">
      <v-avatar size="24" color="teal" class="white--text">{{
        card.owner | initials
      }}</v-avatar>
      <div v-if="card.label">
        <v-chip
          :color="card.label.color"
          :dark="card.label.color !== '#FFFFFF'"
          :outlined="card.label.color === '#FFFFFF'"
          x-small
          >{{ card.label.name }}</v-chip
        >
      </div>
    </div>
    <div class="card-footer">
      <div class="footer-date">
        <time datetime="2020-05-11">{{ parseData(card.createdAt) }}</time>
      </div>
      <div class="card-icons">
        <svg
          v-if="card.description"
          style="width:24px;height:24px"
          viewBox="0 0 24 24"
        >
          <pgath
            fill="currentColor"
            d="M4,5H20V7H4V5M4,9H20V11H4V9M4,13H20V15H4V13M4,17H14V19H4V17Z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"
          />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      </div>
    </div>
    <v-dialog width="1024" v-model="showDetails">
      <card-detail @close="showDetails = false" :card="detail" />
    </v-dialog>
    <ConfirmDialog
      @on-confirm="remove"
      v-if="showConfirm"
      @on-decline="closeRemove"
      :maxWidth="500"
    >
      Tem certeza que deseja remover o cartão {{ card.title }}?
    </ConfirmDialog>
  </div>
</template>

<script>
import moment from "moment";
import CardService from "../services/card.service";
import CardDetail from "../views/CardDetail";
export default {
  components: {
    CardDetail,
    ConfirmDialog: () => import("../components/ConfirmDialog")
  },
  props: {
    card: {}
  },
  data() {
    return {
      showDetails: false,
      detail: {},
      enableOpenCard: true,
      showChangeTitle: true,
      hoverCard: false,
      showConfirm: false
    };
  },
  mounted() {},
  methods: {
    async loadCard() {
      if (this.enableOpenCard) {
        const { data } = await CardService.findCard(this.card._id);
        this.detail = data;
        this.showDetails = true;
        this.$store.dispatch("app/setCardSelected", data);
      }
    },
    checkRemove() {
      this.showConfirm = true;
    },
    closeRemove() {
      this.showConfirm = false;
    },
    async remove() {
      await CardService.delete(this.card);
      this.$store.commit("app/removeCardFromList", this.card);
      this.closeRemove();
      this.$notification.showSuccess("Cartão removido com sucesso!");
    },
    parseData(date) {
      return moment(date)
        .locale("pt-BR")
        .format("l");
    }
  }
};
</script>
<style scoped>
.card {
  /* block p-5 my-3 flex-shirink-0 bg-white rounded-md shadow */
  display: block;
  padding: 20px;
  margin: 12px 0;
  flex-shrink: 0;
  background-color: #ffffff;
  border-radius: 0.375rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}
.card:hover {
  background-color: #ececec;
}
.card p {
  /* text-sm font-medium leading-snug text-gray-900 */
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.375rem;
  color: rgba(26, 32, 44, 1);
}
.card .member {
  /* mb-2 pt-0 */
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  padding-top: 0;
}
.card .member span img {
  /* h-8 w-8 rounded-full */
  height: 32px;
  width: 32px;
  border-radius: 50%;
}
.card .card-footer {
  /* flex justify-between items-baseline */
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.card .card-footer .footer-date {
  /* text-sm text-gray-600 my-auto */
  font-size: 0.875rem;
  color: rgba(113, 128, 150, 1);
  margin: auto 0;
}
.card .card-footer .card-icons {
  display: flex;
}
.card .card-footer .card-icons svg {
  /* text-gray-600 my-auto */
  color: rgba(113, 128, 150, 1);
  margin: auto 2px;
  width: 20px;
}
</style>
