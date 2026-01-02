<template>
  <section class="events-hero">
    <div class="container">
      <div class="left">
        <h1 class="title">Super Admin</h1>
      </div>

      <div class="right">
        <p class="subtitle">
          Start your journey as a super admin now!
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
</script> 

<style scoped>
.events-hero {
  background-color: #F2F2F2;
  padding: 80px 0;
  color: #001F36;
}

/* Grid */
.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;

  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 40px;
  height: 30vh;
}

/* Left Title */
.title {
  font-family: 'Poppins', sans-serif;
  font-size: clamp(32px, 6vw, 60px);
  font-weight: 500;
  line-height: 1.2;
  max-width: 90%;
}

/* Right Subtitle */
.subtitle {
  font-family: 'Inter', sans-serif;
  font-size: clamp(16px, 2vw, 20px);
  line-height: 1.6;
  max-width: 450px;
}

.right {
  justify-self: end;
}

@media(max-width:1024px){
    .title {
        max-width: 100%;
    }
    .subtitle {
        max-width: 100%;
    }
}

/* 📱 Tablet */
@media (max-width: 992px) {
  .events-hero {
    padding: 60px 0;
  }

  .container {
    grid-template-columns: 1fr;
    text-align: left;     /* ⭐ keep text aligned left */
    gap: 0px;
  }

  .right {
    justify-self: start;  /* ⭐ align right section to the left */
  }

  .subtitle {
    margin: 20px 0 0 0;   /* ⭐ remove center auto */
  }
}

/* 📱 Mobile */
@media (max-width: 600px) {
  .events-hero {
    padding: 50px 0;
  }

  .container {
    gap: 0px;
  }

  .title {
    max-width: 100%;
  }

  .subtitle {
    max-width: 90%;
  }
}
</style>
