import { useState, useContext, useEffect } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  MenuItem,
  Snackbar,
  TextField
} from '@material-ui/core';
import { createOne } from 'src/API/studentAPI';
import { getAllMajors } from 'src/API/majorAPI';
import { getAllSuperVisors } from 'src/API/superVisorAPI';
import { UserContext } from '../../API/auth';

const AddStudent = (props) => {
  const [values, setValues] = useState({});
  const [open, setOpen] = useState(false);
  const [supervisors, setSupervisors] = useState([]);
  const [majors, setMajors] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(async () => {
    const majorsData = await getAllMajors();
    setMajors(majorsData);
  }, []);
  useEffect(async () => {
    const supervisorsData = await getAllSuperVisors();
    setSupervisors(supervisorsData);
  }, []);
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
      coordinatorId: user.id
    });
  };
  // const handleSelectMajor = (event) => {
  //   setMajor(event.target.value);
  // };
  const handleAdd = () => {
    createOne({ ...values }).then(() => {
      console.log(values);
      setOpen(true);
    });
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardHeader
          subheader="The information can not be edited by student"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="First name"
                name="fname"
                required
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Last name"
                name="lname"
                required
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                required
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                select
                label="Gender"
                name="gender"
                onChange={handleChange}
                fullWidth
              >
                {['MALE', 'FEMALE'].map((gender) => (
                  <MenuItem key={gender} value={gender}>
                    {gender}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                select
                label="major"
                fullWidth
                name="majorId"
                onChange={handleChange}
                helperText="Please select student major"
              >
                {majors.map((majorData) => (
                  <MenuItem key={majorData.id} value={majorData.id}>
                    {majorData.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                select
                label="minor"
                name="minorId"
                onChange={handleChange}
                helperText="Please select student minor"
              >
                {majors.map((majorData) => (
                  <MenuItem key={majorData.id} value={majorData.id}>
                    {majorData.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                select
                label="Academic Advisor"
                name="supervisorId"
                onChange={handleChange}
                helperText="Please select student Academic Advisor"
              >
                {supervisors.map((supervisorData) => (
                  <MenuItem key={supervisorData.id} value={supervisorData.id}>
                    {` DR. ${supervisorData.fname} ${supervisorData.lname}`}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
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
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button color="primary" variant="contained" onClick={handleAdd}>
            Add
          </Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              success: Student created
            </Alert>
          </Snackbar>
        </Box>
        <Divider />
      </Card>
    </form>
  );
};

export default AddStudent;
