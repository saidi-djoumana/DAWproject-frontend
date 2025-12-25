import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/pages/Login.vue'
import AdminLogin from '@/pages/AdminLogin.vue'
import Register from '@/pages/Register.vue'
import Home from '@/pages/Home.vue'
import Events from '@/pages/Events.vue'
import Organizer from '@/pages/organizer.vue'
import Author from '@/pages/Author.vue'
import Evaluation from '@/pages/Evaluation.vue'
import Admin from '@/pages/Admin.vue'

import AuthLayout from '@/layouts/AuthLayout.vue'
import AppLayout from '@/layouts/AppLayout.vue'

const routes = [
  // Main App Layout
  {
    path: '/',
    component: AppLayout,
    children: [
      { path: '', component: Home, meta: { requiresAuth: true } },
      { path: 'events', component: Events, meta: { requiresAuth: true } },
      { path: 'organizer', component: Organizer, meta: { requiresAuth: true } },
      { path: 'author', component: Author, meta: { requiresAuth: true } },
      { path: 'evaluation', component: Evaluation, meta: { requiresAuth: true } }
    ]
  },

  // Admin dashboard
  {
    path: '/admin',
    component: Admin,
    meta: { requiresAdmin: true }
  },

  // Auth layout
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      { path: 'login', component: Login },
      { path: 'register', component: Register },
      { path: 'admin-login', component: AdminLogin }
    ]
  },

  // Catch-all redirect
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// ---------------------
// Router Guard
// ---------------------
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('authToken')
  const userStr = localStorage.getItem('authUser')
  const rolesStr = localStorage.getItem('authRoles')

  let user = null
  let roles = []

  try {
    user = userStr ? JSON.parse(userStr) : null
    roles = rolesStr ? JSON.parse(rolesStr) : []
  } catch {
    user = null
    roles = []
  }

  // Admin routes
  if (to.meta.requiresAdmin) {
    if (!user || !roles.includes('super_admin')) {
      return next('/auth/admin-login')
    }
    return next()
  }

  // Authenticated pages
  if (to.meta.requiresAuth && (!user || !token)) {
    return next('/auth/login')
  }

  // Prevent logged-in admin from visiting admin-login again
  if (to.path === '/auth/admin-login' && roles.includes('super_admin')) {
    return next('/admin')
  }

  // Prevent logged-in regular user from visiting login/register
  if ((to.path === '/auth/login' || to.path === '/auth/register') && user && !roles.includes('super_admin')) {
    return next('/')
  }

  next()
})

export default router
