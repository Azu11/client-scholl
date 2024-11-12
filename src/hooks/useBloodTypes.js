import { useEffect, useState } from 'react'
import { getBloodTypes } from '../services/bloodType'

export function useBloodTypes () {
  const [bloodTypes, setBloodTypes] = useState([])

  useEffect(() => {
    getBloodTypes().then(setBloodTypes)
  }, [])

  return { bloodTypes }
}
