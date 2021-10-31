/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-wrap-multilines */
import { useEffect, useState, useContext } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  // Avatar,
  Box,
  Card,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  Typography
} from '@material-ui/core';
import { getAllCourses } from 'src/API/courseAPI';
import AlertDialog from '../AlertDialog';
import CourseEnrollmentListResult from '../enrollment/CourseEnrollmentListResult';
import { UserContext } from '../../API/auth';

// import getInitials from 'src/utils/getInitials';

const CourseListResults = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [courses, setCourses] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    getAllCourses().then((coursesData) => {
      setCourses(
        coursesData.filter((course) => course.instructorId === user.id)
      );
    });
  }, []);
  console.log(courses);
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const courseTableMetaData = [
    'courseCode',
    'Course name',
    'level',
    'type',
    'major',
    'credit',
    'course prerequisites',
    'Current Enrollments'
  ];

  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                {courseTableMetaData.map((metaData) => (
                  <TableCell key={metaData}>{metaData}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {courses
                .slice(page === 0 ? 0 : limit * (page - 1), limit * page)
                .map((courseData) => (
                  <TableRow hover key={courseData.id}>
                    <TableCell>{courseData.courseCode}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        <Typography color="textPrimary" variant="body1">
                          {courseData.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{courseData.level}</TableCell>
                    <TableCell>{courseData.type && courseData.type}</TableCell>
                    <TableCell>
                      {courseData.major && courseData.major.name}
                    </TableCell>
                    <TableCell>{courseData.credit}</TableCell>
                    <TableCell>
                      <AlertDialog
                        buttonText="show prerequisites"
                        title={`Course ${courseData.name} prerequisites :`}
                        color="primary"
                        data={
                          <List
                            subheader="Prerequisites :"
                            alignItems="flex-start"
                          >
                            {courseData.prerequisites.map((course) => (
                              <ListItem divider key={course.id}>
                                {`Course : ${course.name} - level: ${course.level}`}
                              </ListItem>
                            ))}
                          </List>
                        }
                      />
                    </TableCell>
                    {/* <TableCell>
                      <Button primary> show students </Button>
                    </TableCell> */}
                    {user.role === 'supervisor' && (
                      <TableCell>
                        <AlertDialog
                          buttonText="Enrollments"
                          title={`Course ${courseData.name} enrollments :`}
                          color="primary"
                          data={
                            <CourseEnrollmentListResult
                              courseId={courseData.id}
                            />
                          }
                        />
                      </TableCell>
                    )}
                    {user.role === 'coordinator' && (
                      <TableCell>
                        <Button primary> Update Course </Button>
                        <Button color="secondary"> delete Course </Button>
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
        count={courses.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

export default CourseListResults;
