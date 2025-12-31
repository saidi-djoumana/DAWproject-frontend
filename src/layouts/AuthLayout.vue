<template>
  <div class="auth-page">
    <NavbarAuth />
    <div class="gradient top-left"></div>
    <div class="gradient bottom-right"></div>
    <!-- Page content goes here -->
    <div class="auth-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import NavbarAuth from '@/components/NavbarAuth.vue';
</script>

<style scoped>
.auth-page {
  position: relative;
  display: flex;           
  flex-direction: column;  
  height: 100vh;
  background-color: rgb(242, 242, 242);
  overflow: hidden;
}

.auth-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem; /* small horizontal padding for mobile */
  min-height: 100vh;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
}




.gradient {
  position: fixed;
  width: 60%;
  height: 60%;
  z-index: 0;
  pointer-events: none;
}

.top-left {
  top: 0;
  left: 0;
  background: radial-gradient(
    ellipse 100% 100% at top left,
    #E5F5F5 0%,
    rgba(229, 245, 245, 0.5) 25%,
    rgba(229, 245, 245, 0.2) 50%,
    rgba(255, 255, 255, 0) 75%
  );
}

.bottom-right {
  bottom: 0;
  right: 0;
  background: radial-gradient(
    ellipse 100% 100% at bottom right,
    #E5F5F5 0%,
    rgba(229, 245, 245, 0.5) 25%,
    rgba(229, 245, 245, 0.2) 50%,
    rgba(255, 255, 255, 0) 75%
  );
}



/* ======== Responsive ======== */

/* Tablet */
@media (max-width: 1024px) {
  .gradient {
    width: 80%;
    height: 80%;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .auth-content {
    padding: 2rem 1rem;
  }

  .gradient {
    width: 100%;
    height: 100%;
    opacity: 0.4; /* softer background on small screens */
  }
}

/* Small mobile */
@media (max-width: 480px) {
  .auth-content {
    padding: 1rem;
  }

  .gradient {
    display: none; /* hide gradients for better performance and clarity */
  }
}

</style>