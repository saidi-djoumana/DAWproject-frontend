<template>
  <div class="card">
    <div class="image">200 × 200</div>

    <div class="name">{{ speaker.name }}</div>

    <div class="row"><span>Topic:</span> <strong>{{ speaker.topic }}</strong></div>
    <div class="row"><span>Affiliation:</span> <strong>{{ speaker.affiliation }}</strong></div>
    <div class="row"><span>Email:</span> <strong>{{ speaker.email }}</strong></div>

    <div class="bioLabel">Bio:</div>
    <div class="bio">{{ speaker.bio }}</div>
  </div>
</template>

<script setup>
defineProps({
  speaker: { type: Object, required: true },
});
</script>

<style scoped>
.card {
  background: #ffffff;
  border-radius: 10px;
  padding: 18px;
  border: 1px solid #edf0f3;
  box-shadow: 0 8px 18px rgba(16, 24, 40, 0.08);
}

.image {
  width: 100%;
  height: 180px;
  background: #d9d9d9;
  border-radius: 6px;
  display: grid;
  place-items: center;
  color: #9a9a9a;
  font-family: var(--font-title);
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 14px;
}

.name {
  font-family: var(--font-title);
  font-weight: 800;
  color: #111827;
  margin-bottom: 8px;
}

.row {
  font-size: 13px;
  color: #374151;
  margin-top: 6px;
}
.row span {
  color: #6b7280;
  margin-right: 6px;
}
.bioLabel {
  margin-top: 14px;
  font-weight: 800;
  font-size: 13px;
  color: #111827;
}
.bio {
  margin-top: 6px;
  font-size: 13px;
  color: #4b5563;
}

/* Responsive styles */
@media (max-width: 768px) {
  .card {
    padding: 15px;
  }

  .image {
    height: 150px;
    font-size: 20px;
    margin-bottom: 12px;
  }

  .name {
    font-size: 16px;
  }

  .row {
    font-size: 12px;
    margin-top: 5px;
  }

  .bioLabel {
    margin-top: 12px;
    font-size: 12px;
  }

  .bio {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .card {
    padding: 12px;
  }

  .image {
    height: 120px;
    font-size: 16px;
    margin-bottom: 10px;
  }

  .name {
    font-size: 14px;
  }

  .row {
    font-size: 11px;
    margin-top: 4px;
  }

  .bioLabel {
    margin-top: 10px;
    font-size: 11px;
  }

  .bio {
    font-size: 11px;
  }
}
</style>
