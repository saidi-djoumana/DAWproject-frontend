<!-- src/components/evaluation/Proposals.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import userApi from '@/api/userAxios'

const emit = defineEmits(['evaluate'])

const submissions = ref([])
const loading = ref(false)
const error = ref(null)

/**
 * Extract array safely from different backend response shapes
 */
function extractArray(payload) {
  return Array.isArray(payload) ? payload :
    Array.isArray(payload?.data) ? payload.data :
    Array.isArray(payload?.data?.data) ? payload.data.data : // paginated
    Array.isArray(payload?.data?.submissions) ? payload.data.submissions :
    Array.isArray(payload?.submissions) ? payload.submissions :
    []
}

async function fetchData() {
  loading.value = true
  error.value = null

  try {
    // Fetch all submissions
    const res = await userApi.get('/submissions')
    const allSubmissions = extractArray(res.data)

    // ✅ Show only pending submissions (global rule)
    submissions.value = allSubmissions.filter(
      (s) => (s?.status ?? 'pending') === 'pending'
    )
  } catch (e) {
    error.value =
      e?.response?.data?.message ||
      e?.message ||
      'Failed to load submissions'
  } finally {
    loading.value = false
  }
}

const handleEvaluate = (submission) => {
  emit('evaluate', submission)
}

onMounted(fetchData)

// ✅ expose refresh to parent (Evaluation.vue)
defineExpose({ fetchData })
</script>


<template>
  <div class="container">
    <header class="section-header">
      <h1>Submissions</h1>
    </header>

    <div v-if="loading">Loading submissions...</div>

    <div v-else-if="error" style="color:#DC2626; margin: 10px 0; white-space: pre-line;">
      {{ error }}
    </div>

    <div v-else-if="submissions.length === 0">
      🎉 You have evaluated all available submissions.
    </div>

    <div
      v-else
      v-for="submission in submissions"
      :key="submission.id"
      class="proposal-card"
    >
      <div class="proposal-content">
        <div class="info-row">
          <span class="label">Title:</span>
          {{ submission.title ?? submission.paper_title ?? '—' }}
        </div>

        <div class="info-row">
          <span class="label">Authors:</span>
          {{ submission.authors ?? submission.user?.name ?? '—' }}
        </div>

        <div class="info-row">
          <span class="label">Event:</span>
          {{ submission.event?.title ?? submission.event?.name ?? '—' }}
        </div>

        <div class="info-row">
          <span class="label">Evaluation Deadline:</span>
          {{ submission.deadline ?? submission.event?.submission_deadline ?? '—' }}
        </div>
      </div>

      <div class="action-row">
        <button @click="handleEvaluate(submission)" class="btn-evaluate">
          Evaluate
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Main Container */
.container {
  background-color: #F3F4F6;
  padding: 20px;
  font-family: 'Inter', sans-serif;
  color: #000;
  min-height: 100vh;

  max-width: 1300px;
  margin: 20px auto;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Header */
.section-header h1 {
  font-family: 'poppins', sans-serif;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
}

/* Proposal Card */
.proposal-card {
  background: #fff;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
}

.proposal-content {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.info-row {
  font-size: 14px;
  line-height: 1.5;
  color: #111827;
}

.label {
  font-weight: 600;
}

/* Action Button */
.action-row {
  display: flex;
  justify-content: flex-end;
  margin-top: 6px;
}

.btn-evaluate {
  background: none;
  border: none;
  color: #3B82F6;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 4px 8px;
}

.btn-evaluate:hover {
  text-decoration: underline;
}

/* Responsive styles */
@media (max-width: 768px) {
  .container {
    padding: 15px;
    margin: 10px;
    max-width: 100%;
  }

  .section-header h1 {
    font-size: 20px;
    margin-bottom: 15px;
  }

  .proposal-card {
    padding: 15px;
    margin-bottom: 12px;
  }

  .info-row {
    font-size: 13px;
  }

  .btn-evaluate {
    font-size: 13px;
    padding: 3px 6px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 10px;
    margin: 5px;
  }

  .section-header h1 {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .proposal-card {
    padding: 12px;
    margin-bottom: 10px;
  }

  .info-row {
    font-size: 12px;
  }

  .btn-evaluate {
    font-size: 12px;
    padding: 2px 4px;
  }
}
</style>
