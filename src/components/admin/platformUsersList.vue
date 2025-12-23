<script setup>
import { ref } from 'vue';
import ToggleUserStatus from './toggleUserStatus.vue';

// Mock data based on the "Complete List of Platform Users" screenshot
const users = ref([
  { name: 'Alice Johnson', email: 'alice.johnson@example.com', phone: '(123) 456-7890', institution: 'University A', country: 'USA', roles: 'Admin', createdAt: '2023-01-15', status: 'Active' },
  { name: 'Bob Smith', email: 'bob.smith@example.com', phone: '(234) 567-8901', institution: 'University B', country: 'Canada', roles: 'User', createdAt: '2023-02-20', status: 'Active' },
  { name: 'Charlie Brown', email: 'charlie.brown@example.com', phone: '(345) 678-9012', institution: 'University C', country: 'UK', roles: 'Moderator', createdAt: '2023-03-10', status: 'Active' },
  { name: 'Dana White', email: 'dana.white@example.com', phone: '(456) 789-0123', institution: 'University D', country: 'Australia', roles: 'Admin', createdAt: '2023-04-05', status: 'Active' },
  { name: 'Eve Davis', email: 'eve.davis@example.com', phone: '(567) 890-1234', institution: 'University E', country: 'Germany', roles: 'User', createdAt: '2023-05-15', status: 'Active' }
]);

const showToggleModal = ref(false);
const selectedUser = ref(null);

const openToggleModal = (user) => {
  selectedUser.value = { ...user };
  showToggleModal.value = true;
};

const closeToggleModal = () => {
  showToggleModal.value = false;
  selectedUser.value = null;
};

const handleUpdateStatus = (updatedUser) => {
  // Logic to update the status in the local list
  const index = users.value.findIndex(u => u.email === updatedUser.email);
  if (index !== -1) {
    users.value[index].status = users.value[index].status === 'Active' ? 'Inactive' : 'Active';
  }
  closeToggleModal();
};

const handleDelete = (user) => {
  console.log('Deleting user:', user.name);
};
</script>

<template>
  <div class="page-container">
    <header class="section-header">
      <h1>Complete List of Platfrom Users</h1>
    </header>

    <div class="table-card">
      <table class="user-table">
        <thead>
          <tr>
            <th>USER NAME</th>
            <th>EMAIL</th>
            <th>PHONE</th>
            <th>INSTITUTION</th>
            <th>COUNTRY</th>
            <th>ROLES</th>
            <th>CREATED AT</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="index">
            <td class="user-name-cell">{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td class="phone-cell">{{ user.phone }}</td>
            <td>{{ user.institution }}</td>
            <td>{{ user.country }}</td>
            <td>{{ user.roles }}</td>
            <td>{{ user.createdAt }}</td>
            <td class="actions-cell">
              <button @click="openToggleModal(user)" class="btn-toggle">Toggle Status</button>
              <button @click="handleDelete(user)" class="btn-delete">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showToggleModal" class="modal-overlay" @click.self="closeToggleModal">
      <ToggleUserStatus 
        :userData="selectedUser" 
        @close="closeToggleModal" 
        @update="handleUpdateStatus"
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
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
}

.user-table thead tr {
  background-color: #E5E7EB; /* Header color */
}

.user-table th {
  padding: 16px;
  font-size: 13px;
  font-weight: 700;
  text-align: left;
  color: #374151;
  text-transform: uppercase;
}

.user-table td {
  padding: 16px;
  font-size: 14px;
  color: #6B7280;
  border-bottom: 1px solid #F3F4F6;
}

.user-name-cell { font-weight: 500; color: #374151; }

.actions-cell {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.btn-toggle {
  background-color: #EAB308; /* Yellow */
  color: white; border: none; padding: 6px 12px; border-radius: 4px; font-weight: 600; cursor: pointer;
}

.btn-delete {
  background-color: #EF4444; /* Red */
  color: white; border: none; padding: 6px 12px; border-radius: 4px; font-weight: 600; cursor: pointer;
}

.modal-overlay {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex; justify-content: center; align-items: center; z-index: 1000;
}
</style>