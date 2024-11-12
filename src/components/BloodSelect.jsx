import { useBloodTypes } from '../hooks/useBloodTypes'
import Select from './Select'

export default function BloodSelect () {
  const { bloodTypes } = useBloodTypes()

  return (
    <Select options={bloodTypes} name='bloodTypeId' text='Tipo de Sangre' />
  )
}
