/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-wrap-multilines */
import { useState, useEffect, useContext } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControlLabel,
  Grid,
  Link,
  MenuItem,
  Snackbar,
  Switch,
  TextField
} from '@material-ui/core';
import { createOne, updateCoursePrerequisites } from 'src/API/courseAPI';
import { getAllSuperVisors } from 'src/API/superVisorAPI';
import { getAllMajors } from 'src/API/majorAPI';
import AlertDialog from '../AlertDialog';
import AddMajor from '../major/AddMajor';
import { UserContext } from '../../API/auth';

const AddCourse = (props) => {
  const { user } = useContext(UserContext);
  const [values, setValues] = useState({ minorId: null, majorId: null });
  const [open, setOpen] = useState(false);
  const [instructors, setInstructors] = useState([]);
  const [majors, setMajors] = useState([]);
  const [types] = useState([
    { id: 'majorElective', name: 'Major Elective' },
    { id: 'majorRequirment', name: 'Major Requirment' },
    { id: 'universityRequirment', name: 'University Requirment' },
    { id: 'facultyRequirment', name: 'Faculty Requirment' },
    { id: 'universityElective', name: 'University Elective' }
  ]);
  useEffect(async () => {
    const instructorsData = await getAllSuperVisors();
    setInstructors(instructorsData);
  }, []);
  useEffect(async () => {
    const majorsData = await getAllMajors();
    setMajors(majorsData);
  }, []);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
      [event.target.name === 'minorId' && event.target.name]: event.target
        .checked
        ? values.majorId
        : null,
      isElective: values.type === 'majorElective',
      coordinatorId: user.id
    });
  };

  const handleAdd = async () => {
    const newCourse = await createOne({ ...values });
    console.log(values);

    await updateCoursePrerequisites(newCourse.id, {
      prerequisites: values.prerequisites && values.prerequisites.split(',')
    });
    setOpen(true);
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
        <CardHeader subheader="" title="Add New Course" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the Course title"
                label="Title"
                name="name"
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="discreption"
                name="discreption"
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                select
                label="major"
                fullWidth
                name="majorId"
                onChange={handleChange}
                helperText={
                  <Link
                    component={AlertDialog}
                    buttonText="Add Major"
                    data={<AddMajor />}
                  />
                }
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
                label="type"
                fullWidth
                name="type"
                onChange={handleChange}
              >
                {types.map((majorData) => (
                  <MenuItem key={majorData.id} value={majorData.id}>
                    {majorData.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Level"
                name="level"
                onChange={handleChange}
                type="number"
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="credits "
                name="credit"
                onChange={handleChange}
                type="number"
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Course Code"
                name="courseCode"
                onChange={handleChange}
                required
                variant="outlined"
                helperText="ex: MIS86 "
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                select
                label="instructor"
                name="instructorId"
                onChange={handleChange}
                helperText="Please select course instructor"
              >
                {instructors.map((instructorData) => (
                  <MenuItem key={instructorData.id} value={instructorData.id}>
                    {` DR. ${instructorData.fname} ${instructorData.lname}`}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="prerequisites"
                name="prerequisites"
                onChange={handleChange}
                required
                variant="outlined"
                helperText="enter course code seperated by comma  ex: MIS86,MIS89 "
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={!!values.minorId}
                    onChange={handleChange}
                    name="minorId"
                    color="primary"
                  />
                }
                label="available for minor students ?"
              />
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
          <Button color="primary" variant="contained" onClick={handleAdd}>
            Add
          </Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              success: course created
            </Alert>
          </Snackbar>
        </Box>
      </Card>
    </form>
  );
};

export default AddCourse;
