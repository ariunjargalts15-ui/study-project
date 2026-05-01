import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey:            'AIzaSyDhQsXhjtBOsn-SRmF7Pt45EFjAS0o-cX8',
  authDomain:        'studyaitools-b79a1.firebaseapp.com',
  projectId:         'studyaitools-b79a1',
  storageBucket:     'studyaitools-b79a1.firebasestorage.app',
  messagingSenderId: '213207064625',
  appId:             '1:213207064625:web:0f853ec54f6ed66d4b3510',
  measurementId:     'G-RH6DC38YXX',
}

export const app      = initializeApp(firebaseConfig)
export const auth     = getAuth(app)
export const provider = new GoogleAuthProvider()
