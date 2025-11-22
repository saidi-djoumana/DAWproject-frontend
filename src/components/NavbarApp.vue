<template>
  <nav class="navbar">
    <div class="container">
      <!-- Left link -->
      <router-link to="/events" class="nav-link">Events</router-link>

      <!-- Center logo -->
      <router-link to="/" class="logo-wrapper">
        <img src="@/assets/logo.png" alt="Logo" class="logo" />
      </router-link>

      <!-- Hamburger icon for mobile -->
      <div class="hamburger" @click="toggleMenu">
        <span :class="{ 'open': menuOpen }"></span>
        <span :class="{ 'open': menuOpen }"></span>
        <span :class="{ 'open': menuOpen }"></span>
      </div>

      <!-- Right buttons -->
      <div class="nav-buttons" :class="{ 'open': menuOpen }">
        <router-link to="/auth/register" class="btn-signup">Sign up</router-link>
        <router-link to="/auth/login" class="btn-signin">Sign in</router-link>
      </div>
    </div>
  </nav>
</template>


<script setup>
import { ref } from 'vue';

const menuOpen = ref(false);
function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}
</script>


<style scoped>
.navbar {
  background-color: #F2F2F2;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  height: clamp(4rem, 6vw, 4.5rem);
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
}

/* Left link */
.nav-link {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: #001F36;
  text-decoration: none;
  flex-shrink: 0;
}

/* Center logo */
.logo-wrapper {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  height: 40px;
  object-fit: contain;
}

/* Right buttons */
.nav-buttons {
  display: flex;
  gap: 1.25rem;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

/* Hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 25px;
  height: 18px;
  cursor: pointer;
}

.hamburger span {
  display: block;
  height: 3px;
  width: 100%;
  background: #001F36;
  border-radius: 3px;
  transition: 0.3s;
}

.hamburger span.open:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger span.open:nth-child(2) {
  opacity: 0;
}

.hamburger span.open:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* ===== Buttons styling ===== */
/* ===== Buttons styling with shadows ===== */
.btn-signup {
  background-color: #CCEBEB;
  color: black;
  padding: 8px 20px;
  border-radius: 100px;
  font-family: 'Inter', sans-serif;
  text-decoration: none;
  border: 1px solid #000A07;
  box-shadow: 
    0 4px 6px rgba(0,0,0,0.1),  /* soft outer shadow */
    0 2px 4px rgba(0,0,0,0.06) inset; /* subtle inset */
  transition: all 0.2s ease;
}

.btn-signup:hover {
  box-shadow: 
    0 6px 10px rgba(0,0,0,0.15), 
    0 3px 6px rgba(0,0,0,0.1) inset;
  transform: translateY(-2px);
}

.btn-signin {
  background-color: #F2F2F2;
  color: black;
  padding: 8px 20px;
  border-radius: 100px;
  font-family: 'Inter', sans-serif;
  text-decoration: none;
  border: 1px solid #000A07;
  box-shadow: 
    0 4px 6px rgba(0,0,0,0.1), 
    0 2px 4px rgba(0,0,0,0.06) inset;
  transition: all 0.2s ease;
}

.btn-signin:hover {
  box-shadow: 
    0 6px 10px rgba(0,0,0,0.15), 
    0 3px 6px rgba(0,0,0,0.1) inset;
  transform: translateY(-2px);
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .nav-buttons {
    position: absolute;
    top: 100%;
    right: 0;
    background: white;
    flex-direction: column;
    width: 150px;
    gap: 0.5rem;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
    opacity: 0;
    pointer-events: none;
    transform: translateY(-10px);
  }

  .nav-buttons.open {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }

  .hamburger {
    display: flex;
  }
}

</style>
