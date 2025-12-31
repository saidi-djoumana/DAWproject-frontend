<template>
  <section class="event-setup">
    <div class="event-container">
      <EventForm ref="eventFormRef" />
      <ScientificCommitee ref="committeeRef" />

      <!-- Create Event Button -->
      <button class="create-event-button" @click="createEvent">
        Create Event
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import EventForm from './EventForm.vue'
import ScientificCommitee from './ScientificCommitee.vue'
import userApi from '@/api/userAxios' // only organizer token is sent

const eventFormRef = ref(null)
const committeeRef = ref(null)

const createEvent = async () => {
  try {
    const form = eventFormRef.value.form
    const committeeMembers = committeeRef.value.committeeMembers
    const speakers = committeeRef.value.speakers

    // Basic validation
    if (
      !form.title ||
      !form.description ||
      !form.startDate ||
      !form.endDate ||
      !form.location ||
      !form.theme ||
      !form.contact ||
      !form.type
    ) {
      return alert('Please fill in all required fields!')
    }

    // Build payload
    const payload = {
      title: form.title,
      description: form.description,
      start_date: form.startDate,
      end_date: form.endDate,
      location: form.location,
      theme: form.theme,
      type: form.type,
      contact_email: form.contact,
      scientific_committee: committeeMembers.map(m => ({
        name: m.name,
        title: m.title,
        affiliation: m.affiliation
      })),
      invited_speakers: speakers.map(s => ({
        name: s.name,
        affiliation: s.affiliation,
        topic: s.topic
      }))
    }

    // Call API
    const response = await userApi.post('/events', payload)

    if (response.data.success) {
      alert('Event created successfully!')
      eventFormRef.value.resetForm()
      committeeRef.value.resetAll()
    } else {
      alert(response.data.message || 'Failed to create event')
    }
  } catch (err) {
    if (err.response?.status === 401) {
      alert('Authentication error: please login again')
    } else {
      alert(err.response?.data?.message || 'An error occurred while creating the event')
    }
    console.error(err)
  }
}
</script>




<style scoped>
.event-setup {
  padding: 50px 0;
}

.event-container {
    width: 100%;
    max-width: 1340px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 40px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding-bottom:50px ;
}

.create-event-button {
  background-color: #B8E6E1;
  color: #000;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 500;
  padding: 14px 32px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;

  /* Fixes */
  align-self: flex-start;
  width: auto;
  flex-shrink: 0;
  margin-left: 40px;
}


.create-event-button:hover {
  background-color: #A0D9D3;
}
/* Tablet */
@media (max-width: 992px) {
  .event-setup {
    padding: 50px 0;
  }
  
  .container {
    width: 85%;
    gap: 32px;
  }
}

/* Mobile */
@media (max-width: 600px) {
  .event-setup {
    padding: 40px 0;
  }
  
  .container {
    width: 90%;
    gap: 24px;
  }
}
</style>