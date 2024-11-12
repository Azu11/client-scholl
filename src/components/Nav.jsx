import { Link } from 'react-router-dom'
import Logo from './Logo'
import ThemeButton from './ThemeButton'
import { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function Nav () {
  const [open, setOpen] = useState(false)
  const { isAuth, logout } = useContext(AuthContext)

  return (
    <nav className='bg-white shadow mb-5 border-gray-200 dark:bg-gray-800 dark:border-gray-600'>
      <div className='lg:w-4/5 pr-5 pl-5 flex flex-wrap items-center justify-between mx-auto p-1'>
        <Logo />
        <div className='flex md:order-2'>
          <ThemeButton />
          <button
            type='button'
            className='inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
            onClick={() => setOpen(!open)}
          >
            <svg
              className='w-6 h-6'
              aria-hidden='true'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 pt-1 ${
            open ? 'flex' : 'hidden'
          }`}
        >
          <ul
            onClick={() => setOpen(false)}
            className='flex flex-col w-full items-center md:space-x-8 font-medium p-4 md:p-0 border border-gray-100 rounded-lg bg-gray-50 md:flex-row  md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 dark:border-gray-600'
          >
            {isAuth
              ? (
                <>
                  <li>
                    <Link
                      to='/signup'
                      className='inline-flex text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
                    >
                      Panel de Control
                    </Link>
                  </li>
                  <li>
                    <button
                      className='inline-flex text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
                      onClick={() => logout()}
                    >
                      Salir
                    </button>
                  </li>
                </>
                )
              : (
                <>
                  <li>
                    <Link
                      to='/signup'
                      className='inline-flex text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
                    >
                      Registrarse
                    </Link>
                  </li>
                  <li>
                    <Link
                      to='/login'
                      className='inline-flex text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
                    >
                      Entrar
                    </Link>
                  </li>
                </>
                )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
