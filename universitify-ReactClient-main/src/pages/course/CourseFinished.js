import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';

import CourseFinishedListResults from 'src/components/course/CourseFinishedListResults';

const CourseFinished = () => (
  <>
    <Helmet>
      <title>Course Registration</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Box sx={{ pt: 3 }}>
          <CourseFinishedListResults />
        </Box>
      </Container>
    </Box>
  </>
);

export default CourseFinished;
