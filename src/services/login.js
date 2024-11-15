import axios from 'axios'

export async function loginService ({ user, password }) {
  try {
    const response = await axios.post('/auth/login', {
      user,
      password
    })
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('Error en el login:', error)
    throw error.response ? error.response.data : new Error('Error en la conexión')
  }
}
