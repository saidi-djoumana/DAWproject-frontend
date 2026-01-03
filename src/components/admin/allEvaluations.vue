<script setup>
import { ref, onMounted } from 'vue';
import api from '@/api/axios'; // your configured Axios instance

const evaluations = ref([]);

const fetchEvaluations = async () => {
  try {
    // Super Admin route
    const response = await api.get('/admin/evaluations');

    // Map the response to the format we need
    evaluations.value = response.data.data.map(ev => ({
      title: ev.submission?.title || 'N/A',
      evaluatorName: ev.evaluator?.name || 'N/A',
      evaluatorEmail: ev.evaluator?.email || 'N/A',
      createdAt: ev.created_at ? new Date(ev.created_at).toLocaleDateString() : 'N/A'
    }));
  } catch (error) {
    console.error('Failed to fetch evaluations:', error);
  }
};

// Fetch on component mount
onMounted(() => {
  const adminToken = localStorage.getItem('adminToken');
  if (adminToken) fetchEvaluations();
  else error.value = 'No admin token found';
});

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
  background-color: #E5E7EB;
}

.evaluation-table th {
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 700;
  text-align: left;
  color: #374151;
  text-transform: uppercase;
}

.evaluation-table td {
  padding: 16px;
  font-size: 14px;
  border-bottom: 1px solid #E5E7EB;
  color: #4B5563;
}

.evaluation-table tbody tr:hover {
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

  .evaluation-table {
    min-width: 600px; /* Ensure table doesn't shrink too much */
  }

  .evaluation-table th,
  .evaluation-table td {
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

  .evaluation-table th,
  .evaluation-table td {
    padding: 6px 8px;
    font-size: 11px;
  }
}
</style>
