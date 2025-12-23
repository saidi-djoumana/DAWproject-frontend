<script setup>
import { ref } from 'vue';

/* receive proposal from parent */
const props = defineProps({
  proposal: {
    type: Object,
    required: true
  }
});

/* allow parent to close the form */
const emit = defineEmits(['close']);

/* State for the form */
const evaluation = ref({
  relevance: 5,
  scientificQuality: 5,
  originality: 5,
  comments: '',
  recommendation: null
});

const proposalDetails = {
  title: props.proposal.title,
  authors: props.proposal.authors,
  keywords: props.proposal.keywords ?? '—',
  presentationType: props.proposal.presentationType ?? '—'
};

const setRecommendation = (type) => {
  evaluation.value.recommendation = type;
};

const submitEvaluation = () => {
  console.log('Proposal:', props.proposal);
  console.log('Evaluation:', evaluation.value);

  emit('close');
};
</script>

<template>
  <div class="evaluation-container">
    <div class="details-card">
      <div class="details-left">
        <h3>Proposal Details:</h3>
        <p><strong>Title:</strong> {{ proposalDetails.title }}</p>
        <p><strong>Authors:</strong> {{ proposalDetails.authors }}</p>
        <p><strong>Keywords:</strong> {{ proposalDetails.keywords }}</p>
        <p><strong>Type of Presentation:</strong> {{ proposalDetails.presentationType }}</p>
      </div>

      <div class="details-right">
        <div class="pdf-upload">
          <span>Uploaded PDF:</span>
          <button class="btn-secondary">Download Summary (PDF)</button>
        </div>

        <div class="abstract-box">
          <span class="label">Abstract (Resume):</span>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
          </p>
          <button class="btn-read-more">Read More ▾</button>
        </div>
      </div>
    </div>

    <h1>Evaluation Form</h1>

    <div class="sliders-grid">
      <div class="slider-group">
        <label>Relevance:</label>
        <div class="range-wrapper">
          <span class="range-value">{{ evaluation.relevance }}</span>
          <input type="range" v-model="evaluation.relevance" min="1" max="10" />
        </div>
      </div>

      <div class="slider-group">
        <label>Scientific Quality:</label>
        <div class="range-wrapper">
          <span class="range-value">{{ evaluation.scientificQuality }}</span>
          <input type="range" v-model="evaluation.scientificQuality" min="1" max="10" />
        </div>
      </div>

      <div class="slider-group">
        <label>Originality:</label>
        <div class="range-wrapper">
          <span class="range-value">{{ evaluation.originality }}</span>
          <input type="range" v-model="evaluation.originality" min="1" max="10" />
        </div>
      </div>
    </div>

    <div class="form-section">
      <label>Detailed Evaluation Comments</label>
      <textarea
        v-model="evaluation.comments"
        placeholder="Explain the strengths, weaknesses, clarity, methodology, and relevance of this work..."
      ></textarea>

      <div class="align-right">
        <button class="btn-submit-small" @click="submitEvaluation">
          Submit
        </button>
      </div>
    </div>

    <div class="recommendation-section">
      <h3>Recommendation</h3>

      <div class="rec-options">
        <div class="rec-item" @click="setRecommendation('accept')">
          <div class="circle" :class="evaluation.recommendation === 'accept' ? 'bg-green' : 'bg-gray'"></div>
          <span>Accept</span>
        </div>

        <div class="rec-item" @click="setRecommendation('reject')">
          <div class="circle" :class="evaluation.recommendation === 'reject' ? 'bg-red' : 'bg-gray'"></div>
          <span>Reject</span>
        </div>

        <div class="rec-item" @click="setRecommendation('correction')">
          <div class="circle" :class="evaluation.recommendation === 'correction' ? 'bg-yellow' : 'bg-gray'"></div>
          <span>Requires Correction</span>
        </div>
      </div>
    </div>

    <button class="btn-primary-large" @click="submitEvaluation">
      Submit Evaluation
    </button>
  </div>
</template>

<style scoped>
.evaluation-container {
  font-family: 'Inter', sans-serif;
  color: #111827;
  max-width: 1300px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
}

h1 { font-size: 24px; font-weight: 700; margin: 30px 0; }
h3 { font-size: 16px; font-weight: 600; margin-bottom: 12px; }

.details-card {
  background: #E5E7EB66;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  gap: 40px;
  margin-bottom: 20px;
}

.details-left p { font-size: 14px; margin: 8px 0; }
.details-right { flex: 1; }

.pdf-upload {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  font-size: 14px;
  font-weight: 600;
}

.abstract-box {
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 12px;
  position: relative;
}

.abstract-box p {
  font-size: 12px;
  color: #6B7280;
  line-height: 1.5;
}

.btn-read-more {
  background: #9CA3AF;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 10px;
  padding: 2px 8px;
  cursor: pointer;
  float: right;
}

.sliders-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  margin-bottom: 40px;
}

.slider-group label {
  font-size: 14px;
  font-weight: 600;
  display: block;
  margin-bottom: 20px;
}

.range-wrapper {
  position: relative;
  padding-top: 20px;
}

.range-value {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border: 1px solid #E5E7EB;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

input[type="range"] {
  width: 100%;
  accent-color: #0C4A4A;
}

.form-section label {
  font-size: 14px;
  font-weight: 600;
  display: block;
  margin-bottom: 12px;
}

textarea {
  width: 95%;
  height: 200px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 15px;
  font-family: inherit;
  resize: none;
}

.align-right {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.rec-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 15px;
}

.rec-item {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.circle {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid #D1D5DB;
  transition: 0.3s;
}

.bg-gray { background-color: #D1D5DB; }
.bg-green { background-color: #34D399; border-color: #059669; }
.bg-red { background-color: #F87171; border-color: #DC2626; }
.bg-yellow { background-color: #FBBF24; border-color: #D97706; }

.btn-secondary {
  background-color: #CCEBEB;
  border: 1px solid #004E38;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
}

.btn-submit-small {
  background-color: #CCEBEB;
  border: 1px solid #004E38;
  padding: 6px 20px;
  border-radius: 6px;
  cursor: pointer;
}

.btn-primary-large {
  background-color: #CCEBEB;
  border: 1px solid #004E38;
  padding: 10px 24px;
  border-radius: 6px;
  font-weight: 600;
  margin-top: 40px;
  cursor: pointer;
}
</style>
