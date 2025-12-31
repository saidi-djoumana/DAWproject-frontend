<template>
  <EvaluationHero />
    <Proposals @evaluate="openEvaluation" />
  <EvaluationForm
    v-if="showEvaluationForm"
    :proposal="selectedProposal"
    @close="closeEvaluation"
  />
    <Footer />

</template>

<script setup>
import { ref } from 'vue';

import EvaluationHero from '@/components/evaluation/EvaluationHero.vue';
import Proposals from '@/components/evaluation/Proposals.vue';
import EvaluationForm from '@/components/evaluation/EvaluationForm.vue';
import Footer from '@/components/Footer.vue';

const showEvaluationForm = ref(false);
const selectedProposal = ref(null);

const openEvaluation = (proposal) => {
  selectedProposal.value = proposal;
  showEvaluationForm.value = true;
};

const closeEvaluation = () => {
  showEvaluationForm.value = false;
  selectedProposal.value = null;
};
</script>
