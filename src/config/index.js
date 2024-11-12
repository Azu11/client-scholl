export const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'
export const EMAIL = import.meta.env.VITE_EMAIL || 'example@gmail.com'

export const ROLES = Object.freeze({
  Admin: 'Admin',
  Teacher: 'Teacher',
  Student: 'Student'
})
