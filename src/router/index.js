import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/pages/Login.vue'
import AdminLogin from '@/pages/AdminLogin.vue'
import Register from '@/pages/Register.vue'
import Home from '@/pages/Home.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import AppLayout from '@/layouts/AppLayout.vue'
import Events from '@/pages/Events.vue'
import Organizer from '@/pages/organizer.vue'
import Author from '@/pages/Author.vue'
import Evaluation from '@/pages/Evaluation.vue'
import Admin from '@/pages/Admin.vue'

const routes = [
  {
    path: '/',
    component: AppLayout,
    children: [
      { path: '', component: Home },
      { path: 'events', component: Events },
      { path: 'organizer', component: Organizer },
      { path: 'author', component: Author },
      { path: 'evaluation', component: Evaluation },
      { 
        path: 'admin', 
        component: Admin,
        meta: { requiresAdminAuth: true } // admin protected
      }
    ]
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      { path: 'login', component: Login },
      { path: 'register', component: Register },
      { path: 'admin-login', component: AdminLogin }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// ---------------------
// ROUTER GUARD
// ---------------------
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('authToken')
  const userStr = localStorage.getItem('authUser')
  const adminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true'

  let user = null
  try {
    user = userStr ? JSON.parse(userStr) : null
  } catch (e) {
    user = null
  }

  // Normal auth routes
  if (to.meta.requiresAuth && (!token || !user)) {
    return next('/auth/login')
  }

  // Admin auth route
  if (to.meta.requiresAdminAuth && !adminLoggedIn) {
    return next('/auth/admin-login')
  }

  next()
})

export default router
