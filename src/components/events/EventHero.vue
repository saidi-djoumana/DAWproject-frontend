<template>
  <section class="events-hero">
    <div class="container">
      <div class="left">
        <h1 class="title">Explore Scientific Health Events</h1>
      </div>

      <div class="right">
        <p class="subtitle">
          Discover, join, and organize academic events around the world.
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
}

/* Left Title */
.title {
  font-family: 'Poppins', sans-serif;
  font-size: 60px;
  font-weight: 500;
  line-height: 1.2;
}

/* Right Subtitle */
.subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  line-height: 1.6;
  max-width: 450px;
}
.right {
  justify-self: end;
}
</style>
