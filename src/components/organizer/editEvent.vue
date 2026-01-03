<script setup>
import { ref, defineProps, onMounted } from 'vue'

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

/* ------------------ FAKE EVENT DATA ------------------ */
const sessions = ref([])
const workshops = ref([])
const approvedSubmissions = ref([])
const loading = ref(false)
const error = ref(null)

/* ------------------ FAKE FETCH ------------------ */
const fetchEventDetails = async () => {
  loading.value = true
  error.value = null

  try {
    // simulate async delay (optional)
    await new Promise((r) => setTimeout(r, 300))

    // Fake sessions
    sessions.value = [
      {
        id: 1,
        title: 'Opening Session',
        start_time: '2026-06-15 09:00:00',
        end_time: '2026-06-15 10:30:00',
        room: 'Room A',
        session_chair: 'Dr. Amina Benali'
      },
      {
        id: 2,
        title: 'AI in Healthcare',
        start_time: '2026-06-15 11:00:00',
        end_time: '2026-06-15 12:30:00',
        room: 'Room B',
        session_chair: 'Prof. Hichem Bouzid'
      }
    ]

    // Fake workshops
    workshops.value = [
      {
        id: 1,
        title: 'Research Methodology Workshop',
        start_time: '2026-06-16 14:00:00',
        end_time: '2026-06-16 16:00:00',
        description: 'Hands-on workshop on study design and methodology.',
        room: 'Lab 1',
        max_participants: 25,
        animator_id: 10
      }
    ]

    // Fake accepted submissions
    approvedSubmissions.value = [
      {
        id: 101,
        title: 'Predictive Models for Disease Outbreaks',
        author: 'Nour El Yakine',
        sessionId: '',
        startingTime: '',
        endingTime: ''
      },
      {
        id: 102,
        title: 'Wearable Sensors for Remote Monitoring',
        author: 'Imene B.',
        sessionId: '',
        startingTime: '',
        endingTime: ''
      },
      {
        id: 103,
        title: 'Clinical NLP: Extracting Insights from Reports',
        author: 'Khaled M.',
        sessionId: '',
        startingTime: '',
        endingTime: ''
      }
    ]
  } catch (err) {
    console.error(err)
    error.value = 'Failed to load event details'
  } finally {
    loading.value = false
  }
}

/* ------------------ CREATE ACTIONS (LOCAL ONLY) ------------------ */
const addSession = async () => {
  // basic UI validation (optional)
  if (!session.value.title) return alert('Please enter a session title')

  const newSession = {
    id: Date.now(),
    title: session.value.title,
    start_time: session.value.startingTime,
    end_time: session.value.endingTime,
    room: session.value.room,
    session_chair: session.value.sessionChair
  }

  sessions.value.unshift(newSession)

  session.value = { title: '', startingTime: '', endingTime: '', room: '', sessionChair: '' }
  alert('Session added successfully (fake/local)')
}

const addWorkshop = async () => {
  if (!workshop.value.title) return alert('Please enter a workshop title')

  const newWorkshop = {
    id: Date.now(),
    title: workshop.value.title,
    start_time: workshop.value.startingTime,
    end_time: workshop.value.endingTime,
    description: workshop.value.description,
    room: workshop.value.room,
    max_participants: workshop.value.maxParticipants,
    animator_id: workshop.value.animatorId
  }

  workshops.value.unshift(newWorkshop)

  workshop.value = { title: '', startingTime: '', endingTime: '', description: '', room: '', maxParticipants: '', animatorId: '' }
  alert('Workshop added successfully (fake/local)')
}

const addPresentation = async (index) => {
  const submission = approvedSubmissions.value[index]
  if (!submission.sessionId) return alert('Please provide a session ID')

  // We’ll just show a fake success and clear the fields,
  // and optionally remove it from the list to simulate “assigned”
  alert(
    `Presentation assigned (fake/local)\n\nSubmission: ${submission.title}\nSession ID: ${submission.sessionId}\nStart: ${submission.startingTime}\nEnd: ${submission.endingTime}`
  )

  // Option 1: clear only
  submission.sessionId = ''
  submission.startingTime = ''
  submission.endingTime = ''

  // Option 2 (better UI): remove from list after assigning
  // approvedSubmissions.value.splice(index, 1)
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

/* Responsive styles */
@media (max-width: 768px) {
  .container {
    padding: 15px;
  }

  h1 {
    font-size: 20px;
    margin-bottom: 15px;
  }

  h2 {
    font-size: 16px;
    margin-bottom: 12px;
  }

  .form-section {
    padding: 15px;
    margin-bottom: 15px;
  }

  .form-row {
    gap: 10px;
    margin-bottom: 10px;
  }

  .form-label {
    min-width: 100px;
    font-size: 13px;
  }

  .form-group {
    gap: 6px;
  }

  input[type="text"] {
    padding: 5px 8px;
    font-size: 13px;
  }

  .input-large {
    width: 250px;
  }

  .input-medium {
    width: 150px;
  }

  .input-small {
    width: 140px;
  }

  .input-tiny {
    width: 80px;
  }

  .input-datetime {
    width: 140px;
  }

  .button-row {
    margin-top: 12px;
  }

  .btn-primary {
    padding: 6px 12px;
    font-size: 13px;
  }

  .submission-row {
    padding: 10px;
    margin-bottom: 8px;
  }

  .submission-info {
    flex-direction: column;
    gap: 5px;
    margin-bottom: 8px;
  }

  .submission-fields {
    gap: 8px;
  }

  .field-group {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 10px;
  }

  h1 {
    font-size: 18px;
    margin-bottom: 12px;
  }

  h2 {
    font-size: 14px;
    margin-bottom: 10px;
  }

  .form-section {
    padding: 12px;
    margin-bottom: 12px;
  }

  .form-row {
    gap: 8px;
    margin-bottom: 8px;
  }

  .form-label {
    min-width: 80px;
    font-size: 12px;
  }

  .form-group {
    gap: 4px;
  }

  input[type="text"] {
    padding: 4px 6px;
    font-size: 12px;
  }

  .input-large {
    width: 200px;
  }

  .input-medium {
    width: 120px;
  }

  .input-small {
    width: 110px;
  }

  .input-tiny {
    width: 60px;
  }

  .input-datetime {
    width: 110px;
  }

  .button-row {
    margin-top: 10px;
  }

  .btn-primary {
    padding: 5px 10px;
    font-size: 12px;
  }

  .submission-row {
    padding: 8px;
    margin-bottom: 6px;
  }

  .submission-info {
    gap: 3px;
    margin-bottom: 6px;
  }

  .submission-fields {
    gap: 6px;
  }

  .field-group {
    font-size: 11px;
  }
}
</style>
