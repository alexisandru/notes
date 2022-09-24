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
      <Title>Notes App</Title>
      <Button onClick={() => iniciador()}>Login with Google</Button>
    </Container>
  )
}

export default Login

const Container = styled.div`
  height: 100%;
  width: 100%; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Title = styled.h1`
  margin-bottom: 15px;
  font-size: 2.2em;
`

const Button = styled.button`
  font-size: 1.2em;
  padding: 15px 20px;
  border-radius: 10px;
  font-weight: 600;
`