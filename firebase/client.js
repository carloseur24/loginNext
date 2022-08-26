import {
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth"
import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyA0O6plClUIi9EVyqBgaENoPdCmj-d3rJE",
  authDomain: "logindev-3e87b.firebaseapp.com",
  projectId: "logindev-3e87b",
  storageBucket: "logindev-3e87b.appspot.com",
  messagingSenderId: "25792445620",
  appId: "1:25792445620:web:08b544a7c8e75f681cebe1",
  measurementId: "G-CRFYZNWY5Q",
}

initializeApp(firebaseConfig)

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL } = user
  return {
    avatar: photoURL,
    userName: displayName,
    email,
  }
}

const loginWithGitHub = () => {
  const githubProvider = new GithubAuthProvider()
  githubProvider.setCustomParameters(firebaseConfig)
  const auth = getAuth()
  return signInWithPopup(auth, githubProvider)
}

const onAuthStateChange = (onChange) => {
  const auth = getAuth()
  return onAuthStateChanged(auth, (user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null
    onChange(normalizedUser)
  })
}

const data = async ({ email, avatar, name }) => {
  const body = { name, email }
  return await fetch("/api/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
}

module.exports = {
  
  data,
  loginWithGitHub,
  onAuthStateChange,
}
