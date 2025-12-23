<template>
  <!-- Modal Overlay -->
  <div v-if="isOpen" class="modal-overlay" @click="closeModal">
    <div class="modal-container" @click.stop>
      <!-- Close Button -->
      <button class="close-button" @click="closeModal">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div class="event-details">
        <editEvent class="edit-event-full" />
      </div>
      <div class="event-details">
        <eventProgram />
      </div>
      <div class="event-details">
        <workshopsProgram />
      </div>
      <div class="event-details">
        <speakers />  
      </div>
      </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import editEvent from './editEvent.vue';
import eventProgram from './eventProgram.vue';
import workshopsProgram from './workshopsProgram.vue';
import speakers from './speakers.vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  eventData: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@400;500;600&display=swap');

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  overflow-y: auto;
  font-family: 'Inter', 'Poppins', sans-serif;
}

.modal-container {
  position: relative;
  background-color: #F3F4F6; /* same as editEvent background */
  border-radius: 12px;
  width: 100%;
  max-width: 1200px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.close-button {
  position: sticky;
  top: 20px;
  left: calc(100% - 60px);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.3s;
  margin-bottom: -40px;
}

.close-button:hover {
  transform: scale(1.1);
}

.close-button svg {
  color: #333;
}

.event-details {
  width: 100%;
}
.edit-event-full {
  width: 100%;
}
</style>
