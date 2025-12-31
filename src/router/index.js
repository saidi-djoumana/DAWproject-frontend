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
  {
    path: '/',
    component: AppLayout,
    children: [
      // ✅ PUBLIC
      { path: '', component: Home },
      { path: 'events', component: Events },

      // 🔐 USER AUTH REQUIRED
      { path: 'organizer', component: Organizer, meta: { requiresAuth: true } },
      { path: 'author', component: Author, meta: { requiresAuth: true } },
      { path: 'evaluation', component: Evaluation, meta: { requiresAuth: true } }
    ]
  },

  // 🔐 ADMIN ONLY
  {
    path: '/admin',
    component: Admin,
    meta: { requiresAdmin: true }
  },

  // AUTH PAGES
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      { path: 'login', component: Login },
      { path: 'register', component: Register },
      { path: 'admin-login', component: AdminLogin }
    ]
  },

  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // USER auth
  const userToken = localStorage.getItem('userToken')

  // ADMIN auth
  const adminToken = localStorage.getItem('adminToken')
  const adminDataStr = localStorage.getItem('adminData')
  const admin = adminDataStr ? JSON.parse(adminDataStr) : null
  const adminRoles = admin?.roles || []

  // 🔐 Admin protection
  if (to.meta.requiresAdmin) {
    if (!adminToken || !adminRoles.includes('super_admin')) {
      return next('/auth/admin-login')
    }
  }

  // 🔐 User protection
  if (to.meta.requiresAuth) {
    if (!userToken) {
      return next('/auth/login')
    }
  }

  // 🚫 Prevent logged-in users from auth pages
  if (
    (to.path === '/auth/login' || to.path === '/auth/register') &&
    userToken
  ) {
    return next('/')
  }

  next()
})

export default router
