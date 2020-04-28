<template>
  <div class="add">
    <div class="add-card">
      <v-text-field
        :label="inputLabel"
        outlined
        hide-details
        dense
      ></v-text-field>
      <v-textarea hide-details :label="inputLabel" outlined dense></v-textarea>
      <div class="add-card-buttons">
        <v-btn color="success" elevation="0">{{buttonLabel}}</v-btn>
        <v-btn icon>
          <span>X</span>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    inputLabel: String,
    buttonLabel: String,
  },
  data() {
    return {
      enableAddCard: false,
    };
  },
};
</script>

<style scoped>
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
