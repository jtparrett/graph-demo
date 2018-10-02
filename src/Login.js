import React from 'react'
import {Mutation} from 'react-apollo'
import gql from 'graphql-tag'
import {connect} from 'react-redux'
import {compose} from 'recompose'

import {loginUser} from './actions/auth'

import {withStyles} from '@material-ui/core/styles'
import ProgressButton from './ProgressButton'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'

const styles = (theme) => ({
  paper: {
    padding: theme.spacing.unit * 4,
    width: 400,
    margin: '0 auto'
  }
})

const mutation = gql`
  mutation ($email: String!, $password: String!){
    authenticateUser(
      email: $email
      password: $password
    ) {
      token
    }
  }
`

const Login = ({classes, history, onCompleted}) => (
  <Paper className={classes.paper}>
    <Mutation mutation={mutation} onCompleted={onCompleted(history)}>
      {(login, {loading, error}) => {
        return (
          <div>
            <Typography gutterBottom variant="headline">Sign in</Typography>

            { error &&
              <React.Fragment>
                { error.graphQLErrors.map((err, i) => (
                  <Typography key={i} variant="body1" color="error">{err.functionError}</Typography>
                ))}
              </React.Fragment>
            }

            <form onSubmit={(e) => {
              e.preventDefault()
              const {email, password} = e.target
              login({ variables: { email: email.value, password: password.value } })
            }}>
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input id="email" name="email" autoComplete="email" autoFocus />
              </FormControl>

              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input name="password" type="password" id="password" autoComplete="current-password" />
              </FormControl>

              <ProgressButton loading={loading} variant="raised" color="primary">Sign In</ProgressButton>
            </form>
          </div>
        )
      }}
    </Mutation>
  </Paper>
)

const mapDispatchToProps = (dispatch) => ({
  onCompleted: (history) => (data) => {
    dispatch(loginUser(data.authenticateUser.token))

    if(window.location.pathname === '/login'){
      history.replace('/')
    }
  }
})

export default compose(
  connect(null, mapDispatchToProps),
  withStyles(styles)
)(Login)