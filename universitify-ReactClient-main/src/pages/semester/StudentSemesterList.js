import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';

import StudentSemesterListResults from 'src/components/semester/StudentSemesterListResults';

const StudentSemesterList = () => (
  <>
    <Helmet>
      <title>Semesters list</title>
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
          <StudentSemesterListResults />
        </Box>
      </Container>
    </Box>
  </>
);
export default StudentSemesterList;
