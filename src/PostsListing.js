import React from 'react'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'
import {Link} from 'react-router-dom'

import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Avatar from '@material-ui/core/Avatar'

const styles = {
  media: {
    height: 200
  },
  progress: {
    margin: '0 auto',
    display: 'block'
  },
  body: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  }
}

const PostsListing = ({classes}) => (
  <Query query={gql`
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
  `}>
    {({loading, error, data}) => {
      if (loading) return (
        <CircularProgress size={50} className={classes.progress} />
      )

      if (error) return <p>Error :(</p>

      return (
        <Grid container spacing={16}>
          {data.allPosts.map((post) => (
            <Grid item key={post.id} xs={12} sm={6} md={4}>
              <Link to={`/posts/${post.id}`}>
                <Card>
                 <CardHeader
                    avatar={<Avatar src={post.author.avatar} />}
                    title={`${post.author.firstName} ${post.author.lastName}`}
                    subheader={post.createdAt}
                  />
                  <CardMedia image={post.image} className={classes.media} />
                  <CardContent>
                    <Typography variant="headline" gutterBottom>{post.title}</Typography>
                    <Typography component="p" className={classes.body}>{post.body}</Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      )
    }}
  </Query>
)

export default withStyles(styles)(PostsListing)