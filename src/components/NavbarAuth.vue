<template>
  <nav class="navbar">
    <div class="container">
      <router-link to="/" class="logo-wrapper">
        <img src="@/assets/logo.png" alt="Logo" class="logo" />
      </router-link>
    </div>
  </nav>
</template>




<style scoped>

.navbar {
  background: transparent;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  height: clamp(4rem, 6vw, 4.5rem);
  display: flex;
  align-items: center;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 48px;
  display: flex;
  align-items: center;
}

/* Logo wrapper ensures proper click area */
.logo-wrapper {
  display: flex;
  align-items: center;
}

.logo {
  height: 2.5rem;
  object-fit: contain;
}

/* ========= RESPONSIVE ========= */

/* Tablet */
@media (max-width: 1024px) {
  .container {
    padding: 0 32px;
  }
  .logo {
    height: 2.2rem;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .navbar {
    height: 3.8rem;
  }

  .container {
    padding: 0 20px;
    justify-content: center;
  }

  .logo {
    height: 2rem;
  }
}

/* Small Mobile */
@media (max-width: 480px) {
  .container {
    padding: 0 14px;
  }

  .logo {
    height: 1.8rem;
  }
}





</style>
