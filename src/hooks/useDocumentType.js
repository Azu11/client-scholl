import { useEffect, useState } from 'react'
import { getDocumentTypes } from '../services/documentType'

export function useDocumentType () {
  const [documentTypes, setDocumentTypes] = useState([])

  useEffect(() => {
    getDocumentTypes().then(setDocumentTypes)
  }, [])

  return { documentTypes }
}
