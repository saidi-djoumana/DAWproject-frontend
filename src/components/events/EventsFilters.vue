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
      <option
        v-for="type in eventTypes"
        :key="type"
        :value="type"
      >
        {{ type }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Props: original list of events
const props = defineProps({
  events: {
    type: Array,
    required: true
  }
})

// Emits filtered events to parent
const emit = defineEmits(['update:filtered'])

const searchQuery = ref('')
const selectedType = ref('')

// Compute all event types dynamically
const eventTypes = computed(() => {
  const types = props.events.map(e => e.tag)
  return [...new Set(types)] // unique
})

// Watch for changes and emit filtered list
watch([searchQuery, selectedType], () => {
  const filtered = props.events.filter(event => {
    const matchesType = selectedType.value ? event.tag === selectedType.value : true
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesType && matchesSearch
  })
  emit('update:filtered', filtered)
}, { immediate: true })
</script>

<style scoped>
.event-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;               /* smaller spacing between inputs */
  justify-content: center;  /* center the filters */
  margin-bottom: 50px;
}

.search-input, .type-select {
  padding: 6px 10px;        /* smaller padding */
  font-size: 13px;          /* smaller text */
  border: 1px solid #ccc;
  border-radius: 8px;
}

.search-input {
  flex: 0 0 300px;          /* fixed width */
}

.type-select {
  width: 140px;              /* smaller dropdown */
}

</style>
