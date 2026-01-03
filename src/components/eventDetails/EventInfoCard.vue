<template>
  <aside class="card">
    <h3 class="title">Event</h3>

    <div class="meta">
      <div class="row"><span>Start Date:</span> <strong>{{ event.startDate }}</strong></div>
      <div class="row"><span>End Date:</span> <strong>{{ event.endDate }}</strong></div>
      <div class="row"><span>Duration:</span> <strong>{{ event.duration }}</strong></div>
    </div>

    <div class="block">
      <div class="label">Description</div>
      <div class="descBox">{{ event.description }}</div>
    </div>

    <div class="block">
      <div class="label">Type</div>
      <div class="value">{{ event.type }}</div>
    </div>

    <div class="block">
      <div class="label">Theme/Topics</div>
      <div class="value">
        <div v-for="t in event.topics" :key="t">{{ t }}</div>
      </div>
    </div>
  </aside>
</template>

<script setup>
defineProps({
  event: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.card {
  background: #ffffff;
  border-radius: 10px;
  padding: 18px 16px;
  box-shadow: 0 6px 18px rgba(16, 24, 40, 0.08);
  border: 1px solid #edf0f3;
}
.title {
  font-family: var(--font-title);
  font-weight: 800;
  margin: 2px 0 12px;
  color: #111827;
}
.meta .row {
  font-size: 13px;
  color: #374151;
  margin: 6px 0;
}
.meta span {
  color: #6b7280;
}
.block {
  margin-top: 16px;
}
.label {
  font-weight: 700;
  font-size: 13px;
  color: #111827;
  margin-bottom: 8px;
}
.descBox {
  background: #cfe8ea;
  border-radius: 8px;
  padding: 14px 12px;
  font-size: 13px;
  color: #1f2937;
  line-height: 1.45;
}
.value {
  font-size: 13px;
  color: #374151;
  line-height: 1.5;
}

/* Responsive styles */
@media (max-width: 768px) {
  .card {
    padding: 15px 12px;
  }

  .title {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .meta .row {
    font-size: 12px;
    margin: 5px 0;
  }

  .block {
    margin-top: 12px;
  }

  .label {
    font-size: 12px;
    margin-bottom: 6px;
  }

  .descBox {
    padding: 12px 10px;
    font-size: 12px;
  }

  .value {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .card {
    padding: 12px 10px;
  }

  .title {
    font-size: 16px;
    margin-bottom: 8px;
  }

  .meta .row {
    font-size: 11px;
    margin: 4px 0;
  }

  .block {
    margin-top: 10px;
  }

  .label {
    font-size: 11px;
    margin-bottom: 4px;
  }

  .descBox {
    padding: 10px 8px;
    font-size: 11px;
  }

  .value {
    font-size: 11px;
  }
}
</style>
