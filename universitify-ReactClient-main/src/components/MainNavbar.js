import { AppBar, Box, Toolbar } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  appBar: {
    height: '100px',
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}));
const MainNavbar = ({ ...rest }) => {
  const classes = useStyles();

  return (
    <AppBar
      position="fixed"
      className={classes.appBar}
      elevation={0}
      color="inherit"
      {...rest}
    >
      <Toolbar>
        <img
          src="https://s3-eu-west-1.amazonaws.com/forasna/uploads/logos/clogo_2018-03-13-13-39-07_XN4RHiEhyx3kwf5BduWR8gXX.png"
          alt="fue"
          style={{ maxWidth: '100%', maxHeight: '100%', display: 'block' }}
        />
        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
    </AppBar>
  );
};

export default MainNavbar;
