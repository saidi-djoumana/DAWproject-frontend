<template>
  <div class="event-card">
    <div class="event-image">
      <img :src="event.image" alt="Event image" />
    </div>

    <div class="event-content">
      <p class="event-tag">{{ event.tag }}</p>

      <h2 class="event-title">{{ event.title }}</h2>

      <div class="event-info">
        <div class="info-row">
          <span class="icon"><i class="fas fa-map-marker-alt"></i></span>
          <span>{{ event.location }}</span>
        </div>

        <div class="info-row">
          <span class="icon"><i class="far fa-calendar-alt"></i></span>
          <span>{{ event.date }}</span>
        </div>
      </div>

      <router-link to="/events/details" class="details-btn">
                    View Details →
      </router-link>

    </div>
  </div>
</template>

<script setup>
defineProps({
  event: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Poppins:wght@400;500;600&display=swap");

.event-card {
  display: flex;
  flex-direction: column;
  width: 360px;
  border-radius: 16px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  font-family: 'Inter', sans-serif;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.event-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
}

.event-image {
  flex-shrink: 0; /* keep image fixed height */
}

.event-image img {
  display: block;
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.event-content {
  flex-grow: 1; /* make content fill remaining space */
  background: #f2f2f2;
  padding: 14px 16px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* push button to bottom */
}

.event-tag {
  font-size: 14px;
  color: #001f36;
  margin-bottom: 6px;
  font-weight: 500;
}

.event-title {
  font-family: 'Poppins', sans-serif;
  font-size: 20px;
  font-weight: 500;
  color: #001f36;
  line-height: 1.3;
  margin: 0 0 14px;
}

.event-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 18px;
  color: #000;
}

.info-row {
  display: flex;
  align-items: center;
  font-size: 15px;
}

.icon {
  margin-right: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.icon i {
  font-size: 16px;
  color: #000;
}

.details-btn {
  background: none;
  border: none;
  padding: 0;

  font-size: 15px;
  font-weight: 500;
  font-family: Inter, sans-serif;

  color: #000;
  cursor: pointer;

  /* router-link / anchor fixes */
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.details-btn:hover {
  text-decoration: underline;
}


@media (max-width: 420px) {
  .event-card {
    width: 100%;
  }

  .event-image img {
    height: 160px;
  }

  .event-title {
    font-size: 18px;
  }
}
</style>
