<template>
  <div class="container">
    <div class="header">
      <h1>My Submissions</h1>
    </div>

    <div class="table-wrapper">
      <table class="submissions-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="submission in submissions" 
            :key="submission.id"
          >
            <td>{{ submission.title }}</td>
            <td :class="['status', getStatusClass(submission.status)]">
              {{ submission.status }}
            </td>
            <td>
              <div class="actions">
                <button
                  @click="handleEdit(submission.id)"
                  :disabled="isReviewed(submission.status)"
                  :class="['btn-action', 'btn-edit', { 'disabled': isReviewed(submission.status) }]"
                >
                  Edit
                </button>
                <button
                  @click="handleDelete(submission.id)"
                  :disabled="isReviewed(submission.status)"
                  :class="['btn-action', 'btn-delete', { 'disabled': isReviewed(submission.status) }]"
                >
                  Delete
                </button>
                <button
                  @click="handleViewDetails(submission.id)"
                  class="btn-action btn-view"
                >
                  View Details
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const submissions = ref([
  { id: 1, title: 'Proposal 1', status: 'Pending' },
  { id: 2, title: 'Proposal 2', status: 'Pending' },
  { id: 3, title: 'Proposal 3', status: 'Reviewed' },
  { id: 4, title: 'Proposal 4', status: 'Pending' },
  { id: 5, title: 'Proposal 5', status: 'Pending' },
  { id: 6, title: 'Proposal 6', status: 'Pending' },
  { id: 7, title: 'Proposal 7', status: 'Pending' },
  { id: 8, title: 'Proposal 8', status: 'Pending' },
  { id: 9, title: 'Proposal 9', status: 'Pending' },
  { id: 10, title: 'Proposal 10', status: 'Pending' },
  { id: 11, title: 'Proposal 11', status: 'Pending' },
  { id: 12, title: 'Proposal 12', status: 'Pending' },
  { id: 13, title: 'Proposal 13', status: 'Pending' },
  { id: 14, title: 'Proposal 14', status: 'Pending' },
  { id: 15, title: 'Proposal 15', status: 'Pending' },
]);

const handleNewProposal = () => {
  const newId = submissions.value.length + 1;
  submissions.value.push({
    id: newId,
    title: `Proposal ${newId}`,
    status: 'Pending'
  });
};

const handleEdit = (id) => {
  const submission = submissions.value.find(s => s.id === id);
  alert(`Editing ${submission?.title}`);
};

const handleDelete = (id) => {
  if (confirm('Are you sure you want to delete this proposal?')) {
    submissions.value = submissions.value.filter(s => s.id !== id);
  }
};

const handleViewDetails = (id) => {
  const submission = submissions.value.find(s => s.id === id);
  alert(`Viewing details for ${submission?.title}`);
};

const getStatusClass = (status) => {
  return status === 'Pending' ? 'status-pending' : 'status-reviewed';
};

const isReviewed = (status) => status === 'Reviewed';
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Poppins:wght@400;500;600;700&display=swap');

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
  font-family: 'Inter', sans-serif;
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

.status-reviewed {
  color: #dc2626;
}

.actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
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

.btn-edit {
  color: #2563eb;
}

.btn-edit:hover:not(.disabled) {
  color: #1e40af;
}

.btn-delete {
  color: #dc2626;
}

.btn-delete:hover:not(.disabled) {
  color: #b91c1c;
}

.btn-view {
  color: #6b7280;
}

.btn-view:hover {
  color: #4b5563;
}

.btn-action.disabled {
  color: #d1d5db;
  cursor: not-allowed;
}

.btn-action:disabled {
  color: #d1d5db;
  cursor: not-allowed;
}
</style>
