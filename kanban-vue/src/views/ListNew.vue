<template>
  <div class="flex-shirink-0 p-3 w-2/3 bg-gray-100 rounded-md">
    <h3 class="text-sm font-medium text-gray-900">List</h3>
    <vue-draggable>
      <div v-for="card in list.cards" :key="card._id">
        <v-card class="mx-2 px-4 py-2">{{ card.title }}</v-card>
      </div>
    </vue-draggable>
  </div>
</template>

<script>
import VueDraggable from "vuedraggable";
export default {
  components: {
    VueDraggable
  },
  props: {
    list: {}
  },
  computed: {
    cards: {
      get() {
        const lists = this.$store.state.app.lists;
        lists.map(l => {
          if (l._id === this.list._id)
            return l.cards;
        })
        return [];
      }
    }
  }
}
</script>

<style>

</style>
