<script setup>
const props = defineProps({
  organizerData: {
    type: Object,
    required: true
  }
});

defineEmits(['close']);
</script>

<template>
  <div class="confirmation-card">
    <header class="card-header">
      <h1>Application Deletion</h1>
    </header>

    <div class="info-section">
      <h3 class="section-title">Confirmation Message:</h3>
      <p class="message-text">The rejected organizer application has been successfully deleted.</p>
    </div>

    <div class="info-section">
      <h3 class="section-title">Removed Organizer Info:</h3>
      <div class="detail-row">
        <span class="label">Name:</span>
        <span class="value">{{ organizerData.name }}</span>
      </div>
      <div class="detail-row">
        <span class="label">Email:</span>
        <span class="value">{{ organizerData.email }}</span>
      </div>
    </div>

    <footer class="card-footer">
      <button @click="$emit('close')" class="btn-done">Done</button>
    </footer>
  </div>
</template>

<style scoped>
.confirmation-card {
  background: white;
  border-radius: 12px;
  padding: 40px;
  width: 480px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  font-family: 'Inter', sans-serif;
}

.card-header h1 {
  font-size: 26px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 24px;
}

.info-section {
  margin-bottom: 20px;
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 6px;
}

.message-text {
  font-size: 16px;
  color: #4B5563;
  line-height: 1.4;
}

.detail-row {
  margin-bottom: 4px;
}

.label {
  font-weight: 700;
  margin-right: 5px;
}

.value {
  color: #4B5563;
}

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
  transition: background 0.2s;
}

.btn-done:hover {
  background-color: #C1D9D9;
}

/* Responsive styles */
@media (max-width: 768px) {
  .confirmation-card {
    width: 90%;
    max-width: 480px;
    padding: 30px;
  }

  .card-header h1 {
    font-size: 22px;
    margin-bottom: 20px;
  }

  .section-title {
    font-size: 16px;
  }

  .message-text {
    font-size: 14px;
  }

  .btn-done {
    padding: 8px 30px;
  }
}

@media (max-width: 480px) {
  .confirmation-card {
    width: 95%;
    padding: 20px;
  }

  .card-header h1 {
    font-size: 20px;
    margin-bottom: 16px;
  }

  .section-title {
    font-size: 14px;
  }

  .message-text {
    font-size: 13px;
  }

  .btn-done {
    padding: 6px 20px;
    font-size: 14px;
  }
}
</style>