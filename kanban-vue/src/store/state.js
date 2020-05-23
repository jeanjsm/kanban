export default {
  auth: JSON.parse(window.localStorage.getItem("auth_data")) || "",
  user: {},
  token: "",
  boards: [],
  lists: [],
};
