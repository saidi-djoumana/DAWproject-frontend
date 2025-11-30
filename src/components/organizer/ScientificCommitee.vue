<template>
  <section class="committee-speakers-section">
    <div class="c-container">
      <!-- Scientific Committee -->
      <div class="section-block">
        <h2 class="section-title">Scientific Committee</h2>
        <button class="add-button">Add New Member</button>
        
        <div class="members-list">
          <div class="member-card">
            <div class="member-info">
              <h3 class="member-name">John Doe</h3>
              <p class="member-title">PhD / Professor</p>
              <p class="member-affiliation">University of Science</p>
            </div>
            <div class="member-actions">
              <button class="edit-button">Edit</button>
              <button class="delete-button">Delete</button>
            </div>
          </div>

          <div class="member-card">
            <div class="member-info">
              <h3 class="member-name">Jane Smith</h3>
              <p class="member-title">MD / Researcher</p>
              <p class="member-affiliation">Health Institute</p>
            </div>
            <div class="member-actions">
              <button class="edit-button">Edit</button>
              <button class="delete-button">Delete</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Invited Speakers -->
      <div class="section-block">
        <h2 class="section-title">Invited Speakers</h2>
        <button class="add-button">Add New Speaker</button>
        
        <div class="members-list">
          <div class="member-card">
            <div class="member-info">
              <h3 class="member-name">Alice Johnson</h3>
              <p class="member-affiliation">Institute of Technology</p>
              <p class="member-topic">Future of AI</p>
            </div>
            <div class="member-actions">
              <button class="edit-button">Edit</button>
              <button class="delete-button">Delete</button>
            </div>
          </div>

          <div class="member-card">
            <div class="member-info">
              <h3 class="member-name">Bob Brown</h3>
              <p class="member-affiliation">Global Health Organization</p>
              <p class="member-topic">Innovations in Medicine</p>
            </div>
            <div class="member-actions">
              <button class="edit-button">Edit</button>
              <button class="delete-button">Delete</button>
            </div>
          </div>
        </div>
      </div>

     
    </div>
  </section>
</template>

<script setup>
import { reactive } from 'vue'

const committeeMembers = reactive([
  {
    id: 1,
    name: 'John Doe',
    title: 'PhD / Professor',
    affiliation: 'University of Science'
  },
  {
    id: 2,
    name: 'Jane Smith',
    title: 'MD / Researcher',
    affiliation: 'Health Institute'
  }
])

const speakers = reactive([
  {
    id: 1,
    name: 'Alice Johnson',
    affiliation: 'Institute of Technology',
    topic: 'Future of AI'
  },
  {
    id: 2,
    name: 'Bob Brown',
    affiliation: 'Global Health Organization',
    topic: 'Innovations in Medicine'
  }
])
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

  .add-button,
  .create-event-button {
    width: 100%;
  }
}
</style>