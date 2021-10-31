/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';

const CourseDetails = (props) => {
  const [values, setValues] = useState({
    courseTitle: 'introduction to computer',
    discreption: 'introduction to computer programing and operating system',
    code: 'CS50',
    instructor: 'adam ',
    credit: '3',
    level: '3',
    major: 'computer',
    prerequisites: 'cs31,cs41'
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardHeader subheader={`id ${props.id} `} title={values.courseTitle} />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="discreption"
                name="discreption"
                onChange={handleChange}
                required
                InputProps={{
                  readOnly: true
                }}
                value={values.discreption}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Major"
                name="Major"
                InputProps={{
                  readOnly: true
                }}
                onChange={handleChange}
                required
                value={values.major}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Level"
                name="Level"
                onChange={handleChange}
                type="number"
                value="1"
                variant="outlined"
                InputProps={{
                  readOnly: true
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="instructor"
                name="instructor"
                onChange={handleChange}
                required
                value={values.instructor}
                variant="outlined"
                InputProps={{
                  readOnly: true
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="credits "
                name="credit "
                onChange={handleChange}
                type="number"
                value={values.credit}
                variant="outlined"
                InputProps={{
                  readOnly: true
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="prerequisites"
                name="prerequisites"
                onChange={handleChange}
                required
                value={values.prerequisites}
                variant="outlined"
                InputProps={{
                  readOnly: true
                }}
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
          <Button color="primary" variant="contained" disabled>
            register
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default CourseDetails;
