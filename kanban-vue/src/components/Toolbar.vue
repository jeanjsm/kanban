<template>
  <div class="nea-toolbar">
    <div class="actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.v-toolbar__content {
  padding: 0 20px;
}
.nea-toolbar {
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 1px 4px 4px rgba(0, 0, 0, 0.1);
}
</style>