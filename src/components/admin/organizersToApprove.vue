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
const isLoading = ref(false)

/**
 * Recursively collect candidate IDs from an organizer object.
 * We prefer keys like user_id/organizer_id, but if missing we try other ids too.
 */
const collectCandidateIds = (obj) => {
  const ids = new Set()

  const addIfValid = (v) => {
    if (v === null || v === undefined) return
    const n = Number(v)
    if (Number.isInteger(n) && n > 0) ids.add(n)
  }

  const visit = (node, depth = 0) => {
    if (!node || typeof node !== 'object' || depth > 6) return

    // Common fields
    addIfValid(node.user_id)
    addIfValid(node.organizer_id)
    addIfValid(node.organiser_id)
    addIfValid(node.account_id)

    addIfValid(node.userId)
    addIfValid(node.organizerId)
    addIfValid(node.organiserId)

    // Sometimes the "id" is actually the user id (we still collect it)
    addIfValid(node.id)

    // Nested objects often used by APIs
    if (node.user) {
      addIfValid(node.user.id)
      addIfValid(node.user.user_id)
      visit(node.user, depth + 1)
    }
    if (node.organizer) {
      addIfValid(node.organizer.id)
      addIfValid(node.organizer.user_id)
      visit(node.organizer, depth + 1)
    }
    if (node.organiser) {
      addIfValid(node.organiser.id)
      addIfValid(node.organiser.user_id)
      visit(node.organiser, depth + 1)
    }

    // Generic scan: any key ending with "_id"
    for (const [k, v] of Object.entries(node)) {
      if (typeof v === 'object' && v !== null) visit(v, depth + 1)
      if (k.toLowerCase().endsWith('_id')) addIfValid(v)
    }
  }

  visit(obj)

  // priority order: prefer explicit user/org ids first
  const ordered = []
  const prefer = [
    obj?.user_id,
    obj?.organizer_id,
    obj?.organiser_id,
    obj?.user?.id,
    obj?.organizer?.id,
    obj?.organiser?.id,
    obj?.id,
  ]

  for (const p of prefer) {
    const n = Number(p)
    if (Number.isInteger(n) && n > 0 && ids.has(n) && !ordered.includes(n)) {
      ordered.push(n)
    }
  }

  // append remaining
  for (const id of ids) {
    if (!ordered.includes(id)) ordered.push(id)
  }

  return ordered
}

const isUserNotFound404 = (err) => {
  const msg =
    err?.response?.data?.message ||
    err?.response?.data?.error ||
    err?.message ||
    ''
  return err?.response?.status === 404 && String(msg).toLowerCase().includes('no query results for model')
}

// ---------------------
// FETCH PENDING ORGANIZERS
// ---------------------
const fetchPendingOrganizers = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''

    const res = await api.get('/admin/organizers/pending')

    if (res.data?.success) {
      organizers.value = res.data.data || []
    } else if (Array.isArray(res.data)) {
      organizers.value = res.data
    } else {
      errorMessage.value = res.data?.message || 'Failed to fetch organizers'
    }

    if (organizers.value.length) {
      console.log('pending organizer example:', organizers.value[0])
      console.log('candidate ids:', collectCandidateIds(organizers.value[0]))
    }
  } catch (error) {
    if (error.response?.status === 401) {
      errorMessage.value = 'Unauthorized: Please login as Super Admin again.'
    } else if (error.response?.status === 403) {
      errorMessage.value = 'Forbidden: Super Admin role required.'
    } else {
      errorMessage.value = error.response?.data?.message || 'Error fetching organizers'
    }
  } finally {
    isLoading.value = false
  }
}

// ---------------------
// APPROVE ORGANIZER (try multiple candidate IDs)
// ---------------------
const approveOrganizer = async (organizer) => {
  const candidates = collectCandidateIds(organizer)

  if (!candidates.length) {
    errorMessage.value =
      'Cannot approve: no candidate id found in the pending organizer object. Check console log.'
    return
  }

  errorMessage.value = ''
  for (const id of candidates) {
    try {
      const res = await api.post(`/admin/organizers/${id}/approve`)
      if (res.data?.success) {
        organizers.value = organizers.value.filter(o => o.id !== organizer.id)
        closePopups()
        return
      }
      // backend responded but not success
      errorMessage.value = res.data?.message || `Failed to approve organizer with id ${id}`
      return
    } catch (err) {
      // If this id is not a valid User id, backend throws 404 model not found → try next id
      if (isUserNotFound404(err)) continue

      // Other errors: stop and show
      if (err.response?.status === 401) {
        errorMessage.value = 'Unauthorized: Please login as Super Admin again.'
      } else if (err.response?.status === 403) {
        errorMessage.value = 'Forbidden: Super Admin role required.'
      } else {
        errorMessage.value = err.response?.data?.message || `Error approving organizer (id tried: ${id})`
      }
      return
    }
  }

  // If we tried all ids and none worked:
  errorMessage.value =
    'Approve failed: none of the candidate IDs matched a real User. Open console → "pending organizer example" and tell me which field holds the real user id.'
}

// ---------------------
// REJECT ORGANIZER (DELETE) (try multiple candidate IDs)
// ---------------------
const rejectOrganizer = async (organizer) => {
  const candidates = collectCandidateIds(organizer)

  if (!candidates.length) {
    errorMessage.value =
      'Cannot reject: no candidate id found in the pending organizer object. Check console log.'
    return
  }

  errorMessage.value = ''
  for (const id of candidates) {
    try {
      const res = await api.delete(`/admin/organizers/${id}/reject`)
      if (res.data?.success) {
        organizers.value = organizers.value.filter(o => o.id !== organizer.id)
        closePopups()
        return
      }
      errorMessage.value = res.data?.message || `Failed to reject organizer with id ${id}`
      return
    } catch (err) {
      if (isUserNotFound404(err)) continue

      if (err.response?.status === 401) {
        errorMessage.value = 'Unauthorized: Please login as Super Admin again.'
      } else if (err.response?.status === 403) {
        errorMessage.value = 'Forbidden: Super Admin role required.'
      } else {
        errorMessage.value = err.response?.data?.message || `Error rejecting organizer (id tried: ${id})`
      }
      return
    }
  }

  errorMessage.value =
    'Reject failed: none of the candidate IDs matched a real User. Open console → "pending organizer example" and tell me which field holds the real user id.'
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
  if (selectedOrganizer.value) approveOrganizer(selectedOrganizer.value)
}

const confirmReject = () => {
  if (selectedOrganizer.value) rejectOrganizer(selectedOrganizer.value)
}

const closePopups = () => {
  showApprovePopup.value = false
  showRejectPopup.value = false
  selectedOrganizer.value = null
}

// ---------------------
// LIFECYCLE
// ---------------------
onMounted(() => {
  const adminToken = localStorage.getItem('adminToken')
  if (!adminToken) {
    errorMessage.value = 'No admin token found. Please login as Super Admin.'
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

      <div v-if="isLoading" style="margin-top:10px;color:#374151;font-weight:500;">
        Loading...
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
              <button class="btn-approve" @click="handleApprove(organizer)">
                Approve
              </button>
              <button class="btn-reject" @click="handleReject(organizer)">
                Reject
              </button>
            </td>
          </tr>

          <tr v-if="!isLoading && organizers.length === 0">
            <td colspan="7" style="padding:18px;color:#6B7280;">
              No pending organizers.
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
        :userId="selectedUserId"
        @close="closePopups"
        @confirm="confirmApprove"
      />

      <ApplicationDeletion
        v-if="showRejectPopup"
        :organizerData="selectedOrganizer"
        :userId="selectedUserId"
        @close="closePopups"
        @confirm="confirmReject"
      />
    </div>
  </div>
</template>

<style scoped>
/* keep your existing styles */
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

@media (max-width: 768px) {
  .page-container { padding: 20px; margin: 10px; max-width: 100%; }
  .section-header h1 { font-size: 20px; margin-bottom: 16px; }
  .table-card { overflow-x: auto; }
  .organizer-table { min-width: 800px; }
  .organizer-table th, .organizer-table td { padding: 8px 12px; font-size: 12px; }
  .actions-cell { flex-direction: column; gap: 4px; }
  .btn-approve, .btn-reject { padding: 6px 12px; font-size: 12px; }
}

@media (max-width: 480px) {
  .page-container { padding: 10px; margin: 5px; }
  .section-header h1 { font-size: 18px; margin-bottom: 12px; }
  .organizer-table th, .organizer-table td { padding: 6px 8px; font-size: 11px; }
  .btn-approve, .btn-reject { padding: 4px 8px; font-size: 11px; }
}
</style>
