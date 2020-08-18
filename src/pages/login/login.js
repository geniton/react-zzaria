import React, { PureComponent } from 'react'
import styled from 'styled-components'
import firebase from 'firebase/app'
import 'firebase/auth'
import { Button, Grid } from '@material-ui/core'
import { ReactComponent as mainLogo } from 'images/logo-react-zzaria.svg'

var firebaseConfig = {
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

class Login extends PureComponent {
  state = {
    isLogged: false,
    user    : null
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        user,
        isLogged: !!user
      })
    })
  }

  login = () => {
    var provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }

  logout = () => {
    firebase.auth().signOut().then(() => {
      this.setState({
        user    : null,
        isLogged: false
      })
    })
  }

  render () {
    const { isLogged, user} = this.state
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
                <GitHubButton onClick={() => this.logout()}> Sair </GitHubButton>
              </>
            )}

            { !isLogged && (
              <Grid item xs={12} container justify='center'>
                <GitHubButton onClick={() => this.login()}>
                  Entrar com GitHub
                </GitHubButton>
              </Grid>
            )}

          </Grid>
        </Container>
      </>
    )
  }
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
