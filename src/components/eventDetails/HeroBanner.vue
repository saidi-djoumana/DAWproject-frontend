<template>
  <div class="hero">
    <div class="banner">
      <img
        :src="currentSrc"
        alt="Event banner"
        @error="useFallback"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import defaultImage from '@/assets/default-event.png'

const props = defineProps({
  eventId: {
    type: [String, Number],
    required: true
  }
})

// initial image = event image from storage
const currentSrc = ref(
  `http://127.0.0.1:8000/storage/events/event-${props.eventId}.jpg`
)

// if event image does not exist → use default
const useFallback = () => {
  currentSrc.value = defaultImage
}
</script>

<style scoped>
.hero {
  width: 100%;
  background: #ffffff;
  padding: 26px 0 10px;
}

.banner {
  max-width: 1120px;
  height: 260px;
  margin: 0 auto;
  border-radius: 18px;
  overflow: hidden;
  background: #d9d9d9;
}

/* image */
.banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* RESPONSIVE */
@media (max-width: 980px) {
  .banner {
    height: 200px;
    margin: 0 18px;
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 20px 0 8px;
  }

  .banner {
    height: 180px;
    margin: 0 15px;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 15px 0 6px;
  }

  .banner {
    height: 150px;
    margin: 0 10px;
  }
}
</style>
