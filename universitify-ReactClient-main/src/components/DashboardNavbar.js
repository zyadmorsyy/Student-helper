/* eslint-disable no-unused-vars */
import { useContext, useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Button,
  Hidden,
  IconButton,
  Toolbar
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from '../API/auth';
import NotificationPopUp from './notification/notificationPopUp';

const useStyles = makeStyles((theme) => ({
  appBar: {
    height: '100px',
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}));
const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setNotifications(user.notifications ? user.notifications : []);
  });

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AppBar
      position="sticky"
      className={classes.appBar}
      elevation={0}
      color="inherit"
      {...rest}
    >
      <Toolbar>
        <img
          src="/static/images/futurelogo.png"
          alt="fue"
          style={{ maxWidth: '100%', maxHeight: '100%', display: 'block' }}
        />
        <Box sx={{ flexGrow: 1 }} />

        <Hidden lgDown>
          <NotificationPopUp notifications={notifications} />
          <Button onClick={() => logout()} color="inherit" variant="contained">
            <Box paddingRight={2}> log out</Box>
            <InputIcon />
          </Button>
        </Hidden>

        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
          <NotificationPopUp notifications={notifications} />
          <Button onClick={() => logout()} color="inherit" variant="contained">
            <InputIcon />
          </Button>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;
