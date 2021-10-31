/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
import { Helmet } from 'react-helmet';
import { useContext } from 'react';
import { Box, Container } from '@material-ui/core';
import CourseRegistrationListResults from 'src/components/course/CourseRegistrationListResults';
import CourseRegistrationListToolbar from 'src/components/course/courseRegistrationListToolbar';

import { UserContext } from '../../API/auth';

const CourseRegistration = () => {
  const { user } = useContext(UserContext);
  const { creditHave } = user.semesters[0];
  return (
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
        {[...Array(user.level).keys()].map((level) => (
          <Container maxWidth={false}>
            <Box sx={{ pt: 3 }}>
              <CourseRegistrationListToolbar
                level={level + 1}
                creditHave={creditHave}
              />
            </Box>
            <Box sx={{ pt: 3 }}>
              <CourseRegistrationListResults
                level={level + 1}
                key={level + 1}
                creditHave={creditHave}
              />
            </Box>
          </Container>
        ))}
      </Box>
    </>
  );
};

export default CourseRegistration;
