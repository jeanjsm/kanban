<template>
  <v-layout row justify-center class="az-confirm">
    <v-dialog persistent value="true" :max-width="maxWidth">
      <v-card>
        <v-card-title></v-card-title>
        <v-card-text>
          <slot></slot>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="$emit('on-decline')">{{
            labelDecline
          }}</v-btn>
          <v-btn color="primary" text @click="$emit('on-confirm')">{{
            labelConfirm
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: "AzConfirmDialog",
  props: {
    labelConfirm: {
      type: String,
      default: "Sim"
    },
    labelDecline: {
      type: String,
      default: "Não"
    },
    maxWidth: {
      type: Number,
      default: 290
    }
  }
};
</script>

<style></style>
