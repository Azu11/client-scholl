// hooks/useSignupData.js
import { useState, useEffect } from 'react'
import { getBloodTypes } from '../services/bloodType'
import { getDocumentTypes } from '../services/documentType'
import { registerUser } from '../services/userService'

export default function useSignupData () {
  const [bloodTypes, setBloodTypes] = useState([])
  const [documentTypes, setDocumentTypes] = useState([])
  const [formError, setFormError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Cargar los datos al montar el componente
  useEffect(() => {
    async function fetchData () {
      try {
        const bloodData = await getBloodTypes()
        const documentData = await getDocumentTypes()
        setBloodTypes(bloodData)
        setDocumentTypes(documentData)
      } catch (error) {
        setFormError('Error al cargar los datos')
      }
    }
    fetchData()
  }, [])

  // Función para registrar al usuario
  const handleRegister = async (data) => {
    setIsSubmitting(true)
    setFormError(null)
    try {
      // Llamar a registerUser que maneja la creación de Persona y Usuario
      await registerUser(data)
      console.log('Usuario registrado con éxito')
    } catch (error) {
      console.error('Error al registrar usuario:', error)
      setFormError('Error al registrar el usuario')
    } finally {
      setIsSubmitting(false)
    }
  }

  return { bloodTypes, documentTypes, formError, handleRegister, isSubmitting }
}
