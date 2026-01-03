<template>
  <!-- Modal Overlay -->
  <div v-if="isOpen" class="modal-overlay" @click="closeModal">
    <div class="modal-container" @click.stop>

      <!-- Close Button -->
      <button class="close-button" @click="closeModal">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <!-- Guard: render only when event exists -->
      <div v-if="eventId" class="event-details-wrapper">
        <div class="event-details">
          <editEvent
            class="edit-event-full"
            :event-id="eventId"
          />
        </div>

        <div class="event-details">
          <eventProgram
            :event-id="eventId"
          />
        </div>

        <div class="event-details">
          <workshopsProgram
            :event-id="eventId"
          />
        </div>

        <div class="event-details">
          <speakers
            :event-id="eventId"
          />
        </div>
      </div>

      <!-- Safety fallback -->
      <div v-else class="empty-state">
        Unable to load event details.
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { defineProps, defineEmits } from 'vue'

import editEvent from './editEvent.vue'
import eventProgram from './eventProgram.vue'
import workshopsProgram from './workshopsProgram.vue'
import speakers from './speakers.vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  eventData: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])

/**
 * Single source of truth for the selected event
 * Every child component depends on this ID
 */
const eventId = computed(() => props.eventData?.id || null)

const closeModal = () => {
  emit('close')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@400;500;600&display=swap');

.modal-overlay {
  position: fixed;
  inset: 0;
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
  background-color: #F3F4F6;
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
  align-self: flex-end;
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
  transition: transform 0.2s ease;
}

.close-button:hover {
  transform: scale(1.1);
}

.event-details-wrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.event-details {
  width: 100%;
}

.edit-event-full {
  width: 100%;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 14px;
}

/* Responsive styles */
@media (max-width: 768px) {
  .modal-overlay {
    padding: 10px;
  }

  .modal-container {
    max-width: 100%;
    max-height: 95vh;
    padding: 15px;
  }

  .close-button {
    width: 35px;
    height: 35px;
    top: 15px;
  }

  .event-details-wrapper {
    gap: 18px;
  }

  .empty-state {
    padding: 30px;
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .modal-overlay {
    padding: 5px;
  }

  .modal-container {
    max-width: 100%;
    max-height: 98vh;
    padding: 10px;
  }

  .close-button {
    width: 30px;
    height: 30px;
    top: 10px;
  }

  .event-details-wrapper {
    gap: 12px;
  }

  .empty-state {
    padding: 20px;
    font-size: 12px;
  }
}
</style>
