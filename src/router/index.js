import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/places/warehouse',
    },
    {
      path: '/places',
      redirect: '/places/warehouse',
      children: [
        {
          path: 'warehouse',
          component: () => import('../views/Places/Warehouses.vue'),
        }
      ]
    }
  ],
})

export default router
