<script setup>
import { ref } from 'vue';

const workshops = ref([
  {
    title: 'AI-Powered Diagnostics: Moving from Theory to Clinical Implementation',
    animator: 'Example name',
    room: 'Amphie 01',
    date: '2025-12-15',
    startTime: '08:30:00',
    endTime: '12:00:00',
    currentParticipants: 14,
    maxParticipants: 25
  },
  {
    title: 'Preparing Health Systems for the Future of AI: Ethical Challenges and Lessons Learnt',
    animator: 'Example name',
    room: 'Workshop Room',
    date: '2025-12-15',
    startTime: '11:00:00',
    endTime: '14:00:00',
    currentParticipants: 30,
    maxParticipants: 50
  },
  {
    title: 'AI-Powered Diagnostics: Moving from Theory to Clinical Implementation',
    animator: 'Example name',
    room: 'Workshop Room',
    date: '2025-12-16',
    startTime: '10:00:00',
    endTime: '13:00:00',
    currentParticipants: 8,
    maxParticipants: 15
  }
]);

const handleEdit = (workshop) => console.log('Editing Workshop:', workshop.title);
const handleDelete = (workshop) => console.log('Deleting Workshop:', workshop.title);
</script>

<template>
  <div class="container">
    <header class="program-header">
      <h1>Workshops Program</h1>
    </header>

    <div v-for="(workshop, index) in workshops" :key="index" class="card">
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
            <span class="detail-label">Date:</span> {{ workshop.date }} &nbsp;|&nbsp; {{ workshop.startTime }} - {{ workshop.endTime }}
          </div>
          <div class="detail-row">
            <span class="detail-label">Current Participants:</span> {{ workshop.currentParticipants }} 
            &nbsp;|&nbsp; 
            <span class="detail-label">Max Participants:</span> {{ workshop.maxParticipants }}
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
  color: #6B7280; /* Muted gray for subtitle */
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
  color: #3B82F6; /* Standard Blue */
}

.btn-primary.delete {
  color: #EF4444; /* Standard Red */
}

.btn-primary:hover {
  text-decoration: underline;
  opacity: 0.8;
}
</style>