<script setup>
import { ref, onMounted, defineProps } from 'vue'
import api from '@/api/userAxios'

const props = defineProps({
  eventId: {
    type: Number,
    required: true
  }
})

const workshops = ref([])
const loading = ref(false)
const error = ref(null)

/* ------------------ FETCH WORKSHOPS ------------------ */
const fetchWorkshops = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await api.get(`/events/${props.eventId}/workshops`)
    workshops.value = response.data.data
  } catch (err) {
    console.error(err)
    error.value = 'Failed to load workshops'
  } finally {
    loading.value = false
  }
}

/* ------------------ HANDLERS ------------------ */
const handleEdit = (workshop) => console.log('Editing Workshop:', workshop.title)
const handleDelete = (workshop) => console.log('Deleting Workshop:', workshop.title)

/* ------------------ LIFECYCLE ------------------ */
onMounted(() => {
  fetchWorkshops()
})
</script>

<template>
  <div class="container">
    <header class="program-header">
      <h1>Workshops Program</h1>
    </header>

    <div v-if="loading">Loading workshops...</div>
    <div v-else-if="error">{{ error }}</div>

    <div v-else v-for="(workshop, index) in workshops" :key="index" class="card">
      <div class="card-header">
        <div class="header-main">
          <span class="title-bold">Workshop: {{ workshop.title }}</span>
        </div>
        <div class="actions">
          <button @click="handleEdit(workshop)" class="btn-primary edit">Edit</button>
          <button @click="handleDelete(workshop)" class="btn-primary delete">Delete</button>
        </div>
      </div>

      <div class="workshop-body">
        <p class="animator-info">Workshop Animator: {{ workshop.animator }}</p>
        
        <div class="details-container">
          <div class="detail-row">
            <span class="detail-label">Room:</span> {{ workshop.room }}
          </div>
          <div class="detail-row">
            <span class="detail-label">Date:</span> {{ workshop.date }} &nbsp;|&nbsp; {{ workshop.start_time }} - {{ workshop.end_time }}
          </div>
          <div class="detail-row">
            <span class="detail-label">Current Participants:</span> {{ workshop.current_participants }} 
            &nbsp;|&nbsp; 
            <span class="detail-label">Max Participants:</span> {{ workshop.max_participants }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

/* Main Background */
.container {
  background-color: #F3F4F6;
  padding: 20px;
  font-family: 'Inter', sans-serif;
  color: #000;
  min-height: 100vh;
}

.program-header h1 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
}

/* White Card Style */
.card {
  background: #fff;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  box-sizing: border-box;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.header-main {
  flex: 1;
  padding-right: 20px;
}

.title-bold {
  font-weight: 600;
  font-size: 15px;
  color: #000;
  line-height: 1.4;
}

/* Workshop Specific Body */
.workshop-body {
  margin-top: 4px;
}

.animator-info {
  font-size: 14px;
  color: #6B7280; 
  margin-bottom: 12px;
}

/* Inner Details Box */
.details-container {
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 16px;
  background-color: #fff;
}

.detail-row {
  font-size: 14px;
  padding: 4px 0;
  color: #000;
}

.detail-label {
  font-weight: 600;
}

/* Actions Buttons (Text Links) */
.actions {
  display: flex;
  gap: 12px;
}

.btn-primary {
  padding: 0;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  background: none;
  border: none;
  transition: opacity 0.2s;
}

.btn-primary.edit {
  color: #3B82F6; 
}

.btn-primary.delete {
  color: #EF4444; 
}

.btn-primary:hover {
  text-decoration: underline;
  opacity: 0.8;
}
</style>
