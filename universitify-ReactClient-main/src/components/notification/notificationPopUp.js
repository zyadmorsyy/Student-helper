/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Badge, Box, IconButton } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import NotificationList from './notificationList';

export default function NotificationPopUp({ ...props }) {
  const [notifications, setNotifications] = useState(props.notifications);
  // useEffect(() => {
  //   setNotifications(props.notifications);
  //   console.log(notifications);
  // }, []);
  const handleUpdateNotification = (id) => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        status: notification.id === id ? 1 : notification.status
      }))
    );
  };
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <IconButton
            color="inherit"
            style={{ marginRight: '10px' }}
            {...bindTrigger(popupState)}
          >
            <Badge
              badgeContent={
                notifications.filter(
                  (notification) => notification.status === 0
                ).length
              }
              color="secondary"
              variant="standard"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
          >
            <Box p={2}>
              <NotificationList
                notifications={notifications}
                handleUpdateNotification={(id) => handleUpdateNotification(id)}
              />
            </Box>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}
