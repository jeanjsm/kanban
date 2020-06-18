const route = {
  path: "/login",
  name: "auth.login",
  component: () => import("../../views/Login.vue"),
  meta: { sessionRequired: false }
};

export default route;
