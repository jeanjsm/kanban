<template>
  <div>
    <input
      class="input-edit"
      type="text"
      v-if="edit"
      :value="valueLocal"
      @blur.native="
        valueLocal = $event.target.value;
        edit = false;
        $emit('input', valueLocal);
      "
      @keyup.enter.native="
        valueLocal = $event.target.value;
        edit = false;
        $emit('input', valueLocal);
      "
      v-focus=""
    />
    <p v-else="" @click="edit = true">
      {{ valueLocal }}
    </p>
  </div>
</template>

<script>
export default {
  props: ["value"],

  data() {
    return {
      edit: false,
      valueLocal: this.value,
    };
  },

  watch: {
    value: function() {
      this.valueLocal = this.value;
    },
  },

  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },
};
</script>

<style scoped>
p {
  padding: 4px 0;
}
.input-edit {
  outline: none;
}
.input-edit:focus {
  background: #fff;
  box-shadow: 2px 4px 5px rgba(0,0,0,0.2);
  border-radius: 4px;
  padding: 4px 0;
  /* width: 250px; */
}
</style>