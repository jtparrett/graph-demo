import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'recompose'
import {Link} from 'react-router-dom'

import {logoutUser} from './actions/auth'

import {withStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'

const styles = (theme) => ({
  grow: {
    flexGrow: 1,
  },
  createIcon: {
    position: 'fixed',
    bottom: theme.spacing.unit * 3,
    right: theme.spacing.unit * 3
  },
  appBarSpacer: theme.mixins.toolbar
})

const Nav = ({token, classes, logout}) => (
  <React.Fragment>
    <AppBar>
      <Toolbar>
        <Typography component={Link} to="/" variant="title" color="inherit" className={classes.grow}>Graph Demo</Typography>
        {token ? (
          <Button onClick={logout} color="inherit">Logout</Button>
        ) : (
          <React.Fragment>
            <Button component={Link} to="/login" color="inherit">Login</Button>
            <Button component={Link} to="/register" color="inherit">Register</Button>
          </React.Fragment>
        )}
      </Toolbar>
    </AppBar>

    <div className={classes.appBarSpacer} />

    {token &&
      <Button variant="fab" color="secondary" aria-label="Edit" component={Link} to="/create" className={classes.createIcon}>
        <Icon>edit_icon</Icon>
      </Button>
    }
  </React.Fragment>
)

const mapStateToProps = ({auth}) => ({
  token: auth.token
})

const mapDispatchToProps = (dispatch) => ({
  logout: () => {
    dispatch(logoutUser())
  }
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(Nav)