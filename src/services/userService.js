import axios from 'axios'

// Función para registrar usuario creando primero la Persona y luego el Usuario
export async function registerUser (data) {
  try {
    // 1. Crear Persona
    const personResponse = await axios.post('/people', {
      documentNumber: data.documentNumber,
      firstName: data.firstName,
      middleName: data.middleName || '', // Opcional, pero enviar string vacío si está ausente
      surname: data.surname,
      secondSurname: data.secondSurname || '', // Opcional
      gender: data.gender,
      phone: data.phone || '', // Opcional
      documentTypeId: parseInt(data.documentTypeId), // Asegurar que sea número
      bloodTypeId: parseInt(data.bloodTypeId), // Asegurar que sea número
      birthDate: new Date(data.birthDate).toISOString() // Convertir a formato ISO
    })

    // Obtener el ID de la persona recién creada
    const personId = personResponse.data.id

    // 2. Crear Usuario con el ID de Persona
    const userResponse = await axios.post('/users', {
      user: data.user,
      password: data.password,
      role: data.role,
      status: data.status,
      personId
    })

    return userResponse.data
  } catch (error) {
    console.error('Error registering user:', error)
    throw error
  }
}

export const getUser = async ({ user }) => {
  try {
    return (await axios.get(`/users/${user}`)).data
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}

export const updateUser = async ({ user, password }) => {
  try {
    return (await axios.put(`/users/${user}`, { user, password })).data
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}

export default {
  registerUser,
  getUser,
  updateUser
}
