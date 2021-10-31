/* eslint-disable no-unused-expressions */
import { useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography
} from '@material-ui/core';
import { getStudent } from 'src/API/studentAPI';
import { getSuperVisor } from 'src/API/superVisorAPI';
import { getCoordinator } from 'src/API/coordinatorAPI';
import { currentUser, login, UserContext } from '../API/auth';

const Login = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const { user, setUser } = useContext(UserContext);

  return (
    <>
      <Helmet>
        <title>Login </title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: 'user@future.edu',
              password: 'Password'
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={async (event) => {
              try {
                const token = await login(event.email, event.password);
                localStorage.setItem('token', token);
                const currentuser = currentUser();
                setUser(currentuser);
                if (currentuser && currentuser.role === 'student') {
                  await getStudent(currentuser.id).then((userData) => {
                    setUser(userData);
                  });
                } else if (currentuser && currentuser.role === 'supervisor') {
                  await getSuperVisor(currentuser.id).then((userData) => {
                    setUser(userData);
                  });
                } else if (currentuser && currentuser.role === 'coordinator') {
                  await getCoordinator(currentuser.id).then((userData) => {
                    setUser(userData);
                  });
                }
                navigate(`/app/${currentuser.role}/${currentuser.id}/account`);
              } catch (error) {
                alert('wrong email or password');
                console.error(error);
              }
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography color="textPrimary" variant="h2">
                    Sign in
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Sign into the uniersity platform
                  </Typography>
                </Box>

                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  placeholder={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Login;
