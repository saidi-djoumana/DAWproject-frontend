import { reactive, computed } from 'vue'

const state = reactive({
  token: localStorage.getItem('adminToken'),
  admin: localStorage.getItem('adminData')
    ? JSON.parse(localStorage.getItem('adminData'))
    : null
})

const isAdminAuthenticated = computed(() => !!state.token)

function adminLogin(token, admin) {
  state.token = token
  state.admin = admin
  localStorage.setItem('adminToken', token)
  localStorage.setItem('adminData', JSON.stringify(admin))
}

function adminLogout() {
  state.token = null
  state.admin = null
  localStorage.removeItem('adminToken')
  localStorage.removeItem('adminData')
}

export default {
  state,
  isAdminAuthenticated,
  adminLogin,
  adminLogout
}
