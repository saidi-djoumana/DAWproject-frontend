<template>
  <section class="committee-speakers-section">
    <div class="c-container">
      <!-- Scientific Committee -->
      <div class="section-block">
        <h2 class="section-title">Scientific Committee</h2>
        <button class="add-button" @click="openAddMemberModal">Add New Member</button>
        
        <div class="members-list">
          <div v-for="member in committeeMembers" :key="member.id" class="member-card">
            <div class="member-info">
              <h3 class="member-name">{{ member.name }}</h3>
              <p class="member-title">{{ member.title }}</p>
              <p class="member-affiliation">{{ member.affiliation }}</p>
            </div>
            <div class="member-actions">
              <button class="edit-button" @click="editMember(member)">Edit</button>
              <button class="delete-button" @click="deleteMember(member.id)">Delete</button>
            </div>
          </div>

          <div v-if="committeeMembers.length === 0" class="empty-state">
            No committee members yet. Click "Add New Member" to get started.
          </div>
        </div>
      </div>

      <!-- Invited Speakers -->
      <div class="section-block">
        <h2 class="section-title">Invited Speakers</h2>
        <button class="add-button" @click="openAddSpeakerModal">Add New Speaker</button>
        
        <div class="members-list">
          <div v-for="speaker in speakers" :key="speaker.id" class="member-card">
            <div class="member-info">
              <h3 class="member-name">{{ speaker.name }}</h3>
              <p class="member-affiliation">{{ speaker.affiliation }}</p>
              <p class="member-topic">{{ speaker.topic }}</p>
            </div>
            <div class="member-actions">
              <button class="edit-button" @click="editSpeaker(speaker)">Edit</button>
              <button class="delete-button" @click="deleteSpeaker(speaker.id)">Delete</button>
            </div>
          </div>

          <div v-if="speakers.length === 0" class="empty-state">
            No speakers yet. Click "Add New Speaker" to get started.
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Member Modal -->
    <div v-if="showMemberModal" class="modal-overlay" @click="closeMemberModal">
      <div class="modal-container" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">{{ isEditingMember ? 'Edit Member' : 'Add New Member' }}</h3>
          <button class="close-button" @click="closeMemberModal">×</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>Name *</label>
            <input v-model="memberForm.name" type="text" placeholder="Enter full name" />
          </div>
          <div class="form-group">
            <label>Title *</label>
            <input v-model="memberForm.title" type="text" placeholder="e.g., PhD / Professor" />
          </div>
          <div class="form-group">
            <label>Affiliation *</label>
            <input v-model="memberForm.affiliation" type="text" placeholder="e.g., University of Science" />
          </div>
        </div>
        <div class="modal-footer">
          <button class="cancel-button" @click="closeMemberModal">Cancel</button>
          <button class="save-button" @click="saveMember">
            {{ isEditingMember ? 'Update' : 'Add' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Add/Edit Speaker Modal -->
    <div v-if="showSpeakerModal" class="modal-overlay" @click="closeSpeakerModal">
      <div class="modal-container" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">{{ isEditingSpeaker ? 'Edit Speaker' : 'Add New Speaker' }}</h3>
          <button class="close-button" @click="closeSpeakerModal">×</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>Name *</label>
            <input v-model="speakerForm.name" type="text" placeholder="Enter full name" />
          </div>
          <div class="form-group">
            <label>Affiliation *</label>
            <input v-model="speakerForm.affiliation" type="text" placeholder="e.g., Institute of Technology" />
          </div>
          <div class="form-group">
            <label>Topic *</label>
            <input v-model="speakerForm.topic" type="text" placeholder="e.g., Future of AI" />
          </div>
        </div>
        <div class="modal-footer">
          <button class="cancel-button" @click="closeSpeakerModal">Cancel</button>
          <button class="save-button" @click="saveSpeaker">
            {{ isEditingSpeaker ? 'Update' : 'Add' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal-overlay" @click="closeDeleteModal">
      <div class="modal-container small" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">Confirm Delete</h3>
          <button class="close-button" @click="closeDeleteModal">×</button>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to delete this {{ deleteType }}? This action cannot be undone.</p>
        </div>
        <div class="modal-footer">
          <button class="cancel-button" @click="closeDeleteModal">Cancel</button>
          <button class="delete-confirm-button" @click="confirmDelete">Delete</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'

// Empty arrays for production
const committeeMembers = reactive([])
const speakers = reactive([])

// Modal states
const showMemberModal = ref(false)
const showSpeakerModal = ref(false)
const showDeleteModal = ref(false)
const isEditingMember = ref(false)
const isEditingSpeaker = ref(false)
const deleteType = ref('')
const deleteId = ref(null)

// Form data
const memberForm = reactive({
  id: null,
  name: '',
  title: '',
  affiliation: ''
})

const speakerForm = reactive({
  id: null,
  name: '',
  affiliation: '',
  topic: ''
})

// Member functions
const openAddMemberModal = () => {
  isEditingMember.value = false
  resetMemberForm()
  showMemberModal.value = true
}

const editMember = (member) => {
  isEditingMember.value = true
  memberForm.id = member.id
  memberForm.name = member.name
  memberForm.title = member.title
  memberForm.affiliation = member.affiliation
  showMemberModal.value = true
}

const saveMember = () => {
  if (!memberForm.name || !memberForm.title || !memberForm.affiliation) {
    alert('Please fill in all fields')
    return
  }

  if (isEditingMember.value) {
    const index = committeeMembers.findIndex(m => m.id === memberForm.id)
    if (index !== -1) committeeMembers[index] = { ...memberForm }
  } else {
    committeeMembers.push({
      id: Date.now(),
      name: memberForm.name,
      title: memberForm.title,
      affiliation: memberForm.affiliation
    })
  }
  closeMemberModal()
}

const deleteMember = (id) => {
  deleteType.value = 'member'
  deleteId.value = id
  showDeleteModal.value = true
}

const closeMemberModal = () => {
  showMemberModal.value = false
  resetMemberForm()
}

const resetMemberForm = () => {
  memberForm.id = null
  memberForm.name = ''
  memberForm.title = ''
  memberForm.affiliation = ''
}

// Speaker functions
const openAddSpeakerModal = () => {
  isEditingSpeaker.value = false
  resetSpeakerForm()
  showSpeakerModal.value = true
}

const editSpeaker = (speaker) => {
  isEditingSpeaker.value = true
  speakerForm.id = speaker.id
  speakerForm.name = speaker.name
  speakerForm.affiliation = speaker.affiliation
  speakerForm.topic = speaker.topic
  showSpeakerModal.value = true
}

const saveSpeaker = () => {
  if (!speakerForm.name || !speakerForm.affiliation || !speakerForm.topic) {
    alert('Please fill in all fields')
    return
  }

  if (isEditingSpeaker.value) {
    const index = speakers.findIndex(s => s.id === speakerForm.id)
    if (index !== -1) speakers[index] = { ...speakerForm }
  } else {
    speakers.push({
      id: Date.now(),
      name: speakerForm.name,
      affiliation: speakerForm.affiliation,
      topic: speakerForm.topic
    })
  }
  closeSpeakerModal()
}

const deleteSpeaker = (id) => {
  deleteType.value = 'speaker'
  deleteId.value = id
  showDeleteModal.value = true
}

const closeSpeakerModal = () => {
  showSpeakerModal.value = false
  resetSpeakerForm()
}

const resetSpeakerForm = () => {
  speakerForm.id = null
  speakerForm.name = ''
  speakerForm.affiliation = ''
  speakerForm.topic = ''
}

// Delete confirmation
const confirmDelete = () => {
  if (deleteType.value === 'member') {
    const index = committeeMembers.findIndex(m => m.id === deleteId.value)
    if (index !== -1) committeeMembers.splice(index, 1)
  } else if (deleteType.value === 'speaker') {
    const index = speakers.findIndex(s => s.id === deleteId.value)
    if (index !== -1) speakers.splice(index, 1)
  }
  closeDeleteModal()
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  deleteType.value = ''
  deleteId.value = null
}

// Expose for parent
defineExpose({ committeeMembers, speakers, resetAll: () => {
  committeeMembers.splice(0, committeeMembers.length)
  speakers.splice(0, speakers.length)
}})
</script>



<style scoped>
.committee-speakers-section {
  background-color: #f3f4f6;
  padding: 60px 0;
  margin: 0 40px;
}

.c-container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
}

.section-block {
  margin-bottom: 60px;
}

.section-title {
  font-family: 'Poppins', sans-serif;
  font-size: 32px;
  font-weight: 600;
  color: #000;
  margin-bottom: 24px;
}

.add-button {
  background-color: #CCEBEB;
  color: #000;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 24px;
  transition: background-color 0.3s;
}

.add-button:hover {
  background-color: #A0D9D3;
}

.members-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.member-card {
  background-color: #fff;
  padding: 24px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.member-info {
  flex: 1;
}

.member-name {
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #000;
  margin: 0 0 8px 0;
}

.member-title,
.member-affiliation,
.member-topic {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #333;
  margin: 4px 0;
  line-height: 1.5;
}

.member-actions {
  display: flex;
  gap: 16px;
  align-items: center;
}

.edit-button {
  background: none;
  border: none;
  color: #0066cc;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.3s;
}

.edit-button:hover {
  color: #3B82F6;
}

.delete-button {
  background: none;
  border: none;
  color: #EF4444;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.3s;
}

.delete-button:hover {
  color: #bd2130;
}

.empty-state {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #999;
  text-align: center;
  padding: 40px;
  background-color: #fff;
  border-radius: 8px;
  border: 2px dashed #ddd;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-container {
  background-color: white;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.modal-container.small {
  max-width: 400px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px 16px 24px;
  border-bottom: 1px solid #e5e7eb;
}

.modal-title {
  font-family: 'Poppins', sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #000;
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  font-size: 28px;
  color: #666;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.close-button:hover {
  background-color: #f3f4f6;
}

.modal-body {
  padding: 24px;
}

.modal-body p {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #333;
  line-height: 1.6;
  margin: 0;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
}

.form-group input {
  width: 100%;
  padding: 10px 12px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #3B82F6;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px 24px 24px;
  border-top: 1px solid #e5e7eb;
}

.cancel-button {
  background-color: #f3f4f6;
  color: #333;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.cancel-button:hover {
  background-color: #e5e7eb;
}

.save-button {
  background-color: #CCEBEB;
  color: #000;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.save-button:hover {
  background-color: #A0D9D3;
}

.delete-confirm-button {
  background-color: #EF4444;
  color: white;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.delete-confirm-button:hover {
  background-color: #dc2626;
}

/* Tablet */
@media (max-width: 992px) {
  .committee-speakers-section {
    padding: 50px 0;
  }

  .section-title {
    font-size: 28px;
  }

  .section-block {
    margin-bottom: 50px;
  }
}

/* Mobile */
@media (max-width: 600px) {
  .committee-speakers-section {
    padding: 40px 0;
  }

  .section-title {
    font-size: 24px;
  }

  .member-card {
    flex-direction: column;
    gap: 16px;
  }

  .member-actions {
    width: 100%;
    justify-content: flex-start;
  }

  .add-button {
    width: 100%;
  }

  .modal-container {
    max-width: 100%;
  }

  .modal-footer {
    flex-direction: column-reverse;
  }

  .cancel-button,
  .save-button,
  .delete-confirm-button {
    width: 100%;
  }
}
</style>