import LayoutBase from '../../layouts/App.vue';

const routes = {
  path: '/',
  redirect: { name: 'app.home' },
  component: LayoutBase,
  children: [
    {
      path: '/',
      name: 'app.home',
      component: () => import('../../views/Dashboard.vue'),
      meta: { sessionRequired: true }
    },
    {
      path: 'board',
      name: 'app.board',
      component: () => import('../../views/Board.vue'),
      meta: { sessionRequired: true }
    },
    {
      path: 'profile/',
      name: 'app.profile',
      component: () => import('../../views/Profile.vue'),
      meta: { sessionRequired: true }
    }
  ]
}

export default routes;
