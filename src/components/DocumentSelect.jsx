import { useDocumentType } from '../hooks/useDocumentType'
import Select from './Select'

export default function DocumentSelect () {
  const { documentTypes } = useDocumentType()

  return (
    <Select options={documentTypes} name='documentTypeId' text='Tipo de Documento' />
  )
}
