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
import api from '@/api/userAxios'
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
  return t.charAt(0).toUpperCase() + t.slice(1)
})

const toStorageUrl = (img) => {
  if (!img) return null
  if (img.startsWith('http://') || img.startsWith('https://')) return img

  const clean = img.replace(/^\/+/, '')
  if (clean.startsWith('storage/')) return `http://127.0.0.1:8000/${clean}`
  return `http://127.0.0.1:8000/storage/${clean}`
}

const fetchEvents = async () => {
  try {
    const response = await api.get('/events')

    if (response.data.success) {
      originalEvents.value = response.data.data.map((event) => {
        const backendImg = toStorageUrl(event.image)

        // if backend didn't provide image, try a convention URL
        // (may 404, we'll handle fallback in EventCard via @error)
        const guessedImg = `http://127.0.0.1:8000/storage/events/event-${event.id}.jpg`

        return {
          ...event,
          date: `${new Date(event.start_date).toLocaleDateString()} – ${new Date(
            event.end_date
          ).toLocaleDateString()}`,
          tag: event.type.charAt(0).toUpperCase() + event.type.slice(1),

          // choose backend image if exists, otherwise guessed, otherwise default (rare)
          image: backendImg || guessedImg || defaultImage,

          // ✅ pass default too (so EventCard can fallback cleanly)
          fallbackImage: defaultImage
        }
      })

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
