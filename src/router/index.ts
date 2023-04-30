import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHistory(""),

  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    }
  ]
})

export default router
