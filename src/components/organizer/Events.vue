<template>
  <section class="events-section">
    <div class="e-container">
      <h2 class="section-title">Events</h2>
      
      <div class="events-grid">
        <div class="event-card">
          <h3 class="event-title">Event 1</h3>
          <p class="event-description">Description of Event 1</p>
          <p class="event-date">Date: 2023-12-01</p>
          <a class="event-details">Détails</a>
        </div>

        <div class="event-card">
          <h3 class="event-title">Event 2</h3>
          <p class="event-description">Description of Event 2</p>
          <p class="event-date">Date: 2023-12-15</p>
          <a class="event-details">Détails</a>
        </div>

        <div class="event-card">
          <h3 class="event-title">Event 3</h3>
          <p class="event-description">Description of Event 3</p>
          <p class="event-date">Date: 2024-01-10</p>
          <a class="event-details">Détails</a>
        </div>

        <div class="event-card">
          <h3 class="event-title">Event 4</h3>
          <p class="event-description">Description of Event 4</p>
          <p class="event-date">Date: 2024-01-20</p>
          <a class="event-details">Détails</a>
        </div>

        <div class="event-card">
          <h3 class="event-title">Event 5</h3>
          <p class="event-description">Description of Event 5</p>
          <p class="event-date">Date: 2024-02-05</p>
          <a class="event-details">Détails</a>
        </div>

        <div class="event-card">
          <h3 class="event-title">Event 6</h3>
          <p class="event-description">Description of Event 6</p>
          <p class="event-date">Date: 2024-02-15</p>
          <a class="event-details">Détails</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive } from 'vue'

const events = reactive([
  {
    id: 1,
    title: 'Event 1',
    description: 'Description of Event 1',
    date: '2023-12-01'
  },
  {
    id: 2,
    title: 'Event 2',
    description: 'Description of Event 2',
    date: '2023-12-15'
  },
  {
    id: 3,
    title: 'Event 3',
    description: 'Description of Event 3',
    date: '2024-01-10'
  },
  {
    id: 4,
    title: 'Event 4',
    description: 'Description of Event 4',
    date: '2024-01-20'
  },
  {
    id: 5,
    title: 'Event 5',
    description: 'Description of Event 5',
    date: '2024-02-05'
  },
  {
    id: 6,
    title: 'Event 6',
    description: 'Description of Event 6',
    date: '2024-02-15'
  }
])
</script>

<style scoped>
.events-section {
  padding: 40px 0;
}

.e-container {
  width: 90%;
  max-width: 1340px;
  margin: 0 auto;
}

.section-title {
  font-family: 'Poppins', sans-serif;
  font-size: 36px;
  font-weight: 600;
  color: #000;
  margin-bottom: 40px;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.event-card {
  background-color: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.event-title {
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #000;
  margin: 0;
}

.event-description {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #666;
  margin: 0;
  line-height: 1.5;
}

.event-date {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #666;
  margin: 0;
}

.event-details {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #3B82F6;
  text-decoration: none;
  margin-top: 8px;
  transition: color 0.3s;
}

.event-details:hover {
  color: #0052a3;
  text-decoration: underline;
  cursor: pointer;
}

/* Tablet */
@media (max-width: 992px) {
  .events-section {
    padding: 50px 0;
  }

  .container {
    width: 85%;
  }

  .events-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  .section-title {
    font-size: 32px;
    margin-bottom: 32px;
  }
}

/* Mobile */
@media (max-width: 600px) {
  .events-section {
    padding: 40px 0;
  }

  .container {
    width: 90%;
  }

  .events-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .section-title {
    font-size: 28px;
    margin-bottom: 24px;
  }
}
</style>