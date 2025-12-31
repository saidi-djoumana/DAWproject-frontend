<script setup>
import { ref } from 'vue';

const emit = defineEmits(['evaluate']);

const assignedProposals = ref([
  {
    title: 'Example Title',
    authors: 'Example Authors',
    event: 'Name of the event that the proposal was submitted for',
    deadline: 'DD/MM/YYYY 7:00PM'
  },
  {
    title: 'Example Title',
    authors: 'Example Authors',
    event: 'Name of the event that the proposal was submitted for',
    deadline: 'DD/MM/YYYY 7:00PM'
  },
  {
    title: 'Example Title',
    authors: 'Example Authors',
    event: 'Name of the event that the proposal was submitted for',
    deadline: 'DD/MM/YYYY 7:00PM'
  },
  {
    title: 'Example Title',
    authors: 'Example Authors',
    event: 'Name of the event that the proposal was submitted for',
    deadline: 'DD/MM/YYYY 7:00PM'
  }
]);

const handleEvaluate = (proposal) => {
  emit('evaluate', proposal);
};
</script>

<template>
  <div class="container">
    <header class="section-header">
      <h1>Assigned Proposals</h1>
    </header>

    <div
      v-for="(proposal, index) in assignedProposals"
      :key="index"
      class="proposal-card"
    >
      <div class="proposal-content">
        <div class="info-row">
          <span class="label">Title:</span> {{ proposal.title }}
        </div>
        <div class="info-row">
          <span class="label">Authors:</span> {{ proposal.authors }}
        </div>
        <div class="info-row">
          <span class="label">Event:</span> {{ proposal.event }}
        </div>
        <div class="info-row">
          <span class="label">Evaluation Deadline:</span> {{ proposal.deadline }}
        </div>
      </div>

      <div class="action-row">
        <button @click="handleEvaluate(proposal)" class="btn-evaluate">
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
</style>
