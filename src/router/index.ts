import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import NewsComponent from '@/components/NewsComponent.vue'
import NewsSingleView from '@/views/NewsSingleView.vue'
import DynamicPageView from '@/views/DynamicPageView.vue'
import PartnersView from '@/views/PartnersView.vue'
import TerminarzComponent from '@/components/TerminarzComponent.vue'
import RegulaminPage from '@/views/RegulaminView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView // Strona główna w stylu W i Poza Ekranem
  },
  // Dodane przekierowanie:
  {
    path: '/home',
    redirect: '/'
  },
  {
    path: '/aktualnosci',
    name: 'aktualnosci',
    component: NewsComponent
  },
  {
    path: '/turniej',
    name: 'turniej',
    component: TerminarzComponent
  },
  {
    path: '/aktualnosci/:id',
    name: 'news-single',
    component: NewsSingleView
  },
  {
    path: '/partnerzy',
    name: 'partnerzy',
    component: PartnersView
  },
  {
      path: '/regulamin/:slug',
      name: 'RegulaminView',
      component: RegulaminPage
    },
  // Ścieżka wyłapująca nieznane adresy (tzw. catch-all) ZAWSZE musi być na samym dole
  {
    path: '/:pathMatch(.*)*',
    name: 'dynamic-page',
    component: DynamicPageView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  }
})

export default router