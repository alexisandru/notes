import React, {useState, useEffect} from 'react'

import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/firebaseConfig'

import Home from './components/Home'
import Login from './components/Login'

function App() {

  const [user, setUser] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) { 
          console.log(user)
          setUser(prev => user)
        } else {
          setUser(prev => false)     
        }
    })
  }, [])

  return (
    <div>
    {
      user ? <Home/> : <Login/>
    }
    </div>
  );
}

export default App;
