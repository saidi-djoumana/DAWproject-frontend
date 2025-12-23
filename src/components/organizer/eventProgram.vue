<script setup>
import { ref } from 'vue';

// Mock data representing the state after being "added" from your forms
const eventProgram = ref([
  {
    type: 'session',
    id: 1,
    title: 'The Future of Tech',
    startingTime: '08:00:00',
    endingTime: '09:30:00',
    room: 'Amphie 01',
    code: '#24',
    chair: 'Example Chair',
    presentations: [
      { id: 1, title: 'The longevity of Ai', author: 'Example Author', start: '08:00:00', end: '08:30:00' },
      { id: 2, title: 'The longevity of Ai', author: 'Example Author', start: '08:30:00', end: '09:00:00' },
      { id: 3, title: 'The longevity of Ai', author: 'Example Author', start: '09:00:00', end: '09:30:00' },
    ]
  },
  {
    type: 'period',
    title: 'Networking',
    startingTime: '09:30:00',
    endingTime: '10:00:00'
  },
  {
    type: 'session',
    id: 2,
    title: 'The Future of Tech',
    startingTime: '10:00:00',
    endingTime: '12:00:00',
    room: 'Amphie 02',
    code: '#37',
    chair: 'Example Chair',
    presentations: [
      { id: 4, title: 'The longevity of Ai', author: 'Example Author', start: '10:15:00', end: '10:45:00' },
      { id: 5, title: 'The longevity of Ai', author: 'Example Author', start: '10:50:00', end: '11:30:00' },
    ]
  },
  {
    type: 'period',
    title: 'Launch Break',
    startingTime: '12:00:00',
    endingTime: '13:00:00',
    room: 'Foyer'
  }
]);

const handleEdit = (item) => console.log('Editing:', item);
const handleDelete = (item) => console.log('Deleting:', item);
</script>

<template>
  <div class="container">
    <header class="program-header">
      <h1>Event Program</h1>
      <h2>Day 1: 2025-12-15</h2>
    </header>

    <div v-for="(item, index) in eventProgram" :key="index" class="card">
      <div class="card-header">
        <div class="header-main">
          <span class="title-bold">
            {{ item.type === 'session' ? `Session ${item.id}:` : `Period ${index + 1}:` }} 
            {{ item.title }}
          </span>
          <span class="meta-text">{{ item.startingTime }} - {{ item.endingTime }}</span>
          <span v-if="item.room" class="meta-text">| {{ item.room }}</span>
          <span v-if="item.code" class="meta-text">| {{ item.code }}</span>
        </div>
        <div class="actions">
          <button @click="handleEdit(item)" class="btn-primary edit">Edit</button>
          <button @click="handleDelete(item)" class="btn-primary delete">Delete</button>
        </div>
      </div>

      <div v-if="item.type === 'session'" class="session-body">
        <p class="chair-info">Session Chair: {{ item.chair }}</p>
        
        <div class="presentations-container">
          <div v-for="pres in item.presentations" :key="pres.id" class="presentation-row">
            <span class="pres-time">{{ pres.start }} - {{ pres.end }}</span>
            <span class="divider">|</span>
            <span class="pres-title">Presentation {{ pres.id }}: {{ pres.title }}</span>
            <span class="divider">|</span>
            <span class="pres-author">By {{ pres.author }}</span>
          </div>
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
