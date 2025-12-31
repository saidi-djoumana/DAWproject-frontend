<template>
  <EventHero />

  <section class="events-content">
    <div class="container">
      <EventsList />
    </div>
  </section>
</template>

<script setup>
import EventHero from '@/components/events/EventHero.vue'
import EventsList from '@/components/events/EventsList.vue'
</script>

<style scoped>
.events-content {
  padding: 60px 0;
  background: #fff;
}

.container {
  width: 90%;
  max-width: 1400px;
  margin: 0 auto;
  /* let EventsList handle layout, no display: grid */
}
</style>
