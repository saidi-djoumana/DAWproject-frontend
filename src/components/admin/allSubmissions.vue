<script setup>
import { ref } from 'vue';

const submissions = ref([
  {
    title: 'Exploring Quantum Computing',
    eventName: 'Annual Science Conference 2023',
    authorName: 'Alice Johnson',
    authorEmail: 'alice.johnson@example.com',
    createdAt: '2023-01-10'
  },
  {
    title: 'AI in Healthcare',
    eventName: 'Tech Innovations Expo',
    authorName: 'Bob Smith',
    authorEmail: 'bob.smith@example.com',
    createdAt: '2023-02-15'
  },
  {
    title: 'Sustainable Energy Solutions',
    eventName: 'Environmental Awareness Workshop',
    authorName: 'Charlie Brown',
    authorEmail: 'charlie.brown@example.com',
    createdAt: '2023-03-05'
  },
  {
    title: 'Mental Health Awareness',
    eventName: 'Health and Wellness Fair',
    authorName: 'Dana White',
    authorEmail: 'dana.white@example.com',
    createdAt: '2023-04-12'
  },
  {
    title: 'Innovations in Education',
    eventName: 'Global Education Summit',
    authorName: 'Eve Davis',
    authorEmail: 'eve.davis@example.com',
    createdAt: '2023-05-20'
  }
]);
</script>

<template>
  <div class="page-container">
    <header class="section-header">
      <h1>List of All Submissions</h1>
    </header>

    <div class="table-card">
      <table class="submission-table">
        <thead>
          <tr>
            <th>Submission Title</th>
            <th>Event Name</th>
            <th>Author Name</th>
            <th>Author Email</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(submission, index) in submissions" :key="index">
            <td>{{ submission.title }}</td>
            <td>{{ submission.eventName }}</td>
            <td>{{ submission.authorName }}</td>
            <td>{{ submission.authorEmail }}</td>
            <td>{{ submission.createdAt }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.page-container {
  background-color: #F3F4F6;
  padding: 40px;
  font-family: 'Inter', sans-serif;
  margin: 20px auto;
  max-width: 1300px;
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

.submission-table {
  width: 100%;
  border-collapse: collapse;
}

.submission-table thead tr {
  background-color: #E5E7EB;
}

.submission-table th {
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 700;
  text-align: left;
  color: #374151;
  text-transform: uppercase;
}

.submission-table td {
  padding: 16px;
  font-size: 14px;
  border-bottom: 1px solid #E5E7EB;
  color: #4B5563;
}

.submission-table tbody tr:hover {
  background-color: #F9FAFB;
}
</style>