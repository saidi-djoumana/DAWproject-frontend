import { reactive, computed } from 'vue'

// Safe JSON parse helper
function safeParse(str) {
  try {
    return JSON.parse(str)
  } catch {
    return null
  }
}

const state = reactive({
  token: localStorage.getItem('userToken'),
  user: safeParse(localStorage.getItem('userData'))
})

const isAuthenticated = computed(() => !!state.token)

const role = computed(() => {
  if (!state.user) return null

  if (Array.isArray(state.user.roles) && state.user.roles.length > 0) {
    return state.user.roles[0].name
  }

  return state.user.role || null
})

function login(token, user) {
  state.token = token
  state.user = user
  localStorage.setItem('userToken', token)
  localStorage.setItem('userData', JSON.stringify(user))
}

function logout() {
  state.token = null
  state.user = null
  localStorage.removeItem('userToken')
  localStorage.removeItem('userData')
}

export default {
  state,
  isAuthenticated,
  role,
  login,
  logout
}
