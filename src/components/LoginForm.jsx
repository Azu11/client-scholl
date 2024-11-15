import { useId, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginService } from '../services/login'
import useUserStore from '../store/state/useUserStore'
import { useForm, Controller } from 'react-hook-form'

export default function LoginForm () {
  const navigate = useNavigate()
  const userID = useId()
  const passwordID = useId()
  const rememberID = useId()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      user: '',
      password: ''
    }
  })

  // Función para acceder al store de usuario
  const loginUser = useUserStore(state => state.login)

  const onSubmit = async (data) => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await loginService({ user: data.user, password: data.password })

      // Guardamos la información del usuario en el store
      loginUser(result.id, result.accessToken, result.name, result.role)

      // Redirige al dashboard después de iniciar sesión exitosamente
      navigate('/dashboard')
    } catch (error) {
      console.error('Error al iniciar sesión:', error)
      setError('Error de inicio de sesión. Por favor, verifica tus credenciales.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor={userID} className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            Usuario
          </label>
          <Controller
            name='user'
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type='text'
                autoComplete='off'
                id={userID}
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='Jon Doe'
                required
              />
            )}
          />
          {errors.user && <span className='text-red-500'>{errors.user.message}</span>}
        </div>

        <div>
          <label htmlFor={passwordID} className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            Contraseña
          </label>
          <Controller
            name='password'
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type='password'
                autoComplete='off'
                id={passwordID}
                placeholder='••••••••'
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                required
              />
            )}
          />
          {errors.password && <span className='text-red-500'>{errors.password.message}</span>}
        </div>

        <div className='flex items-center justify-between'>
          <div className='flex items-center h-5'>
            <Controller
              name='remember'
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id={rememberID}
                  aria-describedby='remember'
                  type='checkbox'
                  className='w-4 h-4 border hover:cursor-pointer border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
                  required
                />
              )}
            />
          </div>
        </div>

        <div className='flex justify-center'>
          <button
            type='submit'
            className={`text-white ${isLoading ? 'bg-gray-400 pointer-events-none' : 'bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'}`}
          >
            {isLoading ? 'Cargando...' : 'Entrar'}
          </button>
        </div>

        <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
          ¿No tienes una cuenta?{' '}
          <Link
            to='/signup'
            className='font-medium text-primary-600 hover:underline dark:text-primary-500'
          >
            Registrar
          </Link>
        </p>

        {error && <p className='text-red-500 mt-2'>{error}</p>}
      </form>
    </>
  )
}
