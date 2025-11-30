<template>
  <section class="event-setup">
    <div class="event-container">
      <EventForm />
      <ScientificCommitee />
         <!-- Create Event Button -->
    <button class="create-event-button">Create Event</button>
    </div>
 
  </section>
</template>

<script setup>
import EventForm from './EventForm.vue';
import ScientificCommitee from './ScientificCommitee.vue';
</script>

<style scoped>
.event-setup {
  padding: 50px 0;
}

.event-container {
    width: 100%;
    max-width: 1340px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 40px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding-bottom:50px ;
}

.create-event-button {
  background-color: #B8E6E1;
  color: #000;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 500;
  padding: 14px 32px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;

  /* Fixes */
  align-self: flex-start;
  width: auto;
  flex-shrink: 0;
  margin-left: 40px;
}


.create-event-button:hover {
  background-color: #A0D9D3;
}
/* Tablet */
@media (max-width: 992px) {
  .event-setup {
    padding: 50px 0;
  }
  
  .container {
    width: 85%;
    gap: 32px;
  }
}

/* Mobile */
@media (max-width: 600px) {
  .event-setup {
    padding: 40px 0;
  }
  
  .container {
    width: 90%;
    gap: 24px;
  }
}
</style>