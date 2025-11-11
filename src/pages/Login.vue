<template>
    <div class="login-box">
      <!-- Heading -->
        <h5 class="login-title">Welcome back</h5>
        <p class="login-subtitle">Sign in with your existing CuraLink account.</p>

      <!-- Form -->
        <form class="login-form">
            <div class="input-group">
                <label for="email" class="input-label">email</label>
                <input type="email" id="email" required />
            </div>

            <div class="input-group password-group">
                <label for="password" class="input-label">Password</label>
                <router-link to="#" class="forgot-password">Forget password?</router-link>
                <input
                    :type="showPassword ? 'text' : 'password'"
                    id="password"
                    required
                />
                <!-- Font Awesome eye icon -->
                <i
                    class="fa-regular fa-eye toggle-password"
                    @click="showPassword = !showPassword"
                ></i>
            </div>


            <button type="submit" class="login-btn">Log in</button>
            
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

const showPassword = ref(false)
</script>


<style scoped>

.login-box {
  width: clamp(300px, 40vw, 532px);
  height: clamp(350px, 50vh, 464px);
  background: white;
  border-radius: 1.875rem; /* 30px */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 2.5rem;
  
}
.login-form{
    width: 100%;
}

/* Heading "Welcome back" */
.login-title {
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: clamp(1.25rem, 2vw, 1.5rem); /* Heading 5 responsive */
  line-height: 1.4;
  letter-spacing: -1%;
  margin-bottom: 0rem;
}

/* Subtitle paragraph */
.login-subtitle {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: clamp(0.875rem, 1.5vw, 1rem); /* Text Regular responsive */
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
  font-size: clamp(0.75rem, 1vw, 0.875rem); /* Text Small */
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
  padding: 0.75rem 2.5rem 0.75rem 1rem; /* right padding for eye */
  font-size: clamp(0.75rem, 1vw, 0.875rem);
  line-height: 1.5;
  border-radius: 0.75rem;
  border: 1px solid #ccc;
  box-sizing: border-box;
  min-height: 2.5rem; /* optional: ensures it won’t shrink below original size */
}


.forgot-password {
  position: absolute;
  top: 0;
  right: 0;
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: clamp(0.75rem, 1vw, 0.875rem); /* Text Small */
  line-height: 1.5;
  color: rgba(0, 158, 158, 1);
  text-decoration: none;
}

/* Inputs */
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
  outline: none; /* remove default browser outline */
  border-color: rgba(0, 158, 158, 1);
  box-shadow: 0 0 0 2px rgba(0, 158, 158, 0.2); /* optional subtle glow */
}


/* Login button */
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

/* Register text */
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
</style>
