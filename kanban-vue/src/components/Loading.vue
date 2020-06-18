<template>
  <div>
    <v-overlay :value="isLoading">
      <v-card color="white" dark>
        <v-card-text class="d-flex flex-column align-center">
          <span class="black--text">{{ loadingMessage }}</span>
          <FulfillingSquareSpinner
            :animation-duration="1000"
            :size="40"
            color="#ff9d5e"
          ></FulfillingSquareSpinner>
        </v-card-text>
      </v-card>
    </v-overlay>
  </div>
</template>

<script>
import { FulfillingSquareSpinner } from "epic-spinners";
export default {
  name: "Loading",
  components: {
    FulfillingSquareSpinner
  },
  computed: {
    isLoading: {
      get() {
        return this.$store.state.app.isLoading;
      }
    },
    loadingMessage: {
      get() {
        return this.$store.state.app.loadingMessage;
      }
    }
  }
};
</script>

<style></style>
