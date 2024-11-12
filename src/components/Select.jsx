import { useId } from 'react'
import PropTypes from 'prop-types'

export default function Select ({ name, text, options }) {
  const elementID = useId()

  return (
    <div className='relative z-0 w-full mb-6 group'>
      <label htmlFor={elementID} className='sr-only'>
        Underline select
      </label>
      <select
        id={elementID}
        name={name}
        required
        className='block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer'
      >
        <option value=''>{text}</option>
        {options.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
    </div>
  )
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape).isRequired
}
