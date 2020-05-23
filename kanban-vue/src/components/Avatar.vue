<template>
  <div>
    <img v-if="user !== undefined && user.avatar" :src="user.avatar" alt="">
    <span>{{ initials }}</span>
  </div>
</template>

<script>
export default {
  props: {
    user: {}
  },
  computed: {
    initials() {
      if (this.user !== undefined) {
        const words = this.user.name.split(/[\s-]+/);
        let initialsName = "";
        for(let word in words) {
          if (initialsName.length < 2) {
            initialsName += words[word].substr(0, 1);
          }
        }
        return initialsName.toUpperCase()
      }
      return "++";
    }
  }
}
</script>

<style scoped>
img {
  border-radius: 50%;
}
span {
  background-color: teal;
  margin: 4px;
  padding: 4px;
  border-radius: 50%;
  color: #ffffff;
}
</style>