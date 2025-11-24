<template>
  <div>
    <EventFilters
      :events="originalEvents"
      @update:filtered="filteredEvents = $event"
    />

    <div class="events-list">
      <EventCard
        v-for="event in filteredEvents"
        :key="event.id"
        :event="event"
      />
    </div>
  </div>
</template>

<script setup>
import EventCard from './EventCard.vue'
import EventFilters from './EventsFilters.vue'
import hero1 from '@/assets/hero1.png'
import hero2 from '@/assets/hero2.png'
import hero3 from '@/assets/conferences.png'

const originalEvents = [
  {
    id: 1,
    title: 'International Conference on Medical Data Science 2025',
    tag: 'Conference',
    location: 'Université Constantine 2',
    date: 'June 15–18, 2025',
    image: hero1
  },
  {
    id: 2,
    title: 'AI in Healthcare Workshop 2025',
    tag: 'Workshop',
    location: 'Université Algiers',
    date: 'July 2–4, 2025',
    image: hero2
  },
  {
    id: 3,
    title: 'Global Health Congress 2025',
    tag: 'Congress',
    location: 'Université Oran',
    date: 'August 10–12, 2025',
    image: hero3
  }
]

import { ref } from 'vue'
const filteredEvents = ref([...originalEvents])
</script>

<style scoped>
.events-list {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
}
</style>
