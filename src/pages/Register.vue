<template>
  <div class="login-box">
    <!-- Heading -->
    <h5 class="login-title">Sign up</h5>
    <p class="login-subtitle">Create your CuraLink account.</p>

    <!-- Form -->
    <form class="login-form" @submit.prevent="register">

      <!-- Name -->
      <div class="input-group">
        <label for="name" class="input-label">Full Name</label>
        <input v-model="name" type="text" id="name" required />
      </div>

      <!-- Email -->
      <div class="input-group">
        <label for="email" class="input-label">Email</label>
        <input v-model="email" type="email" id="email" required />
      </div>

      <!-- Role -->
      <div class="input-group">
        <label for="role" class="input-label">Which best describes your role?</label>
        <select v-model="role" id="role" required>
          <option value="" disabled>Select your role</option>
          <option value="event-organizer">Event Organizer</option>
          <option value="communicator">Communicator</option>
          <option value="scientific-committee">Member of the Scientific Committee</option>
          <option value="participant">Participant</option>
          <option value="guest-speaker">Guest / Speaker</option>
          <option value="workshop-facilitator">Workshop Facilitator</option>
        </select>
      </div>

      <!-- Password -->
      <div class="input-group password-group">
        <label for="password" class="input-label">Password</label>
        <input
          v-model="password"
          :type="showPassword1 ? 'text' : 'password'"
          id="password"
          required
        />
        <i
          class="fa-regular fa-eye toggle-password"
          @click="showPassword1 = !showPassword1"
        ></i>
      </div>

      <!-- Confirm Password -->
      <div class="input-group password-group">
        <label for="confirmPassword" class="input-label">Confirm Password</label>
        <input
          v-model="confirmPassword"
          :type="showPassword2 ? 'text' : 'password'"
          id="confirmPassword"
          required
        />
        <i
          class="fa-regular fa-eye toggle-password"
          @click="showPassword2 = !showPassword2"
        ></i>
      </div>

      <!-- Error message -->
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

      <!-- Submit button -->
      <button type="submit" class="login-btn">Sign up</button>

    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '@/api/axios.js'  // your Axios instance

// reactive variables
const name = ref('')
const email = ref('')
const role = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword1 = ref(false)
const showPassword2 = ref(false)
const errorMessage = ref('')

// register function
const register = async () => {
  // simple client-side validation
  if (password.value !== confirmPassword.value) {
    errorMessage.value = "Passwords do not match."
    return
  }

  try {
    const response = await api.post('/register', {
      name: name.value,
      email: email.value,
      role: role.value,
      password: password.value,
      password_confirmation: confirmPassword.value
    })

    console.log('Register success:', response.data)
    // store token and redirect
    const token = response.data.token
    localStorage.setItem('authToken', token)
    window.location.href = '/dashboard'

  } catch (error) {
    console.error('Register failed:', error)
    errorMessage.value = error.response?.data?.message || 'An error occurred during registration.'
  }
}
</script>



<style scoped>
.login-box {
  width: clamp(300px, 40vw, 532px);
  height: auto; /* let it grow with content */
  background: white;
  border-radius: 1.875rem; /* 30px */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding:2.5rem;
}

.login-form {
  width: 100%;
}

/* Heading */
.login-title {
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-size: clamp(1.25rem, 2vw, 1.5rem);
    line-height: 1.4;
    letter-spacing: -1%;
    margin: 0rem;
}

/* Subtitle paragraph */
.login-subtitle {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: clamp(0.875rem, 1.5vw, 1rem);
  line-height: 1.5;
  letter-spacing: 0%;
  margin-bottom: 2rem;
  text-align: center;
}

/* Input groups */
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

/* Password groups with eye toggle */
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
  padding: 0.75rem 2.5rem 0.75rem 1rem; /* space for eye */
  font-size: clamp(0.75rem, 1vw, 0.875rem);
  line-height: 1.5;
  border-radius: 0.75rem;
  border: 1px solid #ccc;
  box-sizing: border-box;
  min-height: 2.5rem;
}

/* Inputs general */
input[type="text"],
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

input:focus {
  outline: none;
  border-color: rgba(0, 158, 158, 1);
  box-shadow: 0 0 0 2px rgba(0, 158, 158, 0.2);
}

select {
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid #ccc;
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: clamp(0.75rem, 1vw, 0.875rem);
  line-height: 1.5;
  background-color: white;
}

select:focus {
  outline: none;
  border-color: rgba(0, 158, 158, 1);
  box-shadow: 0 0 0 2px rgba(0, 158, 158, 0.2);
}


/* Register button */
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


/* ======== Responsive ======== */

/* Tablet screens (max-width: 1024px) */
@media (max-width: 1024px) {
  .login-box {
    width: 60vw;
    padding: 2rem;
  }

  .login-title,
  .login-subtitle {
    text-align: center;
  }

  .input-group {
    margin-bottom: 1.2rem;
  }

  .toggle-password {
    right: 0.75rem;
    top: 45%;
  }

  select {
    font-size: 0.9rem;
  }
}

/* Mobile screens (max-width: 768px) */
@media (max-width: 768px) {
  .login-box {
    width: 85%;
    padding: 1.5rem;
    align-items: center;
  }

  .login-form {
    width: 100%;
  }

  .input-group {
    margin-bottom: 1rem;
  }

  .toggle-password {
    right: 0.5rem;
    top: 45%;
     transform: translateY(70%);
  }

  .login-btn {
    height: 38px;
    font-size: 0.875rem;
  }

  select {
    font-size: 0.85rem;
  }
}

/* Small mobile screens (max-width: 480px) */
@media (max-width: 480px) {
  .login-box {
    width: 90%;
    padding: 1rem;
    border-radius: 1rem;
  }

  .login-title {
    font-size: 1.25rem;
  }

  .login-subtitle {
    font-size: 0.85rem;
  }

  input[type="text"],
  input[type="email"],
  input[type="password"],
  select {
    font-size: 0.8rem;
  }

  .toggle-password {
    font-size: 0.9rem;
  }

  .login-btn {
    height: 36px;
    font-size: 0.8rem;
  }
}


</style>