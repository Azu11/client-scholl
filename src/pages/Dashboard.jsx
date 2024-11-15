import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AllPeople } from '../services/peopleService'
import useUserStore from '../store/state/useUserStore'

export default function Dashboard () {
  const [people, setPeople] = useState([])
  const [isloading, setIsloading] = useState(false)
  const { token } = useUserStore()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPeople = await AllPeople(token)
        setPeople(fetchedPeople)
        setIsloading(false)
      } catch (error) {
        console.error('Error fetching people:', error.message)
        setIsloading(false)
      }
    }

    fetchData()
  }, [token])

  const handleAddPersonClick = () => {
    navigate('/signup')
  }

  const handleGroupsClick = () => {
    navigate('/grades')
  }

  if (isloading) {
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
              gender
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
          {people.map((person) => (
            <tr key={person.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
              <th scope='row' className='flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                <img className='w-10 h-10 rounded-full' src='https://cdn-icons-png.flaticon.com/128/149/149071.png' alt={person.name} />
                <div className='pl-3'>
                  <div className='text-base font-semibold'>{person.firstName + ' ' + person.surname}</div>
                  <div className='font-normal text-gray-500'>{person.documentNumber}</div>
                </div>
              </th>
              <td className='px-6 py-4'>{person.gender}</td>
              <td className='px-6 py-4'>
                <div className='flex items-center'>
                  {person.status}
                  <div className='h-2.5 w-2.5 rounded-full bg-green-500 mr-2' />{' '}
                </div>
              </td>
              <td className='px-6 py-4'>
                <a
                  href='#'
                  className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                >
                  Edit user
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='flex justify-center'>
        <button
          onClick={handleAddPersonClick}
          type='button'
          className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
        >
          Agregar persona
        </button>
        <button
          onClick={handleGroupsClick}
          type='button'
          className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
        >
          Grupos
        </button>
      </div>
    </div>
  )
}
