<template>
  <div class="login-box">
    <!-- Heading -->
    <h5 class="login-title">Welcome back</h5>
    <p class="login-subtitle">Sign in with your existing CuraLink account.</p>

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
        <router-link to="#" class="forgot-password">Forget password?</router-link>
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

    <!-- Register link -->
    <p class="register-text">
      Don’t have an account yet?
      <span class="register-link">
        <router-link to="/auth/register">Sign up</router-link>
      </span>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api/axios.js'
import auth from '@/stores/auth'

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

    if (!response.data?.success || !response.data?.data) {
      errorMessage.value = 'Invalid login response.'
      return
    }

    const { token, user } = response.data.data

    if (!token || !user) {
      errorMessage.value = 'Invalid login response.'
      return
    }

    auth.login(token, user)

    email.value = ''
    password.value = ''

    if (auth.role.value === 'super_admin') {
      router.push('/admin')
    } else {
      router.push('/')
    }

  } catch (error) {
    console.error(error)
    errorMessage.value =
      error.response?.data?.message || 'An error occurred during login.'
  }
}
</script>




<style scoped>
/* Keep all your previous styles unchanged */
.login-box {
  width: clamp(300px, 40vw, 532px);
  background: white;
  border-radius: 1.875rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 1rem 2.5rem;
  margin: 0 auto;
}
.login-form{
    width: 100%;
}
.login-title {
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: clamp(1.25rem, 2vw, 1.5rem);
  line-height: 1.4;
  letter-spacing: -1%;
  margin-bottom: 0rem;
}
.login-subtitle {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: clamp(0.875rem, 1.5vw, 1rem);
  line-height: 1.5;
  letter-spacing: 0%;
  margin-bottom: 2rem;
  text-align: center;
}
.input-group {
  width: 100%;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
}
.input-label {
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: clamp(0.75rem, 1vw, 0.875rem);
  line-height: 1.5;
  margin-bottom: 0.5rem;
  color: #000;
}
.password-group {
  position: relative;
}
.toggle-password {
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(20%);
  cursor: pointer;
  font-size: 1rem;
  color: #999;
  z-index: 2;
  user-select: none;
}
.password-group input {
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  font-size: clamp(0.75rem, 1vw, 0.875rem);
  line-height: 1.5;
  border-radius: 0.75rem;
  border: 1px solid #ccc;
  box-sizing: border-box;
  min-height: 2.5rem;
}
.forgot-password {
  position: absolute;
  top: 0;
  right: 0;
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: clamp(0.75rem, 1vw, 0.875rem);
  line-height: 1.5;
  color: rgba(0, 158, 158, 1);
  text-decoration: none;
}
input[type="email"],
input[type="password"] {
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid #ccc;
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: clamp(0.75rem, 1vw, 0.875rem);
  line-height: 1.5;
}
input[type="email"]:focus,
input[type="password"]:focus {
  outline: none;
  border-color: rgba(0, 158, 158, 1);
  box-shadow: 0 0 0 2px rgba(0, 158, 158, 0.2);
}
.login-btn {
    width: 100%;
    height: 40px;
    padding: 8px 20px;
    border-radius: 100px;
    border: 1.5px solid #000A07;
    background-color: #CCEBEB;
    color: black;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    font-size: clamp(0.875rem, 1vw, 1rem);
    cursor: pointer;
    margin-top: 1rem;
    box-shadow:
    0px 2px 2px 0px rgba(0, 0, 0, 0.15),
    0px -5px 0px 0px rgba(0, 0, 0, 0.15) inset,
    0px 4px 0px 0px rgba(255, 255, 255, 0.2) inset;
}
.register-text {
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    font-size: clamp(0.875rem, 1vw, 1rem);
    line-height: 1.5;
    margin-top: 1.5rem;
    text-align: center;
}
.register-link {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: clamp(0.875rem, 1vw, 1rem);
  line-height: 1.5;
  margin-left: 0.25rem;
}
.register-link a {
  text-decoration: none;
  color: rgba(0, 158, 158, 1);
}

/* ======== Responsive ======== */
@media (max-width: 1023px) {
  .login-box { width: 60vw; height: auto; padding: 2rem; }
  .login-title { text-align: center; }
  .login-subtitle { text-align: center; }
}
@media (max-width: 768px) {
  .login-box { width: 85%; padding: 1.5rem; align-items: center; }
  .login-form { width: 100%; }
  .input-group { margin-bottom: 1rem; }
  .forgot-password { position: static; text-align: right; margin-top: -0.5rem; display: block; }
  .toggle-password { right: 0.75rem; top: 45%; transform: translateY(70%); }
  .login-btn { height: 38px; font-size: 0.875rem; }
  .register-text { font-size: 0.85rem; }
}
@media (max-width: 480px) {
  .login-box { width: 90%; padding: 1rem; border-radius: 1rem; }
  .login-title { font-size: 1.25rem; }
  .login-subtitle { font-size: 0.85rem; }
  input[type="email"], input[type="password"] { font-size: 0.8rem; }
  .forgot-password { font-size: 0.75rem; }
  .login-btn { height: 36px; font-size: 0.8rem; }
  .register-text { font-size: 0.8rem; }
}
</style>
