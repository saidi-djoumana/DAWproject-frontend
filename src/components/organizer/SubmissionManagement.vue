<template>
  <div class="page-container">
    <div class="container">
      <h1>Submission Management</h1>
      
      <div class="filters">
        <div class="filter-group">
          <label for="eventFilter">Filter by Event:</label>
          <input 
            v-model="eventFilter"
            type="text" 
            id="eventFilter"
          />
        </div>
        
        <div class="filter-group">
          <label for="statusFilter">Filter by Status:</label>
          <select 
            v-model="statusFilter"
            id="statusFilter"
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
            <option value="Revision">Revision</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Submission ID</th>
              <th>Title</th>
              <th>Status</th>
              <th>Admin Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="submission in filteredSubmissions"
              :key="submission.id"
            >
              <td>{{ submission.id }}</td>
              <td>{{ submission.title }}</td>
              <td>{{ submission.status }}</td>
              <td>
                <input 
                  v-model="submission.notes"
                  type="text" 
                  class="notes-input" 
                  placeholder="Optional comments"
                />
              </td>
              <td>
                <div class="action-select-wrapper">
                  <select 
                    v-model="submission.status"
                    class="action-select"
                  >
                    <option value="">change Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Revision">Revision</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const submissions = ref([
  { id: 1, title: 'Understanding AI', status: 'Pending', notes: '' },
  { id: 2, title: 'Advancements in Quantum Computing', status: 'Accepted', notes: '' },
  { id: 3, title: 'The Future of Renewable Energy', status: 'Revision', notes: '' },
  { id: 4, title: 'Machine Learning in Healthcare', status: 'Rejected', notes: '' },
  { id: 5, title: 'Blockchain Technology', status: 'Pending', notes: '' }
]);

const eventFilter = ref('');
const statusFilter = ref('');

const filteredSubmissions = computed(() => {
  return submissions.value.filter(sub => {
    if (statusFilter.value && sub.status !== statusFilter.value) return false;
    return true;
  });
});
</script>

<style scoped>
/* base layout */
.page-container {
  font-family: 'Inter', sans-serif;
  background-color: #f3f4f6;
  padding: clamp(16px, 4vw, 32px);
  min-height: 100vh;
  box-sizing: border-box;
  margin-bottom: 13rem;
}

.container {
  max-width: 1340px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 20px;
}

h1 {
  font-family: 'Poppins', sans-serif;
  font-size: clamp(1.25rem, 2.2vw, 1.875rem);
  font-weight: 700;
  margin-bottom: 1rem;
  color: #111827;
}

/* filters: responsive grid so both controls keep same width and align left on small screens */
.filters {
  display: grid;
  grid-template-columns: 1fr 320px; /* input grows, select fixed */
  gap: 16px;
  margin-bottom: 1.5rem;
  align-items: end;
}

/* make filter groups fill column and share same widths */
.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 0;
}

.filter-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

/* inputs/selects share same sizing */
.filter-group input,
.filter-group select {
  width: 100%;
  box-sizing: border-box;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  background-color: white;
  transition: all 0.16s;
}

.filter-group input:focus,
.filter-group select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.08);
}

/* table container: allow horizontal scroll on small screens */
.table-container {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: auto; /* enable scrolling if table is wider than viewport */
}

/* responsive table */
table {
  width: 100%;
  border-collapse: collapse;
  min-width: 720px; /* ensures readable layout on wide screens; scroll on smaller */
}

thead {
  background-color: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

th {
  padding: 1rem 1.25rem;
  text-align: left;
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
  white-space: nowrap;
}

tbody tr {
  border-bottom: 1px solid #e5e7eb;
  transition: background-color 0.1s;
}

tbody tr:hover {
  background-color: #f9fafb;
}

tbody tr:last-child {
  border-bottom: none;
}

td {
  padding: 0.75rem 1.25rem;
  font-size: 0.875rem;
  color: #111827;
  vertical-align: middle;
}

/* notes input styling */
.notes-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  color: #111827;
}

.notes-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.08);
}

.notes-input::placeholder { color: #9ca3af; }

/* action select */
.action-select-wrapper { position: relative; display: inline-block; width: 100%; }
.action-select {
  appearance: none;
  width: 100%;
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.5rem 2rem 0.5rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
}

.action-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.08);
}

.action-select-wrapper::after {
  content: '';
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid #6b7280;
  pointer-events: none;
}

/* --------- Breakpoints --------- */

/* medium screens: make select narrower so both look balanced */
@media (max-width: 1100px) {
  .filters {
    grid-template-columns: 1fr 260px;
    gap: 14px;
  }

  .container { padding: 0 16px; }
}

/* tablet: stack filters vertically and keep equal widths */
@media (max-width: 768px) {
  .filters {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  /* ensure filter controls remain full width */
  .filter-group input,
  .filter-group select { font-size: 0.9rem; }

  table { min-width: 640px; }
}

/* small phones: reduce paddings and allow table scroll */
@media (max-width: 480px) {
  .page-container { padding: 12px; margin-bottom: 10rem; }
  .container { padding: 0 12px; }
  .filters { gap: 10px; }

  .filter-group label { font-size: 0.8125rem; }
  .filter-group input,
  .filter-group select { padding: 0.5rem 0.75rem; }

  table { min-width: 560px; }
  th, td { padding: 0.6rem 0.9rem; font-size: 0.8rem; }
}

/* accessibility: focus visible */
.filter-group input:focus-visible,
.filter-group select:focus-visible,
.action-select:focus-visible,
.notes-input:focus-visible {
  outline: 2px solid rgba(59,130,246,0.15);
  outline-offset: 2px;
}
</style>
