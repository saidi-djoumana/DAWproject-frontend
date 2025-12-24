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
