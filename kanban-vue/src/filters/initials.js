import Vue from "vue";

Vue.filter("initials", function (val) {
  if (val !== undefined) {
    if (val.name) {
      const words = val.name.split(/[\s-]+/);
      let initialsName = "";
      for (let word in words) {
        if (initialsName.length < 2) {
          initialsName += words[word].substr(0, 1);
        }
      }
      return initialsName.toUpperCase();
    }
    return "";
  }
  return "++";
});
