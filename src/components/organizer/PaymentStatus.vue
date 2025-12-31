<template>
  <section class="payment-status-section">
    <div class="container">
      <h2 class="section-title">Payment Status</h2>
      
      <input 
        type="text" 
        class="search-input" 
        placeholder="Search by Payment Status..."
        v-model="searchQuery"
      />
      
      <div class="table-wrapper">
        <table class="payment-table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>PROFILE TYPE</th>
              <th>PAYMENT STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="person in filteredPayments" :key="person.id">
              <td>{{ person.name }}</td>
              <td>{{ person.profileType }}</td>
              <td>
                <span 
                  class="status-badge" 
                  :class="person.status === 'paid' ? 'status-paid' : 'status-pending'"
                >
                  {{ person.status === 'paid' ? 'Payé sur place' : 'À payer' }}
                </span>
              </td>
              <td>
                <button 
                  v-if="person.status !== 'paid'" 
                  @click="markAsPaid(person)"
                  class="mark-paid-btn"
                >
                  Mark as Paid
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <p v-if="payments.length === 0" class="empty-text">
          No registrations found.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '@/api/userAxios' // use your axios instance

// Search query
const searchQuery = ref('')

// Payments list from backend
const payments = ref([])

// Fetch all registrations from backend
const fetchPayments = async () => {
  try {
    const response = await api.get('/registrations/my')
    payments.value = response.data.data || []
  } catch (error) {
    console.error('Failed to fetch payments:', error)
  }
}

// Update payment status
const markAsPaid = async (person) => {
  try {
    const response = await api.put(`/registrations/${person.id}/payment-status`, {
      status: 'paid'
    })
    if (response.data.success) {
      person.status = 'paid' // reactive update
    }
  } catch (error) {
    console.error('Failed to update payment status:', error)
  }
}

// Computed filtered payments
const filteredPayments = computed(() => {
  if (!searchQuery.value) return payments.value

  const query = searchQuery.value.toLowerCase()
  return payments.value.filter(person => {
    const statusText = person.status === 'paid' ? 'payé sur place' : 'à payer'
    return person.name.toLowerCase().includes(query) ||
           person.profileType.toLowerCase().includes(query) ||
           statusText.includes(query)
  })
})

// Load payments on mount
onMounted(fetchPayments)
</script>

<style scoped>
.payment-status-section {
  background-color: #f3f4f6;
  padding: 60px 0;
}

.container {
  width: 90%;
  max-width: 1340px;
  margin: 0 auto;
}

.section-title {
  font-family: 'Poppins', sans-serif;
  font-size: 32px;
  font-weight: 600;
  color: #000;
  margin-bottom: 24px;
}

.search-input {
  width: 100%;
  padding: 12px 16px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-bottom: 24px;
  box-sizing: border-box;
}

.search-input:focus {
  outline: none;
  border-color: #999;
}

.search-input::placeholder {
  color: #999;
}

.table-wrapper {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
}

.payment-table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Inter', sans-serif;
}

.payment-table thead {
  background-color: #E5E7EB;
}

.payment-table th {
  text-align: left;
  padding: 16px 20px;
  font-size: 12px;
  font-weight: 600;
  color: #4B5563;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid #e0e0e0;
}

.payment-table td {
  padding: 16px 20px;
  font-size: 14px;
  color: #333;
  border-bottom: 1px solid #f0f0f0;
}

.payment-table tbody tr:hover {
  background-color: #fafafa;
}

.payment-table tbody tr:last-child td {
  border-bottom: none;
}

.status-badge {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 400;
  text-align: center;
}

.status-paid {
  background-color: #22C55E;
  color: #fff;
}

.status-pending {
  background-color: #EAB308;
  color: #FFF;
}

/* Tablet */
@media (max-width: 992px) {
  .payment-status-section {
    padding: 50px 0;
  }

  .container {
    width: 85%;
  }

  .section-title {
    font-size: 28px;
  }
}

/* Mobile */
@media (max-width: 600px) {
  .payment-status-section {
    padding: 40px 0;
  }

  .container {
    width: 90%;
  }

  .section-title {
    font-size: 24px;
  }

  .table-wrapper {
    overflow-x: scroll;
  }

  .payment-table {
    min-width: 600px;
  }

  .payment-table th,
  .payment-table td {
    padding: 12px 16px;
    font-size: 13px;
  }
}
</style>