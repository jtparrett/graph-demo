import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import {ApolloProvider} from 'react-apollo'
import {Provider} from 'react-redux'
import './main.css'
import store from './store'
import client from './apollo-client'

import Nav from './Nav'
import PostsListing from './PostsListing'
import Login from './Login'
import Register from './Register'
import PostsDetail from './PostsDetail'
import Create from './Create'

import {withStyles} from '@material-ui/core/styles'

const styles = (theme) => ({
  container: {
    padding: theme.spacing.unit * 5
  }
})

const App = ({classes}) => (
  <Provider store={store}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <React.Fragment>
          <Nav />

          <div className={classes.container}>
            <Route exact path="/" component={PostsListing} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/posts/:id" component={PostsDetail} />
            <Route path="/create" component={Create} />
          </div>
        </React.Fragment>
      </BrowserRouter>
    </ApolloProvider>
  </Provider>
)

export default withStyles(styles)(App)