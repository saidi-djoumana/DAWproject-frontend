<script setup>
import { defineProps, defineEmits, ref } from 'vue'

const props = defineProps({
  organizerData: { type: Object, required: true },
  userId: { type: [Number, String, null], default: null }
})

const emit = defineEmits(['close', 'confirm'])
const isLoading = ref(false)
const errorMessage = ref('')
</script>

<template>
  <div class="activation-card">
    <header class="card-header">
      <h1>Organizer Activation</h1>
    </header>

    <div class="info-section">
      <h3 class="section-title">Confirmation Message:</h3>
      <p class="message-text">Are you sure you want to approve this organizer?</p>
      <p v-if="userId" style="margin-top:6px;color:#6B7280;font-size:13px;">
        Approving user id: <b>{{ userId }}</b>
      </p>
    </div>

    <div class="info-section">
      <h3 class="section-title">Organizer Details:</h3>
      <div class="detail-row">
        <span class="label">Name:</span>
        <span class="value dotted-box">{{ organizerData.name }}</span>
      </div>
      <div class="detail-row">
        <span class="label">Email:</span>
        <span class="value">{{ organizerData.email }}</span>
      </div>
      <div class="detail-row">
        <span class="label">Phone:</span>
        <span class="value">{{ organizerData.phone || 'N/A' }}</span>
      </div>
    </div>

    <div v-if="errorMessage" class="info-section">
      <p style="color:red">{{ errorMessage }}</p>
    </div>

    <footer class="card-footer">
      <button
        @click="emit('confirm')"
        :disabled="isLoading"
        class="btn-done"
      >
        Approve
      </button>

      <button
        @click="emit('close')"
        class="btn-done"
        style="margin-left:10px;background:#F87171;color:white;border:none;"
      >
        Cancel
      </button>
    </footer>
  </div>
</template>

<style scoped>
/* keep your styles */
.activation-card {
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 40px;
  width: 480px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.card-header h1 {
  font-size: 26px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 24px;
}

.info-section { margin-bottom: 20px; }
.section-title { font-size: 18px; font-weight: 700; margin-bottom: 6px; }
.message-text, .value { font-size: 16px; color: #374151; }
.detail-row { margin-bottom: 4px; }
.label { font-weight: 700; margin-right: 5px; }
.dotted-box { border: 1px dotted #3B82F6; padding: 1px 4px; }

.card-footer {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.btn-done {
  background-color: #D1E9E9;
  color: #064E3B;
  border: 1px solid #064E3B;
  padding: 10px 40px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

.btn-done:hover { background-color: #C1D9D9; }
</style>
