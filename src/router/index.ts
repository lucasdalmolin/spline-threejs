import { createRouter, createWebHistory } from 'vue-router'
import ModelTest from '../views/ModelTest.vue'
import MainPage from '../views/MainPage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/model-test',
      name: 'ModelTest',
      component: ModelTest
    }
  ]
})

export default router
