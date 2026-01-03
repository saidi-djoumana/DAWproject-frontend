<script setup>
import { ref } from 'vue';

const speakers = ref([
  {
    name: 'John Doe',
    role: 'Tech Entrepreneur',
    imageUrl: 'https://via.placeholder.com/100'
  },
  {
    name: 'Jane Smith',
    role: 'Author & Motivational Speaker',
    imageUrl: 'https://via.placeholder.com/100'
  },
  {
    name: 'Alex Johnson',
    role: 'Digital Marketing Expert',
    imageUrl: 'https://via.placeholder.com/100'
  }
]);
</script>

<template>
  <div class="container">
    <div class="card">
      <header class="section-header">
        <h1>Speakers</h1>
      </header>

      <div class="speakers-list">
        <div v-for="(speaker, index) in speakers" :key="index" class="speaker-item">
          <div class="avatar-container">
            <img :src="speaker.imageUrl" alt="Speaker Avatar" class="avatar-img" />
          </div>
          
          <div class="speaker-info">
            <h3 class="speaker-name">{{ speaker.name }}</h3>
            <p class="speaker-role">{{ speaker.role }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

/* Main Background matching your theme */
.container {
  background-color: #F3F4F6;
  padding: 20px;
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Main Card Wrapper */
.card {
  background: #fff;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  width: 100%;
  max-width: 1200px;
  box-sizing: border-box;
}

.section-header h1 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 25px;
  color: #000;
}

/* List Styling */
.speakers-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.speaker-item {
  display: flex;
  align-items: center;
  gap: 20px;
}

/* Avatar Styling */
.avatar-container {
  width: 100px;
  height: 100px;
  background-color: #E5E7EB;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Text Content */
.speaker-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.speaker-name {
  font-size: 18px;
  font-weight: 700;
  color: #000;
  margin: 0;
}

.speaker-role {
  font-size: 15px;
  color: #6B7280; /* Muted gray for role */
  margin: 0;
}

/* Responsive styles */
@media (max-width: 768px) {
  .container {
    padding: 15px;
  }

  .card {
    padding: 20px;
    max-width: 100%;
  }

  .section-header h1 {
    font-size: 20px;
    margin-bottom: 20px;
  }

  .speakers-list {
    gap: 18px;
  }

  .speaker-item {
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }

  .avatar-container {
    width: 80px;
    height: 80px;
  }

  .speaker-name {
    font-size: 16px;
  }

  .speaker-role {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 10px;
  }

  .card {
    padding: 15px;
  }

  .section-header h1 {
    font-size: 18px;
    margin-bottom: 15px;
  }

  .speakers-list {
    gap: 12px;
  }

  .speaker-item {
    gap: 10px;
  }

  .avatar-container {
    width: 70px;
    height: 70px;
  }

  .speaker-name {
    font-size: 15px;
  }

  .speaker-role {
    font-size: 13px;
  }
}
</style>