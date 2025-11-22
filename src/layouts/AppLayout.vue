<template>
  <div class="app-page">
    <NavbarApp />
    <div class="app-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import NavbarApp from '@/components/NavbarApp.vue';
</script>

<style scoped>
.app-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

.app-content {
  margin-top: clamp(4rem, 6vw, 4.5rem);
}
</style>
