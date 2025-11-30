<template>
  <section class="event-form-section">
    <div class="form-wrapper">
      <div class="field">
        <label>Title</label>
        <input type="text" v-model="form.title" />
      </div>
      <div class="field">
        <label>Description</label>
        <textarea v-model="form.description"></textarea>
      </div>
      <div class="two-columns">
        <div class="field">
          <label>Start Date</label>
          <input type="date" v-model="form.startDate" />
        </div>
        <div class="field">
          <label>End Date</label>
          <input type="date" v-model="form.endDate" />
        </div>
      </div>
      <div class="field">
        <label>Location</label>
        <input type="text" v-model="form.location" />
      </div>
      <div class="field">
        <label>Theme</label>
        <input type="text" v-model="form.theme" />
      </div>
      <div class="field">
        <label>Contact</label>
        <input type="text" v-model="form.contact" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  title: '',
  description: '',
  startDate: '',
  endDate: '',
  location: '',
  theme: '',
  contact: '',
})
</script>

<style scoped>
.event-form-section {
  background-color: #ffffff;
  padding: 40px;
  border-radius: 8px;
}

.form-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.field {
  display: flex;
  flex-direction: column;
  width: 100%;
}

label {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  margin-bottom: 6px;
  color: #001F36;
  font-size: 0.95rem;
}

input,
textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 0.95rem;
  font-family: 'Inter', sans-serif;
  box-sizing: border-box;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #001F36;
}

textarea {
  height: 120px;
  resize: vertical;
}

.two-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

/* Mobile */
@media (max-width: 600px) {
  .event-form-section {
    padding: 24px;
  }
  
  .two-columns {
    grid-template-columns: 1fr;
  }
}
</style>