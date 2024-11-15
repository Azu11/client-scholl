import axios from 'axios'

export const getGroups = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    const response = await axios.get('/groups', config)
    console.log(response.data)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener los grupos')
  }
}

export const createGroup = async (data) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${data.token}`,
        'Content-Type': 'application/json'
      }
    }
    const response = await axios.post('/groups', data, config)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al crear el grupo')
  }
}

// Función para filtrar los grupos por degreeId
export const getGroupsByDegree = async (degreeId, token) => {
  try {
    const allGroups = await getGroups(token)
    console.log(allGroups)
    const filteredGroups = allGroups.filter(group => group.degreeId === degreeId)
    return filteredGroups
  } catch (error) {
    console.error('Error al obtener los grupos por degreeId:', error.message)
    return []
  }
}
