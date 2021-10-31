import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import CourseDetails from 'src/components/course/CourseDetails';
import { useParams } from 'react-router-dom';

const CourseDetailsPage = () => {
  const { id } = useParams();

  return (
    <>
      <Helmet>
        <title>CourseDetailsPage</title>
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
              <CourseDetails id={id} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default CourseDetailsPage;
