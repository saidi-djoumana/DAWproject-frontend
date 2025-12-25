<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api/axios'
import OrganizerActivation from './organizerActivation.vue'
import ApplicationDeletion from './applicationDeletion.vue'

const organizers = ref([])
const showApprovePopup = ref(false)
const showRejectPopup = ref(false)
const selectedOrganizer = ref(null)
const errorMessage = ref('')

// ---------------------
// FETCH PENDING ORGANIZERS
// ---------------------
const fetchPendingOrganizers = async () => {
  try {
    const res = await api.get('/admin/organizers/pending')
    if (res.data.success) {
      organizers.value = res.data.data
    } else {
      errorMessage.value = res.data.message || 'Failed to fetch organizers'
    }
  } catch (error) {
    if (error.response?.status === 401) {
      errorMessage.value = 'Not authenticated (token missing or expired)'
    } else if (error.response?.status === 403) {
      errorMessage.value = 'Forbidden (admin role required)'
    } else {
      errorMessage.value =
        error.response?.data?.message || 'Error fetching organizers'
    }
  }
}

// ---------------------
// APPROVE ORGANIZER
// ---------------------
const approveOrganizer = async (organizerId) => {
  try {
    const res = await api.post(`/admin/organizers/${organizerId}/approve`)
    if (res.data.success) {
      organizers.value = organizers.value.filter(o => o.id !== organizerId)
      closePopups()
    } else {
      errorMessage.value = res.data.message || 'Failed to approve organizer'
    }
  } catch (error) {
    if (error.response?.status === 401) {
      errorMessage.value = 'Not authenticated'
    } else if (error.response?.status === 403) {
      errorMessage.value = 'Forbidden (admin role required)'
    } else {
      errorMessage.value =
        error.response?.data?.message || 'Error approving organizer'
    }
  }
}

// ---------------------
// REJECT ORGANIZER
// ---------------------
const rejectOrganizer = async (organizerId) => {
  try {
    const res = await api.post(`/admin/organizers/${organizerId}/reject`)
    if (res.data.success) {
      organizers.value = organizers.value.filter(o => o.id !== organizerId)
      closePopups()
    } else {
      errorMessage.value = res.data.message || 'Failed to reject organizer'
    }
  } catch (error) {
    if (error.response?.status === 401) {
      errorMessage.value = 'Not authenticated'
    } else if (error.response?.status === 403) {
      errorMessage.value = 'Forbidden (admin role required)'
    } else {
      errorMessage.value =
        error.response?.data?.message || 'Error rejecting organizer'
    }
  }
}

// ---------------------
// MODAL HANDLERS
// ---------------------
const handleApprove = (organizer) => {
  selectedOrganizer.value = { ...organizer }
  showApprovePopup.value = true
}

const handleReject = (organizer) => {
  selectedOrganizer.value = { ...organizer }
  showRejectPopup.value = true
}

const confirmApprove = () => {
  if (selectedOrganizer.value) {
    approveOrganizer(selectedOrganizer.value.id)
  }
}

const confirmReject = () => {
  if (selectedOrganizer.value) {
    rejectOrganizer(selectedOrganizer.value.id)
  }
}

const closePopups = () => {
  showApprovePopup.value = false
  showRejectPopup.value = false
  selectedOrganizer.value = null
  errorMessage.value = ''
}

// ---------------------
// LIFECYCLE
// ---------------------
onMounted(() => {
  const token = localStorage.getItem('authToken')
  if (!token) {
    errorMessage.value = 'No authentication token found'
    return
  }
  fetchPendingOrganizers()
})
</script>

<template>
  <div class="page-container">
    <header class="section-header">
      <h1>List of Organizers Awaiting Approval</h1>
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
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
          <tr v-for="organizer in organizers" :key="organizer.id">
            <td>{{ organizer.name }}</td>
            <td>{{ organizer.email }}</td>
            <td>{{ organizer.phone || '-' }}</td>
            <td>{{ organizer.institution || '-' }}</td>
            <td>{{ organizer.country || '-' }}</td>
            <td>{{ new Date(organizer.created_at).toLocaleString() }}</td>
            <td class="actions-cell">
              <button
                class="btn-approve"
                @click="handleApprove(organizer)"
              >
                Approve
              </button>
              <button
                class="btn-reject"
                @click="handleReject(organizer)"
              >
                Reject
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- MODALS -->
    <div
      v-if="showApprovePopup || showRejectPopup"
      class="modal-overlay"
      @click.self="closePopups"
    >
      <OrganizerActivation
        v-if="showApprovePopup"
        :organizerData="selectedOrganizer"
        @close="closePopups"
        @confirm="confirmApprove"
      />

      <ApplicationDeletion
        v-if="showRejectPopup"
        :organizerData="selectedOrganizer"
        @close="closePopups"
        @confirm="confirmReject"
      />
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
}

.error-message {
  color: #D9534F;
  margin-top: 8px;
  margin-bottom: 16px;
  font-weight: 500;
  padding: 12px;
  background-color: #FEE2E2;
  border-radius: 8px;
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

.btn-approve:hover {
  background-color: #4CAF50;
}

.btn-reject:hover {
  background-color: #C9302C;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
</style>
