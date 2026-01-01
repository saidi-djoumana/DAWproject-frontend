<template>
  <div>
    <EventFilters
      :events="originalEvents"
      :initial-type="initialTypeTag"
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
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/api/axios'
import EventCard from './EventCard.vue'
import EventFilters from './EventsFilters.vue'
import defaultImage from '@/assets/default-event.png'

const route = useRoute()

const originalEvents = ref([])
const filteredEvents = ref([])

const allowedTypes = new Set(['congress', 'seminar', 'workshop', 'conference'])

const initialTypeTag = computed(() => {
  const t = String(route.query.type || '').toLowerCase()
  if (!allowedTypes.has(t)) return ''
  return t.charAt(0).toUpperCase() + t.slice(1) // "conference" -> "Conference"
})

const fetchEvents = async () => {
  try {
    const response = await api.get('/events')
    if (response.data.success) {
      originalEvents.value = response.data.data.map(event => ({
        ...event,
        date: `${new Date(event.start_date).toLocaleDateString()} – ${new Date(event.end_date).toLocaleDateString()}`,
        tag: event.type.charAt(0).toUpperCase() + event.type.slice(1),
        image: event.image ? `http://127.0.0.1:8000${event.image}` : defaultImage
      }))

      // Let EventFilters emit the real filtered list,
      // but keep a safe default in case.
      filteredEvents.value = [...originalEvents.value]
    }
  } catch (error) {
    console.error('Error fetching events:', error)
  }
}

onMounted(fetchEvents)
</script>

<style scoped>
.events-list {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
}
</style>
