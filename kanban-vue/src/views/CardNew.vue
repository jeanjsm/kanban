<template>
  <div class="card" @click="loadCard">
    <div v-if="card.label">
      <v-chip
        :color="card.label.color"
        :dark="card.label.color !== '#FFFFFF'"
        :outlined="card.label.color === '#FFFFFF'"
        x-small
        >{{ card.label.name }}</v-chip
      >
    </div>
    <p class="">
      {{ card.title }}
    </p>
    <div class="member">
      <span>
        <img
          src="https://api.adorable.io/avatars/196/abott@adorable.png"
          alt=""
        />
      </span>
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
          <path
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
  </div>
</template>

<script>
import moment from "moment";
import CardService from "../services/card.service";
import CardDetail from "../views/CardDetail";
export default {
  components: {
    CardDetail
  },
  props: {
    card: {}
  },
  data() {
    return {
      showDetails: false,
      detail: {}
    };
  },
  mounted() {},
  methods: {
    async loadCard() {
      const { data } = await CardService.findCard(this.card._id);
      this.detail = data;
      this.showDetails = true;
    },
    async remove() {
      await CardService.delete(this.card);
      // this.$store.commit("removeCardFromList", this.card);
    },
    parseData(date) {
      return moment(date).locale('pt-BR').format('l');
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
.card p {
  /* text-sm font-medium leading-snug text-gray-900 */
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.375rem;
  color: rgba(26, 32, 44, 1);
}
.card .member {
  /* mb-2 pt-0 */
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
