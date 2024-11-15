import axios from 'axios'

export const getPeoplebyId = async ({ user }) => {
  try {
    return (await axios.get(`/people/${user}`)).data
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}

export const AllPeople = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    const response = await axios.get('/people', config)
    return response.data
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Error al obtener la Personas'
    )
  }
}
