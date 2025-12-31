<template>
  <footer class="footer">
    <!-- Logo -->
    <div class="footer-logo">
      <img src="@/assets/logo.png" alt="CuraLink Logo" class="logo-img" />
    </div>

    <!-- Menu links -->
    <nav class="footer-links">
      <router-link to="/events">Events</router-link>
      <router-link to="/research">Research</router-link>
      <router-link to="/community">Community</router-link>
      <router-link to="/contact">Contact</router-link>
      <router-link to="/about">About</router-link>
    </nav>

    <!-- Divider -->
    <div class="footer-divider"></div>

    <!-- Bottom row -->
    <div class="footer-bottom">
      <p class="footer-copy">© 2025 CuraLink. All rights reserved.</p>

      <div class="footer-policies">
        <router-link to="/privacy-policy">Privacy Policy</router-link>
        <router-link to="/terms-of-service">Terms of Service</router-link>
      </div>
    </div>
  </footer>
</template>

<script setup>
/* Composition API — no logic needed for static footer */
</script>

<style scoped>
.footer {
  padding: 80px 20px;
  font-family: 'Poppins', 'Inter', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #000;
  gap: 0; /* remove overall gap to control individually */
}

.footer-logo {
  margin-bottom: 35px; /* 30px space between logo and links */
}
.footer-logo .logo-img {
  width: 120px;
}

.footer-links {
  display: flex;
  gap: 30px;
  margin-bottom: 80px; /* 60px space between links and divider */
  flex-wrap: wrap;
}

.footer-links a {
  text-decoration: none;
  font-size: 15px;
  color: #000;
}

.footer-links a:hover {
  color: #000;
}

/* Divider */
.footer-divider {
  width: 100%;
  height: 1px;
  background: #000;
  margin-bottom: 20px; /* optional spacing after line */
}

/* Bottom row */
.footer-bottom {
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  flex-wrap: wrap;
  gap: 10px;
}

.footer-copy {
  color: #000;
}

.footer-policies {
  display: flex;
  gap: 25px;
}

.footer-policies a {
  text-decoration: none;
  color: #000;
}

.footer-policies a:hover {
  color: #000;
}

/* ---------- MOBILE VERSION: EVERYTHING STACKED ---------- */
@media (max-width: 600px) {
  .footer {
    padding: 35px 15px;
    align-items: center;
    text-align: center;
  }

  .footer-logo {
    margin-bottom: 20px; /* slightly smaller spacing for mobile */
  }

  .footer-links {
    flex-direction: column;     /* stack menu links */
    gap: 12px;
    margin-bottom: 30px; /* space between links and divider on mobile */
  }

  .footer-bottom {
    flex-direction: column;     /* stack bottom section */
    align-items: center;
    text-align: center;
  }

  .footer-policies {
    flex-direction: column;     /* stack policy links */
    gap: 10px;
  }
}

</style>

