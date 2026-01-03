<script setup>
import { ref, onMounted, defineProps } from 'vue'

const props = defineProps({
  eventId: {
    type: Number,
    required: true
  }
})

const eventProgram = ref([])
const loading = ref(false)
const error = ref(null)

/* ------------------ FAKE PROGRAM ------------------ */
const fetchEventProgram = async () => {
  loading.value = true
  error.value = null

  try {
    // simulate delay (optional)
    await new Promise((r) => setTimeout(r, 300))

    eventProgram.value = [
      // Period (example)
      {
        type: 'period',
        id: 1,
        title: 'Registration & Welcome Coffee',
        start_time: '2026-06-15 08:30:00',
        end_time: '2026-06-15 09:00:00',
        room: 'Main Hall'
      },

      // Session with presentations
      {
        type: 'session',
        id: 1,
        title: 'Opening Session',
        start_time: '2026-06-15 09:00:00',
        end_time: '2026-06-15 10:30:00',
        room: 'Room A',
        session_chair: 'Dr. Amina Benali',
        presentations: [
          {
            id: 101,
            title: 'Predictive Models for Disease Outbreaks',
            author: 'Nour El Yakine',
            start_time: '2026-06-15 09:10:00',
            end_time: '2026-06-15 09:25:00'
          },
          {
            id: 102,
            title: 'Wearable Sensors for Remote Monitoring',
            author: 'Imene B.',
            start_time: '2026-06-15 09:25:00',
            end_time: '2026-06-15 09:40:00'
          }
        ]
      },

      // Period (example)
      {
        type: 'period',
        id: 2,
        title: 'Coffee Break',
        start_time: '2026-06-15 10:30:00',
        end_time: '2026-06-15 11:00:00',
        room: ''
      },

      // Session with no presentations
      {
        type: 'session',
        id: 2,
        title: 'AI in Healthcare',
        start_time: '2026-06-15 11:00:00',
        end_time: '2026-06-15 12:30:00',
        room: 'Room B',
        session_chair: 'Prof. Hichem Bouzid',
        presentations: []
      }
    ]
  } catch (err) {
    console.error(err)
    error.value = 'Failed to load event program'
  } finally {
    loading.value = false
  }
}

const handleEdit = (item) => {
  console.log('Editing:', item)
  alert(`Fake edit: ${item.type} "${item.title}"`)
}

const handleDelete = (item) => {
  console.log('Deleting:', item)

  // remove locally to simulate deletion
  eventProgram.value = eventProgram.value.filter((x) => x !== item)

  alert(`Fake delete: ${item.type} "${item.title}"`)
}

onMounted(() => {
  fetchEventProgram()
})
</script>


<template>
  <div class="container">
    <header class="program-header">
      <h1>Event Program</h1>
    </header>

    <div v-if="loading">Loading program...</div>
    <div v-else-if="error">{{ error }}</div>

    <div
      v-else
      v-for="(item, index) in eventProgram"
      :key="index"
      class="card"
    >
      <div class="card-header">
        <div class="header-main">
          <span class="title-bold">
            {{ item.type === 'session'
              ? `Session ${item.id}:`
              : `Period ${index + 1}:` }}
            {{ item.title }}
          </span>

          <span class="meta-text">
            {{ item.start_time }} - {{ item.end_time }}
          </span>

          <span v-if="item.room" class="meta-text">
            | {{ item.room }}
          </span>
        </div>

        <div class="actions">
          <button @click="handleEdit(item)" class="btn-primary edit">
            Edit
          </button>
          <button @click="handleDelete(item)" class="btn-primary delete">
            Delete
          </button>
        </div>
      </div>

      <!-- SESSION BODY -->
      <div v-if="item.type === 'session'" class="session-body">
        <p class="chair-info">
          Session Chair: {{ item.session_chair || '—' }}
        </p>

        <div
          v-if="item.presentations && item.presentations.length"
          class="presentations-container"
        >
          <div
            v-for="pres in item.presentations"
            :key="pres.id"
            class="presentation-row"
          >
            <span class="pres-time">
              {{ pres.start_time }} - {{ pres.end_time }}
            </span>
            <span class="divider">|</span>
            <span class="pres-title">
              Presentation {{ pres.id }}: {{ pres.title }}
            </span>
            <span class="divider">|</span>
            <span class="pres-author">
              By {{ pres.author }}
            </span>
          </div>
        </div>

        <div v-else class="chair-info">
          No presentations assigned.
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

.container {
  background-color: #F3F4F6; /* light gray background */
  padding: 20px; /* match editEvent.vue */
  font-family: 'Inter', sans-serif;
  color: #000;
  min-height: 100vh;
  max-width: 100%; /* full width inside popup */
}

.program-header h1 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 12px;
}

.program-header h2 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 24px;
}

/* Card Styling */
.card {
  background: #fff; /* white card */
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 20px; /* match editEvent.vue form padding */
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  width: 100%; /* full width */
  box-sizing: border-box;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-main {
  display: flex;
  gap: 12px;
  align-items: center;
}

.title-bold {
  font-weight: 600;
  font-size: 15px;
  color: #000;
}

.meta-text {
  font-size: 14px;
  color: #6B7280;
}

/* Presentation Box */
.session-body {
  margin-top: 12px;
}

.chair-info {
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 12px;
}

.presentations-container {
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  padding: 12px 16px;
  background-color: #fff;
}

.presentation-row {
  display: flex;
  gap: 8px;
  font-size: 14px;
  padding: 4px 0;
  color: #111827;
}

.divider {
  color: #D1D5DB;
}

/* Actions Buttons */
.actions {
  display: flex;
  gap: 8px;
}

.btn-primary {
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s;
  background: none;
  border: none;
}

.btn-primary.edit {
  color: #3B82F6; /* blue text */
}

.btn-primary.delete {
  color: #EF4444; /* red text */
}

.btn-primary.edit:hover,
.btn-primary.delete:hover {
  text-decoration: underline;
}
</style>
