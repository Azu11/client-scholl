import React from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios'
import { API_URL } from './config/index.js'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx'

axios.defaults.baseURL = API_URL

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App />
  </AuthProvider>
)
