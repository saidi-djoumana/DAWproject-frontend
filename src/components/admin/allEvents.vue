<script setup>
import { ref, onMounted } from 'vue';
import api from '@/api/axios'; // your configured axios instance

const events = ref([]);
const error = ref(null);

const fetchEvents = async () => {
  try {
    const response = await api.get('/admin/events'); // matches your backend route
    // If your backend returns data in `data` key
    events.value = response.data.data.map(event => ({
      details: event.title, // or event.description if you want
      organizerName: event.organizer?.name || 'N/A',
      organizerEmail: event.organizer?.email || 'N/A',
      createdAt: new Date(event.created_at).toLocaleString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})
// Example: "December 29, 2025"

    }));
  } catch (err) {
    console.error('Failed to fetch events:', err);
    error.value = 'Failed to load events.';
  }
};

onMounted(() => {
  const adminToken = localStorage.getItem('adminToken');
  if (adminToken) fetchEvents();
  else error.value = 'No admin token found';
});

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

/* Responsive styles */
@media (max-width: 768px) {
  .page-container {
    padding: 20px;
    margin: 10px;
    max-width: 100%;
  }

  .section-header h1 {
    font-size: 20px;
    margin-bottom: 16px;
  }

  .table-card {
    overflow-x: auto;
  }

  .event-table {
    min-width: 600px; /* Ensure table doesn't shrink too much */
  }

  .event-table th,
  .event-table td {
    padding: 8px 12px;
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .page-container {
    padding: 10px;
    margin: 5px;
  }

  .section-header h1 {
    font-size: 18px;
    margin-bottom: 12px;
  }

  .event-table th,
  .event-table td {
    padding: 6px 8px;
    font-size: 11px;
  }
}
</style>