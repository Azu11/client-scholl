import { createContext, useState } from 'react'
import PropTypes from 'prop-types'
import { loginService } from '../services/login'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuth, setIsAuth] = useState(false)

  const login = async ({ user, password }) => {
    try {
      const data = await loginService({ user, password })
      setUser(data)
      setIsAuth(true)
      return data
    } catch (err) {
      throw new Error(err.message)
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuth(false)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
}
