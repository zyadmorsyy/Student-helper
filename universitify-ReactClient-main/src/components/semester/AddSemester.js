import { useState, useContext } from 'react';
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
import { createSemester } from 'src/API/semesterAPI';
import { UserContext } from '../../API/auth';

const AddSemester = (props) => {
  const [values, setValues] = useState({ year: 2021 });
  const [open, setOpen] = useState(false);
  const { user } = useContext(UserContext);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
      coordinatorId: user.id
    });
  };
  const handleAdd = () => {
    createSemester({ ...values }).then(() => {
      console.log(values);
      setOpen(true);
      // todo navigate
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
          subheader="this semester will be open for registration by default"
          title="Add semester"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                select
                label="semester"
                name="type"
                onChange={handleChange}
                fullWidth
              >
                {['fall', 'spring', 'summer'].map((semesterType) => (
                  <MenuItem
                    key={semesterType}
                    value={semesterType.toUpperCase()}
                  >
                    {semesterType}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="year"
                name="year"
                onChange={handleChange}
                type="number"
                variant="outlined"
                value={values.year}
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
              success: semester created
            </Alert>
          </Snackbar>
        </Box>
        <Divider />
      </Card>
    </form>
  );
};

export default AddSemester;
