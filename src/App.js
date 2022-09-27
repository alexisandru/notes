import React, {useState, useEffect} from 'react'

import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/firebaseConfig'

import Home from './components/Home'
import Login from './components/Login'

import {ThemeProvider} from 'styled-components'
import {GlobalStyles} from './components/globalStyle'
import {lightTheme, darkTheme} from './components/Theme'

function App() {

  const [user, setUser] = useState(false)

  const [theme, setTheme] = useState('light');
  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }

  useEffect(() => {
    const t = JSON.parse(localStorage.getItem("theme"))
    if (t) {
      setTheme(t)
    } 
  }, [])

  useEffect(() => {
  localStorage.setItem('theme', JSON.stringify(theme));
}, [theme]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) { 
          setUser(prev => user)
        } else {
          setUser(prev => false)     
        }
    })
  }, [])

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <div>
      {
        user ? <Home changeTheme={themeToggler} theme={theme}/> : <Login/>
      }
      </div>  
    </ThemeProvider>
  );
}

export default App;
