import { createRouter, createWebHistory } from 'vue-router'
import NewsList from '../views/NewsList.vue'
import SingleNews from '../views/SingleNews.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'news',
      component: NewsList
    },
    {
      path: '/:singe_news',
      name: 'single-news',
      component: SingleNews,
    }
  ]
})

export default router
