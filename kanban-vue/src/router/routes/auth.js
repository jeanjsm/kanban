import LayoutAuth from '../../layouts/Auth.vue';

const route = {
  path: '/',
  redirect: { name: 'auth.login' },
  component: LayoutAuth,
  children: [
    {
      path: 'login',
      name: 'auth.login',
      component: () => import('../../views/Login.vue'),
      meta: { sessionRequired: false }
    }
  ]
}

export default route;