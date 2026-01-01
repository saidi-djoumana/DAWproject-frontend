<template>
  <section class="events-section">
    <div class="e-container">
      <h2 class="section-title">My Events</h2>

      <div v-if="loading" class="loading">Loading events...</div>

      <div v-else-if="events.length === 0" class="empty-state">
        You have not created any events yet.
      </div>

      <div v-else class="events-grid">
        <div v-for="event in events" :key="event.id" class="event-card">
          <h3 class="event-title">{{ event.title }}</h3>
          <p class="event-description">{{ event.description }}</p>
          <p class="event-date">
            Date: {{ formatDate(event.start_date) }} - {{ formatDate(event.end_date) }}
          </p>
          <p class="event-type">Type: {{ capitalize(event.type) }}</p>

          <!-- actions row -->
          <div class="event-actions">
            <a class="event-details" @click="openEventDetails(event)">Details</a>

            <span class="divider">•</span>

            <button
              class="event-delete"
              :disabled="deletingId === event.id"
              @click="deleteEvent(event.id)"
              title="Delete this event"
            >
              {{ deletingId === event.id ? 'Deleting…' : 'Delete' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <EventDetails
      :is-open="isModalOpen"
      :event-data="selectedEvent"
      @close="closeEventDetails"
    />
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import EventDetails from './EventDetails.vue'
import api from '@/api/userAxios'

const events = ref([])
const loading = ref(true)
const deletingId = ref(null)

const isModalOpen = ref(false)
const selectedEvent = ref(null)
const currentUser = ref(null)

const fetchMyEvents = async () => {
  loading.value = true
  try {
    // Fetch current logged-in organizer
    const userRes = await api.get('/me')
    currentUser.value = userRes.data?.data
    console.log('[Organizer/Events] /me response:', userRes.data)

    // Fetch all events then filter by organizer_id
    const eventsRes = await api.get('/events')
    console.log('[Organizer/Events] /events response:', eventsRes.data)

    const allEvents = eventsRes.data?.data || []
    const organizerId = currentUser.value?.user?.id

    if (!organizerId) {
      console.warn('[Organizer/Events] organizerId missing from /me response:', currentUser.value)
      events.value = []
      return
    }

    events.value = allEvents.filter(e => e.organizer_id === organizerId)
    console.log('[Organizer/Events] filtered events:', events.value)
  } catch (err) {
    console.error('[Organizer/Events] fetchMyEvents error:', err)
    events.value = []
  } finally {
    loading.value = false
  }
}

const deleteEvent = async (eventId) => {
  const ok = window.confirm('Are you sure you want to delete this event? This cannot be undone.')
  if (!ok) return

  deletingId.value = eventId
  try {
    console.log('[Organizer/Events] DELETE /events/' + eventId)

    const res = await api.delete(`/events/${eventId}`)
    console.log('[Organizer/Events] delete response:', res.data)

    if (res.data?.success) {
      // remove from UI
      events.value = events.value.filter(e => e.id !== eventId)

      // if modal is open for deleted event, close it
      if (selectedEvent.value?.id === eventId) closeEventDetails()

      alert('Event deleted successfully.')
    } else {
      alert(res.data?.message || 'Failed to delete event.')
    }
  } catch (err) {
    console.error('[Organizer/Events] deleteEvent error:', err)

    const status = err.response?.status
    const msg =
      err.response?.data?.message ||
      (status === 403 ? 'You are not allowed to delete this event.' :
      status === 401 ? 'Authentication error. Please login again.' :
      'An error occurred while deleting the event.')

    alert(msg)
  } finally {
    deletingId.value = null
  }
}

const openEventDetails = (event) => {
  selectedEvent.value = event
  isModalOpen.value = true
}

const closeEventDetails = () => {
  isModalOpen.value = false
  selectedEvent.value = null
}

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return isNaN(date.getTime()) ? '' : date.toLocaleDateString()
}

const capitalize = (str) => (str ? str.charAt(0).toUpperCase() + str.slice(1) : '')

onMounted(fetchMyEvents)
</script>

<style scoped>
.events-section {
  padding: 40px 0;
}

.e-container {
  width: 90%;
  max-width: 1340px;
  margin: 0 auto;
}

.section-title {
  font-family: 'Poppins', sans-serif;
  font-size: 36px;
  font-weight: 600;
  color: #000;
  margin-bottom: 40px;
}

.loading,
.empty-state {
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: #666;
  padding: 40px;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.event-card {
  background-color: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.event-title {
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #000;
  margin: 0;
}

.event-description,
.event-date,
.event-type {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #666;
  margin: 0;
  line-height: 1.5;
}

.event-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

.event-details {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #3B82F6;
  text-decoration: none;
  transition: color 0.3s;
}

.event-details:hover {
  color: #0052a3;
  text-decoration: underline;
  cursor: pointer;
}

.divider {
  color: #999;
  font-size: 12px;
}

.event-delete {
  background: none;
  border: none;
  padding: 0;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #EF4444; /* red */
  cursor: pointer;
  transition: color 0.2s, opacity 0.2s;
}

.event-delete:hover {
  color: #dc2626;
  text-decoration: underline;
}

.event-delete:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  text-decoration: none;
}

/* Tablet */
@media (max-width: 992px) {
  .events-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  .section-title {
    font-size: 32px;
    margin-bottom: 32px;
  }
}

/* Mobile */
@media (max-width: 600px) {
  .events-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .section-title {
    font-size: 28px;
    margin-bottom: 24px;
  }
}
</style>
