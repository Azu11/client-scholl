export default function Footer () {
  return (
    <footer className='p-4 mt-auto bg-white border-t border-gray-200 shadow flex items-center justify-around dark:bg-gray-800 dark:border-gray-600'>
      <span className='text-sm text-gray-500 sm:text-center dark:text-gray-400'>
        Hecho con ❤️ por
        <a
          href='https://github.com/Dairo01001'
          target='_blank'
          className='hover:underline'
          rel='noreferrer'
        >
          {' Angie Ortiz '}
        </a>
        © 2024
      </span>
    </footer>
  )
}
