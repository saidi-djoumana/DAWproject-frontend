<!-- UsersByRoleChart.vue -->
<script setup>
import { defineProps } from 'vue'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { Pie } from 'vue-chartjs'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const props = defineProps({
  chartData: { type: Object, required: true }
})
</script>

<template>
  <Pie
    :data="props.chartData"
    :options="{
      responsive: true,
      plugins: {
        legend: { position: 'bottom' }
      }
    }"
  />
</template>

<style scoped>
/* Responsive styles for the chart container */
@media (max-width: 768px) {
  :deep(.chartjs-render-monitor) {
    max-width: 100%;
    height: auto !important;
  }
}

@media (max-width: 480px) {
  :deep(.chartjs-render-monitor) {
    font-size: 12px;
  }
}
</style>
