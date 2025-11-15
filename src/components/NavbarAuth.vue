<template>
    <nav class="navbar">
        <div class="container">
            <img src="@/assets/logo.png" alt="Logo" class="logo" />
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
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 64px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.logo {
  height: 70%;
  object-fit: contain;
}



/* ======== Responsive ======== */

/* Tablet */
@media (max-width: 1024px) {
  .container {
    padding: 0 32px;
  }

  .logo {
    height: 60%;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .navbar {
    height: clamp(3.5rem, 6vw, 4rem);
    justify-content: center;
  }

  .container {
    padding: 0 20px;
    justify-content: center;
  }

  .logo {
    height: 50%;
  }
}

/* Small Mobile */
@media (max-width: 480px) {
  .container {
    padding: 0 12px;
  }

  .logo {
    height: 40%;
  }
}




</style>
