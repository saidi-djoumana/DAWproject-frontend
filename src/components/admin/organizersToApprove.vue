<script setup>
import { ref } from 'vue';
import OrganizerActivation from './organizerActivation.vue';
import ApplicationDeletion from './applicationDeletion.vue';


const organizers = ref([
  { name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890', institution: 'Example University', country: 'USA', createdAt: '2023-10-01' },
  { name: 'Jane Smith', email: 'jane.smith@example.com', phone: '098-765-4321', institution: 'Sample College', country: 'Canada', createdAt: '2023-10-02' },
  { name: 'Alice Johnson', email: 'alice.johnson@example.com', phone: '555-123-4567', institution: 'University of Example', country: 'UK', createdAt: '2023-10-03' },
]);

// Modal State
const showApprovePopup = ref(false);
const showRejectPopup = ref(false);
const selectedOrganizer = ref(null);

const handleApprove = (organizer) => {
  selectedOrganizer.value = {
    ...organizer,
    timestamp: new Date().toLocaleString()
  };
  showApprovePopup.value = true;
};

const handleReject = (organizer) => {
  selectedOrganizer.value = organizer;
  showRejectPopup.value = true;
};

const closePopups = () => {
  showApprovePopup.value = false;
  showRejectPopup.value = false;
  selectedOrganizer.value = null;
};
</script>

<template>
  <div class="page-container">
    <header class="section-header">
      <h1>List of Organizers Awaiting Approval</h1>
    </header>

    <div class="table-card">
      <table class="organizer-table">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Institution</th>
            <th>Country</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(organizer, index) in organizers" :key="index">
            <td>{{ organizer.name }}</td>
            <td>{{ organizer.email }}</td>
            <td>{{ organizer.phone }}</td>
            <td>{{ organizer.institution }}</td>
            <td>{{ organizer.country }}</td>
            <td>{{ organizer.createdAt }}</td>
            <td class="actions-cell">
              <button @click="handleApprove(organizer)" class="btn-approve">Approve</button>
              <button @click="handleReject(organizer)" class="btn-reject">Reject</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showApprovePopup || showRejectPopup" class="modal-overlay" @click.self="closePopups">
      
      <OrganizerActivation 
        v-if="showApprovePopup"
        :organizerData="selectedOrganizer" 
        @close="closePopups" 
      />

      <ApplicationDeletion 
        v-if="showRejectPopup"
        :organizerData="selectedOrganizer" 
        @close="closePopups" 
      />
      
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
}

.table-card {
  background: #fff;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.organizer-table {
  width: 100%;
  border-collapse: collapse;
}

.organizer-table thead tr {
  background-color: #E5E7EB;
}

.organizer-table th {
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 700;
  text-align: left;
}

.organizer-table td {
  padding: 16px;
  font-size: 14px;
  border-bottom: 1px solid #E5E7EB;
}

.actions-cell {
  display: flex;
  gap: 8px;
}

.btn-approve {
  background-color: #5CB85C;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}

.btn-reject {
  background-color: #D9534F;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
</style>