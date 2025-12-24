<script setup>
import { ref } from 'vue';

// Mock data based on your requirements
const events = ref([
  {
    details: 'Annual Science Conference 2023',
    organizerName: 'Alice Johnson',
    organizerEmail: 'alice.johnson@example.com',
    createdAt: '2023-01-15'
  },
  {
    details: 'Tech Innovations Expo',
    organizerName: 'Bob Smith',
    organizerEmail: 'bob.smith@example.com',
    createdAt: '2023-02-20'
  },
  {
    details: 'Environmental Awareness Workshop',
    organizerName: 'Charlie Brown',
    organizerEmail: 'charlie.brown@example.com',
    createdAt: '2023-03-10'
  },
  {
    details: 'Health and Wellness Fair',
    organizerName: 'Dana White',
    organizerEmail: 'dana.white@example.com',
    createdAt: '2023-04-05'
  },
  {
    details: 'Global Education Summit',
    organizerName: 'Eve Davis',
    organizerEmail: 'eve.davis@example.com',
    createdAt: '2023-05-15'
  }
]);
</script>

<template>
  <div class="page-container">
    <header class="section-header">
      <h1>List of All Events</h1>
    </header>

    <div class="table-card">
      <table class="event-table">
        <thead>
          <tr>
            <th>Event Details</th>
            <th>Organizer Name</th>
            <th>Organizer Email</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(event, index) in events" :key="index">
            <td>{{ event.details }}</td>
            <td>{{ event.organizerName }}</td>
            <td>{{ event.organizerEmail }}</td>
            <td>{{ event.createdAt }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
/* Imported exactly as your reference */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.page-container {
  background-color: #F3F4F6;
  padding: 40px;
  font-family: 'Inter', sans-serif;
  margin: 20px auto;
  max-width: 1300px; /* Matched width */
}

.section-header h1 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
  color: #111827;
}

.table-card {
  background: #fff;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.event-table {
  width: 100%;
  border-collapse: collapse;
}

.event-table thead tr {
  background-color: #E5E7EB; /* Matching the grey header background */
}

.event-table th {
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 700;
  text-align: left;
  color: #374151;
  text-transform: uppercase; /* Matching the visual style of headers */
}

.event-table td {
  padding: 16px;
  font-size: 14px;
  border-bottom: 1px solid #E5E7EB;
  color: #4B5563;
}

/* Optional: Slight hover effect for better UX */
.event-table tbody tr:hover {
  background-color: #F9FAFB;
}
</style>