import { useEffect, useState } from 'react'
import useUserStore from '../store/state/useUserStore'
import { getGrados, createGrado } from '../services/GradosService'
import { createGroup, getGroupsByDegree } from '../services/groupsService'

const GradosPages = () => {
  const [grados, setGrados] = useState([])
  const [groupData, setGroupData] = useState({
    year: '',
    name: '',
    degreeId: ''
  })
  const [groups, setGroups] = useState({})
  const [showGroupsModal, setShowGroupsModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [gradoData, setGradoData] = useState({
    name: ''
  })
  const { token } = useUserStore()

  // Fetch Grados and Groups on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedGrados = await getGrados(token)
        setGrados(fetchedGrados)

        // Fetch groups for each grado
        const groupsByDegree = {}
        for (const grado of fetchedGrados) {
          const groupsForDegree = await getGroupsByDegree(grado.id, token)
          groupsByDegree[grado.id] = groupsForDegree
        }
        setGroups(groupsByDegree)

        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching grados or groups:', error.message)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [token])

  const handleAddGroupClick = async (degreeId) => {
    setGroupData({ ...groupData, degreeId })
    setShowGroupsModal(true)
  }

  const handleCloseGroupModal = () => {
    setShowGroupsModal(false)
  }

  const handleGroupFormSubmit = async (e) => {
    e.preventDefault()

    if (!groupData.year || isNaN(groupData.year)) {
      alert('Por favor ingresa un año válido.')
      return
    }

    if (groupData.name.length < 5) {
      alert('El nombre del grupo debe tener al menos 5 caracteres.')
      return
    }

    try {
      const newGroup = await createGroup({ ...groupData, year: Number(groupData.year), averagingpreperiod_gru: 0, annual_gru_average: 0, token })

      setGroups(prevGroups => ({
        ...prevGroups,
        [groupData.degreeId]: [...(prevGroups[groupData.degreeId] || []), newGroup]
      }))
      handleCloseGroupModal()
    } catch (error) {
      console.error('Error creando el grupo:', error.message)
    }
  }

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
              Grupos
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
                  {groups[grado.id] && groups[grado.id].length > 0
                    ? (
                        groups[grado.id].map((group) => (
                          <span key={group.id} className='block text-sm'>{group.name}</span>
                        ))
                      )
                    : (
                      <span>No hay grupos</span>
                      )}
                </div>
              </td>
              <td className='px-6 py-4'>
                <div className='flex flex-col space-y-2'>
                  <a
                    href='#'
                    className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                  >
                    Editar Grados
                  </a>
                  <a
                    onClick={() => handleAddGroupClick(grado.id)}
                    className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                  >
                    Agregar Grupos
                  </a>
                </div>
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

      {showGroupsModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50'>
          <div className='bg-white p-16 rounded-lg shadow-lg w-90'>
            <h2 className='text-lg font-semibold mb-4'>Agregar Grupo</h2>
            <form onSubmit={handleGroupFormSubmit}>
              <div className='mb-4'>
                <label>
                  Año:
                  <input
                    type='number'
                    value={groupData.year}
                    onChange={(e) => setGroupData({ ...groupData, year: e.target.value })}
                    required
                  />
                </label>
              </div>
              <div className='mb-4'>
                <label>
                  Nombre:
                  <input
                    type='text'
                    value={groupData.name}
                    onChange={(e) => setGroupData({ ...groupData, name: e.target.value })}
                    required
                  />
                </label>
              </div>
              <div className='flex justify-end'>
                <button className='text-white bg-blue-500 hover:bg-blue-600 rounded-lg px-4 py-2' type='submit'>Crear Grupo</button>
                <button className='text-white bg-red-500 hover:bg-red-600 rounded-lg px-4 py-2 mr-2' type='button' onClick={handleCloseGroupModal}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
          <div className='bg-white p-8 rounded-lg'>
            <h2 className='text-lg font-semibold mb-4'>Agregar Grado</h2>
            <form onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label>
                  Nombre del Grado:
                  <input
                    type='text'
                    name='name'
                    value={gradoData.name}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className='flex justify-end'>
                <button className='text-white bg-blue-500 hover:bg-blue-600 rounded-lg px-4 py-2' type='submit'>Crear Grado</button>
                <button className='text-white bg-red-500 hover:bg-red-600 rounded-lg px-4 py-2 mr-2' type='button' onClick={handleCloseModal}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default GradosPages
