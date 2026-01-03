<script setup>
import { ref } from 'vue'
import EvaluationHero from '@/components/evaluation/EvaluationHero.vue'
import Proposals from '@/components/evaluation/Proposals.vue'
import EvaluationForm from '@/components/evaluation/EvaluationForm.vue'
import Footer from '@/components/Footer.vue'

const showEvaluationForm = ref(false)
const selectedProposal = ref(null)
const proposalsRef = ref(null)

const openEvaluation = (proposal) => {
  selectedProposal.value = proposal
  showEvaluationForm.value = true
}

const closeEvaluation = () => {
  showEvaluationForm.value = false
  selectedProposal.value = null
}

const onSubmitted = () => {
  proposalsRef.value?.fetchData()
}
</script>

<template>
  <EvaluationHero />

  <Proposals
    ref="proposalsRef"
    @evaluate="openEvaluation"
  />

  <EvaluationForm
    v-if="showEvaluationForm"
    :proposal="selectedProposal"
    @close="closeEvaluation"
    @submitted="onSubmitted"
  />

  <Footer />
</template>
