import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'
import MainPage from 'pages/main'
import Login from 'pages/login'

function App () {
  return (
    <>
      <CssBaseline/>
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/' component={MainPage} />
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
