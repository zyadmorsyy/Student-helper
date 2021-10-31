import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';

// import EnrollmentListToolbar from 'src/components/enrollment/EnrollmentListToolbar';
import { useParams } from 'react-router-dom';
import StudentEnrolledCoursesListResults from 'src/components/enrollment/StudentEnrolledCoursesListResults';

const StudentEnrolledCourses = () => {
  const { id } = useParams();

  return (
    <>
      <Helmet>
        <title>Current Enrolled courses</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          {/* <EnrollmentListToolbar /> */}
          <Box sx={{ pt: 3 }}>
            <StudentEnrolledCoursesListResults id={id} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default StudentEnrolledCourses;
