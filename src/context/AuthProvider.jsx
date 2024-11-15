// context/AuthProvider.jsx
import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import useUserStore from '../store/state/useUserStore'
import { AuthContext } from './AuthContext'

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()
  const { token } = useUserStore()

  useEffect(() => {
    const checkAuth = () => {
      const publicRoutes = ['/login', '/register']
      if (!token && !publicRoutes.includes(location.pathname)) {
        navigate('/login')
      }
      setLoading(false)
    }

    checkAuth()
  }, [token, navigate, location])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <AuthContext.Provider value={{ token }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
}
