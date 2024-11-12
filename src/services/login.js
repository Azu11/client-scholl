import axios from 'axios'

export async function loginService ({ user, password }) {
  try {
    return (await axios.post('/auth/login', { user, password })).data
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}
