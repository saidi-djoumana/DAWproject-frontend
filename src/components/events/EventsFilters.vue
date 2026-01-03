<template>
  <div class="event-filters">
    <!-- Search -->
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search events..."
      class="search-input"
    />

    <!-- Filter by type -->
    <select v-model="selectedType" class="type-select">
      <option value="">All Types</option>
      <option v-for="type in eventTypes" :key="type" :value="type">
        {{ type }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  events: {
    type: Array,
    required: true
  },
  // coming from /events?type=conference -> we pass "Conference"
  initialType: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:filtered'])

const searchQuery = ref('')
const selectedType = ref('')

// Compute unique event types from loaded events
const eventTypes = computed(() => {
  const types = props.events.map(e => e.tag)
  return [...new Set(types)]
})

// 1) Apply initialType whenever it changes (or first time)
watch(
  () => props.initialType,
  (val) => {
    selectedType.value = val || ''
  },
  { immediate: true }
)

// 2) Filter whenever search/type/events change
watch(
  [searchQuery, selectedType, () => props.events],
  () => {
    const q = searchQuery.value.trim().toLowerCase()

    const filtered = props.events.filter(event => {
      const matchesType = selectedType.value
        ? event.tag === selectedType.value
        : true

      const matchesSearch = q
        ? (event.title || '').toLowerCase().includes(q)
        : true

      return matchesType && matchesSearch
    })

    emit('update:filtered', filtered)
  },
  { immediate: true, deep: true }
)
</script>

<style scoped>
.event-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin-bottom: 50px;
}

.search-input, .type-select {
  padding: 6px 10px;
  font-size: 13px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.search-input {
  flex: 0 0 600px;
}

.type-select {
  width: 200px;
}

/* Responsive styles */
@media (max-width: 768px) {
  .event-filters {
    gap: 8px;
    margin-bottom: 30px;
  }

  .search-input {
    flex: 1;
    max-width: 400px;
  }

  .type-select {
    width: 150px;
  }
}

@media (max-width: 480px) {
  .event-filters {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
    margin-bottom: 20px;
  }

  .search-input {
    flex: none;
    width: 100%;
    max-width: none;
  }

  .type-select {
    width: 100%;
  }
}
</style>
