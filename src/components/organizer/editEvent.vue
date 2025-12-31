<script setup>
import { ref, defineProps, onMounted } from 'vue'
import api from '@/api/userAxios'

const props = defineProps({
  eventId: {
    type: Number,
    required: true
  }
})

/* ------------------ FORM STATES ------------------ */
const session = ref({
  title: '',
  startingTime: '',
  endingTime: '',
  room: '',
  sessionChair: ''
})

const workshop = ref({
  title: '',
  startingTime: '',
  endingTime: '',
  description: '',
  room: '',
  maxParticipants: '',
  animatorId: ''
})

/* ------------------ EVENT DATA ------------------ */
const sessions = ref([])
const workshops = ref([])
const approvedSubmissions = ref([])
const loading = ref(false)
const error = ref(null)

/* ------------------ API CALLS ------------------ */
const fetchEventDetails = async () => {
  loading.value = true
  error.value = null
  try {
    const [sessionsRes, workshopsRes, submissionsRes] = await Promise.all([
      api.get(`/events/${props.eventId}/sessions`),
      api.get(`/events/${props.eventId}/workshops`),
      api.get('/submissions')
    ])

    sessions.value = sessionsRes.data.data || []
    workshops.value = workshopsRes.data.data || []

    // Only accepted submissions
    approvedSubmissions.value = submissionsRes.data.data
      .filter(s => s.status === 'accepted')
      .map(s => ({
        id: s.id,
        title: s.title,
        author: s.user?.name || 'Unknown',
        sessionId: '',
        startingTime: '',
        endingTime: ''
      }))
  } catch (err) {
    console.error(err)
    error.value = 'Failed to load event details'
  } finally {
    loading.value = false
  }
}

/* ------------------ CREATE ACTIONS ------------------ */
const addSession = async () => {
  try {
    await api.post(`/events/${props.eventId}/sessions`, {
      title: session.value.title,
      start_time: session.value.startingTime,
      end_time: session.value.endingTime,
      room: session.value.room,
      session_chair: session.value.sessionChair
    })
    session.value = { title: '', startingTime: '', endingTime: '', room: '', sessionChair: '' }
    await fetchEventDetails() // Refresh sessions
    alert('Session added successfully')
  } catch (err) {
    console.error(err)
    alert('Failed to add session')
  }
}

const addWorkshop = async () => {
  try {
    await api.post(`/events/${props.eventId}/workshops`, {
      title: workshop.value.title,
      start_time: workshop.value.startingTime,
      end_time: workshop.value.endingTime,
      description: workshop.value.description,
      room: workshop.value.room,
      max_participants: workshop.value.maxParticipants,
      animator_id: workshop.value.animatorId
    })
    workshop.value = { title: '', startingTime: '', endingTime: '', description: '', room: '', maxParticipants: '', animatorId: '' }
    await fetchEventDetails() // Refresh workshops
    alert('Workshop added successfully')
  } catch (err) {
    console.error(err)
    alert('Failed to add workshop')
  }
}

const addPresentation = async (index) => {
  const submission = approvedSubmissions.value[index]
  if (!submission.sessionId) return alert('Please provide a session ID')

  try {
    await api.post(
      `/events/${props.eventId}/sessions/${submission.sessionId}/assign-submission`,
      {
        submission_id: submission.id,
        start_time: submission.startingTime,
        end_time: submission.endingTime
      }
    )
    submission.sessionId = ''
    submission.startingTime = ''
    submission.endingTime = ''
    await fetchEventDetails() // Refresh sessions to see presentation
    alert('Presentation assigned successfully')
  } catch (err) {
    console.error(err)
    alert('Failed to assign presentation')
  }
}

/* ------------------ LIFECYCLE ------------------ */
onMounted(() => {
  fetchEventDetails()
})
</script>

<template>
  <div class="container">
    <h1>Edit the event program</h1>

    <section class="form-section">
      <h2>Add a Session</h2>
      <div class="form-row">
        <label class="form-label">Title:</label>
        <input v-model="session.title" type="text" class="input-full" />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Starting Time:</label>
          <input v-model="session.startingTime" type="text" class="input-medium" placeholder="YYYY-MM-DD 00:00:00" />
        </div>
        <div class="form-group">
          <label class="form-label">Ending Time:</label>
          <input v-model="session.endingTime" type="text" class="input-medium" placeholder="YYYY-MM-DD 00:00:00" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Room:</label>
          <input v-model="session.room" type="text" class="input-small" />
        </div>
        <div class="form-group">
          <label class="form-label">Session Chair:</label>
          <input v-model="session.sessionChair" type="text" class="input-large" />
        </div>
      </div>
      <div class="button-row">
        <button @click="addSession" class="btn-primary">Add Session</button>
      </div>
    </section>

    <section class="form-section">
      <h2>Add a Workshop</h2>
      <div class="form-row">
        <label class="form-label">Title:</label>
        <input v-model="workshop.title" type="text" class="input-full" />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Starting Time:</label>
          <input v-model="workshop.startingTime" type="text" class="input-medium" placeholder="YYYY-MM-DD 00:00:00" />
        </div>
        <div class="form-group">
          <label class="form-label">Ending Time:</label>
          <input v-model="workshop.endingTime" type="text" class="input-medium" placeholder="YYYY-MM-DD 00:00:00" />
        </div>
      </div>
      <div class="form-row">
        <label class="form-label">Description:</label>
        <input v-model="workshop.description" type="text" class="input-full" />
      </div>
      <div class="form-row">
        <label class="form-label">Room:</label>
        <input v-model="workshop.room" type="text" class="input-small" />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Max Participants:</label>
          <input v-model="workshop.maxParticipants" type="text" class="input-medium" />
        </div>
      </div>
      <div class="form-row">
        <label class="form-label">Animator Id:</label>
        <input v-model="workshop.animatorId" type="text" class="input-small" />
      </div>
      <div class="button-row">
        <button @click="addWorkshop" class="btn-primary">Add Workshop</button>
      </div>
    </section>

    <section class="form-section">
      <h2>Assign a Presentation to a session</h2>
      <div class="submissions-header">
        <strong>Approved Submissions:</strong>
      </div>
      <div v-for="(submission, index) in approvedSubmissions" :key="index" class="submission-row">
        <div class="submission-info">
          <div class="submission-title">
            <strong>Title:</strong> {{ submission.title }}
          </div>
          <div class="submission-author">
            <strong>By</strong> {{ submission.author }}
          </div>
        </div>
        <div class="submission-fields">
          <div class="field-group">
            <label>Session Id:</label>
            <input v-model="submission.sessionId" type="text" class="input-tiny" />
          </div>
          <div class="field-group">
            <label>Starting Time:</label>
            <input v-model="submission.startingTime" type="text" class="input-datetime" placeholder="YYYY-MM-DD 00:00:00" />
          </div>
          <div class="field-group">
            <label>Ending Time:</label>
            <input v-model="submission.endingTime" type="text" class="input-datetime" placeholder="YYYY-MM-DD 00:00:00" />
          </div>
          <button @click="addPresentation(index)" class="btn-primary">Add Presentation</button>
        </div>
      </div>
    </section>
  </div>
</template>


<style scoped>
* { box-sizing: border-box; }

.container {
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  background-color: #F3F4F6; /* light gray background */
  font-family: 'Inter', 'Poppins', sans-serif;
}

h1 { font-size: 24px; font-weight: 600; margin-bottom: 20px; color: #000; }
h2 { font-size: 18px; font-weight: 600; margin-bottom: 15px; color: #000; }

.form-section {
  background-color: #fff; /* white form background */
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  width: 100%;
}

.form-row {
  display: flex;
  gap: 15px;
  margin-bottom: 12px;
  align-items: center;
  flex-wrap: wrap;
}

.form-label { font-weight: 500; min-width: 120px; font-size: 14px; color: #000; }

.form-group {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

input[type="text"] {
  padding: 6px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  color: #000;
}

input:focus { outline: none; border-color: #0C4A4A; }

.input-full { flex: 1; }
.input-large { width: 320px; }
.input-medium { width: 200px; }
.input-small { width: 180px; }
.input-tiny { width: 100px; }
.input-datetime { width: 180px; }

.button-row { display: flex; justify-content: flex-end; margin-top: 15px; }

.btn-primary {
  background-color: #CCEBEB; /* green button */
  color: #000;
  border: 1px solid #CCEBEB;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  border-color: #004E38;
  transition: background-color 0.2s;
}

.btn-primary:hover { background-color: #c2e5e5; }

.submission-row {
  background-color: #fff; /* white */
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.submission-info {
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
  font-size: 14px;
  color: #000;
}

.submission-fields {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}

.field-group {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #000;
}
</style>
