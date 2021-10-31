import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';

// import EnrollmentListToolbar from 'src/components/enrollment/EnrollmentListToolbar';
import StudentEnrollmentListResults from 'src/components/enrollment/StudentEnrollmentListResults';
import { useParams } from 'react-router-dom';

const StudentEnrollmentList = () => {
  const { id } = useParams();

  return (
    <>
      <Helmet>
        <title>EnrollmentList</title>
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
            <StudentEnrollmentListResults id={id} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default StudentEnrollmentList;
