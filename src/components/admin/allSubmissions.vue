<script setup>
import { ref, onMounted } from 'vue';
import api from '@/api/axios'; // your configured Axios instance

const submissions = ref([]);

const fetchSubmissions = async () => {
  try {
    const response = await api.get('/admin/submissions');
    // Map backend data to table format
    submissions.value = response.data.data.map(sub => ({
      title: sub.title,
      eventName: sub.event?.title || 'N/A',
      authorName: sub.authors?.map(a => a.name).join(', ') || 'N/A',
      authorEmail: sub.authors?.map(a => a.email).join(', ') || 'N/A',
      createdAt: new Date(sub.created_at).toLocaleDateString() // format date
    }));
  } catch (error) {
    console.error('Failed to fetch submissions:', error);
  }
};

onMounted(fetchSubmissions);
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