import { Link } from 'react-router-dom'
import icon from '../assets/images/logo.png'

export default function Logo () {
  return (
    <Link
      to='/'
      className='flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white'
    >
      <img className='w-12 mr-2' src={icon} alt='logo' />
      <span>My School</span>
    </Link>
  )
}
