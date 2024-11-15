import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FormStudent from './components/FormStudent'
import ErrorPage from './ErrorPage'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import GradosPages from './pages/GradosPages'
import PrivateRoot from './routes/PrivateRoot'
import PublicRoot from './routes/PublicRoot'
import { AuthProvider } from './context/AuthProvider'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<PublicRoot />}>
            <Route path='/' element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup />} />
          </Route>
          <Route element={<ProtectedRoute><PrivateRoot /></ProtectedRoute>}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='register-student' element={<FormStudent />} />
            <Route path='grades' element={<GradosPages />} />
          </Route>
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
