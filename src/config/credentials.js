// src/config/credentials.js
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyChqF0zUXSbCe2obcE2gJBN5S1jRkO3YlI',
  authDomain: 'sig-archives-dc939.firebaseapp.com',
  projectId: 'sig-archives-dc939',
  storageBucket: 'sig-archives-dc939.appspot.com',
  messagingSenderId: '210079584789',
  appId: '1:210079584789:web:cd74b75ae4ef387ae4f41c'
}

const appFirebase = initializeApp(firebaseConfig)

export default appFirebase
