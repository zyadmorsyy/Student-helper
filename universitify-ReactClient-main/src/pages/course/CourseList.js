import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';

import CourseListToolbar from 'src/components/course/courseListToolbar';
import CourseListResults from 'src/components/course/CourseListResult';

const CourseList = () => (
  <>
    <Helmet>
      <title>Student</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3,
        overflow: 'auto'
      }}
    >
      <Container maxWidth={false}>
        <CourseListToolbar />
        <Box sx={{ pt: 3 }}>
          <CourseListResults />
        </Box>
      </Container>
    </Box>
  </>
);

export default CourseList;
