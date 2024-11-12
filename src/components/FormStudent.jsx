import { useContext, useId, useState } from 'react'
import BloodSelect from './BloodSelect'
import DocumentSelect from './DocumentSelect'
import Input from './Input'
import Select from './Select'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import appFirebase from '../config/credentials'
import { useNavigate } from 'react-router-dom'
import { createdStudent } from '../services/student'
import { AuthContext } from '../context/AuthContext'
import Swal from 'sweetalert2'

const storage = getStorage(appFirebase)

export default function FormStudent () {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const [urlPhoto, setUrlPhoto] = useState('')
  const photoId = useId()

  const handleSubmit = (event) => {
    event.preventDefault()
    const { bloodTypeId, documentTypeId, birthDate, phone, ...newStudent } =
      Object.fromEntries(new window.FormData(event.target))

    const student = phone
      ? {
          phone: phone.replaceAll('-', ''),
          bloodTypeId: Number(bloodTypeId),
          documentTypeId: Number(documentTypeId),
          photo: urlPhoto,
          teacherId: user.id,
          birthDate: new Date(birthDate).toISOString(),
          ...newStudent
        }
      : {
          bloodTypeId: Number(bloodTypeId),
          documentTypeId: Number(documentTypeId),
          photo: urlPhoto,
          teacherId: user.id,
          birthDate: new Date(birthDate).toISOString(),
          ...newStudent
        }

    createdStudent({
      student,
      accessToken: user.accessToken
    })
      .then((res) => {
        console.log(res)
        event.target.reset()
        navigate('/')
      })
      .catch((err) => {
        Swal.fire('Opss!', err.message, 'warning')
      })
  }

  const fileHandler = async (event) => {
    const file = event.target.files[0]
    const refFile = ref(
      storage,
      `images/${file.name}${new Date().toISOString()}`
    )
    await uploadBytes(refFile, file)
    setUrlPhoto(await getDownloadURL(refFile))
  }

  return (
    <section className='bg-white dark:bg-gray-900 w-full'>
      <div className='flex flex-col items-center justify-center mx-auto lg:py-0'>
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-2xl xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
              Registrar estudiante
            </h1>
            <hr className='border-t border-blue-600 my-4 pb-4' />
            <form onSubmit={handleSubmit}>
              <div className='grid md:grid-cols-2 md:gap-6'>
                <Input type='text' name='firstName' text='Nombre' required />
                <Input type='text' name='middleName' text='Segundo nombre' />
              </div>
              <div className='grid md:grid-cols-2 md:gap-6'>
                <Input type='text' name='surname' text='Apellido' required />
                <Input
                  type='text'
                  name='secondSurname'
                  text='Segundo apellido'
                />
              </div>
              <div className='grid md:grid-cols-2 md:gap-6'>
                <Select
                  name='gender'
                  text='Género'
                  options={[
                    { id: 'Male', name: 'Masculino' },
                    { id: 'Female', name: 'Femenino' }
                  ]}
                />
                <BloodSelect />
              </div>
              <div className='grid md:grid-cols-2 md:gap-6'>
                <Input
                  type='date'
                  name='birthDate'
                  text='Fecha de nacimiento'
                  required
                />
                <Input
                  type='tel'
                  name='phone'
                  text='Teléfono (312-345-6789)'
                  pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                />
              </div>
              <div className='grid md:grid-cols-2 md:gap-6'>
                <DocumentSelect />
                <Input
                  type='number'
                  text='Número documento'
                  name='documentNumber'
                  required
                />
              </div>
              <div className='flex items-center justify-center w-full mb-3'>
                {urlPhoto
                  ? (
                    <img
                      className='h-auto w-60 rounded-lg'
                      src={urlPhoto}
                      alt=''
                    />
                    )
                  : (
                    <label
                      htmlFor={photoId}
                      className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
                    >
                      <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                        <svg
                          aria-hidden='true'
                          className='w-10 h-10 mb-3 text-gray-400'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                          />
                        </svg>
                        <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                          <span className='font-semibold'>Click para subir</span>{' '}
                          o arrastra y suelta
                        </p>
                        <p className='text-xs text-gray-500 dark:text-gray-400'>
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        id={photoId}
                        accept='image/png, image/jpeg'
                        type='file'
                        name='photo'
                        className='hidden'
                        required
                        onChange={fileHandler}
                      />
                    </label>
                    )}
              </div>

              <button
                type='submit'
                className='inline-flex capitalize text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
              >
                registrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
