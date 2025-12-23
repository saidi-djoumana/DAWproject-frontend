<script setup>
import { ref } from 'vue';

const session = ref({
  title: 'Ex: The Future of Tech',
  startingTime: '',
  endingTime: '',
  room: '',
  sessionChair: ''
});

const period = ref({
  title: 'Ex: Launch Break',
  startingTime: '',
  endingTime: '',
  description: '',
  room: ''
});

const workshop = ref({
  title: 'Ex: Launch Break',
  startingTime: '',
  endingTime: '',
  description: '',
  room: '',
  maxParticipants: '',
  animatorId: ''
});

const approvedSubmissions = ref([
  { title: 'The Future of Tech', author: 'Example Author', sessionId: '', startingTime: '', endingTime: '' },
  { title: 'AI Ethics', author: 'Jane Doe', sessionId: '', startingTime: '', endingTime: '' },
  { title: 'Quantum Computing', author: 'John Smith', sessionId: '', startingTime: '', endingTime: '' },
  { title: 'Blockchain Basics', author: 'Alice Wang', sessionId: '', startingTime: '', endingTime: '' },
  { title: 'Cybersecurity 101', author: 'Bob Ross', sessionId: '', startingTime: '', endingTime: '' },
  { title: 'Cloud Native', author: 'Charlie Brown', sessionId: '', startingTime: '', endingTime: '' },
  { title: 'Edge Computing', author: 'David G.', sessionId: '', startingTime: '', endingTime: '' }
]);

const addSession = () => console.log('Adding session:', { ...session.value });
const addPeriod = () => console.log('Adding period:', { ...period.value });
const addWorkshop = () => console.log('Adding workshop:', { ...workshop.value });
const addPresentation = (index) => console.log('Adding presentation:', { ...approvedSubmissions.value[index] });
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
      <h2>Add a Period</h2>
      <div class="form-row">
        <label class="form-label">Title:</label>
        <input v-model="period.title" type="text" class="input-full" />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Starting Time:</label>
          <input v-model="period.startingTime" type="text" class="input-medium" placeholder="YYYY-MM-DD 00:00:00" />
        </div>
        <div class="form-group">
          <label class="form-label">Ending Time:</label>
          <input v-model="period.endingTime" type="text" class="input-medium" placeholder="YYYY-MM-DD 00:00:00" />
        </div>
      </div>
      <div class="form-row">
        <label class="form-label">Description:</label>
        <input v-model="period.description" type="text" class="input-full" />
      </div>
      <div class="form-row">
        <label class="form-label">Room:</label>
        <input v-model="period.room" type="text" class="input-small" />
      </div>
      <div class="button-row">
        <button @click="addPeriod" class="btn-primary">Add Period</button>
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
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@400;500;600&display=swap');

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
