import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import AddSemester from 'src/components/semester/AddSemester';

const AddSemesterPage = () => (
  <>
    <Helmet>
      <title>Add semester</title>
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
            <AddSemester />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default AddSemesterPage;
