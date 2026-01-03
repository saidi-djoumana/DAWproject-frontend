<template>
  <div>
    <EventFilters
      :events="originalEvents"
      :initial-type="initialTypeTag"
      @update:filtered="onFilteredUpdate"
    />

    <div class="events-list">
      <EventCard
        v-for="event in paginatedEvents"
        :key="event.id"
        :event="event"
      />
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="pagination">
      <button
        class="page-btn"
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
      >
        Prev
      </button>

      <button
        v-for="p in visiblePages"
        :key="p"
        class="page-btn"
        :class="{ active: p === currentPage }"
        @click="goToPage(p)"
      >
        {{ p }}
      </button>

      <button
        class="page-btn"
        :disabled="currentPage === totalPages"
        @click="goToPage(currentPage + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/api/userAxios'
import EventCard from './EventCard.vue'
import EventFilters from './EventsFilters.vue'
import defaultImage from '@/assets/default-event.png'

const route = useRoute()

const originalEvents = ref([])
const filteredEvents = ref([])

// pagination state
const currentPage = ref(1)
const pageSize = ref(6) // ✅ change to 8/9/12 if you want

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

        // If backend didn't provide image, try a convention URL
        // (may 404, we'll handle fallback in EventCard via @error)
        const guessedImg = `http://127.0.0.1:8000/storage/events/event-${event.id}.jpg`

        return {
          ...event,
          date: `${new Date(event.start_date).toLocaleDateString()} – ${new Date(
            event.end_date
          ).toLocaleDateString()}`,
          tag: event.type.charAt(0).toUpperCase() + event.type.slice(1),
          image: backendImg || guessedImg || defaultImage,
          fallbackImage: defaultImage
        }
      })

      filteredEvents.value = [...originalEvents.value]
      currentPage.value = 1
    }
  } catch (error) {
    console.error('Error fetching events:', error)
  }
}

onMounted(fetchEvents)

// ✅ called when EventFilters emits new list
const onFilteredUpdate = (list) => {
  filteredEvents.value = list
  currentPage.value = 1 // reset to first page after filtering
}

const totalPages = computed(() => {
  const total = filteredEvents.value.length
  return Math.max(1, Math.ceil(total / pageSize.value))
})

const paginatedEvents = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredEvents.value.slice(start, start + pageSize.value)
})

const goToPage = (p) => {
  const page = Math.min(Math.max(1, p), totalPages.value)
  currentPage.value = page
}

// optional: keep currentPage valid if filtered list changes
watch(
  () => filteredEvents.value.length,
  () => {
    if (currentPage.value > totalPages.value) currentPage.value = totalPages.value
  }
)

// Show up to 5 page buttons (centered around current page)
const visiblePages = computed(() => {
  const total = totalPages.value
  const cur = currentPage.value
  const maxButtons = 5

  if (total <= maxButtons) return Array.from({ length: total }, (_, i) => i + 1)

  let start = cur - 2
  let end = cur + 2

  if (start < 1) {
    start = 1
    end = maxButtons
  }
  if (end > total) {
    end = total
    start = total - maxButtons + 1
  }

  const pages = []
  for (let i = start; i <= end; i++) pages.push(i)
  return pages
})
</script>

<style scoped>
.events-list {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
}

/* Pagination */
.pagination {
  margin-top: 28px;
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.page-btn {
  background: #CCEBEB; /* ✅ light green */
  border: 1px solid #c0e9e9;
  padding: 10px 14px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.05s ease, opacity 0.2s ease;
}

.page-btn:hover {
  transform: translateY(-1px);
}

.page-btn.active {
  background: #c4e6e6;
  border-color: #c4e6e6;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}
</style>
