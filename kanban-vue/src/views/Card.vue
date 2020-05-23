<template>
  <v-card class="card" @click="loadCard">
    <v-card-title>{{ card.title }}</v-card-title>
    <v-card-text>
      <div>
        <span>{{ card.owner }}</span>
      </div>
      <v-img src="https://api.adorable.io/avatars/285/abott@adorable.png" alt="" width="30" style="border-radius: 24px" />
    </v-card-text>
    <v-dialog v-model="showDetails">
      <card-detail :card="detail" />
    </v-dialog>
  </v-card>
</template>

<script>
import CardService from "../services/card.service";
import CardDetail from "../views/CardDetail";
export default {
  components: {
    CardDetail
  },
  props: {
    card: {},
  },
  data() {
    return {
      showDetails: false,
      detail: {}
    };
  },
  mounted() {
  },
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
  },
};
</script>

<style scoped>
.card {
  margin: 5px 0;
}
.card-header {
  border-top: 5px solid red;
}
</style>
