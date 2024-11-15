import axios from 'axios'

export const getGrados = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    const response = await axios.get('/degrees', config)
    return response.data
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Error al obtener los grados'
    )
  }
}

export const createGrado = async (data) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${data.token}`,
        'Content-Type': 'application/json'
      }
    }
    const response = await axios.post('/degrees', data, config)
    return response.data
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}
