/* eslint-disable no-confusing-arrow */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-wrap-multilines */
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Chip,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button
} from '@material-ui/core';
import { InfoOutlined } from '@material-ui/icons';
import { getAllStudents } from 'src/API/studentAPI';
import StudentEnrollmentListResults from '../enrollment/StudentEnrollmentListResults';
import AlertDialog from '../AlertDialog';
import StudentEnrolledCoursesListResults from '../enrollment/StudentEnrolledCoursesListResults';
import { UserContext } from '../../API/auth';

const StudentListResults = ({ ...rest }) => {
  const { user } = useContext(UserContext);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getAllStudents().then((studentsData) =>
      setStudents(
        studentsData.filter((student) =>
          user.role === 'supervisor' ? student.supervisorId === user.id : true
        )
      )
    );
  }, []);
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleEditStudent = (id) => {
    navigate(`/app/student/${id}/edit`);
  };
  const studentTableMetaData = [
    'ID',
    'Student name',
    'Level',
    'Major',
    'Completed CreditHours',
    'Requested CreditHours',
    'Courses finished',
    'Status',
    'action'
  ];

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                {studentTableMetaData.map((metaData) => (
                  <TableCell key={metaData}>{metaData}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {students
                .slice(page === 0 ? 0 : limit * (page - 1), limit * page)
                .map((studentData) => (
                  <TableRow hover key={studentData.id}>
                    <TableCell>{studentData.id}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        <Avatar src={studentData.avatarUrl} sx={{ mr: 2 }} />
                        <Typography color="textPrimary" variant="body1">
                          {`${studentData.fname} ${studentData.lname}`}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{studentData.level}</TableCell>
                    <TableCell>
                      {studentData.major ? studentData.major.code : 'NULL'}
                    </TableCell>
                    <TableCell>
                      {(studentData.coursesFinished.length * 3).toString()}
                      {/* TODO: change with CreditHoursDone */}
                    </TableCell>
                    <TableCell>{studentData.creditHave}</TableCell>
                    <TableCell>
                      {studentData.coursesFinished.length.toString()}
                    </TableCell>
                    <TableCell>
                      {studentData.enrollments
                        .map((enrollment) => enrollment.status)
                        .includes('in review') && (
                        <Chip
                          icon={<InfoOutlined />}
                          label="need review"
                          clickable
                          color="secondary"
                          variant="outlined"
                        />
                      )}
                    </TableCell>

                    {user.role === 'supervisor' && (
                      <TableCell>
                        <AlertDialog
                          buttonText="Enrollments"
                          title={
                            <Typography variant="h3">
                              {`student name :  ${studentData.fname} ${studentData.lname}`}
                            </Typography>
                          }
                          color="primary"
                          data={
                            <Grid>
                              <StudentEnrollmentListResults
                                id={studentData.id}
                              />
                              <StudentEnrolledCoursesListResults
                                id={studentData.id}
                              />
                            </Grid>
                          }
                        />
                      </TableCell>
                    )}
                    {user.role === 'coordinator' && (
                      <TableCell>
                        <Button
                          primary
                          onClick={() => handleEditStudent(studentData.id)}
                        >
                          Edit
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={students.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

export default StudentListResults;
