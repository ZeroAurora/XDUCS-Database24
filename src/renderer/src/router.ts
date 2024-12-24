import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('./views/ConnectionView.vue'),
    },
    {
      path: '/admin',
      component: () => import('./views/admin/IndexView.vue'),
    },
    {
      path: '/admin/table',
      component: () => import('./views/admin/TableView.vue'),
    },
    {
      path: '/user',
      component: () => import('./views/user/IndexView.vue'),
    },
    {
      path: '/user/queryTeam',
      component: () => import('./views/user/QueryTeamView.vue'),
    },
    {
      path: '/common/sql',
      component: () => import('./views/common/SqlExecutionView.vue'),
    },
  ],
})

export default router
