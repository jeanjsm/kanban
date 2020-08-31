import Vue from 'vue'
import VueRouter from 'vue-router'
import Store from '../store';
// import LayoutBase from '../layouts/App.vue';
import { login } from './routes/auth';
import routeApp from './routes/app';

Vue.use(VueRouter)

const router = new VueRouter({
  // mode: 'history',
  routes: [ login, routeApp ]
});

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  const sessionRequired = to.matched.some(record => record.meta.sessionRequired);
  const hasSession = Store.getters['auth/isLoggedIn'];
  if (sessionRequired && !hasSession) {
    next({
      name: 'auth.login',
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
});

export default router;

// const routes = [
//   {
//     path: '/login',
//     component: () => import('../views/Login.vue')
//   },
//   {
//     path: '/',
//     redirect: { name: 'app.home' }
//   },
//   // {
//   //   path: '/',
//   //   component: () => import('../views/Kanban.vue')
//   // },
//   {
//     path: '/app',
//     redirect: { name: 'app.home' },
//     component: LayoutBase,
//     children: [
//       {
//         path: "home",
//         name: "app.home",
//         component: () => import('../views/Dashboard.vue')
//       },
//       {
//         path: 'board',
//         name: 'app.board',
//         component: () => import('../views/Board.vue'),
//       }
//     ]
//   }
// ];

// const routes = [
// {
//   path: '/',
//   name: 'Dashboard',
//   component: Dashboard
// },
// {
//   path: '/login',
//   name: 'Login',
//   component: () => import('../views/Login.vue')
// },
// {
//   path: '/board',
//   name: 'Board',
//   component: Board,
//   props: true
// },
// ]

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })

// export default router
