<script setup>
defineProps({
  userData: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['close', 'update']);

const updateStatus = () => {
  emit('update');
};
</script>

<template>
  <div class="status-modal-card">
    <header class="card-header">
      <h1 class="highlight-title">Toggle User Status</h1>
    </header>

    <div class="details-section">
      <h3 class="section-title">User Details:</h3>
      <div class="info-group">
        <p><span class="label">Name:</span> {{ userData.name }}</p>
        <p><span class="label">Email:</span> {{ userData.email }}</p>
        <p><span class="label">Phone:</span> {{ userData.phone }}</p>
        <p><span class="label">Institution:</span> {{ userData.institution }}</p>
        <p><span class="label">Country:</span> {{ userData.country }}</p>
        <p>
          <span class="label">Current Status:</span>
          <strong>{{ userData.status }}</strong>
        </p>
      </div>
    </div>

    <footer class="card-footer">
      <button @click="updateStatus" class="btn-update">
        Update Status
      </button>
    </footer>
  </div>
</template>

<style scoped>
.status-modal-card {
  background: white; border-radius: 12px; padding: 40px; width: 450px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.card-header { text-align: center; margin-bottom: 30px; }

/* The specific blue border around the title */
.highlight-title {
  font-size: 28px; font-weight: 700; display: inline-block;
  padding: 8px 20px; border: 2px solid #3B82F6;
}

.section-title { font-size: 20px; font-weight: 700; margin-bottom: 12px; }

.info-group p { font-size: 16px; margin: 8px 0; }
.label { font-weight: 700; }

.card-footer { display: flex; justify-content: center; margin-top: 32px; }

/* Teal button style */
.btn-update {
  background-color: #D1E9E9; color: #064E3B; border: 1px solid #064E3B;
  padding: 10px 30px; border-radius: 6px; font-weight: 600; cursor: pointer;
}
</style>