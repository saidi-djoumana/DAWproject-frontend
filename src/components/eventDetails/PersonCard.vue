<template>
  <div class="card">
    <div class="top">
      <div class="avatar">
        <span>64 × 64</span>
      </div>
    </div>

    <div class="name">{{ person.name }}</div>
    <div class="line">{{ person.affiliation }}</div>
    <div class="line">Specialty: {{ person.specialty }}</div>
    <div class="email">{{ person.email }}</div>
  </div>
</template>

<script setup>
defineProps({
  person: { type: Object, required: true },
});
</script>

<style scoped>
.card {
  background: #ffffff;
  border-radius: 10px;
  padding: 14px 14px 14px;
  border: 1px solid #edf0f3;
  box-shadow: 0 6px 16px rgba(16, 24, 40, 0.08);
}

.top {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 8px;
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 999px;
  border: 2px solid #2f6fed;
  display: grid;
  place-items: center;
  color: #8b8b8b;
  font-size: 11px;
  background: #f7f9ff;
}

.name {
  font-family: var(--font-title);
  font-weight: 800;
  margin-top: 6px;
  color: #111827;
}
.line {
  font-size: 13px;
  color: #4b5563;
  margin-top: 4px;
}
.email {
  font-size: 13px;
  color: #374151;
  margin-top: 4px;
}

/* Responsive styles */
@media (max-width: 768px) {
  .card {
    padding: 12px;
  }

  .avatar {
    width: 56px;
    height: 56px;
    font-size: 10px;
  }

  .name {
    font-size: 16px;
  }

  .line, .email {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .card {
    padding: 10px;
  }

  .avatar {
    width: 48px;
    height: 48px;
    font-size: 9px;
  }

  .name {
    font-size: 14px;
  }

  .line, .email {
    font-size: 11px;
  }
}
</style>
