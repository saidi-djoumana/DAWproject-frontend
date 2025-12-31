<script setup>
import { ref, onMounted } from 'vue';
import api from '@/api/axios';
import ToggleUserStatus from './toggleUserStatus.vue';

/* =============================
   State
============================= */
const users = ref([]);
const showToggleModal = ref(false);
const selectedUser = ref(null);

/* =============================
   Fetch users (ADMIN)
============================= */
const fetchUsers = async () => {
  try {
    const res = await api.get('/admin/users');

    users.value = res.data.data.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone ?? '',
      institution: user.institution ?? '',
      country: user.country ?? '',
      roles: Array.isArray(user.roles)
        ? user.roles.map(role => role.name).join(', ')
        : String(user.roles ?? ''),
          createdAt: new Date(user.created_at).toLocaleString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}),
      status: user.is_active ? 'Active' : 'Inactive'
    }));
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

/* =============================
   Modal handling
============================= */
const openToggleModal = (user) => {
  selectedUser.value = { ...user };
  showToggleModal.value = true;
};

const closeToggleModal = () => {
  showToggleModal.value = false;
  selectedUser.value = null;
};

/* =============================
   Toggle user status
============================= */
const handleUpdateStatus = async () => {
  if (!selectedUser.value) return;

  try {
    await api.put(`/admin/users/${selectedUser.value.id}/toggle-status`);

    const index = users.value.findIndex(
      u => u.email === selectedUser.value.email
    );

    if (index !== -1) {
      users.value[index].status =
        users.value[index].status === 'Active'
          ? 'Inactive'
          : 'Active';
    }
  } catch (error) {
    console.error('Failed to update status:', error);
  } finally {
    closeToggleModal();
  }
};

/* =============================
   Delete user
============================= */
const handleDelete = async (user) => {
  if (!confirm(`Delete ${user.name}?`)) return;

  try {
    await api.delete(`/admin/users/${user.id}`);
    users.value = users.value.filter(u => u.email !== user.email);
  } catch (error) {
    console.error('Failed to delete user:', error);
  }
};

onMounted(() => {
  const adminToken = localStorage.getItem('adminToken');
  if (adminToken) fetchUsers();
  else error.value = 'No admin token found';
});

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