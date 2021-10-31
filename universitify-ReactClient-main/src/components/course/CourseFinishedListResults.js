/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable operator-linebreak */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import { useEffect, useState, useContext } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  // Avatar,
  Box,
  Card,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import ReportIcon from '@material-ui/icons/Report';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { getCoursesFinishedByStudent } from 'src/API/studentAPI';
import { gpaConverter } from 'src/utils/gpa';
import { UserContext } from '../../API/auth';

const CourseFinishedListResults = ({ ...props }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [courses, setCourses] = useState([]);
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (user && user.role === 'student') {
      setCourses(user.coursesFinished);
    } else {
      getCoursesFinishedByStudent(props.studentID).then((coursesData) => {
        setCourses(coursesData);
      });
    }
  }, []);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const courseTableMetaData = [
    'courseCode',
    'Course title',
    'instructor',
    'Grade',
    'Result'
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
                // .slice(page === 0 ? 0 : limit * (page - 1), limit * page)
                .map((courseData) => (
                  <TableRow hover key={courseData.courseId}>
                    <TableCell>{courseData.course.courseCode}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        <Typography color="textPrimary" variant="body1">
                          {courseData.course.name}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell>{`DR. ${courseData.instructor.fname} ${courseData.instructor.lname} `}</TableCell>
                    <TableCell>{gpaConverter(courseData.grade)}</TableCell>

                    <TableCell>
                      {gpaConverter(courseData.grade) === 'F' ? (
                        <Chip
                          icon={<ReportIcon />}
                          label="Fail"
                          clickable
                          color="secondary"
                          variant="outlined"
                        />
                      ) : (
                        <Chip
                          icon={<CheckCircleOutlineIcon />}
                          label="Success"
                          clickable
                          color="primary"
                          variant="outlined"
                        />
                      )}
                    </TableCell>
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

export default CourseFinishedListResults;
