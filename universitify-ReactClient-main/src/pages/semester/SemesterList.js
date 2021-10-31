import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import SemesterListResults from 'src/components/semester/SemesterListResults';
import SemesterListToolbar from 'src/components/semester/SemesterListToolbar';
import { getAllSemesters } from 'src/API/semesterAPI';
import { useEffect, useState } from 'react';

const SemesterList = () => {
  const [semestersData, setsemesters] = useState([]);

  useEffect(async () => {
    await getAllSemesters().then((Data) => setsemesters(Data));
    console.log(semestersData);
  }, []);

  const UpdateSemestersData = async () => {
    await getAllSemesters().then((Data) => setsemesters(Data));
  };
  const enableAddSemester = semestersData.every(
    (semester) => semester.status === 'finished'
  );
  return (
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
          <SemesterListToolbar enableAddSemester={enableAddSemester} />
          <Box sx={{ pt: 3 }}>
            <SemesterListResults
              semestersData={semestersData}
              UpdateSemestersData={UpdateSemestersData}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};
export default SemesterList;
