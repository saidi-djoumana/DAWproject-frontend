<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '@/api/axios' // ✅ Changed from 'axios' to your configured api
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { Pie } from 'vue-chartjs'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

// Stats data
const stats = ref({
  total_users: 0,
  users_by_role: [],
  pending_organizers: 0,
  total_events: 0,
  events_by_status: [],
  events_by_type: [],
  total_submissions: 0,
  submissions_by_status: [],
  total_evaluations: 0,
  total_registrations: 0,
  registration_revenue: 0
})

const errorMessage = ref('')
const isLoaded = ref(false)

// Chart data computed properties
const usersByRoleData = computed(() => ({
  labels: stats.value.users_by_role.map(r => r.name),
  datasets: [{
    label: 'Users by Role',
    data: stats.value.users_by_role.map(r => r.count),
    backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#F43F5E'],
    borderWidth: 1
  }]
}))

const eventsByStatusData = computed(() => {
  const statuses = ['upcoming', 'ongoing', 'completed', 'cancelled']
  const counts = statuses.map(status => {
    const found = stats.value.events_by_status.find(e => e.status === status)
    return found ? found.count : 0
  })
  return {
    labels: statuses,
    datasets: [{
      label: 'Events by Status',
      data: counts,
      backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
      borderWidth: 1
    }]
  }
})

const eventsByTypeData = computed(() => {
  const types = ['congress','seminar','workshop','conference']
  const counts = types.map(type => {
    const found = stats.value.events_by_type.find(e => e.type === type)
    return found ? found.count : 0
  })
  return {
    labels: types,
    datasets: [{
      label: 'Events by Type',
      data: counts,
      backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
      borderWidth: 1
    }]
  }
})

const submissionsByStatusData = computed(() => {
  const statuses = ['pending','accepted','rejected','revision']
  const counts = statuses.map(status => {
    const found = stats.value.submissions_by_status.find(e => e.status === status)
    return found ? found.count : 0
  })
  return {
    labels: statuses,
    datasets: [{
      label: 'Submissions by Status',
      data: counts,
      backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
      borderWidth: 1
    }]
  }
})

// Fetch dashboard data - ✅ Now using api instead of axios
const fetchDashboard = async () => {
  try {
    const res = await api.get('/admin/dashboard') // ✅ Simplified - token automatically added by interceptor
    if (res.data.success) {
      stats.value = res.data.data
      isLoaded.value = true
    } else {
      errorMessage.value = res.data.message || 'Failed to load dashboard'
    }
  } catch (error) {
    console.error(error)
    errorMessage.value = error.response?.data?.message || 'Error fetching dashboard data'
  }
}

onMounted(() => {
  const adminToken = localStorage.getItem('adminToken');
  if (adminToken) fetchDashboard();
  else error.value = 'No admin token found';
});

</script>

<template>
  <div class="dashboard-container">
    <header class="dashboard-header">
      <h1>Dashboard</h1>
    </header>

    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

    <div class="main-grid" v-else>
      <!-- Total Users -->
      <div class="card stat-card">
        <label>Total Users</label>
        <div class="primary-val">{{ stats.total_users }}</div>
      </div>

      <!-- Users by Role Chart -->
      <div class="card chart-card">
        <label>Users by Role</label>
        <div class="chart-wrapper" v-if="isLoaded">
          <Pie :data="usersByRoleData" :options="{ responsive:true, maintainAspectRatio:false, plugins:{ legend:{ position:'bottom' } } }" />
        </div>
        <div v-else class="chart-placeholder">Loading chart...</div>
      </div>

      <!-- Pending Organizers -->
      <div class="card stat-card">
        <label>Pending Organizers</label>
        <div class="primary-val">{{ stats.pending_organizers }}</div>
      </div>

      <!-- Total Events -->
      <div class="card stat-card">
        <label>Total Events</label>
        <div class="primary-val">{{ stats.total_events }}</div>
      </div>

      <!-- Events by Status Chart -->
      <div class="card chart-card">
        <label>Events by Status</label>
        <div class="chart-wrapper" v-if="isLoaded">
          <Pie :data="eventsByStatusData" :options="{ responsive:true, maintainAspectRatio:false, plugins:{ legend:{ position:'bottom' } } }" />
        </div>
        <div v-else class="chart-placeholder">Loading chart...</div>
      </div>

      <!-- Events by Type Chart -->
      <div class="card chart-card">
        <label>Events by Type</label>
        <div class="chart-wrapper" v-if="isLoaded">
          <Pie :data="eventsByTypeData" :options="{ responsive:true, maintainAspectRatio:false, plugins:{ legend:{ position:'bottom' } } }" />
        </div>
        <div v-else class="chart-placeholder">Loading chart...</div>
      </div>

      <!-- Total Submissions -->
      <div class="card stat-card">
        <label>Total Submissions</label>
        <div class="primary-val">{{ stats.total_submissions }}</div>
      </div>

      <!-- Submissions by Status Chart -->
      <div class="card chart-card">
        <label>Submissions by Status</label>
        <div class="chart-wrapper" v-if="isLoaded">
          <Pie :data="submissionsByStatusData" :options="{ responsive:true, maintainAspectRatio:false, plugins:{ legend:{ position:'bottom' } } }" />
        </div>
        <div v-else class="chart-placeholder">Loading chart...</div>
      </div>

      <!-- Total Evaluations -->
      <div class="card stat-card">
        <label>Total Evaluations</label>
        <div class="primary-val">{{ stats.total_evaluations }}</div>
      </div>
    </div>

    <div class="bottom-grid">
      <div class="card mini-card">
        <label>Total Registrations</label>
        <div class="primary-val">{{ stats.total_registrations }}</div>
      </div>
      <div class="card mini-card">
        <label>Registration Revenue</label>
        <div class="primary-val">${{ stats.registration_revenue }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container { background-color: #F3F4F6; font-family: 'Inter', sans-serif; padding: 40px; min-height: 100vh; color: #111827; max-width: 1300px; margin: 30px auto; }
.dashboard-header h1 { font-size: 28px; font-weight: 700; margin-bottom: 30px; }
.error-message { color: #D9534F; margin-bottom: 20px; font-weight: 500; padding: 12px; background-color: #FEE2E2; border-radius: 8px; }
.main-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 20px; }
.bottom-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.card { background: #ffffff; border: 1px solid #E5E7EB; border-radius: 8px; padding: 24px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); display: flex; flex-direction: column; }
.stat-card { min-height: 200px; }
.mini-card { padding: 16px 24px; }
label { font-size: 14px; font-weight: 700; color: #111827; margin-bottom: 8px; }
.primary-val { font-size: 24px; font-weight: 700; margin-bottom: 40px; }
.chart-card { min-height: 250px; }
.chart-wrapper { flex: 1; min-height: 250px; }
.chart-placeholder { flex: 1; background-color: #E5E7EB; border-radius: 6px; display: flex; align-items: center; justify-content: center; min-height: 150px; margin-top: 10px; }
.chart-placeholder span { font-size: 12px; color: #6B7280; font-weight: 500; }
@media (max-width: 1024px) { .main-grid, .bottom-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .main-grid, .bottom-grid { grid-template-columns: 1fr; } }
</style>