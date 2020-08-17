import React from 'react'
import { Route, Switch } from 'react-router-dom'

function Main () {
  const router = [
    {
      path: '/rota1',
      content: 'rota 1'
    },
    {
      path: '/rota2',
      content: 'rota 2'
    }
  ]

  return (
    <>
      <p>mainPage</p>
    <Switch>
      {router.map(r => {
        return <Route
                path={r.path}
                render={() => r.content}
                key={r.path}
              />
      })}
    </Switch>
  </>
  )
}

export default Main
