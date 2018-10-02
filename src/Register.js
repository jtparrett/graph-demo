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
  mutation (
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $avatar: String!
  ){
    signupUser(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      avatar: $avatar
    ) {
      token
    }
  }
`

const Register = ({classes, history, onCompleted}) => (
  <Paper className={classes.paper}>
    <Mutation mutation={mutation} onCompleted={onCompleted(history)}>
      {(register, {loading, error}) => {
        return (
          <div>
            <Typography gutterBottom variant="headline">Register</Typography>

            { error &&
              <React.Fragment>
                { error.graphQLErrors.map((err, i) => (
                  <Typography key={i} variant="body1" color="error">{err.functionError}</Typography>
                ))}
              </React.Fragment>
            }

            <form onSubmit={(e) => {
              e.preventDefault()
              const {email, password, firstName, lastName, avatar} = e.target
              register({ 
                variables: { 
                  email: email.value, 
                  password: password.value,
                  firstName: firstName.value,
                  lastName: lastName.value,
                  avatar: avatar.value
                }
              })
            }}>
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input id="email" name="email" autoComplete="email" autoFocus />
              </FormControl>

              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input name="password" type="password" id="password" autoComplete="current-password" />
              </FormControl>

              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="firstName">First Name</InputLabel>
                <Input id="firstName" name="firstName" autoComplete="firstName" />
              </FormControl>

              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="lastName">Last Name</InputLabel>
                <Input id="lastName" name="lastName" autoComplete="lastName" />
              </FormControl>

              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="avatar">Avatar URL</InputLabel>
                <Input id="avatar" name="avatar" autoComplete="avatar" />
              </FormControl>

              <ProgressButton loading={loading} variant="raised" color="primary">Register</ProgressButton>
            </form>
          </div>
        )
      }}
    </Mutation>
  </Paper>
)

const mapDispatchToProps = (dispatch) => ({
  onCompleted: (history) => (data) => {
    dispatch(loginUser(data.signupUser.token))
    history.replace('/')
  }
})

export default compose(
  connect(null, mapDispatchToProps),
  withStyles(styles)
)(Register)