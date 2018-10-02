import React from 'react'
import {Mutation} from 'react-apollo'
import gql from 'graphql-tag'
import {compose, branch, renderComponent} from 'recompose'
import {connect} from 'react-redux'

import Login from './Login'

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
    width: 600,
    margin: '0 auto'
  }
})

const mutation = gql`
  mutation ($title: String!, $image: String!, $body: String!, $authorId: ID!){
    createPost(
      title: $title
      image: $image
      body: $body
      authorId: $authorId
    ) {
      id
      title
      image
    }
  }
`

const onCompleted = (history) => (data) => {
  history.push('/')
}

const query = gql`
  {
    allPosts(orderBy: createdAt_DESC) {
      id
      title
      image
      body
      createdAt
      author {
        firstName
        lastName
        avatar
      }
    }
  }
`

const Create = ({classes, history, userId}) => (
  <Paper className={classes.paper}>
    <Mutation mutation={mutation} onCompleted={onCompleted(history)} refetchQueries={[{ query }]}>
      {(create, {loading, error}) => {
        return (
          <div>
            <Typography variant="headline">Create</Typography>

            { error &&
              <React.Fragment>
                { error.graphQLErrors.map((err, i) => (
                  <Typography key={i} variant="body1" color="error">{err.message}</Typography>
                ))}
              </React.Fragment>
            }

            <form onSubmit={(e) => {
              e.preventDefault()
              const {title, image, body} = e.target
              create({ variables: { 
                title: title.value, 
                image: image.value, 
                body: body.value,
                authorId: userId
              }})
            }}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="title">Title</InputLabel>
                <Input id="title" name="title" autoFocus />
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="image">Image URL</InputLabel>
                <Input id="image" name="image" />
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="body">Body</InputLabel>
                <Input id="body" name="body" multiline />
              </FormControl>

              <ProgressButton type="submit" variant="raised" color="primary" loading={loading}>Create</ProgressButton>
            </form>
          </div>
        )
      }}
    </Mutation>
  </Paper>
)

const mapStateToProps = ({auth}) => ({
  ...auth
})

export default compose(
  connect(mapStateToProps),
  branch(
    (props) => !props.token,
    renderComponent(Login)
  ),
  withStyles(styles)
)(Create)