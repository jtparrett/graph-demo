import React from 'react'
import {Link} from 'react-router-dom'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'

import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Avatar from '@material-ui/core/Avatar'
import Paper from '@material-ui/core/Paper'

const query = gql`
  query($id: ID!){
    Post(id: $id) {
      id
      title
      body
      image
      author {
        firstName
        lastName
        avatar
      }
    }
  }
`

const styles = (theme) => ({
  progress: {
    margin: '0 auto',
    display: 'block'
  },
  banner: {
    height: 300,
    marginBottom: theme.spacing.unit * 4
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block'
  }
})

const PostsDetail = ({classes, match}) => (
  <Query query={query} variables={{id: match.params.id }}>
    {({loading, error, data}) => {
      if (loading) return (
        <CircularProgress size={50} className={classes.progress} />
      )

      if (error) return <p>Error :(</p>

      return (
        <div>
          <Paper className={classes.banner}>
            <img src={data.Post.image} className={classes.image} />
          </Paper>
          <Avatar src={data.Post.author.avatar} />
          <Typography variant="body1">{data.Post.author.firstName} {data.Post.author.lastName}</Typography>
          <Typography gutterBottom variant="display2">{data.Post.title}</Typography>
          <Typography paragraph>{data.Post.body}</Typography>
          <Button variant="contained" color="secondary" component={Link} to="/">Return to Posts</Button>
        </div>
      )
    }}
  </Query>
)

export default withStyles(styles)(PostsDetail)