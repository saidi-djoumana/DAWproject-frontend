<template>
  <div class="highlight">
    <div class="avatar">
      <span>64 × 64</span>
    </div>

    <div class="info">
      <div class="name">{{ person.name }}</div>
      <div class="line">{{ person.affiliation }}</div>
      <div class="line">Specialty: {{ person.specialty }}</div>
      <div class="email">{{ person.email }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  person: { type: Object, required: true },
});
</script>

<style scoped>
.highlight {
  background: #ffffff;
  border-radius: 10px;
  padding: 18px;
  border:none ;
  box-shadow: 0 10px 24px rgba(151, 234, 206, 0.18);
  display: flex;
  gap: 16px;
  align-items: center;
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
  flex: 0 0 auto;
}

.name {
  font-family: var(--font-title);
  font-weight: 800;
  color: #111827;
  margin-bottom: 2px;
}
.line {
  font-size: 13px;
  color: #4b5563;
  margin-top: 2px;
}
.email {
  font-size: 13px;
  color: #374151;
  margin-top: 2px;
}

/* Responsive styles */
@media (max-width: 768px) {
  .highlight {
    padding: 15px;
    flex-direction: column;
    gap: 12px;
    text-align: center;
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
  .highlight {
    padding: 12px;
    gap: 10px;
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
