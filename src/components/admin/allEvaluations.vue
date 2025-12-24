<script setup>
import { ref } from 'vue';

// Mock data based on the provided "List of All Evaluations" screenshot
const evaluations = ref([
  {
    title: 'Exploring Quantum Computing',
    evaluatorName: 'Dr. Emily Carter',
    evaluatorEmail: 'emily.carter@example.com',
    createdAt: '2023-01-12'
  },
  {
    title: 'AI in Healthcare',
    evaluatorName: 'Prof. Mark Taylor',
    evaluatorEmail: 'mark.taylor@example.com',
    createdAt: '2023-02-18'
  },
  {
    title: 'Sustainable Energy Solutions',
    evaluatorName: 'Dr. Sarah Wilson',
    evaluatorEmail: 'sarah.wilson@example.com',
    createdAt: '2023-03-08'
  },
  {
    title: 'Mental Health Awareness',
    evaluatorName: 'Dr. John Smith',
    evaluatorEmail: 'john.smith@example.com',
    createdAt: '2023-04-15'
  },
  {
    title: 'Innovations in Education',
    evaluatorName: 'Prof. Anna Brown',
    evaluatorEmail: 'anna.brown@example.com',
    createdAt: '2023-05-22'
  }
]);
</script>

<template>
  <div class="page-container">
    <header class="section-header">
      <h1>List of All Evaluations</h1>
    </header>

    <div class="table-card">
      <table class="evaluation-table">
        <thead>
          <tr>
            <th>Submission Title</th>
            <th>Evaluator Name</th>
            <th>Evaluator Email</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(evaluation, index) in evaluations" :key="index">
            <td>{{ evaluation.title }}</td>
            <td>{{ evaluation.evaluatorName }}</td>
            <td>{{ evaluation.evaluatorEmail }}</td>
            <td>{{ evaluation.createdAt }}</td>
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

.evaluation-table {
  width: 100%;
  border-collapse: collapse;
}

.evaluation-table thead tr {
  background-color: #E5E7EB; /* Matching the grey header background */
}

.evaluation-table th {
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 700;
  text-align: left;
  color: #374151;
  text-transform: uppercase; /* Matching the uppercase style of headers */
}

.evaluation-table td {
  padding: 16px;
  font-size: 14px;
  border-bottom: 1px solid #E5E7EB;
  color: #4B5563;
}

/* Hover effect to maintain consistency with your other tables */
.evaluation-table tbody tr:hover {
  background-color: #F9FAFB;
}
</style>