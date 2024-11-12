import { useState, useEffect } from 'react'

export function useRemenber () {
  const [userStorage, setUserStorage] = useState({
    user: '',
    password: ''
  })

  const addUserStorage = ({ user, password }) => {
    localStorage.setItem('user', user)
    localStorage.setItem('password', password)
  }

  useEffect(() => {
    const user = localStorage.getItem('user')
    const password = localStorage.getItem('password')
    if (user && password) {
      setUserStorage({
        user,
        password
      })
    }
  }, [])

  return { userStorage, addUserStorage }
}
