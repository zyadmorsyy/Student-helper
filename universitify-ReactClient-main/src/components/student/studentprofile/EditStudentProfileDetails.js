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
import { useParams } from 'react-router';
import { getStudent, updateStudent } from 'src/API/studentAPI';
import { getAllMajors } from 'src/API/majorAPI';
import { getAllSuperVisors } from 'src/API/superVisorAPI';
import { UserContext } from 'src/API/auth';

const EditStudent = (props) => {
  const [values, setValues] = useState({});
  const [open, setOpen] = useState(false);
  const [supervisors, setSupervisors] = useState([]);
  const [majors, setMajors] = useState([]);
  const { user } = useContext(UserContext);
  const { id } = useParams();

  useEffect(async () => {
    const student = await getStudent(id);
    console.log(student);
    setValues({ ...student });
  }, []);
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
  const handleUpdate = () => {
    updateStudent(id, { ...values }).then(() => {
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
                value={values.fname}
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
                value={values.lname}
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
                value={values.email}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                select
                label="major"
                fullWidth
                name="majorId"
                onChange={handleChange}
                helperText="Please select student major"
                value={values.majorid}
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
                value={values.minorid}
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
          <Button color="primary" variant="contained" onClick={handleUpdate}>
            update
          </Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              success: Student updated
            </Alert>
          </Snackbar>
        </Box>
        <Divider />
      </Card>
    </form>
  );
};

export default EditStudent;
