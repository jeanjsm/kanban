<template>
  <div class="card">
    <div class="header"></div>
    <p>{{ card.title }}</p>
    <img src="https://api.adorable.io/avatars/50/abott@adorable.png" alt="" />
    <v-btn @click="remove" text>Delete</v-btn>
  </div>
</template>

<script>
import CardService from "../services/card.service";
export default {
  props: {
    card: {},
  },
  data() {
    return {};
  },
  methods: {
    async remove() {
      await CardService.delete(this.card);
      // this.$store.commit("removeCardFromList", this.card);
    },
  },
};
</script>

<style scoped>
.card {
  position: relative;
  background: #fff;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 15px;
  box-shadow: 0 1px 4px 0 rgba(192, 208, 230, 0.8);
  border-top: 20px solid rgba(230, 236, 245, 0.4);
  cursor: grab;
}

.header {
  position: absolute;
  top: -22px;
  left: 15px;
}

p {
  font-weight: 500;
  line-height: 20px;
  font-size: 14px;
}

img {
  width: 24px;
  height: 24px;
  border-radius: 2px;
  margin-top: 5px;
}
</style>
