/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { IconButton, ListItemSecondaryAction, colors } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { UpdateNotification } from '../../API/notificationAPI';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: 'inline'
  }
}));

function NotificationList({ ...props }) {
  const classes = useStyles();
  const handleReadNotification = async (id, status) => {
    await UpdateNotification(id, status);
    props.handleUpdateNotification(id);
  };
  return (
    <List className={classes.root}>
      {props.notifications.map((notification) => (
        <React.Fragment key={notification.id}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="avatar" src={notification.data.avatar} />
              {/* TODO */}
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography
                  component="span"
                  variant="h5"
                  color={colors.red[600]}
                >
                  {notification.data.title}
                </Typography>
              }
              secondary={
                <Grid wrap="wrap">
                  <Typography
                    component="span"
                    variant="h5"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {notification.data.senderName}
                  </Typography>
                  <Typography
                    component="span"
                    variant="h6"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {` ${notification.data.text}`}
                  </Typography>
                  <Typography
                    component="div"
                    variant="body1"
                    color={colors.green[600]}
                  >
                    {notification.data.subText}
                  </Typography>
                  <Typography
                    component="div"
                    variant="body1"
                    color={colors.blue[600]}
                  >
                    Contact:
                  </Typography>
                  <Typography
                    component="div"
                    variant="body1"
                    color="textPrimary"
                  >
                    {notification.data.senderEmail}
                  </Typography>
                </Grid>
              }
            />
            {notification.status === 0 && (
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="read"
                  onClick={() => {
                    handleReadNotification(notification.id, { status: 1 });
                  }}
                >
                  <FiberManualRecordIcon
                    style={{ color: colors.lightBlue[700] }}
                  />
                </IconButton>
              </ListItemSecondaryAction>
            )}
          </ListItem>
          <Divider variant="fullWidth" component="li" />
        </React.Fragment>
      ))}
    </List>
  );
}
export default NotificationList;
