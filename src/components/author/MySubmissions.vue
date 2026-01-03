<template>
  <div class="container">
    <div class="header">
      <h1>My Submissions</h1>
    </div>

    <div class="table-wrapper" v-if="submissions.length">
      <table class="submissions-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="submission in submissions" :key="submission.id">
            <td>{{ submission.title }}</td>
            <td :class="['status', getStatusClass(submission.status)]">
              {{ submission.status }}
            </td>
            <td>
              <div class="actions">
                <button
                  @click="handleViewDetails(submission)"
                  class="btn-action btn-view"
                >
                  View Details
                </button>
                <button
                  @click="handleDelete(submission.id)"
                  class="btn-action btn-delete"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-else>No submissions found.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import userApi from '@/api/userAxios'

const submissions = ref([])

// Fetch user's submissions
const fetchSubmissions = async () => {
  try {
    const response = await userApi.get('/submissions/my')
    submissions.value = response.data.data || []
  } catch (error) {
    console.error('Failed to fetch submissions:', error)
    alert('Failed to load submissions. Check console.')
  }
}

// Map status to CSS class
const getStatusClass = (status) => {
  switch (status) {
    case 'pending': return 'status-pending'
    case 'accepted': return 'status-accepted'
    case 'rejected': return 'status-rejected'
    case 'revision': return 'status-revision'
    default: return ''
  }
}

// Show details of a submission
const formatArray = (data) => {
  if (!data) return '-'
  if (Array.isArray(data)) return data.join(', ')
  try {
    const parsed = JSON.parse(data)
    if (Array.isArray(parsed)) return parsed.join(', ')
  } catch { }
  return data
}

const handleViewDetails = (submission) => {
  alert(`
Title: ${submission.title}
Authors: ${formatArray(submission.authors)}
Abstract: ${submission.abstract}
Keywords: ${formatArray(submission.keywords)}
Presentation Type: ${submission.type}
Status: ${submission.status}
  `)
}

// Delete a submission
const handleDelete = async (id) => {
  if (!confirm('Are you sure you want to delete this submission?')) return

  try {
    await userApi.delete(`/submissions/${id}`)
    submissions.value = submissions.value.filter(s => s.id !== id)
    alert('Submission deleted successfully.')
  } catch (error) {
    console.error('Failed to delete submission:', error)
    alert('Failed to delete submission. Check console.')
  }
}

onMounted(fetchSubmissions)
</script>

<style scoped>
* {
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
}

.container {
  min-height: 100vh;
  padding: 2rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
}

h1 {
  font-family: 'Poppins', sans-serif;
  font-size: 1.875rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.table-wrapper {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-width: 1280px;
  margin: 0 auto;
}

.submissions-table {
  width: 100%;
  border-collapse: collapse;
}

.submissions-table thead {
  background-color: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.submissions-table th {
  padding: 1rem 1.5rem;
  text-align: left;
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
  font-family: 'Poppins', sans-serif;
}

.submissions-table tbody tr {
  border-bottom: 1px solid #e5e7eb;
  transition: background-color 0.2s;
}

.submissions-table tbody tr:hover {
  background-color: #f9fafb;
}

.submissions-table td {
  padding: 1rem 1.5rem;
  font-size: 0.875rem;
  color: #111827;
}

.status {
  font-weight: 500;
}

.status-pending {
  color: #16a34a;
}

.status-accepted {
  color: #2563eb;
}

.status-rejected {
  color: #dc2626;
}

.status-revision {
  color: #f59e0b;
}

.actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.btn-action {
  background: none;
  border: none;
  font-size: 0.875rem;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s;
  font-family: 'Poppins', sans-serif;
}

.btn-view {
  color: #6b7280;
}

.btn-view:hover {
  color: #4b5563;
}

.btn-delete {
  color: #dc2626;
}

.btn-delete:hover {
  color: #b91c1c;
}

/* Responsive styles */
@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }

  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  h1 {
    font-size: 1.5rem;
  }

  .table-wrapper {
    overflow-x: auto;
  }

  .submissions-table {
    min-width: 500px;
  }

  .submissions-table th,
  .submissions-table td {
    padding: 0.75rem 1rem;
    font-size: 0.8rem;
  }

  .actions {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }

  .btn-action {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0.5rem;
  }

  h1 {
    font-size: 1.25rem;
  }

  .submissions-table th,
  .submissions-table td {
    padding: 0.5rem 0.75rem;
    font-size: 0.75rem;
  }

  .btn-action {
    font-size: 0.75rem;
  }
}
</style>
