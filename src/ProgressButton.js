import React from 'react'

import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = (theme) => ({
  wrapper: {
    marginTop: theme.spacing.unit * 3,
    position: 'relative'
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
})

const ProgressButton = ({loading, classes, children, ...props}) => (
  <div className={classes.wrapper}>
    <Button type="submit" disabled={loading} fullWidth {...props}>{children}</Button>
    {loading &&
      <CircularProgress size={24} className={classes.buttonProgress} />
    }
  </div>
)

export default withStyles(styles)(ProgressButton)