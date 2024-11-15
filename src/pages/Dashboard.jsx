import { useEffect, useState } from 'react'
import { AllPeople } from '../services/peopleService'
import useUserStore from '../store/state/useUserStore'

export default function Dashboard () {
  const [people, setPeople] = useState([])
  const [isloading, setIsloading] = useState(false)
  const { token } = useUserStore()

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

  if (isloading) {
    return <div>Loading...</div>
  }

  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
      <div className='flex items-center justify-between pb-4 bg-white dark:bg-gray-900'>
        <div>
          <button
            id='dropdownActionButton'
            data-dropdown-toggle='dropdownAction'
            className='inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
            type='button'
          >
            <span className='sr-only'>Action button</span>
            Action
            <svg
              className='w-3 h-3 ml-2'
              aria-hidden='true'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M19 9l-7 7-7-7'
              />
            </svg>
          </button>
          <div
            id='dropdownAction'
            className='z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600'
          >
            <ul
              className='py-1 text-sm text-gray-700 dark:text-gray-200'
              aria-labelledby='dropdownActionButton'
            >
              <li>
                <a
                  href='#'
                  className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                >
                  Reward
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                >
                  Promote
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                >
                  Activate account
                </a>
              </li>
            </ul>
            <div className='py-1'>
              <a
                href='#'
                className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
              >
                Delete User
              </a>
            </div>
          </div>
        </div>
        <label htmlFor='table-search' className='sr-only'>
          Search
        </label>
        <div className='relative'>
          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
            <svg
              className='w-5 h-5 text-gray-500 dark:text-gray-400'
              aria-hidden='true'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                clipRule='evenodd'
              />
            </svg>
          </div>
          <input
            type='text'
            id='table-search-users'
            className='block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Search for users'
          />
        </div>
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
          href='/signup'
          type='button'
          className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
        >
          Agregar persona
        </button>
      </div>
    </div>
  )
}
