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
import { ref, onMounted } from 'vue'
import api from '@/api/axios'
import EventCard from './EventCard.vue'
import EventFilters from './EventsFilters.vue'

// Default image in case the event doesn't have one
import defaultImage from '@/assets/default-event.png'

const originalEvents = ref([])
const filteredEvents = ref([])

// Fetch events from backend
const fetchEvents = async () => {
  try {
    const response = await api.get('/events')
    if (response.data.success) {
      originalEvents.value = response.data.data.map(event => ({
        ...event,
        // Format dates for display
        date: `${new Date(event.start_date).toLocaleDateString()} – ${new Date(event.end_date).toLocaleDateString()}`,
        tag: event.type.charAt(0).toUpperCase() + event.type.slice(1),
        // Use backend image if exists, otherwise default
        image: event.image ? `http://127.0.0.1:8000${event.image}` : defaultImage
      }))
      filteredEvents.value = [...originalEvents.value]
    }
  } catch (error) {
    console.error('Error fetching events:', error)
  }
}

onMounted(() => {
  fetchEvents()
})
</script>

<style scoped>
.events-list {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
}
</style>
