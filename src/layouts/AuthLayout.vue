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
  min-height: 100vh;
  background-color: rgb(242, 242, 242);
  overflow: hidden;
}

.auth-content {
  flex:1;
  display: flex;
  justify-content: center;  /* center horizontally */
  align-items: center;      /* center vertically */
  z-index: 1;               /* above gradients */
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
</style>