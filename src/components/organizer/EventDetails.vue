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
        <h1 class="title">Event Details</h1>

        <!-- Programme Section -->
        <section class="section">
          <h2 class="section-title">Programme</h2>
          <ul class="programme-list">
            <li v-for="item in programme" :key="item.id" class="programme-item">
              {{ item.title }} - {{ item.time }}
            </li>
          </ul>
        </section>

        <!-- Speakers Section -->
        <section class="section">
          <h2 class="section-title">Speakers</h2>
          <div class="speakers-list">
            <div v-for="speaker in speakers" :key="speaker.id" class="speaker">
              <div class="speaker-avatar">
                <span>{{ speaker.initials }}</span>
              </div>
              <div class="speaker-info">
                <h3 class="speaker-name">{{ speaker.name }}</h3>
                <p class="speaker-role">{{ speaker.role }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Sessions Section -->
        <section class="section">
          <h2 class="section-title">Sessions</h2>
          <div class="sessions-list">
            <div v-for="session in sessions" :key="session.id" class="session">
              <h3 class="session-title">{{ session.title }}</h3>
              <p class="session-description">{{ session.description }}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

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

const programme = ref([
  { id: 1, title: 'Opening Ceremony', time: '9:00 AM' },
  { id: 2, title: 'Keynote Speech', time: '10:00 AM' },
  { id: 3, title: 'Panel Discussion', time: '11:00 AM' },
  { id: 4, title: 'Lunch Break', time: '12:00 PM' },
  { id: 5, title: 'Workshops', time: '1:00 PM' },
  { id: 6, title: 'Closing Remarks', time: '4:00 PM' }
]);

const speakers = ref([
  { 
    id: 1, 
    name: 'John Doe', 
    role: 'Tech Entrepreneur',
    initials: '100 × 100'
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    role: 'Author & Motivational Speaker',
    initials: '100 × 100'
  },
  { 
    id: 3, 
    name: 'Alex Johnson', 
    role: 'Digital Marketing Expert',
    initials: '100 × 100'
  }
]);

const sessions = ref([
  {
    id: 1,
    title: 'Session 1: The Future of Tech',
    description: 'Join us for a discussion on the future trends in technology.'
  },
  {
    id: 2,
    title: 'Session 2: Marketing in the Digital Age',
    description: 'Learn about effective marketing strategies in today\'s digital landscape.'
  },
  {
    id: 3,
    title: 'Session 3: Leadership in Business',
    description: 'Explore the key traits of successful leaders in business.'
  }
]);
</script>

<style scoped>
/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-container {
  position: relative;
  background-color: #f5f5f5;
  border-radius: 12px;
  max-width: 1200px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.close-button {
  position: sticky;
  top: 20px;
  left: calc(100% - 60px);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
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
  background-color: #f0f0f0;
  transform: scale(1.1);
}

.close-button svg {
  color: #333;
}

.event-details {
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #000;
}

.section {
  background-color: white;
  border-radius: 8px;
  padding: 30px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #000;
}

/* Programme Styles */
.programme-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.programme-item {
  padding: 8px 0;
  color: #333;
  font-size: 16px;
}

/* Speakers Styles */
.speakers-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.speaker {
  display: flex;
  align-items: center;
  gap: 20px;
}

.speaker-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #d3d3d3;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #888;
  font-size: 12px;
}

.speaker-info {
  flex: 1;
}

.speaker-name {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 5px 0;
  color: #000;
}

.speaker-role {
  font-size: 16px;
  color: #666;
  margin: 0;
}

/* Sessions Styles */
.sessions-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.session {
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  background-color: #fafafa;
}

.session-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 10px 0;
  color: #000;
}

.session-description {
  font-size: 16px;
  color: #666;
  margin: 0;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .modal-overlay {
    padding: 10px;
  }

  .modal-container {
    max-height: 95vh;
  }

  .event-details {
    padding: 10px;
  }

  .section {
    padding: 20px;
  }

  .title {
    font-size: 24px;
  }

  .section-title {
    font-size: 20px;
  }

  .close-button {
    top: 10px;
    left: calc(100% - 50px);
  }
}
</style>