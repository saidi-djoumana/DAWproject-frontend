<template>
  <div class="card">
    <div class="titleRow">
      <span class="cap">🎓</span>
      <div class="title">{{ workshop.title }}</div>
    </div>

    <div class="meta">
      <div>{{ workshop.date }}</div>
      <div>{{ workshop.time }}</div>
      <div>{{ workshop.location }}</div>
      <div>Facilitator: {{ workshop.facilitator }}</div>
    </div>

    <div class="capWrap">
      <div class="capLabel">Capacity:</div>
      <div class="capBar">
        <div class="fill" :style="{ width: percent + '%' }"></div>
      </div>
      <div class="capValue">{{ workshop.capacity.used }}/{{ workshop.capacity.total }}</div>
    </div>

    <div class="block">
      <div class="label">Description:</div>
      <div class="value">{{ workshop.description }}</div>
    </div>

    <div class="block">
      <div class="value"><span class="muted">Fee:</span> {{ workshop.fee }}</div>
      <div class="value"><span class="muted">Requirements:</span> {{ workshop.requirements }}</div>
    </div>

    <button class="btn" @click="$emit('register', workshop.id)">REGISTER</button>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  workshop: { type: Object, required: true },
});

defineEmits(["register"]);

const percent = computed(() => {
  const u = props.workshop.capacity?.used ?? 0;
  const t = props.workshop.capacity?.total ?? 1;
  return Math.min(100, Math.round((u / t) * 100));
});
</script>

<style scoped>
.card {
  background: #ffffff;
  border-radius: 10px;
  padding: 18px;
  border: 1px solid #edf0f3;
  box-shadow: 0 10px 22px rgba(16, 24, 40, 0.10);
}

.titleRow {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 10px;
}
.cap {
  font-size: 16px;
  margin-top: 2px;
}
.title {
  font-family: var(--font-title);
  font-weight: 800;
  color: #111827;
  line-height: 1.15;
}

.meta {
  font-size: 13px;
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 12px;
}

.capWrap {
  display: grid;
  grid-template-columns: 70px 1fr 60px;
  align-items: center;
  gap: 10px;
  margin: 12px 0;
}
.capLabel {
  font-weight: 800;
  font-size: 12px;
  color: #111827;
}
.capBar {
  height: 7px;
  background: #e9eef2;
  border-radius: 999px;
  overflow: hidden;
}
.fill {
  height: 100%;
  background: #bfe0e3;
  border-radius: 999px;
}
.capValue {
  text-align: right;
  font-weight: 800;
  font-size: 12px;
  color: #111827;
}

.block {
  margin-top: 10px;
}
.label {
  font-weight: 800;
  font-size: 12px;
  color: #111827;
  margin-bottom: 6px;
}
.value {
  font-size: 13px;
  color: #4b5563;
  line-height: 1.5;
}
.muted {
  color: #6b7280;
  font-weight: 700;
  margin-right: 6px;
}

.btn {
  margin-top: 16px;
  background: #cfe8ea;
  border: none;
  color: #111827;
  font-weight: 800;
  font-size: 12px;
  padding: 10px 18px;
  border-radius: 4px;
  cursor: pointer;
}
.btn:hover {
  filter: brightness(0.98);
}
</style>
