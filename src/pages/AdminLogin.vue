<template>
  <div class="login-box">
    <!-- Heading -->
    <h5 class="login-title">Welcome back, Admin</h5>
    <p class="login-subtitle">Sign in with your admin account.</p>

    <!-- Form -->
    <form class="login-form" @submit.prevent="login">
      <!-- Email -->
      <div class="input-group">
        <label for="email" class="input-label">Email</label>
        <input v-model="email" type="email" id="email" required />
      </div>

      <!-- Password -->
      <div class="input-group password-group">
        <label for="password" class="input-label">Password</label>
        <input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          id="password"
          required
        />
        <i
          class="fa-regular fa-eye toggle-password"
          @click="showPassword = !showPassword"
        ></i>
      </div>

      <!-- Submit -->
      <button type="submit" class="login-btn">Log in</button>

      <!-- Messages -->
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api/axios.js'

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const errorMessage = ref('')

const router = useRouter()

const login = async () => {
  errorMessage.value = ''

  try {
    const response = await api.post('/login', {
      email: email.value,
      password: password.value
    })

    if (!response.data.success || !response.data.data) {
      errorMessage.value = 'Invalid login response.'
      return
    }

    const data = response.data.data
    const token = data.token
    const user = data.user

    if (!token || !user) {
      errorMessage.value = 'Invalid login response.'
      return
    }

    // Save token and user
    localStorage.setItem('authToken', token)
    localStorage.setItem('authUser', JSON.stringify(user))

    // Set admin login flag
    localStorage.setItem('adminLoggedIn', 'true')

    // Clear inputs
    email.value = ''
    password.value = ''

    // Redirect to admin page
    router.push('/admin')

  } catch (error) {
    console.error(error)
    errorMessage.value =
      error.response?.data?.message || 'Login failed. Please check your credentials.'
  }
}

// Optional logout function for admin
const logoutAdmin = () => {
  localStorage.removeItem('authToken')
  localStorage.removeItem('authUser')
  localStorage.removeItem('adminLoggedIn')
  router.push('/auth/admin-login')
}
</script>

<style scoped>
/* Keep all your previous styles unchanged */
.login-box { width: clamp(300px, 40vw, 532px); background: white; border-radius: 1.875rem; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; padding: 1rem 2.5rem; margin: 0 auto; }
.login-form { width: 100%; }
.login-title { font-family: 'Poppins', sans-serif; font-weight: 500; font-size: clamp(1.25rem, 2vw, 1.5rem); line-height: 1.4; letter-spacing: -1%; margin-bottom: 0rem; }
.login-subtitle { font-family: 'Inter', sans-serif; font-weight: 400; font-size: clamp(0.875rem, 1.5vw, 1rem); line-height: 1.5; letter-spacing: 0%; margin-bottom: 2rem; text-align: center; }
.input-group { width: 100%; margin-bottom: 1.5rem; display: flex; flex-direction: column; }
.input-label { font-family: 'Inter', sans-serif; font-weight: 300; font-size: clamp(0.75rem, 1vw, 0.875rem); line-height: 1.5; margin-bottom: 0.5rem; color: #000; }
.password-group { position: relative; }
.toggle-password { position: absolute; top: 50%; right: 1rem; transform: translateY(20%); cursor: pointer; font-size: 1rem; color: #999; z-index: 2; user-select: none; }
.password-group input { padding: 0.75rem 2.5rem 0.75rem 1rem; font-size: clamp(0.75rem, 1vw, 0.875rem); line-height: 1.5; border-radius: 0.75rem; border: 1px solid #ccc; box-sizing: border-box; min-height: 2.5rem; }
input[type="email"], input[type="password"] { padding: 0.75rem 1rem; border-radius: 0.75rem; border: 1px solid #ccc; font-family: 'Inter', sans-serif; font-weight: 300; font-size: clamp(0.75rem, 1vw, 0.875rem); line-height: 1.5; }
input[type="email"]:focus, input[type="password"]:focus { outline: none; border-color: rgba(0, 158, 158, 1); box-shadow: 0 0 0 2px rgba(0, 158, 158, 0.2); }
.login-btn { width: 100%; height: 40px; padding: 8px 20px; border-radius: 100px; border: 1.5px solid #000A07; background-color: #CCEBEB; color: black; font-family: 'Inter', sans-serif; font-weight: 500; font-size: clamp(0.875rem, 1vw, 1rem); cursor: pointer; margin-top: 1rem; }
</style>
