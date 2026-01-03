<template>
  <div class="card">
    <div class="title">3-Day Program</div>

    <div class="tabs">
      <button
        v-for="(d, idx) in days"
        :key="d.label"
        class="tab"
        :class="{ active: idx === activeIndex }"
        @click="activeIndex = idx"
      >
        {{ d.label }}
      </button>
    </div>

    <div class="timeline">
      <div class="rail"></div>

      <div class="items">
        <div v-for="(it, i) in days[activeIndex].items" :key="i" class="item">
          <div class="time">{{ it.time }}</div>
          <div class="text">{{ it.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  days: { type: Array, required: true },
});

const activeIndex = ref(0);
</script>

<style scoped>
.card {
  background: #ffffff;
  border-radius: 10px;
  padding: 18px;
  border: 1px solid #edf0f3;
  box-shadow: 0 8px 18px rgba(16, 24, 40, 0.08);
  min-height: 340px;
}

.title {
  font-family: var(--font-title);
  font-weight: 800;
  text-align: center;
  margin-bottom: 12px;
  color: #111827;
}

.tabs {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 12px;
}

.tab {
  border: none;
  background: #eef0f3;
  color: #111827;
  padding: 8px 14px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 12px;
  cursor: pointer;
}
.tab.active {
  background: #dff1f2;
}

.timeline {
  position: relative;
  padding-left: 18px;
  margin-top: 8px;
}

.rail {
  position: absolute;
  left: 8px;
  top: 6px;
  bottom: 6px;
  width: 3px;
  background: #bfe0e3;
  border-radius: 999px;
}

.items {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.item {
  padding: 6px 0;
}

.time {
  font-size: 12px;
  color: #374151;
  font-weight: 600;
}

.text {
  font-size: 13px;
  font-weight: 800;
  color: #111827;
  margin-top: 2px;
}

/* Responsive styles */
@media (max-width: 768px) {
  .card {
    padding: 15px;
    min-height: 300px;
  }

  .title {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .tabs {
    gap: 8px;
  }

  .tab {
    padding: 6px 12px;
    font-size: 11px;
  }

  .timeline {
    padding-left: 15px;
  }

  .rail {
    left: 6px;
  }

  .items {
    gap: 8px;
  }

  .time {
    font-size: 11px;
  }

  .text {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .card {
    padding: 12px;
    min-height: 280px;
  }

  .title {
    font-size: 16px;
    margin-bottom: 8px;
  }

  .tabs {
    flex-wrap: wrap;
    gap: 6px;
  }

  .tab {
    padding: 5px 10px;
    font-size: 10px;
  }

  .timeline {
    padding-left: 12px;
  }

  .rail {
    left: 5px;
  }

  .items {
    gap: 6px;
  }

  .time {
    font-size: 10px;
  }

  .text {
    font-size: 11px;
  }
}
</style>
