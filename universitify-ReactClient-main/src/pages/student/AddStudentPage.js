import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import AddStudent from 'src/components/student/AddStudent';

const AddStudentPage = () => (
  <>
    <Helmet>
      <title>profile</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={8} md={6} xs={12}>
            <AddStudent />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default AddStudentPage;
