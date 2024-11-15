import { useEffect, useState } from 'react'
import useUserStore from '../store/state/useUserStore'
import { getGrados, createGrado } from '../services/GradosService'

const GradosPages = () => {
  const [grados, setGrados] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [gradoData, setGradoData] = useState({
    name: ''
  })
  const { token } = useUserStore()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedGrados = await getGrados(token)
        setGrados(fetchedGrados)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching grados:', error.message)
        setIsLoading(false)
      }
    }
    fetchData()
  }, [token])

  const handleAddGradoClick = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleChange = (e) => {
    setGradoData({
      ...gradoData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!gradoData.name) {
      alert('Por favor ingresa el nombre del grado.')
      return
    }

    try {
      const newGrado = await createGrado({ ...gradoData, token })
      setGrados([...grados, newGrado])
      handleCloseModal()
    } catch (error) {
      console.error('Error creando el grado:', error.message)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
      <div className='flex items-center justify-between pb-4 bg-white dark:bg-gray-900'>
        <div />
      </div>
      <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Name
            </th>
            <th scope='col' className='px-6 py-3'>
              Status
            </th>
            <th scope='col' className='px-6 py-3'>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {grados.map((grado) => (
            <tr
              key={grado.id}
              className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
            >
              <th
                scope='row'
                className='flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
              >
                <div className='pl-3'>
                  <div className='text-base font-semibold'>{grado.name}</div>
                </div>
              </th>
              <td className='px-6 py-4'>
                <div className='flex items-center'>
                  {grado.status}
                  <div className='h-2.5 w-2.5 rounded-full bg-green-500 mr-2' />{' '}
                </div>
              </td>
              <td className='px-6 py-4'>
                <a
                  href='#'
                  className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                >
                  Editar Grados
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='flex justify-center'>
        <button
          onClick={handleAddGradoClick}
          type='button'
          className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
        >
          Agregar Grado
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
            <h2 className='text-lg font-semibold mb-4'>Crear Grado</h2>
            <form onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-700'>Nombre del Grado</label>
                <input
                  type='text'
                  name='name'
                  value={gradoData.name}
                  onChange={handleChange}
                  className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
                  placeholder='Ingrese nombre del grado'
                />
              </div>
              <div className='flex justify-end'>
                <button
                  type='button'
                  className='text-white bg-red-500 hover:bg-red-600 rounded-lg px-4 py-2 mr-2'
                  onClick={handleCloseModal}
                >
                  Cancelar
                </button>
                <button
                  type='submit'
                  className='text-white bg-blue-500 hover:bg-blue-600 rounded-lg px-4 py-2'
                >
                  Crear Grado
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default GradosPages
