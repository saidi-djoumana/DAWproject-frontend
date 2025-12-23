<script setup>
import { ref } from 'vue';

// Mock data for the dashboard
const stats = ref({
  totalUsers: '1,250',
  pendingOrganizers: '15',
  totalEvents: '300',
  totalSubmissions: '500',
  totalEvaluations: '250',
  totalRegistrations: '1,000',
  registrationRevenue: '$20,000'
});
</script>

<template>
  <div class="dashboard-container">
    <header class="dashboard-header">
      <h1>Dashboard</h1>
    </header>

    <div class="main-grid">
      <div class="card stat-card">
        <label>Total Users</label>
        <div class="primary-val">{{ stats.totalUsers }}</div>
      </div>

      <div class="card chart-card">
        <label>Users by Role</label>
        <div class="chart-placeholder">
          <span>User Role Chart Placeholder</span>
        </div>
      </div>

      <div class="card stat-card">
        <label>Pending Organizers</label>
        <div class="primary-val">{{ stats.pendingOrganizers }}</div>
      </div>

      <div class="card stat-card">
        <label>Total Events</label>
        <div class="primary-val">{{ stats.totalEvents }}</div>
      </div>

      <div class="card chart-card">
        <label>Events by Status</label>
        <div class="chart-placeholder">
          <span>Events Status Chart Placeholder</span>
        </div>
      </div>

      <div class="card chart-card">
        <label>Events by Type</label>
        <div class="chart-placeholder">
          <span>Events Type Chart Placeholder</span>
        </div>
      </div>

      <div class="card stat-card">
        <label>Total Submissions</label>
        <div class="primary-val">{{ stats.totalSubmissions }}</div>
      </div>

      <div class="card chart-card">
        <label>Submissions by Status</label>
        <div class="chart-placeholder">
          <span>Submissions Status Chart Placeholder</span>
        </div>
      </div>

      <div class="card stat-card">
        <label>Total Evaluations</label>
        <div class="primary-val">{{ stats.totalEvaluations }}</div>
      </div>
    </div>

    <div class="bottom-grid">
      <div class="card mini-card">
        <label>Total Registrations</label>
        <div class="primary-val">{{ stats.totalRegistrations }}</div>
      </div>
      <div class="card mini-card">
        <label>Registration Revenue</label>
        <div class="primary-val">{{ stats.registrationRevenue }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  background-color: #F3F4F6;
  font-family: 'Inter', sans-serif;
  padding: 40px;
  min-height: 100vh;
  color: #111827;
  max-width: 1300px;
  margin: 30px auto;
}

.dashboard-header h1 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 30px;
}

/* Grids */
.main-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}

.bottom-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Matching main grid width for the two cards */
  gap: 20px;
}

/* Card Styling */
.card {
  background: #ffffff;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
}

.stat-card {
  min-height: 200px;
}

.mini-card {
  padding: 16px 24px;
}

label {
  font-size: 14px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 8px;
}

.primary-val {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 40px;
}

.secondary-val {
  font-size: 24px;
  font-weight: 700;
  margin-top: auto;
}

/* Chart Placeholder */
.chart-placeholder {
  flex: 1;
  background-color: #E5E7EB;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 150px;
  margin-top: 10px;
}

.chart-placeholder span {
  font-size: 12px;
  color: #6B7280;
  font-weight: 500;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .main-grid, .bottom-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .main-grid, .bottom-grid {
    grid-template-columns: 1fr;
  }
}
</style>