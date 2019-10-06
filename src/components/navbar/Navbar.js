import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';

const styles = {
  root: {
    flexGrow: 1,

  },
  grow: {
    flexGrow: 1,
  },
  navbar: {
    backgroundColor: green[500],
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  fontSize:30
};

function ButtonAppBar(props) {
  const { classes } = props;

  function check () {
    window.location.reload(false)
  }
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <Typography variant="h5" color="inherit" className={classes.grow}>
            <Button  color="inherit" onClick={check} size="large">
              RHOTEL
            </Button>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
