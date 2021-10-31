/* eslint-disable no-nested-ternary */
/* eslint-disable operator-linebreak */
/* eslint-disable indent */
// eslint-disable-next-line camelcase

import { useEffect, useContext } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography
} from '@material-ui/core';
import CardMembershipIcon from '@material-ui/icons/CardMembership';
import AssignmentIcon from '@material-ui/icons/Assignment';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import NavItem from './NavItem';
import { UserContext } from '../API/auth';

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const items =
    user && user.role === 'student'
      ? [
          {
            href: `/app/student/${user.id}/account`,
            icon: AccountCircleIcon,
            title: 'Profile'
          },
          {
            href: '/app/semesters/registration',
            icon: LibraryAddIcon,
            title: 'Registration'
          },
          {
            href: `/app/student/${user.id}/Courses`,
            icon: CardMembershipIcon,
            title: 'Courses result'
          },
          {
            href: `/app/student/${user.id}/CurrentCourses`,
            icon: CardMembershipIcon,
            title: 'Enrolled Courses'
          },
          {
            href: `/app/student/${user.id}/enrollments`,
            icon: LibraryBooksIcon,
            title: 'Enrollments'
          },
          {
            href: '/app/planahead',
            icon: AssignmentIcon,
            title: 'Plan Ahead'
          }
        ]
      : user && user.role === 'supervisor'
      ? [
          {
            href: `/app/supervisor/${user.id}/account`,
            icon: AccountCircleIcon,
            title: 'Profile'
          },
          {
            href: '/app/students',
            icon: PeopleAltIcon,
            title: 'Review Students'
          },
          {
            href: '/app/courses',
            icon: CardMembershipIcon,
            title: 'Manage Courses'
          },
          // {
          //   href: '/app/enrollments',
          //   icon: LibraryBooksIcon,
          //   title: 'Enrollments'
          // },
          {
            href: '/app/supervisors',
            icon: SupervisorAccountIcon,
            title: 'Academic Advisors'
          }
        ]
      : [
          {
            href: `/app/coordinator/${user.id}/account`,
            icon: AccountCircleIcon,
            title: 'Profile'
          },

          {
            href: '/app/semesters',
            icon: PeopleAltIcon,
            title: 'Semesters'
          },
          {
            href: '/app/students',
            icon: PeopleAltIcon,
            title: 'Students list'
          },
          {
            href: '/app/course/add',
            icon: CardMembershipIcon,
            title: 'Add Course '
          },
          {
            href: '/app/supervisor/add',
            icon: SupervisorAccountIcon,
            title: 'Add Academic Advisor'
          },
          {
            href: '/app/coordinator/add',
            icon: SupervisorAccountIcon,
            title: 'Add Co-ordinator'
          }
        ];
  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyItems: 'center',
          p: 2,
          gap: 1
        }}
      >
        <Avatar
          component={RouterLink}
          src={user.avatar}
          variant="circular"
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
          to="/"
        />
        <Typography color="textPrimary" variant="h4">
          {!!user && user.role === 'supervisor'
            ? `DR. ${user.fname} ${user.lname}`
            : ` ${user.fname} ${user.lname}`}
        </Typography>
        {!!user && user.role === 'student' && (
          <Typography color="GrayText" variant="h6">
            {`level ${!!user && user.level}`}
          </Typography>
        )}
      </Box>
      <Divider />
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyItems: 'center',
          p: 2,
          gap: 1
        }}
      >
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          style={{ overflow: 'auto' }}
          anchor="left"
          variant="persistent"
          open
          PaperProps={{
            sx: {
              width: 256,
              top: 100,
              height: '100%',
              position: 'fixed'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default DashboardSidebar;
