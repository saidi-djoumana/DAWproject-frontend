<script setup>
import { ref, computed } from 'vue'
import userApi from '@/api/userAxios'

const props = defineProps({
  proposal: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'submitted'])

const evaluation = ref({
  relevance: 5,
  scientificQuality: 5,
  originality: 5,
  comments: '',
  recommendation: null // accept | reject | revision
})

const isSubmitting = ref(false)
const isDownloading = ref(false)
const submitError = ref(null)

const isAbstractExpanded = ref(false)

const proposalDetails = computed(() => ({
  title: props.proposal?.title ?? '—',
  authors: Array.isArray(props.proposal?.authors)
    ? props.proposal.authors.join(', ')
    : (props.proposal?.authors ?? props.proposal?.author?.name ?? props.proposal?.user?.name ?? '—'),
  keywords: Array.isArray(props.proposal?.keywords)
    ? props.proposal.keywords.join(', ')
    : (props.proposal?.keywords ?? '—'),
  presentationType:
    props.proposal?.type ??
    props.proposal?.presentationType ??
    props.proposal?.presentation_type ??
    '—'
}))

const abstractText = computed(() => props.proposal?.abstract ?? '—')

const shortAbstract = computed(() => {
  const t = abstractText.value || ''
  if (t === '—') return '—'
  const max = 220
  return t.length > max ? t.slice(0, max).trimEnd() + '...' : t
})

const hasPdf = computed(() => !!props.proposal?.pdf_file)

function setRecommendation(type) {
  evaluation.value.recommendation = type
}

function toggleAbstract() {
  isAbstractExpanded.value = !isAbstractExpanded.value
}

async function downloadPdf() {
  submitError.value = null
  const submissionId = props.proposal?.id

  if (!submissionId) {
    submitError.value = 'Missing submission id.'
    return
  }
  if (!hasPdf.value) {
    submitError.value = 'No PDF file uploaded for this submission.'
    return
  }

  isDownloading.value = true
  try {
    const res = await userApi.get(`/submissions/${submissionId}/pdf`, {
      responseType: 'blob'
    })

    const blob = new Blob([res.data], { type: 'application/pdf' })
    const url = window.URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = `submission-${submissionId}.pdf`
    document.body.appendChild(a)
    a.click()
    a.remove()

    window.URL.revokeObjectURL(url)
  } catch (e) {
    submitError.value =
      e?.response?.data?.message || e?.message || 'Failed to download PDF.'
  } finally {
    isDownloading.value = false
  }
}

/**
 * recommendation: accept | reject | revision
 * status endpoint expects: accepted | rejected | revision
 */
function mapRecommendationToStatus(rec) {
  if (rec === 'accept') return 'accepted'
  if (rec === 'reject') return 'rejected'
  return 'revision'
}

async function submitEvaluation() {
  submitError.value = null

  if (!evaluation.value.recommendation) {
    submitError.value =
      'Please choose a recommendation (Accept / Reject / Requires Revision).'
    return
  }

  const submissionId = props.proposal?.id
  if (!submissionId) {
    submitError.value = 'Missing submission id.'
    return
  }

  isSubmitting.value = true
  try {
    // ✅ 1) Save evaluation (scientific committee endpoint)
    await userApi.post(`/submissions/${submissionId}/evaluate`, {
      relevance_score: evaluation.value.relevance,
      scientific_quality_score: evaluation.value.scientificQuality,
      originality_score: evaluation.value.originality,
      comments: evaluation.value.comments,
      recommendation: evaluation.value.recommendation // accept | reject | revision
    })

    // ✅ 2) Update submission status based on evaluator decision
    await userApi.post(`/submissions/${submissionId}/status`, {
      status: mapRecommendationToStatus(evaluation.value.recommendation)
      // admin_notes is optional in backend, so we can omit it
    })

    emit('submitted')
    emit('close')
  } catch (e) {
    const data = e?.response?.data

    if (data?.errors) {
      submitError.value = Object.entries(data.errors)
        .map(([field, msgs]) => `${field}: ${msgs.join(', ')}`)
        .join('\n')
    } else {
      submitError.value =
        data?.message || e?.message || 'Failed to submit evaluation.'
    }
  } finally {
    isSubmitting.value = false
  }
}
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
          <button
            class="btn-secondary"
            type="button"
            @click="downloadPdf"
            :disabled="isDownloading || !hasPdf"
            :title="!hasPdf ? 'No PDF uploaded' : ''"
          >
            {{ isDownloading ? 'Downloading...' : 'Download Summary (PDF)' }}
          </button>
        </div>

        <div class="abstract-box">
          <span class="label">Abstract (Resume):</span>
          <p>{{ isAbstractExpanded ? abstractText : shortAbstract }}</p>

          <button
            v-if="abstractText && abstractText !== '—' && abstractText.length > 220"
            class="btn-read-more"
            type="button"
            @click="toggleAbstract"
          >
            {{ isAbstractExpanded ? 'Show Less ▴' : 'Read More ▾' }}
          </button>
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

        <div class="rec-item" @click="setRecommendation('revision')">
          <div class="circle" :class="evaluation.recommendation === 'revision' ? 'bg-yellow' : 'bg-gray'"></div>
          <span>Requires Revision</span>
        </div>
      </div>
    </div>

    <div v-if="submitError" class="error-text" style="white-space: pre-line;">
      {{ submitError }}
    </div>

    <button
      class="btn-primary-large"
      @click="submitEvaluation"
      :disabled="isSubmitting"
      type="button"
    >
      {{ isSubmitting ? 'Submitting...' : 'Submit Evaluation' }}
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

.btn-secondary:disabled {
  opacity: 0.65;
  cursor: not-allowed;
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

.btn-primary-large:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.error-text {
  margin-top: 12px;
  color: #DC2626;
  font-size: 13px;
}

/* Responsive styles */
@media (max-width: 1024px) {
  .sliders-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }
}

@media (max-width: 768px) {
  .evaluation-container {
    padding: 15px;
    margin: 10px;
    max-width: 100%;
  }

  h1 {
    font-size: 20px;
    margin: 20px 0;
  }

  .details-card {
    flex-direction: column;
    gap: 20px;
    padding: 20px;
  }

  .details-left p {
    font-size: 13px;
  }

  .sliders-grid {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-bottom: 30px;
  }

  .slider-group label {
    font-size: 13px;
    margin-bottom: 15px;
  }

  .range-wrapper {
    padding-top: 15px;
  }

  .range-value {
    font-size: 11px;
  }

  textarea {
    width: 100%;
    height: 150px;
    padding: 12px;
  }

  .rec-options {
    gap: 10px;
  }

  .btn-primary-large {
    margin-top: 30px;
    padding: 8px 20px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .evaluation-container {
    padding: 10px;
    margin: 5px;
  }

  h1 {
    font-size: 18px;
    margin: 15px 0;
  }

  .details-card {
    padding: 15px;
  }

  .details-left p {
    font-size: 12px;
  }

  .abstract-box p {
    font-size: 11px;
  }

  .btn-read-more {
    font-size: 9px;
    padding: 1px 6px;
  }

  .slider-group label {
    font-size: 12px;
    margin-bottom: 10px;
  }

  .range-value {
    font-size: 10px;
  }

  textarea {
    height: 120px;
    padding: 10px;
  }

  .rec-item span {
    font-size: 14px;
  }

  .btn-secondary {
    padding: 4px 8px;
    font-size: 11px;
  }

  .btn-primary-large {
    padding: 6px 16px;
    font-size: 13px;
  }
}
</style>
