<template>
  <div>
    <h3>
      <v-icon small>mdi-label</v-icon>
      Etiqueta
    </h3>
    <div class="d-flex">
      <div class="labels">
        <v-chip
          :color="card.label.color"
          :dark="card.label.color !== '#FFFFFF'"
          :outlined="card.label.color === '#FFFFFF'"
          small
          v-if="card.label"
          >{{ card.label.name }}</v-chip
        >
        <v-menu
          v-model="showMenuLabels"
          :close-on-content-click="false"
          :nudge-width="200"
          offset-y
        >
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" elevation="0" icon small>
              <v-icon>{{ card.label ? "mdi-pencil" : "mdi-plus" }}</v-icon>
            </v-btn>
          </template>
          <v-card class="flex-1">
            <div class="mx-4 py-2" v-if="!showCreateLabel">
              <v-list>
                <v-list-item
                  v-for="label in labels"
                  :key="label.name"
                  class="item"
                >
                  <v-btn
                    :color="label.color"
                    small
                    block
                    :dark="label.color !== '#FFFFFF'"
                    elevation="0"
                    @click="updateCard(label)"
                    >{{ label.name }}</v-btn
                  >
                </v-list-item>
              </v-list>
              <v-btn small block @click="showCreateLabel = !showCreateLabel">
                <v-icon>
                  mdi-plus
                </v-icon>
                Create Label</v-btn
              >
            </div>
            <div class="mx-4 py-2" v-else>
              <span class="title">Create Label</span>
              <v-divider></v-divider>
              <v-text-field
                v-model="newLabel.name"
                label="Cor"
                outlined
                dense
                class="my-2"
              ></v-text-field>
              <v-color-picker
                v-model="color"
                class="ma-2 elevation-0"
                show-swatches
              ></v-color-picker>
              <div class="d-flex">
                <v-btn small color="success" @click="createLabel">Salvar</v-btn>
                <v-btn
                  small
                  color="error"
                  text
                  @click="showCreateLabel = !showCreateLabel"
                  >Voltar</v-btn
                >
              </div>
            </div>
          </v-card>
        </v-menu>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import LabelService from "../services/label.service";
export default {
  props: {
    card: {}
  },
  data() {
    return {
      showCreateLabel: false,
      showMenuLabels: false,
      labels: [],
      type: "hex",
      hex: "#FFFFFF",
      newLabel: {}
    };
  },
  computed: {
    color: {
      get() {
        return this[this.type];
      },
      set(v) {
        this[this.type] = v;
      }
    },
    showColor() {
      if (typeof this.color === "string") return this.color;

      return "";
    }
  },
  mounted() {
    this.loadLabels();
  },
  methods: {
    async loadLabels() {
      const { data } = await LabelService.findAllLabels();
      this.labels = data;
    },
    async createLabel() {
      let label = _.cloneDeep(this.newLabel);
      label.color = this.color;
      const { data } = await LabelService.createLabel(label);
      this.labels.push(data);
      this.showCreateLabel = false;
    },
    async updateCard(label) {
      let cardUpdate = _.clone(this.card);
      cardUpdate.label = label;
      this.$store.dispatch("app/updateCard", cardUpdate);
    }
  }
};
</script>

<style scoped>
.item {
  height: 30px;
  min-height: 30px;
}
</style>
