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
          <a class="event-details" @click="openEventDetails(event)">Details</a>
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
import api from '@/api/userAxios' // axios instance with token interceptor

const events = ref([])
const loading = ref(true)
const isModalOpen = ref(false)
const selectedEvent = ref(null)
const currentUser = ref(null)

const fetchMyEvents = async () => {
  loading.value = true
  try {
    // Fetch current logged-in organizer
    const userRes = await api.get('/me')
    currentUser.value = userRes.data.data
    console.log('Current logged-in user:', currentUser.value)

    // Fetch all events (backend returns all)
    const eventsRes = await api.get('/events')
    console.log('All events from backend:', eventsRes.data.data)

    // Filter only events created by this organizer
    events.value = eventsRes.data.data.filter(
      e => e.organizer_id === currentUser.value.user.id
    )
    console.log('Filtered events for this organizer:', events.value)
  } catch (err) {
    console.error(err)
    events.value = []
  } finally {
    loading.value = false
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
  const date = new Date(dateStr)
  return date.toLocaleDateString()
}

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

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

.event-details {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #3B82F6;
  text-decoration: none;
  margin-top: 8px;
  transition: color 0.3s;
}

.event-details:hover {
  color: #0052a3;
  text-decoration: underline;
  cursor: pointer;
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
