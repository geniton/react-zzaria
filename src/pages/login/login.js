import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import firebase from 'firebase/app'
import 'firebase/auth'
import { Button, Grid } from '@material-ui/core'
import { ReactComponent as mainLogo } from 'images/logo-react-zzaria.svg'

const firebaseConfig = {
  apiKey: "AIzaSyA1ohK3cQRZ6FsgeHGMTruGAZ661nke_14",
  authDomain: "reactzzaria-d2171.firebaseapp.com",
  databaseURL: "https://reactzzaria-d2171.firebaseio.com",
  projectId: "reactzzaria-d2171",
  storageBucket: "reactzzaria-d2171.appspot.com",
  messagingSenderId: "165555498351",
  appId: "1:165555498351:web:d1341bf8b75dfef8164c9a",
  measurementId: "G-SQXW7TE013"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const login = () => {
  const provider = new firebase.auth.GithubAuthProvider();
  firebase.auth().signInWithRedirect(provider);
}

function Login () {
  const [userInfo,setUserInfo] = useState({
    isLogged: false,
    user: null
  })

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUserInfo({
        isLogged: !!user,
        user
      })
    })
  },[])

  const logout = () => {
    firebase.auth().signOut().then(() => {
      setUserInfo({
        isLogged: false,
        user    : null
      })
    })
  }

  const { user, isLogged } = userInfo

  return (
    <>
      <Container>
        <Grid container justify='center' spacing={40} >
          <Grid item>
            <Logo />
          </Grid>

          { isLogged && (
            <>
              <pre>{user.displayName}</pre>
              <GitHubButton onClick={() => logout()}> Sair </GitHubButton>
            </>
          )}

          { !isLogged && (
            <Grid item xs={12} container justify='center'>
              <GitHubButton onClick={() => login()}>
                Entrar com GitHub
              </GitHubButton>
            </Grid>
          )}

        </Grid>
      </Container>
    </>
  )
}

const Container = styled.div`
  padding: 20px;
  max-width: 470px;
  margin: 0 auto;
`
const Logo = styled(mainLogo)`
  width: 100%;
`
const GitHubButton = styled(Button).attrs({
  variant: 'contained',
  fullWidth: true
})`
  font-size: 25px;
  padding: 15px;
  text-transform: none;
}`

export default Login

