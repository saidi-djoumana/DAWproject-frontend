<template>
  <div class="submission-form-container">
    <div class="form-wrapper">
      <h1 class="form-title">Submission Form</h1>

      <form @submit.prevent="handleSubmit">
        <!-- Title of the Proposal -->
        <div class="form-group">
          <label for="title" class="form-label">Title of the Proposal</label>
          <input
            id="title"
            v-model="formData.title"
            type="text"
            class="form-input"
          />
        </div>

        <!-- List of Authors -->
        <div class="form-group">
          <label for="authors" class="form-label">List of Authors</label>
          <input
            id="authors"
            v-model="formData.authors"
            type="text"
            class="form-input"
          />
        </div>

        <!-- Abstract -->
        <div class="form-group">
          <label for="abstract" class="form-label">Abstract (Résumé)</label>
          <textarea
            id="abstract"
            v-model="formData.abstract"
            class="form-textarea"
            rows="5"
          ></textarea>
        </div>

        <!-- Keywords -->
        <div class="form-group">
          <label for="keywords" class="form-label">Keywords</label>
          <input
            id="keywords"
            v-model="formData.keywords"
            type="text"
            class="form-input"
          />
        </div>

        <!-- Type of Presentation -->
        <div class="form-group">
          <label for="presentation" class="form-label">Type of Presentation</label>
          <input
            id="presentation"
            v-model="formData.presentationType"
            type="text"
            class="form-input"
          />
        </div>

        <!-- PDF Upload -->
        <div class="form-group">
          <label for="pdf" class="form-label">PDF Upload for the Abstract</label>
          <input
            id="pdf"
            type="file"
            accept=".pdf"
            class="form-input file-input"
            @change="handleFileUpload"
          />
          <p v-if="formData.fileName" class="file-name">{{ formData.fileName }}</p>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="submit-button">Submit</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const formData = reactive({
  title: '',
  authors: '',
  abstract: '',
  keywords: '',
  presentationType: '',
  file: null,
  fileName: ''
})

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    formData.file = file
    formData.fileName = file.name
  }
}

const handleSubmit = () => {
  // Validation
  if (!formData.title || !formData.authors || !formData.abstract || 
      !formData.keywords || !formData.presentationType) {
    alert('Please fill in all required fields')
    return
  }

  // Log form data (you can replace this with API call)
  console.log('Form submitted:', {
    title: formData.title,
    authors: formData.authors,
    abstract: formData.abstract,
    keywords: formData.keywords,
    presentationType: formData.presentationType,
    file: formData.file
  })

  alert('Submission successful!')

  // Reset form
  resetForm()
}

const resetForm = () => {
  formData.title = ''
  formData.authors = ''
  formData.abstract = ''
  formData.keywords = ''
  formData.presentationType = ''
  formData.file = null
  formData.fileName = ''
}
</script>

<style scoped>

.submission-form-container {
  min-height: 100vh;
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.form-wrapper {
  background-color: #fff;
  max-width: 1400px;
  width: 100%;
  padding: 40px 60px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* TITLES use Poppins */
.form-title {
  font-family: 'Poppins', sans-serif;
  font-size: 28px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 40px 0;
}

.form-group {
  margin-bottom: 30px;
}

/* LABELS use Poppins */
.form-label {
  display: block;
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  font-weight: 400;
  color: #374151;
  margin-bottom: 12px;
}

/* INPUTS + TEXTAREA use Inter */
.form-input,
.form-textarea {
  width: 100%;
  padding: 12px 16px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #1f2937;
  background-color: #fff;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  transition: border-color 0.3s, box-shadow 0.3s;
  box-sizing: border-box;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #CCEBEB;
  box-shadow: 0 0 0 3px rgba(147, 197, 253, 0.1);
}

.form-textarea {
  resize: vertical;
}

.file-input {
  cursor: pointer;
}

.file-name {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: #6b7280;
  margin-top: 8px;
}

/* BUTTON uses Poppins */
.submit-button {
  width: 100%;
  padding: 16px;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #000;
  background-color: #CCEBEB;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;
}

.submit-button:hover {
  background-color: #A0D9D3;
}

.submit-button:active {
  background-color: #8BC7C1;
}

/* Tablet */
@media (max-width: 992px) {
  .form-wrapper {
    padding: 30px 40px;
  }

  .form-title {
    font-size: 24px;
  }
}

/* Mobile */
@media (max-width: 600px) {
  .submission-form-container {
    padding: 20px 10px;
  }

  .form-wrapper {
    padding: 24px 20px;
  }

  .form-title {
    font-size: 22px;
    margin-bottom: 30px;
  }

  .form-group {
    margin-bottom: 24px;
  }

  .form-label {
    font-size: 14px;
  }

  .submit-button {
    font-size: 15px;
    padding: 14px;
  }
}
</style>
