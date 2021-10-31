/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    height: '100px',
    justifyContent: 'space-between'
  },
  toolbarTitle: {
    flex: 1
  },
  toolbarSecondary: {
    overflowX: 'auto'
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0
  }
}));

export default function Header(props) {
  const classes = useStyles();

  return (
    <>
      <Toolbar className={classes.toolbar}>
        <img
          src="/static/images/futurelogo.png"
          alt="fue"
          style={{ maxWidth: '100%', maxHeight: '100%', display: 'block' }}
        />

        <Button variant="outlined" size="small">
          Sign in
        </Button>
      </Toolbar>
    </>
  );
}
