import { useState, useContext } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField
} from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';

import { updateStudentPassword } from '../../API/studentAPI';
import { updateSupervisorPassword } from '../../API/superVisorAPI';
import { UserContext } from '../../API/auth';

const SettingsPassword = (props) => {
  const { user } = useContext(UserContext);

  const [values, setValues] = useState({
    password: '',
    confirm: ''
  });
  const [open, setOpen] = useState(false);
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  const handleChangePassword = () => {
    if (user && user.role === 'student') {
      updateStudentPassword(user.id, values.password);
    } else {
      updateSupervisorPassword(user.id, values.password);
    }
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <form {...props}>
      <Card>
        <CardHeader subheader="Update password" title="Password" />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirm password"
            margin="normal"
            name="confirm"
            onChange={handleChange}
            type="password"
            value={values.confirm}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={handleChangePassword}
          >
            Update
          </Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              success: Password Changed
            </Alert>
          </Snackbar>
        </Box>
      </Card>
    </form>
  );
};

export default SettingsPassword;
