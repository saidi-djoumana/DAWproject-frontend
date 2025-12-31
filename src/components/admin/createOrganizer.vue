<script setup>
import { ref } from 'vue';
import api from '@/api/axios'; // make sure this points to your configured Axios instance with token

const form = ref({
  name: '',
  email: '',
  password: '',
  phone: '',
  institution: '',
  country: ''
});

const handleCreate = async () => {
  try {
    const response = await api.post('/admin/users/organizer', form.value);
    console.log('Organizer created:', response.data);
    alert('Organizer created successfully!');
    // Reset form
    form.value = {
      name: '',
      email: '',
      password: '',
      phone: '',
      institution: '',
      country: ''
    };
  } catch (error) {
    console.error('Failed to create organizer:', error.response?.data || error);
    alert('Failed to create organizer. Check console for details.');
  }
};
</script>

<template>
  <div class="page-wrapper">
    <header class="section-header">
      <h1>Create New Organizer</h1>
    </header>

    <div class="form-card">
      <form @submit.prevent="handleCreate" class="organizer-form">
        <div class="input-group">
          <label>Name</label>
          <input type="text" v-model="form.name" placeholder="Enter name" required />
        </div>

        <div class="input-group">
          <label>Email</label>
          <input type="email" v-model="form.email" placeholder="Enter email" required />
        </div>

        <div class="input-group">
          <label>Password</label>
          <input type="password" v-model="form.password" placeholder="Enter password" required />
        </div>

        <div class="input-group">
          <label>Phone</label>
          <input type="tel" v-model="form.phone" placeholder="Enter phone number" required />
        </div>

        <div class="input-group">
          <label>Institution</label>
          <input type="text" v-model="form.institution" placeholder="Enter institution" required />
        </div>

        <div class="input-group">
          <label>Country</label>
          <input type="text" v-model="form.country" placeholder="Enter country" required />
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-submit">create</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.page-wrapper {
  background-color: #F3F4F6;
  width: 100%;
  padding: 20px;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  box-sizing: border-box;
  max-width: 1380px;
  margin: 20px auto;
}

.section-header h1 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
  color: #000;
}

.form-card {
  background: #ffffff;
  border-radius: 8px;
  padding: 40px;
  width: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.organizer-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group label {
  font-size: 14px;
  font-weight: 700;
  color: #374151;
}

.input-group input {
  padding: 12px 16px;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
}

.form-actions {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.btn-submit {
  background-color: #d1e9e9;
  color: #064e3b;
  border: 1px solid #064e3b;
  padding: 14px;
  width: 100%;
  max-width: 800px;
  border-radius: 6px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  text-transform: lowercase;
  transition: background-color 0.2s;
}

.btn-submit:hover {
  background-color: #b9e0e0;
}
</style>
