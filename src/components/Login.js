import React from 'react'
import styled from 'styled-components'

import { signInWithPopup} from 'firebase/auth'
import { provider, auth } from '../firebase/firebaseConfig'


const Login = () => {

  const iniciador = () => {
    signInWithPopup(auth, provider)
  }

  return (
    <Container>
      <button onClick={() => iniciador()}>Login with google</button>
    </Container>
  )
}

export default Login

const Container = styled.div`
  height: 100%;
  width: 100%; 
  display: flex;
  justify-content: center;
  align-items: center;
`