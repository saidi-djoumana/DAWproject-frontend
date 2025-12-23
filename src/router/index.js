import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'
import Home from '@/pages/Home.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import AppLayout from '@/layouts/AppLayout.vue'
import Events from '@/pages/Events.vue'
import Organizer from '@/pages/organizer.vue'
import Author from '@/pages/Author.vue'
import Evaluation from '@/pages/Evaluation.vue'
import Admin from '@/pages/Admin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {path: '', component: Home },
        {path: 'events', component: Events },
        {path: 'organizer', component: Organizer },
        {path: 'author', component: Author },
        {path: 'evaluation', component: Evaluation },
        {path: 'admin', component: Admin },
      ]
    },
    {
      path: '/auth',
      component: AuthLayout,
      children: [
        { path: 'login', component: Login },
        { path: 'register', component: Register },
      ],
    }
  ],
})

export default router
