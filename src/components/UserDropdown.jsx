import { Link } from 'react-router-dom'
import Dropdown from './Dropdown'

export default function UserDropdown () {
  return (
    <Dropdown>
      <div className='py-1'>
        <Link
          to='/signup'
          className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
        >
          Registrarse
        </Link>
      </div>
      <div className='py-1'>
        <Link
          to='/login'
          className='block w-32 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
        >
          Iniciar sesión
        </Link>
      </div>
    </Dropdown>
  )
}
