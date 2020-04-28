<template>
  <div class="card">
    <div class="header"></div>
    <p>{{ card.title }}</p>
    <img src="https://api.adorable.io/avatars/50/abott@adorable.png" alt="" />
    <v-btn @click="remove" text>Delete</v-btn>
    <v-dialog v-model="dialog" width="800">
      <template v-slot:activator="{ on }">
        <v-btn color="red lighten-2" dark v-on="on">
          Click Me
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline justify-space-between" primary-title>
          <p class="my-auto title">{{ card.title }}</p>
          <v-btn class="my-auto" icon>X</v-btn>
        </v-card-title>

        <v-card-text>
          <div>
            <p>Description</p>
            <v-textarea outlined label="Type some detailed description..."></v-textarea>
          </div>
          <custom-input inputLabel="Type some detailed description..." buttonLabel="Save"></custom-input>
          <div>
            <p>Activity</p>
            <v-list dense>
              <v-list-item-group>
                <v-list-item>Test</v-list-item>
                <v-list-item>Test</v-list-item>
                <v-list-item>Test</v-list-item>
              </v-list-item-group>
            </v-list>
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import CustomInput from "../components/CustomInput";
import CardService from "../services/card.service";
export default {
  components: {
    CustomInput
  },
  props: {
    card: {},
  },
  data() {
    return {
      showDetails: true,
    };
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
